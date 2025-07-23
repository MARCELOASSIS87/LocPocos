const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [admins] = await pool.query(
      'SELECT * FROM admins WHERE email = ? LIMIT 1',
      [email]
    );
    if (admins.length === 0) {
      return res.status(401).json({ error: 'Admin não encontrado' });
    }
    const admin = admins[0];
    const senhaCorreta = await bcrypt.compare(senha, admin.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha inválida' });
    }
    // Gera token JWT simples (ajuste segredo depois)
    const token = jwt.sign(
      { id: admin.id, nome: admin.nome, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'segredo_super_secreto',
      { expiresIn: '8h' }
    );
    res.json({ token, admin: { id: admin.id, nome: admin.nome, email: admin.email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login', detalhes: err.message });
  }
};
exports.criarAdmin = async (req, res) => {
  // Apenas super pode cadastrar novos admins
  if (!req.admin || req.admin.role !== 'super') {
    return res.status(403).json({ error: 'Apenas Super Admin pode criar novos admins.' });
  }

  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // Verifica se já existe admin com o mesmo email
    const [jaExiste] = await pool.query('SELECT id FROM admins WHERE email = ?', [email]);
    if (jaExiste.length > 0) {
      return res.status(409).json({ error: 'Já existe admin com esse email.' });
    }
    // Gera hash da senha
    const bcrypt = require('bcrypt');
    const senha_hash = await bcrypt.hash(senha, 10);
    await pool.query(
      'INSERT INTO admins (nome, email, senha_hash, role) VALUES (?, ?, ?, ?)',
      [nome, email, senha_hash, 'comum']
    );
    res.status(201).json({ message: 'Admin criado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar admin.', detalhes: err.message });
  }
};
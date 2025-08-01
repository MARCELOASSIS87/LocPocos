const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET /admin/
exports.listarAdmins = async (req, res) => {
  try {
    const [admins] = await pool.query(
      'SELECT id, nome, email, role, criado_em FROM admins WHERE ativo IS NULL OR ativo = 1'
    );
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar admins' });
  }
};

// POST /admin/
exports.criarAdmin = async (req, res) => {
  // Apenas superadmin pode cadastrar novos admins
  if (!req.admin || req.admin.role !== 'super') {
    return res.status(403).json({ error: 'Apenas Super Admin pode criar novos admins.' });
  }

  const { nome, email, senha, role } = req.body;
  if (!nome || !email || !senha || !role) {
    return res.status(400).json({ error: 'Nome, email, senha e role são obrigatórios.' });
  }

  try {
    // Verifica se já existe admin com o mesmo email
    const [jaExiste] = await pool.query('SELECT id FROM admins WHERE email = ?', [email]);
    if (jaExiste.length > 0) {
      return res.status(409).json({ error: 'Já existe admin com esse email.' });
    }
    // Gera hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);
    await pool.query(
      'INSERT INTO admins (nome, email, senha_hash, role) VALUES (?, ?, ?, ?)',
      [nome, email, senha_hash, role]
    );
    res.status(201).json({ message: 'Admin criado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar admin.', detalhes: err.message });
  }
};

// PUT /admin/:id
exports.editarAdmin = async (req, res) => {
  const { id } = req.params;
  const { nome, email, role } = req.body;

  if (!nome || !email || !role) {
    return res.status(400).json({ error: 'Nome, email e role são obrigatórios.' });
  }

  try {
    await pool.query('UPDATE admins SET nome = ?, email = ?, role = ? WHERE id = ?', [nome, email, role, id]);
    res.json({ message: 'Admin atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao editar admin' });
  }
};

// DELETE /admin/:id
exports.excluirAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE admins SET ativo = 0 WHERE id = ?', [id]); res.json({ message: 'Admin desativado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao desativar admin' });
  }
};

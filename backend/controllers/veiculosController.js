const pool = require('../config/db');

// Listar todos os veículos (ativos)
exports.listarVeiculos = async (req, res) => {
  try {
    const [veiculos] = await pool.query(
      'SELECT * FROM veiculos WHERE ativo = 1'
    );
    res.json(veiculos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar veículos', detalhes: err.message });
  }
};

// Obter um veículo por ID
exports.obterVeiculo = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM veiculos WHERE id = ? AND ativo = 1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar veículo', detalhes: err.message });
  }
};

// Criar novo veículo
exports.criarVeiculo = async (req, res) => {
  const { marca, modelo, ano, status } = req.body;
  let foto_url = null;
  if (req.file) {
    foto_url = `/uploads/veiculos/${req.file.filename}`;
  }
  if (!marca || !modelo || !ano || !status) {
    return res.status(400).json({ error: 'Marca, modelo, ano e status são obrigatórios.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO veiculos (marca, modelo, ano, status, foto_url) VALUES (?, ?, ?, ?, ?)',
      [marca, modelo, ano, status, foto_url]
    );
    res.status(201).json({
      id: result.insertId,
      marca,
      modelo,
      ano,
      status,
      foto_url
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar veículo', detalhes: err.message });
  }
};

// Atualizar veículo existente
exports.editarVeiculo = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, ano, status } = req.body;
  let foto_url;
  if (req.file) {
    foto_url = `/uploads/veiculos/${req.file.filename}`;
  }
  if (!marca || !modelo || !ano || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  try {
    if (foto_url) {
      await pool.query(
        'UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, status = ?, foto_url = ? WHERE id = ?',
        [marca, modelo, ano, status, foto_url, id]
      );
    } else {
      await pool.query(
        'UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, status = ? WHERE id = ?',
        [marca, modelo, ano, status, id]
      );
    }
    res.json({ id, marca, modelo, ano, status, foto_url });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao editar veículo', detalhes: err.message });
  }
};
 
// Excluir (soft delete) veículo
exports.excluirVeiculo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE veiculos SET ativo = 0 WHERE id = ?',
      [id]
    );
    res.json({ message: 'Veículo removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir veículo', detalhes: err.message });
  }
};
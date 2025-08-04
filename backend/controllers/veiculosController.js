const pool = require('../config/db');
const allowedStatuses = ['disponível', 'em uso', 'manutenção'];

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
  console.log('CONTEÚDO DE REQ.BODY:', req.body);
  console.log('CONTEÚDO DE REQ.FILES:', req.files);
  const {
    marca,
    modelo,
    ano,
    placa,
    renavam,
    cor,
    numero_seguro,
    manutencao_proxima_data
  } = req.body;
  const status = req.body.status || 'disponivel';
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }
  let foto_principal_url = null;
  let fotos_urls = null;

  if (req.files && req.files.foto_principal) {
    foto_principal_url = `/uploads/veiculos/${req.files.foto_principal[0].filename}`;
  }
  if (req.files && req.files.fotos) {
    fotos_urls = req.files.fotos
      .map(f => `/uploads/veiculos/${f.filename}`)
      .join(',');
  }

  if (!marca || !modelo || !ano) {
    return res
      .status(400)
      .json({ error: 'Marca, modelo, ano são obrigatórios.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO veiculos (marca, modelo, ano, placa, renavam, cor, numero_seguro, status, manutencao_proxima_data, foto_principal_url, fotos_urls) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        marca,
        modelo,
        ano,
        placa,
        renavam,
        cor,
        numero_seguro,
        status,
        manutencao_proxima_data,
        foto_principal_url,
        fotos_urls
      ]
    );
    res.status(201).json({
      id: result.insertId,
      marca,
      modelo,
      ano,
      placa,
      renavam,
      cor,
      numero_seguro,
      status,
      manutencao_proxima_data,
      foto_principal_url,
      fotos_urls
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar veículo', detalhes: err.message });
  }
};

// Atualizar veículo existente
exports.editarVeiculo = async (req, res) => {
  const { id } = req.params;
  const {
    marca,
    modelo,
    ano,
    placa,
    renavam,
    cor,
    numero_seguro,
    manutencao_proxima_data
  } = req.body;
  const status = req.body.status || 'disponivel';
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }
  let foto_principal_url;
  let fotos_urls;

  if (req.files && req.files.foto_principal) {
    foto_principal_url = `/uploads/veiculos/${req.files.foto_principal[0].filename}`;
  }
  if (req.files && req.files.fotos) {
    fotos_urls = req.files.fotos
      .map(f => `/uploads/veiculos/${f.filename}`)
      .join(',');
  }

  if (!marca || !modelo || !ano) {
    return res.status(400).json({ error: 'Marca, modelo e ano são obrigatórios.' });
  }

  try {
    let query =
      'UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, placa = ?, renavam = ?, cor = ?, numero_seguro = ?, status = ?, manutencao_proxima_data = ?';
    const params = [
      marca,
      modelo,
      ano,
      placa,
      renavam,
      cor,
      numero_seguro,
      status,
      manutencao_proxima_data
    ];

    if (foto_principal_url) {
      query += ', foto_principal_url = ?';
      params.push(foto_principal_url);
    }
    if (fotos_urls) {
      query += ', fotos_urls = ?';
      params.push(fotos_urls);
    }
    query += ' WHERE id = ?';
    params.push(id);

    await pool.query(query, params);

    res.json({
      id,
      marca,
      modelo,
      ano,
      placa,
      renavam,
      cor,
      numero_seguro,
      status,
      manutencao_proxima_data,
      foto_principal_url,
      fotos_urls
    });
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
// Atualizar status do veículo
exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
   if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }
  try {
    await pool.query('UPDATE veiculos SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Status atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar status', detalhes: err.message });
  }
};
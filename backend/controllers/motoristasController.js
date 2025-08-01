const pool = require('../config/db');

exports.criarMotorista = async (req, res) => {
  const {
    nome,
    email,
    telefone,
    cpf,
    data_nascimento,
    cnh_numero,
    cnh_validade,
    cnh_data_emissao,
    cnh_categoria,
    cnh_ear
  } = req.body;

  try {
    const foto_cnh_url = req.files?.foto_cnh ? `/uploads/motoristas/${req.files.foto_cnh[0].filename}` : null;
    const foto_perfil_url = req.files?.foto_perfil ? `/uploads/motoristas/${req.files.foto_perfil[0].filename}` : null;
    const selfie_cnh_url = req.files?.selfie_cnh ? `/uploads/motoristas/${req.files.selfie_cnh[0].filename}` : null;
    const comprovante_endereco_url = req.files?.comprovante_endereco ? `/uploads/motoristas/${req.files.comprovante_endereco[0].filename}` : null;
    const documento_vinculo_url = req.files?.documento_vinculo ? `/uploads/motoristas/${req.files.documento_vinculo[0].filename}` : null;
    const antecedentes_criminais_url = req.files?.antecedentes_criminais ? `/uploads/motoristas/${req.files.antecedentes_criminais[0].filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO motoristas (nome, email, telefone, cpf, data_nascimento, cnh_numero, cnh_validade, cnh_data_emissao, cnh_categoria, cnh_ear, cnh_foto_url, foto_perfil_url, selfie_cnh_url, comprovante_endereco_url, comprovante_vinculo_url, antecedentes_criminais_url, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendente')`,
      [
        nome,
        email,
        telefone,
        cpf,
        data_nascimento,
        cnh_numero,
        cnh_validade,
        cnh_data_emissao,
        cnh_categoria,
        cnh_ear === 'true' || cnh_ear === true,
        foto_cnh_url,
        foto_perfil_url,
        selfie_cnh_url,
        comprovante_endereco_url,
        documento_vinculo_url,
        antecedentes_criminais_url
      ]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar motorista', detalhes: err.message });
  }
};
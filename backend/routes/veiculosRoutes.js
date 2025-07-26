const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const veiculosController = require('../controllers/veiculosController');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/veiculos/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Rotas de CRUD de veículos
router.get('/', veiculosController.listarVeiculos);
router.get('/:id', veiculosController.obterVeiculo);
router.post('/', upload.single('imagem'), veiculosController.criarVeiculo);
router.put('/:id', upload.single('imagem'), veiculosController.editarVeiculo);
router.delete('/:id', veiculosController.excluirVeiculo);

module.exports = router;
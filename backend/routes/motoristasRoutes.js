const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const motoristasController = require('../controllers/motoristasController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/motoristas/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/', upload.fields([
  { name: 'foto_cnh', maxCount: 1 },
  { name: 'foto_perfil', maxCount: 1 },
  { name: 'selfie_cnh', maxCount: 1 },
  { name: 'comprovante_endereco', maxCount: 1 },
  { name: 'documento_vinculo', maxCount: 1 },
  { name: 'antecedentes_criminais', maxCount: 1 }
]), motoristasController.criarMotorista);
router.post('/login', motoristasController.loginMotorista);

module.exports = router;
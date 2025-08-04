const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const motoristasController = require('../controllers/motoristasController');
const auth = require('../middlewares/auth');
const fs   = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '..', 'uploads', 'motoristas');
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  }
});
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo inválido. Apenas imagens ou PDF são permitidos.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

const uploadFields = upload.fields([
  { name: 'foto_cnh', maxCount: 1 },
  { name: 'foto_perfil', maxCount: 1 },
  { name: 'selfie_cnh', maxCount: 1 },
  { name: 'comprovante_endereco', maxCount: 1 },
  { name: 'documento_vinculo', maxCount: 1 },
  { name: 'antecedentes_criminais', maxCount: 1 }
]);
router.post('/', (req, res, next) => {
  uploadFields(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, motoristasController.criarMotorista);
router.post('/login', motoristasController.loginMotorista);
router.get('/', auth, motoristasController.listarMotoristas);
router.put('/:id/status', auth, motoristasController.atualizarStatus);
router.put('/:id/bloquear', auth, motoristasController.bloquearMotorista);
router.put('/:id/desbloquear', auth, motoristasController.desbloquearMotorista);
module.exports = router; 
const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// CRUD RESTful
router.get   ('/',      auth, adminController.listarAdmins);      // Listar todos os admins
router.post  ('/',      auth, adminController.criarAdmin);        // Criar novo admin
router.put   ('/:id',   auth, adminController.editarAdmin);       // Editar admin por ID
router.delete('/:id',   auth, adminController.excluirAdmin);      // Exclusão lógica por ID

module.exports = router;

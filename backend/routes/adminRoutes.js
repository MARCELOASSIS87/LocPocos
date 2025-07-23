const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.post('/criar', auth, adminController.criarAdmin);

module.exports = router;

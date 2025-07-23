const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Importar rotas normalmente
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

// (no futuro: outras rotas)

module.exports = app;

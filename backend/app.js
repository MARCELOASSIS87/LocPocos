const express = require('express');
const app = express();

app.use(express.json());

// Importar rotas normalmente
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

// (no futuro: outras rotas)

module.exports = app;

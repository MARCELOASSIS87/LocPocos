const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

// Importar rotas normalmente
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

// (no futuro: outras rotas)

module.exports = app;

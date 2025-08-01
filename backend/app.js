const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/uploads', express.static('uploads'));
// Importar rotas normalmente
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
const veiculosRoutes = require('./routes/veiculosRoutes');
app.use('/veiculos', veiculosRoutes);


// (no futuro: outras rotas)

module.exports = app;

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/uploads', express.static('uploads'));
// Importar rotas normalmente
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
const veiculosRoutes = require('./routes/veiculosRoutes');
app.use('/veiculos', veiculosRoutes);
const motoristasRoutes = require('./routes/motoristasRoutes');
app.use('/motoristas', motoristasRoutes);

// (no futuro: outras rotas)

module.exports = app;

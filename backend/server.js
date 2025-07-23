require('dotenv').config();
const app = require('./app');
const pool = require('./config/db'); // importa a pool de conexão do banco


const PORT = process.env.PORT || 3001;

// Tenta conectar no banco antes de subir o servidor
(async () => {
  try {
    await pool.getConnection(); // faz um teste de conexão
    console.log('Conectado ao banco MySQL!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err.message);
    process.exit(1);
  }
})();

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET || 'segredo_super_secreto', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });

    req.admin = decoded; // Inclui os dados do admin autenticado na request
    next();
  });
}

module.exports = authMiddleware;

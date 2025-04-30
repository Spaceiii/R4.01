const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Format attendu : "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // injecte les données décodées dans req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

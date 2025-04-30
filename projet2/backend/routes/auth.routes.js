const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route d'inscription
router.post('/register', authController.register);

// Route de connexion
router.post('/login', authController.login);

const authMiddleware = require('../middlewares/auth.middleware');

// Route protégée – accessible seulement si token valide
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Bienvenue, honorable utilisateur authentifié.',
    user: req.user // contient l'id et l'email du token
  });
});

module.exports = router;


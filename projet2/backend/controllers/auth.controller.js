const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

exports.register = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname
    });

    res.status(201).json({ message: 'Utilisateur créé.', user: { id: newUser.id, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création.', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
};

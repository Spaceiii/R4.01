const sequelize = require('../config/database');
const User = require('./user.model');
const bcrypt = require('bcrypt');

// Synchronisation de la base
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔗 Connexion à la base réussie.');
    await sequelize.sync({ alter: true }); // ou { force: true } pour reset total
    console.log('📦 Base synchronisée.');
  } catch (error) {
    console.error('⚠️ Erreur lors de la synchronisation :', error);
  }
};

const createTestUser = async () => {
  const User = require('./user.model');

  const email = 'test@example.com';
  const password = 'password123';

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('🧪 Utilisateur de test déjà présent.');
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    email,
    password: hashed,
    firstname: 'Testy',
    lastname: 'McTestFace'
  });

  console.log(`✅ Utilisateur de test créé : ${email} / ${password}`);
};

module.exports = {
  sequelize,
  User,
  syncDatabase,
  createTestUser
};

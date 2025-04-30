const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDatabase, createTestUser} = require('./models');
const authRoutes = require('./routes/auth.routes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Démarrage
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  await syncDatabase();
  await createTestUser();
});

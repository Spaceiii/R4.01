# Projet 2

# ## Structure du projet

```
projet2
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils // utilitaire pour la création des tokens JWT
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   │   ├── router
│   │   ├── views
│   │   ├── store
│   │   ├── main.js
│   │   └── App.vue
│   ├── .env
│   └── package.json
└── README.md
```

## Installation

1. Clonez le dépôt
2. Installez les dépendances dans le dossier backend puis dans le dossier frontend
```bash
npm install
```
3. Créez un fichier `.env` à la racine du dossier backend et ajoutez les variables d'environnement suivantes (laissez le port sur 3000) :
```txt
PORT=3000
DB_NAME=votre_base_de_donnees
DB_USER=votre_nom_utilisateur
DB_PASS=votre_mot_de_passe
DB_HOST=le_nom_de_votre_hote
JWT_SECRET=votre_secret
```

4. Lancer le serveur backend depuis le dossier `backend` :
```bash
npm run start
```

5. Lancer le serveur frontend depuis le dossier `frontend` :
```bash
npm run dev
```
6. Accéder à l'application via le navigateur à l'adresse indiquée dans le terminal (par défaut `http://localhost:8080`).

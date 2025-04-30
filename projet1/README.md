# Projet 1

## Structure du projet

```
projet1
├── config
│   └── config.json // fichier de configuration de la base de données
├── controllers
├── models
├── routes
├── views
├── .env // fichier de configuration de l'environnement
├── server.js
└── package.json
```

## Installation

1. Clonez le dépôt
2. Installez les dépendances
```bash
npm install
```
3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :
```txt
NODE_ENV=development|production|test
SECRET=votre_secret
```
4. Configurez la base de données dans le fichier `config/config.json` selon la forme suivante :
```json
{
    "development": {
        "username": "votre_nom_utilisateur",
        "password": "votre_mot_de_passe",
        "database": "votre_base_de_donnees",
        "host": "localhost",
        "port": 5432,
        "dialect": "postgres"
    },
    "test": {
      ...meme structure que le développement...
    },
    "production": {
      ...meme structure que le développement...
    }
}
```
5. Lancez le serveur
```bash
npm run start
```
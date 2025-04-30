const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const bCrypt = require('bcrypt');

// Initialisation de l'application
const app = express();

const createTestUser = async () => {
    const testEmail = 'test@test.com';
    const testPassword = 'motdepasse';
    const hashedPassword = bCrypt.hashSync(testPassword, bCrypt.genSaltSync(8));

    const existingUser = await models.User.findOne({ where: { emailId: testEmail } });
    if (!existingUser) {
        await models.User.create({
            emailId: testEmail,
            password: hashedPassword,
            firstname: 'Test',
            lastname: 'Utilisateur'
        });
        console.log('🌱 Utilisateur de test créé :', testEmail);
    } else {
        console.log('🌾 Utilisateur de test déjà présent :', testEmail);
    }
};

// Encodage
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration de l'environnement
const env = require('dotenv');
env.config();

// Configuration handlebars
const exphbs = require('express-handlebars');
app.set('views', './views');
app.set('view engine', '.hbs');
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: '',
    layoutsDir: ''
}));


// Configuration des models
const models = require('./models');
models.sequelize.sync().then(() => {
    console.log('Database is connected');
    createTestUser();
}).catch(err => {
    console.log(err, 'Something went wrong with the database');
});

// Configuration de passport
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passport')(passport, models.User);
require('./routes/auth')(app, passport);

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/signin');
};

app.get('/', isLoggedIn, (req, res) => {
    res.render('home', { user: req.user });
});


// Serveur en écoute
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

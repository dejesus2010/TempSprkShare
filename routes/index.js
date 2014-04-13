module.exports = function(app, passport){

    var authController = require('./controllers/authController');

    // render home page
    app.get('/', function(req, res) {
        res.render('index', { title: 'SprkShare - Sprk an Idea' });
        console.log(authController);
    });

    app.post('/auth/login', authController.login);
    app.post('/auth/register', authController.registration);
};

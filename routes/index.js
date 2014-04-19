module.exports = function(app) {

    var authController = require('./controllers/authController'),
    	userController = require('./controllers/userController'),
        contributionController = require('./controllers/contributionsController');

    // render home page
    app.get('/', function(req, res) {
        res.render('index', { title: 'SprkShare - Sprk an Idea' });
    });

    app.get('/viewposttest', function(req,res){
       res.sendfile('../testingViewPost.html')
    });


    app.post('/viewpost', contributionController.renderPage);


    app.get('/create_post', function(req,res){
        res.render('create_post', {title: 'Create Post'});
    });
   
    // render SprkUser page
    app.get('/userpage', function (req, res) {
    	res.render('userpage', { title: 'SprkUser Pge '});
    	console.log(userController);
    });

    app.post('/auth/user', userController.posts);

    // -----------------------------------------------------------------------------------------------------------------
    // Registration and Login for API requests
    // -----------------------------------------------------------------------------------------------------------------

    // expects { email: "m@gmail.com", password: "password" }
    // returns { }
    app.post('/api/auth/register', authController.registration);
    app.post('/api/auth/login', authController.login);
};

// TODO: Get user's name and attach to title.
// exports.userpage = function(req, res) {
// 	res.render('userpage', { title: 'SprkUser Pge' });
// };
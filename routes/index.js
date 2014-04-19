module.exports = function(app) {

    var authController = require('./controllers/authController'),
    	userpageController = require('./controllers/userpageController'),
        contributionController = require('./controllers/contributionsController');

    // render home page
    app.get('/', function(req, res) {
        res.render('index', { title: 'SprkShare - Sprk an Idea' });
    });


    // render the page for an specific post based on the post id passed in
    app.get('/viewpost/:postId', contributionController.renderPostPage);


    app.get('/create_post', function(req,res){
        res.render('create_post', {title: 'Create Post'});
    });
   
    // render SprkUser page
    // TODO: Edit to where it has username in URL.
    // get('/userpage/:username', controller
    app.get('/userpage', function (req, res) {
    	res.render('userpage', { title: 'SprkUser Pge '});
    	console.log(userpageController);
    });
	
	app.get('/groups', function (req, res){
		res.render('groups', { title: 'SprkGroups Pge'});
		console.log(userController);
	});
	
	app.get('/landing', function (req, res){
		res.render('landing', { title: 'SprkLanding Pge'});
		console.log(userController);
	});

    //app.post('/auth/user', userpageController.posts);

    // Testing userpageController.js
    app.get('/testingUser/:userId', userpageController.getAllUserPosts);

    // -----------------------------------------------------------------------------------------------------------------
    // Registration and Login for API requests
    // -----------------------------------------------------------------------------------------------------------------

    // expects { email: "m@gmail.com", password: "password" }
    // returns { hasErrors: false, messages: [] };
    app.post('/api/auth/register', authController.registration);
    app.post('/api/auth/login', authController.login);
	// app.post('/api/auth/post', postController.validate);
	app.post('/api/update/user/avatar', userpageController.updateAvatar);
};

// TODO: Get user's name and attach to title.
// exports.userpage = function(req, res) {
// 	res.render('userpage', { title: 'SprkUser Pge' });
// };
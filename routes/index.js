module.exports = function(app) {

    var authController = require('./controllers/authController'),
    	userPageController = require('./controllers/userpageController'),
        contributionController = require('./controllers/contributionsController'),
		postController = require('./controllers/postController');


    // render home page
    app.get('/', function(req, res) {
        res.render('landing', { title: 'SprkLanding Pge'});
    });


    // render the page for an specific post based on the post id passed in
    app.get('/viewpost/:postId', contributionController.renderPostPage);


    app.get('/create_post', function(req,res){
        res.render('create_post', {title: 'Create Post'});
    });
   
    // render SprkUser page

    app.get('/userpage', function (req, res) {
    	res.render('userpage', { title: 'SprkUser Pge '});
    });
	
	app.get('/groups', function (req, res){
		res.render('groups', { title: 'SprkGroups Pge'});
	});


    // -----------------------------------------------------------------------------------------------------------------
    // Update Requests for API requests - UserPage
    // -----------------------------------------------------------------------------------------------------------------

    app.get('/api/update/user/getUserAllPosts', userPageController.getUserAllPosts);
    app.get('/api/update/user/getUserTempPosts', userPageController.getUserTempPosts);
    app.get('/api/update/user/getUserPermPosts', userPageController.getUserPermPosts);


    // -----------------------------------------------------------------------------------------------------------------
    // Registration and Login for API requests
    // -----------------------------------------------------------------------------------------------------------------

    // expects { email: "m@gmail.com", password: "password" }
    // returns { hasErrors: false, messages: [] };
    app.post('/api/auth/register', authController.registration);
    app.post('/api/auth/login', authController.login);
	app.post('/api/auth/post', postController.validate);
	app.post('/api/update/user/avatar', userPageController.updateAvatar);

    // template for delete and promote posts base on the shares count
    function update() {

        postController.deletePostsNotReachingQuota();

        setTimeout(update, 86400000);
    }
    update();
};

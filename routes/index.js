module.exports = function(app) {

    var authController = require('./controllers/authController'),
    	userPageController = require('./controllers/userpageController'),
        contributionController = require('./controllers/contributionsController'),
		postController = require('./controllers/postController'),
        landingController = require('./controllers/landingController');


    // render home page
    app.get('/', landingController.renderLandingPage);

    // -----------------------------------------------------------------------------------------------------------
    // Viewpost Page
    // -----------------------------------------------------------------------------------------------------------
    app.get('/viewpost/:postId', contributionController.renderPostPage);

    // render page to create a post.
    app.post('/api/get/contributions', contributionController.getPostContributions);
    app.post('/api/sharePost', contributionController.sharePost);
    
    // render page to create a post.
    app.post('/api/put/contribution', contributionController.saveContribution);

    // -----------------------------------------------------------------------------------------------------------
    // Create Post page
    // -----------------------------------------------------------------------------------------------------------
    app.get('/create_post', function(req,res){
        res.render('create_post', {title: 'Create Post'});
    });
   
    // render SprkUser page.
    app.get('/userpage/:userId', userPageController.renderUserPage);

    // TODO: Implement Groups page.
    //	app.get('/groups', function (req, res){
    //		res.render('groups', { title: 'SprkGroups Pge'});
    //	});


    // -----------------------------------------------------------------------------------------------------------------
    // Update Requests for API requests - UserPage
    // -----------------------------------------------------------------------------------------------------------------

    app.get('/api/update/user/getUserAllPosts', userPageController.getUserAllPosts);
    app.get('/api/update/user/getUserTempPosts', userPageController.getUserTempPosts);
    app.get('/api/update/user/getUserPermPosts', userPageController.getUserPermPosts);
    app.get('/api/update/user/getUserFollowees', userPageController.getUserFollowees);



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

var constructor = function () {
	var userpageControllerInstance = {};
	var userpageDA = require('../DataAccessors/UserDataAccessor');

    /*
    userpageControllerInstance.renderUserPage= function(req, res) {
        var userId = req.params.userId;
        var response = { hasErrors: false, messages: [] };

        userpageDA.getAllUserPosts(userId, function(err, userAllPostsRows) {
            userpageDA.getUserTempPosts(userId, function(err, userTempPostsRows) {
                userpageDA.getUserPermPosts(userId, function(err, userPermPostsRows) {

                    if (err) {
                        if (err) {
                            if (err) {
                                response.hasErrors = true;
                                response.messages.push('Something went wrong1, bro.');
                            } else {
                                response.hasErrors = true;
                                response.messages.push('Something went wrong2, bro.');
                            }
                        } else {
                            response.hasErrors = true;
                            response.messages.push('Something went wrong3, bro.');
                        }
                        res.json(response);
                    } else {
                        console.log('Success!');
                        res.render('UserPage/userpage', { userAllPostsRows: userAllPostsRows, userTempPostsRows: userTempPostsRows, userPermPostsRows: userPermPostsRows })
                    }
                });
            });
        });
    };
    */

	// GET ALL USER'S POSTS
	userpageControllerInstance.getUserAllPosts = function(req, res) {
		var userId = req.session.userId;
        var response = { hasErrors: false, messages: [] };

		userpageDA.getAllUserPosts(userId, function(err, userPostData) {

			if (err) {
                // console.log("error: " + err);
                response.hasErrors = true;
                response.messages.push('Failed to get All Posts.');
				res.send(response);
			}
			else {
                // console.log("Got all User Posts Successfully.")
				res.send(userPostData);
			}
		});
	};

    userpageControllerInstance.getUserTempPosts = function(req, res) {
        var userId = req.session.userId;
        var response = { hasErrors: false, messages: [] };

        userpageDA.getUserTempPosts(userId, function(err, userPostData) {

            if (err) {
                response.hasErrors = true;
                response.messages.push('Failed to query the database.');

                res.send(response);
            } else {
                res.send(userPostData);
            }
        });
    };

    userpageControllerInstance.getUserPermPosts = function(req, res) {
        var userId = req.session.userId;
        var response = { hasErrors: false, messages: [] };

        userpageDA.getUserPermPosts(userId, function(err, userPostData) {

            if (err) {
                response.hasErrors = true;
                response.messages.push('Failed to query the database.');

                res.send(response);
            } else {
                res.send(userPostData);
            }
        });
    };

    userpageControllerInstance.getUserFollowees = function(req, res) {
        var userId = req.session.userId;
        var response = { hasErrors: false, messages: [] };

        userpageDA.getUserFollowees(userId, function(err, userFollowees){

            if (err) {
                response.hasErrors = true;
                response.messages.push('Failed to get User\'s Followees');

                res.send(response);
            } else {
                res.send(userFollowees);
            }
        });
    };

    userpageControllerInstance.updateAvatar = function(req, res) {
        var response = { hasErrors: false, messages: [] };
        var data = req.body;
        data.userId = req.session.userId;

        userpageDA.updateAvatar(data, function(err, newAvatarURL) {
            if(err) {
                response.hasErrors = true;
                response.messages.push('Something went wrong');
            } else {
                response.hasErrors = false;
                response.messages.push('Updated avatar to ' + newAvatarURL);
                // TODO update picture in the req.session.userpicurl = newAvatarURL
                response.newAvatarURL = newAvatarURL;
            }

            res.json(response);
        });
    }

	return userpageControllerInstance;
};

module.exports = constructor();
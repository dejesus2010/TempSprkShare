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

		userpageDA.getAllUserPosts(userId, function(err, userAllPostsRows) {

			if (err) {
                // console.log("error: " + err);
				res.send('Something went wrong.');
			}
			else {
                // console.log("Got all User Posts Successfully.")
				res(err, userAllPostsRows.rows);
			}
		});
	};

    userpageControllerInstance.getUserTempPosts = function(req, res) {
        var userId = req.session.userId;
        var response = { hasErrors: false, messages: [] };

        userpageDA.getUserTempPosts(userId, function(err, userTempPostsRows) {

            if (err) {
                response.hasErrors = true;
                response.messages.push('Failed to query the database.');

                res.json(response);
            } else {
                res.send(userTempPostsRows);
            }
        });
    };

    userpageControllerInstance.getUserPermPosts = function(req, res) {
        var userId = req.session.userId;
        var response = { hasErrors: false, messages: [] };

        userpageDA.getUserPermPosts(userId, function(err, userPermPostsRows) {

            if (err) {
                response.hasErrors = true;
                response.messages.push('Failed to query the database.');

                res.json(response);
            } else {
                res.send(userPermPostsRows);
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
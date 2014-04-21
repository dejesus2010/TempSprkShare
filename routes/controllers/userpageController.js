var constructor = function () {
	var userpageControllerInstance = {};
	var userpageDA = require('../DataAccessors/UserDataAccessor');

    userpageControllerInstance.renderUserPage= function(req, res) {
        var userId = req.params.userId;
        var response = { hasErrors: false, messages: [] };

        var URL = 'userpage';

        res.render(URL, {userId: userId});
    };

	// GET ALL USER'S POSTS
	userpageControllerInstance.getUserAllPosts = function(req, res) {
		var userId = req.body.userId;
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
                console.log(userPostData);
				res.send(userPostData);
			}
		});
	};

    userpageControllerInstance.getUserTempPosts = function(req, res) {
        var userId = req.body.userId;
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
        var userId = req.body.userId;
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
        var userId = req.body.userId;
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

    /*
    userpageControllerInstance.putContent = function(req, res) {
        var response = { hasErrors: false, messages: [] };
        var data = req.body;
        data.userId = req.params.userId;

        userpageDA.putContent(data, function(err, rightPanelContent) {
            if(err) {
                response.hadErrors = true;
                response.messages.push('Problem putting data.');
            } else {
                response.message.push('Data successful.');
                response.data = rightPanelContent;
            }

            res.json(response);
        });
    };
    */

    userpageControllerInstance.updateAvatar = function(req, res) {
        var response = { hasErrors: false, messages: [] };
        var data = req.body;
        data.userId = req.body.userId;

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
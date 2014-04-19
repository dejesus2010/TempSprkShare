var constructor = function () {
	var userControllerInstance = {};
	var userDA = require('../dataAccessors/UserDataAccessor');

	// User's Posts Tab
	userControllerInstance.posts = function(req, res) {
		var data = req.body;

		userDA.posts(data, function(err, rowsData) {
			if (err.code === 23505) {
				res.send('Something went wrong.');
			}
			else {
				res.send(rowsData);
			}
		});
	};

    userControllerInstance.updateAvatar = function(req, res) {
        var response = { hasErrors: false, messages: [] };
        var data = req.body;
        data.userId = req.session.userId;

        userDA.updateAvatar(data, function(err, newAvatarURL) {
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

	return userControllerInstance;
};

module.exports = constructor();
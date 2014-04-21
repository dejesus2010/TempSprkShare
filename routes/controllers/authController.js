var constructor = function() {

    var authControllerInstance = {};
    var userDA = require('../dataAccessors/UserDataAccessor');

    authControllerInstance.registration = function(req, res) {
        var response = { hasErrors: false, messages: [] };
        var data = req.body;

        userDA.registration(data, function(err, userData){
                if(err) {
                    if(err.code === "23505"){
                        response.hasErrors = true;
                        response.messages.push('there a an account for ' + req.body.email + ' already.');
                    }
                    else {
                        response.hasErrors = true;
                        response.messages.push('There was problem creating your account. Please try again.');
                    }
				} else {
					response.hasErrors = false;
					response.messages.push('registered in successfully');
                    response.userId = userData.userid;

					// put data in the session
					req.session.userId = userData.userid;
					delete userData.userid;
					req.session.userData = userData;
					console.log(req.session);
				}

            res.json(response);
        });
    };

    authControllerInstance.login = function(req, res) {
        var data = req.body;
        var response = { hasErrors: false, messages: [] };

        userDA.login(data, function(err, userData){
            if(err) {
                if(err.code === 19){
                    response.hasErrors = true;
                    response.messages.push( 'Verify you credentials and try again' );
                }
                else {
                    response.hasErrors = true;
                    response.messages.push('There was with your logging. Please try again.');

                }
            } else {
                response.hasErrors = false;
                response.messages.push('logged in successfully');
                response.userId = userData.userid;

                // put data in the session
                req.session.userId = userData.userid;
                delete userData.userid;
                req.session.userData = userData;
            }

            res.json(response);
        });
    };

    authControllerInstance.logout = function(req, res) {
        delete req.session.userId;
        delete req.session.userData;

        console.log('Success!');
        res.json({ hasErrors: false, messages: [ 'Logged out successfully'] });
    };

    return authControllerInstance;
};

module.exports = constructor();
var constructor = function() {

    var authControllerInstance = {};
    var userDA = require('../dataAccessors/UserDataAccessor');

    authControllerInstance.registration = function(req, res) {

        var data = req.body;

        console.log(data);

        userDA.registration(data, function(err, rowsData){
            console.log(err);
            if(err) {
                if(err.code === 23505){
                    res.send('there a an account for ' + req.body.email + ' already.');
                }
                else {
                    res.send('There was problem creating your account. Please try again.');
                }
            } else {
                res.send(rowsData);
            }
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
                response.userData = userData;
            }

            res.json(response);
        });
    };

    return authControllerInstance;
};

module.exports = constructor();
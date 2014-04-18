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

        userDA.login(data, function(err, rowsData){
            if(err.code = 23505) {

                res.send('something went wrong');
            } else {
                res.send(rowsData);
            }
        });
    };

    return authControllerInstance;
};

module.exports = constructor();
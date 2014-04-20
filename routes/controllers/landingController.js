var construction = function(){
    var landingControllerInstance = {};
    var landingAccesor = require('../DataAccessors/LandingDataAccessor.js');

    landingControllerInstance.renderLandingPage = function(req, res) {
        var response = {hasErrors: false, messages:[]};
        landingAccesor.getTopPosts(function (err, topPostsData) {
            if (err) {
                if (err.code =="23505"){
                    response.hasErrors = true;
                    response.messages.push('Predefined error');
                }
                else{
                    response.hasErrors = true;
                    response.messages.push('Some other error happened');
                }
                res.json(response);
            }
            else{
                res.render('landing', {topPostsData: topPostsData});
            }
        });
    };
    return landingControllerInstance;
};

module.exports = constructor();
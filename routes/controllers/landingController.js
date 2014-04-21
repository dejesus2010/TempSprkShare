var constructor = function(){
    var landingControllerInstance = {};
    var landingAccesor = require('../DataAccessors/LandingDataAccessor');


    landingControllerInstance.renderLandingPage = function(req, res) {
        var response = {hasErrors: false, messages: []};

        landingAccesor.getRecentPosts(function (err, recentPostsData){
            landingAccesor.getTopPosts(function (err, topPostsData) {
                if (err) {
                    if (err.code == "23505") {
                        response.hasErrors = true;
                        response.messages.push('Predefined error');
                    }
                    else {
                        response.hasErrors = true;
                        response.messages.push('Some other error happened');
                    }
                    res.json(response);
                }
                else {
                    console.log(topPostsData);
                    console.log(recentPostsData);
                    res.render('landing', {topPostsData: topPostsData, recentPostsData: recentPostsData});
                }
            });
        });
    };

    return landingControllerInstance;
};

module.exports = constructor();
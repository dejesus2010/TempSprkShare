var constructor = function(){

    var contributionsControllerInstance = {};

    var contributionsDA = require('../DataAccessors/ContributionsDataAccessor');



    contributionsControllerInstance.getContributions = function(req, res){

        var postId = req.body.postId;

        contributionsDA.getContributions( postId, function(err, rowsData){
           console.log("error: " +err);

            if(err){

                if(err.code == 23505 ){
                    // check this.....
                    res.send( 'Idk what to do with this err.code');
                }
                else{
                    // check this....
                    res.send( 'I guess another different response here lol?')
                }

            }else{
                res.json(rowsData);
            }
        });

    };

    contributionsControllerInstance.renderPostPage = function(req, res) {
        // get post data
        var postId = req.params.postId;

        contributionsDA.getPostInfo(postId, function(err, postRowsData){
            console.log(postRowsData)

            if(err) {
                res.render('ViewPost/viewpost', { postNotFound: true } );
            } else {
                res.render('ViewPost/viewpost', { postRowsData: postRowsData } );
            }
        });
    };

    // get data to post id from the url in knockout
    contributionsControllerInstance.getPostContributions = function(req, res) {
        var response = { hasErrors: false, messages: [] };
        var postId = req.body.postId;

        contributionsDA.getContributions(postId, function(err, contributionsRowsData){
            if(err) {
                response.hasErrors = true;
                response.messages.push('Problem getting data');
            } else {
                response.hasErrors = false;
                response.messages.push('data successfully retrieve');
                response.data = contributionsRowsData;
            }

            res.json(response);
        });
    };

    contributionsControllerInstance.saveContribution = function(req, res){
        var response = { hasErrors: false, messages: [] };
        var data = req.body;
        data.userId = req.session.userId;

        contributionsDA.saveContribution(data, function(err, contributionsRowsData){
            if(err) {
                response.hasErrors = true;
                response.messages.push('Problem getting data');
            } else {
                response.hasErrors = false;
                response.messages.push('data successfully retrieve');
                response.data = contributionsRowsData;
            }

            res.json(response);
        });
    };

//    contributionsControllerInstance.getPostContributions = function(req, res){
//        var postId = req.params.postId;
//        var response = { hasErrors: false, messages: [] };
//
//
//        contributionsDA.getPostInfo(postId, function(err, postRowsData){
//
//            contributionsDA.getContributions(postId, function(err, contributionsRowsData){
//
//                if(err){
//                    if(err.code === "23505" ){
//                        response.hasErrors = true;
//                        response.messages.push( 'Idk what to do with this err.code' );
//                    }
//                    else{
//                        response.hasErrors = true;
//                        response.messages.push( 'I guess another different response here lol?');
//                    }
//
//                    res.json(response);
//                } else {
//                    //console.log("Post Rows Data: ");
//                    // console.log(postRowsData);
//                    res.render('ViewPost/viewpost', {contributionsRowsData: contributionsRowsData, postRowsData : postRowsData});
//                }
//            });
//
//        });
//
//    };

    // not used in production. just used for testing....
    contributionsControllerInstance.getPostInfo = function(req, res){
        var postId = req.params.postId;
        var response = { hasErrors: false, messages: [] };

        contributionsDA.getPostInfo(postId, function( err, postRowsData){
            if(err){

                if(err.code == 23505 ){
                    // check this.....
                    res.send( 'Idk what to do with this err.code');
                }
                else{
                    // check this....
                    res.send( 'I guess another different response here lol?')
                }

            }else{
                res.send( postRowsData);
                console.log("rendered page");
            }
        });
    };

    // ---------------------------------------------------------------------
    // /api/update/contributions ... Add contribution to post
    // ---------------------------------------------------------------------

    contributionsControllerInstance.sendAddContribution = function(req, res){

        var sendData = req.body;

        var response = {hasErrors: false, messages: []};

        contributionsDA.sendAddContribution(sendData, function(err, rowsData){
            if(err){
                console.log(err);
            }
        });

    };

    return contributionsControllerInstance;
};

module.exports = constructor();
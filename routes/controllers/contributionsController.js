var constructor = function(){

    var contributionsControllerInstance = {};

    var contributionsDA = require('../DataAccessors/ContributionsDataAccessor');



    contributionsControllerInstance.getContributions = function(req, res){

        contributionsDA.getContributions( req, function(err, rowsData){
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
                console.log("Completed query and got results...");
                res.send(rowsData);
                //res.send("Completed query");
                //var rowsResult = rowsData;
                //return rowsResult;
                //console.log("after sending");
                //console.log("Rows data: " + rowsData);

               // return rowsData;
            }
        });

    };



    contributionsControllerInstance.renderPostPage = function(req, res){
        var postId = req.params.postId;
        var response = { hasErrors: false, messages: [] };


        contributionsDA.getPostInfo(postId, function(err, postRowsData){

            contributionsDA.getContributions(postId, function(err, contributionsRowsData){

                if(err){
                    if(err.code === "23505" ){
                        response.hasErrors = true;
                        response.messages.push( 'Idk what to do with this err.code' );
                    }
                    else{
                        response.hasErrors = true;
                        response.messages.push( 'I guess another different response here lol?');
                    }

                    res.json(response);
                } else {
                    //console.log("Post Rows Data: ");
                    // console.log(postRowsData);
                    res.render('ViewPost/viewpost', {contributionsRowsData: contributionsRowsData, postRowsData : postRowsData});
                }
            });

        });

    };

    // not used in production. just used for testing....
    contributionsControllerInstance.getPostInfo = function(req, res){
        var postId = req.params.postId;
        var response = { hasErrors: false, messages: [] };

        contributionsDA.getPostInfo(req, function( err, postRowsData){
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

    contributionsControllerInstance.sendAddContribution = function(req, res){
        var sendData = req.body;
        var response = {hasErrors: false, messages: []};

        contributionsDA.sendAddContribution(sendData, function(err, rowsData){

        });

    };

    return contributionsControllerInstance;
};

module.exports = constructor();
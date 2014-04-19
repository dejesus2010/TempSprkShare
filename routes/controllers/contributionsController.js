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



    contributionsControllerInstance.renderPage = function(req, res){

        contributionsDA.getPostInfo(req, function(err, postRowsData){
            //console.log(postRowsData);


            contributionsDA.getContributions(req, function(err, contributionsRowsData){
               console.log(contributionsRowsData);

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
                    //console.log("Post Rows Data: ");
                    console.log(postRowsData);
                    res.render('viewpost', {contributionsRowsData: contributionsRowsData, postRowsData : postRowsData});
                    console.log("rendered page");
                }

            });

        });

    };

    // not used in production. just used for testing....
    contributionsControllerInstance.getPostInfo = function(req, res){
        console.log(req.body.postid);

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

    return contributionsControllerInstance;
};

module.exports = constructor();
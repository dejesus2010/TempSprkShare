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

        contributionsDA.getContributions(req, function(err, rowsData){
            console.log("error: " + err);

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
                console.log("rendering page");
                res.render('viewpost', {rowsData: rowsData});
                console.log("rendered page");
            }
        });



    };

    return contributionsControllerInstance;
};

module.exports = constructor();
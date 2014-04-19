var constructor = function(){

    var contributionsControllerInstance = {};
    //console.log("requiring dataAccessor");
    var contributionsDA = require('../DataAccessors/ContributionsDataAccessor');
    //console.log("got dataAccessor");

    //console.log("defining getContributions");
    contributionsControllerInstance.getContributions = function(req, res){

        console.log("get here");
        var data = req.body;//req.params.postid;
        console.log("Data: " + data);


        contributionsDA.getContributions( data, function(err, rowsData){
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
                console.log("Got here");
                res.send(rowsData);
                console.log("after sending");
                //console.log("Rows data: " + rowsData);

               // return rowsData;
            }
        });

    };

    contributionsControllerInstance.renderPage = function(req, res){
        var contributions = contributionsControllerInstance.getContributions(req, res);

        //console.log( contributions );

        res.send(contributions);

        //res.render('viewpost', contributions);

    };

    return contributionsControllerInstance;
};

module.exports = constructor();
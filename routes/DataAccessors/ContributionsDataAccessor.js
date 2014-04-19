var constructor = function(){
    var contributionsDAInstance = {};
    var pg = require('pg');

    // Grab all contributions with the same post id as the desired post clicked on

    contributionsDAInstance.getContributions = function( data, getData ){
        // Joins Posts and Contributions where postid and contributionsid match. giving us all the content to display for the post

        var preparedStatement = 'select contr.contribid, contr.contribpostid, contr.contribuserid, contr.contribcontent, contr.contribhasmedia, contr.contributeddate from contributions as contr, posts where contr.contribpostid = $1 and posts.postid = contr.contribpostid';
        var inserts = [data.contribpostid];//[ data.contribpostid, data.postid ];

        // for local dev change to process.env.DATABASE_URL
        pg.connect(process.env.DATABASE_URL, function(err, client, done ){
            client.query(preparedStatement, inserts, function(err, result){
               done();

               if(err){
                    getData(err);
               }
               else{
                   console.log( result.rows);
                    getData(err, result.rows);
               }

            });
        });

    };

    return contributionsDAInstance;

};

module.exports = constructor();
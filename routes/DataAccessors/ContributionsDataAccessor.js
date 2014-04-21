var constructor = function(){
    var contributionsDAInstance = {};
    var pg = require('pg');

    // Grab all contributions with the same post id as the desired post clicked on
    contributionsDAInstance.getContributions = function( postId, sendData ){
        // Joins Posts and Contributions where postid and contributionsid match. giving us all the content to display for the post

        var preparedStatement = 'select contr.contribid, contr.contribpostid, contr.contribuserid, contr.contribcontent, contr.contribhasmedia, contr.contributeddate, sparkusers.username from contributions as contr, posts, sparkusers where sparkusers.userid = contr.contribuserid and posts.postid = $1 and posts.postid = contr.contribpostid';
        var inserts = [postId];

        // for local dev change to process.env.DATABASE_URL
        pg.connect(process.env.DATABASE_URL, function(err, client, done ){
            client.query(preparedStatement, inserts, function(err, result){
               done();

               if(err){
                   sendData(err);
               }
               else{
                   sendData(err, result.rows);
               }

            });
        });

    };

    // getting the user data from the database
    contributionsDAInstance.getPostInfo = function(postId, getData){
        var preparedStatement = 'select posts.*, sparkusers.username, sparkusers.userpicurl, sparkusers.userdescription  from posts, sparkusers where posts.postid =  $1 and posts.postuserid = sparkusers.userid';
        var inserts = [postId];

        pg.connect(process.env.DATABASE_URL, function(err, client, done){
           client.query(preparedStatement,inserts, function(err, result){
               done();

               if(err){
                   getData(err);
               }
               else{
                   console.log(result.rows);
                   getData(err, result.rows);
               }

           });

        });


    };

    contributionsDAInstance.saveContribution = function(contributionData, sendData){

        var preparedStatement = 'INSERT INTO contributions(contribpostid, contribuserid, contribcontent, contribhasmedia, contributeddate ) ' +
            'VALUES ($1, $2, $3, false, current_date )' +
            'RETURNING *;';
        var inserts = [contributionData.postId, contributionData.userId, contributionData.content];

        console.log(inserts);
        pg.connect(process.env.DATABASE_URL, function(err, client, done){
            client.query(preparedStatement, inserts, function(err, result){
                done();

                // TODO finish implementation
                if( err ){
                    sendData(err);
                } else {
                    sendData(err, result.rows[0])
                }

            });

        });


    };

    contributionsDAInstance.sharePost = function(postId, sendError){

        var preparedStatement = 'UPDATE posts SET postsharecount = postsharecount + 1 where postid = $1';
        var inserts = [postId];

        pg.connect(process.env.DATABASE_URL, function(err, client, done){
            client.query(preparedStatement, inserts, function(err){
                done();

                if(err){
                    sendError(err);
                }

            });
        });

    };

    return contributionsDAInstance;

};

module.exports = constructor();
var constructor = function(){
    var pg = require('pg');
    var landingPostsInstance = {};

    landingPostsInstance.getTopPosts = function(sendData){
        var preparedStatement = 'SELECT PostId, PostTitle, PostShareCount FROM Posts ORDER BY postsharecount DESC LIMIT 3';

        pg.connect(process.env.DATABASE_URL, function(err, client, done){
            client.query(preparedStatement, function(err,result){
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

    landingPostsInstance.getRecentPosts = function(sendData1){
        var preparedStatement = 'SELECT PostId, PostTitle, PostedDate FROM Posts ORDER BY PostedDate DESC LIMIT 3';

        pg.connect(process.env.DATABASE_URL, function(err, client, done){
            client.query(preparedStatement, function(err,result){
                done();
                if(err){
                    sendData1(err);
                }
                else{
                    sendData1(err, result.rows);
                }
            });
        });
    };

    return landingPostsInstance;
};

module.exports = constructor();
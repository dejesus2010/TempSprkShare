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

    return landingPostsInstance;
};

module.exports = constructor();
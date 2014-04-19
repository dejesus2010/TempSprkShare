var constructor = function() {

    var userDAInstance = {};
    var pg = require('pg');

    userDAInstance.registration = function(data, sendData) {

        var preparedStatement = 'INSERT INTO sparkUsers( username, useremail, UserPassword) VALUES ($1, $2, $3) RETURNING UserId';
        var inserts = [ data.username, data.email, data.password ];

        // for local dev change to process.env.DATABASE_URL
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if(err) {
                    sendData(err)
                }
                else {
                    sendData(err, result.rows);
                }
            });
        });
    };

    userDAInstance.login = function(data, sendData) {

        var preparedStatement = 'SELECT * FROM sparkUsers WHERE useremail = $1 AND userpassword = $2';
        var inserts = [data.email, data.password];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                console.log(result.rows);

                if (err) {
                    sendData(err)
                }
                else if (result.rows.length === 0) {
                    sendData( { code: 19 } )
                } else {
                    sendData(err, result.rows);
                }
            });
        });
    };

    // QUERY USER'S TEMPORARY POSTS
    userDAInstance.getUserTempPosts = function(userData, sendData) {

        var self = this;
        // TODO: FIx query to give only the temporary posts.
        var preparedStatement = 'SELECT * FROM posts WHERE postUserID = $1';
        var inserts = [ this.userID ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                }
                else {
                    sendData(err, result.rows);
                }
            });
        });
    };

    // QUERY USERS
    userDAInstance.getUserPermPosts = function(userData, sendData) {

        var self = this;
        var preparedStatement = 'SELECT * FROM permanentPosts WHERE permPostUserID = $1';
        var insert = [ self.userID ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                }
                else {
                    sendData(err, result.rows);
                }
            });
        });
    };

    // UPDATE THE USER'S PICTUREURL IN THE DATABASE
    userDAInstance.updateAvatar = function(userData, sendData) {

        var self = this;
        var preparedStatement = 'UPDATE sparkUsers SET UserPicURL = $1 WHERE userID = $2';
        var inserts = [ userData.pictureURL, self.userID ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                }
            });
        });
    };

    return userDAInstance;
};

module.exports = constructor();
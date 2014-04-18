var constructor = function() {

    var userDAInstance = {};
    var pg = require('pg');

    userDAInstance.registration = function(data, sendData) {

        var preparedStatement = 'INSERT INTO sparkUsers(Username, UserEmail, UserPassword) VALUES ($1, $2, $3) RETURNING UserId';
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
        // TODO: Add this.userID to query.
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

    userDAInstance.posts = function(req, res) {
        // TODO: Add this.userID to query.
        var preparedStatement = 'SELECT * FROM posts, sparkUsers WHERE postUserId = userId';
        var inserts = [];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err)
                }
                else {
                    sendData(err, result.rows);
                }
            });
        });
    };

    return userDAInstance;
};

module.exports = constructor();
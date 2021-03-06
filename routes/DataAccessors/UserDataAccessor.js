var constructor = function() {

    var userDAInstance = {};
    var pg = require('pg');
    var hash = require('./hasher.js').hash;

    userDAInstance.registration = function(data, sendData) {

        // hashing the password after hashed receive the hash and salt and save thme
        hash(data.password, function(err, salt, hash){
            if (err) {
                sendData(err);
            } else {
                var preparedStatement = 'INSERT INTO sparkUsers( username, useremail, userpassword, usersalt) VALUES ($1, $2, $3, $4)' +
                                         'RETURNING *';
                var inserts = [ data.username, data.email, hash.toString(), salt];

                // for local dev change to process.env.DATABASE_URL
                pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                    client.query(preparedStatement, inserts, function(err, result) {
                        done();

                        if(err) {
                            sendData(err);
                        }
                        else {
                            var userData = result.rows[0];
                            delete userData.userpassword;
                            delete userData.usersalt;

                            sendData(err, userData);
                        }
                    });
                });
            }
        });
    };

    userDAInstance.login = function(data, sendData) {


        var preparedStatement = 'SELECT * FROM sparkUsers WHERE useremail = $1';
        var inserts = [data.email];

        // apply the same algorithm to the POSTed password, applying
        // the hash against the pass / salt, if there is a match we
        // found the user
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                }
                else if (result.rows.length === 0) {
                    // invalid credentials because of the email
                    sendData( { code: 19 } );

                } else {
                    var userData = result.rows[0];

                    // take the submitted data and apply the hash using the original salt
                    hash(data.password, userData.usersalt, function(err, hash){
                        if (err){
                            sendData(err);
                        } else {
                            // after hashed compare the db hash with the hash of the submitted password
                            if (hash.toString() == userData.userpassword) {
                                delete userData.userpassword;
                                delete userData.usersalt;

                                sendData(err, userData);
                            } else {
                                // invalid credentials because of the password
                                sendData( { code: 19 } );
                            }
                        }
                    });
                }
            });
        });
    };

    // QUERY ALL THE USER'S POSTS
    userDAInstance.getAllUserPosts = function(userId, sendData) {
        var preparedStatement = 'SELECT * FROM posts WHERE postuserId = $1';
        var inserts = [ userId ];


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

    // QUERY USER'S TEMPORARY POSTS
    userDAInstance.getUserTempPosts = function(userId, sendData) {
        var preparedStatement = 'SELECT * FROM posts WHERE postUserId = $1 AND NOT EXISTS' +
                                 '(SELECT permPostUserId FROM permanentPosts)';
        var inserts = [ userId ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                }
                else {
                    console.log(result);
                    sendData(err, result.rows);
                }
            });
        });
    };

    // QUERY USER'S PERMANENT POSTS
    userDAInstance.getUserPermPosts = function(userId, sendData) {
        var preparedStatement = 'SELECT * FROM permanentPosts WHERE permPostUserId = $1';
        var inserts = [ userId ];

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

    // GET THE USERNAME'S OF THE USERS THAT this USER IS FOLLOWING
    userDAInstance.getUserFollowees = function(userId, sendData) {

        var preparedStatement = 'SELECT Username, FollowerID FROM sparkUsers, followers WHERE followerId = $1 AND followedUserId = userId';
        var inserts = [ userId ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                } else {
                    sendData(err, result.rows);
                }
            });
        });
    };

    // UPDATE THE USER'S PICTUREURL IN THE DATABASE
    userDAInstance.updateAvatar = function(userData, sendData) {

        var preparedStatement = 'UPDATE sparkusers SET userpicurl = $1 WHERE userId = $2 RETURNING userpicurl';
        // TODO: Get actual userId from session.
        var inserts = [ userData.imgURL, userData.userId ];

        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query(preparedStatement, inserts, function(err, result) {
                done();

                if (err) {
                    sendData(err);
                } else {
                    console.log(result);
                    sendData(err, result.rows[0].userpicurl);
                }
            });
        });
    };

    return userDAInstance;
};

module.exports = constructor();
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

<<<<<<< HEAD
                if(err) {
                    sendData(err)
                }
                else {
                    sendData(err, result.rows);
                }
            });
=======
                        if(err) {
                            sendData(err);
                        }
                        else {
                            var userData = result.rows[0]
                            delete userData.userpassword;
                            delete userData.usersalt;

                            sendData(err, userData);
                        }
                    });
                });
            }
>>>>>>> a816187727ed8a66fe69899c85587d3779c9e2df
        });
    };

    userDAInstance.login = function(data, sendData) {

<<<<<<< HEAD
        var preparedStatement = 'SELECT * FROM sparkUsers WHERE useremail = $1 AND userpassword = $2';
        var inserts = [data.email, data.password];
=======
        // apply the same algorithm to the POSTed password, applying
        // the hash against the pass / salt, if there is a match we
        // found the user


        // TODO: Add this.userID to query.
        var preparedStatement = 'SELECT * FROM sparkUsers WHERE useremail = $1';
        var inserts = [data.email];
>>>>>>> a816187727ed8a66fe69899c85587d3779c9e2df

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
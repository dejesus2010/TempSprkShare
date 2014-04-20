var constructor = function(){

	var userPostInstance = {};
	var pg = require('pg');
	userPostInstance.insert = function(data , sendData){
		
		var preparedStatement = 'INSERT INTO posts( PostTitle, PostContent) VALUES ($1, $2) RETURNING PostId';
		var inserts = [ data.title, data.message];
		
		
		 pg.connect(process.env.DATABASE_URL, function(err, client, done) {
						console.log(process.env.DATABASE_URL);
						
						client.query(preparedStatement, inserts, function(err, result) {
							done();
							console.log(result);
							
							if(err) {
								sendData(err);
							}else{
								var id =result.rows[0].postid;
								sendData(err , id );
							}
						});
					});
	
	}
	return userPostInstance;
};
module.exports = constructor();
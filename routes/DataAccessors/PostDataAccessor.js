var constructor = function(){

	var userPostInstance = {};
	var pg = require('pg');
	userPostInstance.insert = function(data , sendData){
		
		console.log('inside userPostInstance');
		var preparedStatement = 'INSERT INTO posts( PostTitle, PostContent) VALUES ($1, $2)';
		var inserts = [ data.title, data.message];
		
		console.log('outside postdataaccessor');
		
		 pg.connect(process.env.DATABASE_URL, function(err, client, done) {
						console.log('inside postdataaccessor');
						console.log(process.env.DATABASE_URL);
						
						client.query(preparedStatement, inserts, function(err, result) {
							done();
							console.log(result);
							if(err) {
								sendData(err);
							}
						});
					});
	
	}
	return userPostInstance;
};
module.exports = constructor();
var constructor = function(){

    var post = {};
    var postDataAccessor=require('../DataAccessors/PostDataAccessor');
    post.validate = function(req , res){
   
					var data = req.body;
					var response = { hasErrors: false, messages: [] , id: req.session.id , hasMedia: false};
				
					if(!(data.title) || (data.title.length == 0)){
						
						response.hasErrors = true;
						response.messages.push('Please Enter a title. The title field is required');
						console.log('inside');
					}else{
						if(data.title.length>250){
							response.hasErrors = true;
							response.messages.push('The title must be less than 250 characters');
							console.log('inside2');
						}
					}
					
					if(!(data.message) || (data.message.length == 0)){
						response.hasErrors = true;
						response.messages.push('Please Enter a message. The message field is required');
					}else{
						if(data.message.length>1000){
							response.hasErrors = true;
							response.messages.push('The message must be less than 1000 characters');
						}
					}
					
					if(data.picture || (data.title.length != 0)){
						response.hasMedia = true;
					}
					
					
					if(!response.hasErrors){
                        data.userId = req.session.userId;

						postDataAccessor.insert(data , function(err , id){
							console.log(data);
							if(err){
								console.log(id+' err');
								response.messages.push('There was an error making the post');
							}else{
								console.log(id+' no errors');
								console.log("before"+response.id);
								response.id=id;
								data.id=id;
								postDataAccessor.insertPicture(data , function(){});
								console.log("after"+response.id);
								
								
							}
						
							res.json(response);
						});
					} else {
						res.json(response);
					}
			
			};
   



    post.deletePostsNotReachingQuota = function(){
        postDataAccessor.deletePostsNotReachingQuota(function(err){
            if(err){
                console.log('There was an error with daily deletion');
            } else {
                console.log('Daily deletion successfully executed');
            }
        });
    }

    return post;

};

module.exports = constructor();
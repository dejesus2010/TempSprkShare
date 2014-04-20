var constructor = function(){

   var post = {};
   var postDataAccessor=require('../dataAccessors/PostDataAccessor');
   post.validate = function(req , res){
   
			var data = req.body;
			
			console.log('yolo');
			
			var response = { hasErrors: false, messages: [] };
		
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
			
			
			if(!response.hasErrors){
				console.log('inside the if statement');
				postDataAccessor.insert(data , function(err){
					console.log(data);
					if(err){
						response.messages.push('There was an error making the post');
				}});
			
			
			}
			
			res.json(response);
			
			};
   
		return post;
};

module.exports = constructor();
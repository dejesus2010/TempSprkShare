/**
 * Created by Aleksey Klintsevich on 4/19/14.
 */
 $(function(){
 
 
		function postVM(){
			var self = this;
			self.title=ko.observable("");
			self.message=ko.observable("");
			self.hasErrors = ko.observable(false);
			self.errors = ko.observableArray([]);
			
			
			
			self.$title = $('#title_group');
			self.$message = $('#message_group');
			
			self.fields = [ self.$title, self.$message ];
			self.errorClass = 'has-error';
			
			
		};
		
		
		 postVM.prototype.removeAlerts = function() {
				var self = this;
				self.hasErrors(false);
				self.errors([]);

				for(var i = 0; i < self.fields.length; i++){
					self.fields[i].removeClass(self.errorClass );
				}
		}
		
		postVM.prototype.submit = function(){
			var self = this;
			var URL ='/api/auth/post';
			self.removeAlerts();
			
							 $.ajax({
								type: "POST",
								url: URL,
								data: { title : self.title(), message: self.message() },
								success: function(data) {
												if(!data.hasErrors) {
													console.log(data.id);
													console.log('in success function without errors');
													window.location = '/viewpost/'+data.id;
												} else {
													self.hasErrors(true);
													for(var i =0; i < data.messages.length; i++) {
														console.log(data.messages[i]);
														if(data.messages[i] === 'Please Enter a title. The title field is required' || data.messages[i] === 'The title must be less than 250 characters'){
															self.$title.addClass(self.errorClass);
														}
														
														if(data.messages[i] === 'Please Enter a message. The message field is required' || data.messages[i] === 'The message must be less than 1000 characters'){
															self.$message.addClass(self.errorClass);
														}
														self.errors.push(data.messages[i]);
													}
												}
										}
									
									
									});
			}
		
	ko.applyBindings(new postVM());		 
});
 
	
 
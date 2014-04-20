
// Adding click listener to make input visible

$(document).ready(function(){
   $('#addContributionButton').click(function(){
       var inputContr = document.getElementById("inputContribution");
       inputContr.style.visibility="visible";
   });
});



$(function(){


        function AddContributionVM(){

            var self = this;



            self.newContribution = ko.observable("");
            self.contributionToAdd = ko.observable(""); // inputed content for contribution to add
            self.hasErrors = ko.observable(false);
            self.errors = ko.observableArray([]);

            self.postId = window.location.pathname.split('/')[2];
            self.$inputContributionContent = $('#inputContributionContent');
            self.$newContribution = $('#newContribution');


        };

        AddContributionVM.prototype.submitContribution = function(){


            //var postId = window.location.pathname.split('/')[2];

            var self = this;
            var URL = '/api/update/contributions';

            console.log(self);

            $.ajax({
               type: "POST",
               url: URL,
               data: {contributionToAdd : self.contributionToAdd(), postId: self.postId},
               success: function(data){
                    if(!data.hasErrors){
                        console.log("Contribution add was successful");
                    }else{
                        self.hasErrors(true);
                        console.log("ERROR");
                    }


               }

            });


        };

        ko.applyBindings(new AddContributionVM());

    }


);


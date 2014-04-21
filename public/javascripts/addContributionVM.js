
$(document).ready(function(){
    $('#addContributionButton').click(function(){
        var inputContr = document.getElementById("inputContribution");
        inputContr.style.visibility="visible";
    });
});



$(function(){

        function ContributionVM(user, cont, userpicurl,contruserid) {
            var self = this;

            self.username = user;
            self.content = cont;
            self.userpicurl = userpicurl;
            self.userid = contruserid;
        }


        function AddContributionVM(){

            var self = this;

            self.newContributionContent = ko.observable("");
            self.hasErrors = ko.observable(false);
            self.contributions = ko.observableArray([]);

            self.postId = window.location.pathname.split('/')[2];
            self.$inputContributionContent = $('#inputContributionContent');
            self.$newContribution = $('#newContribution');

            $.ajax({
                type: "POST",
                url: '/api/get/contributions',
                data: {  postId: self.postId },
                success: function(data){
                    if(!data.hasErrors){
                        var contributions = data.data;

                        console.log(data);

                        for(var i = 0; i < contributions.length; i++){
                            self.contributions.push( new ContributionVM(contributions[i].username, contributions[i].contribcontent, contributions[i].userpicurl, contributions[i].contribuserid));
                        }
                    } else {
                        self.hasErrors(true);
                        console.log("ERROR");
                    }

                }

            });

        }

        AddContributionVM.prototype.submitContribution = function(){
            var self = this;
            var URL = '/api/put/contribution';

            console.log(self);

            $.ajax({
                type: "POST",
                url: URL,
                data: { content : self.newContributionContent(), postId: self.postId },
                success: function(data){
                    if(!data.hasErrors){
                        console.log(data);
                        var newContrib = data.data;
                        self.contributions.push( new ContributionVM(newContrib.username, newContrib.contribcontent, newContrib.userpicurl));
                    }else{
                        self.hasErrors(true);
                        console.log("ERROR");
                    }
                }

            });
        }

        AddContributionVM.prototype.share = function(){

            var self = this;
            var URL = '/api/sharePost'

        };

        ko.applyBindings(new AddContributionVM());

    }


);

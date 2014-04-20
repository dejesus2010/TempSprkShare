
// Adding click listener to make input visible

$(document).ready(function(){
   $('#addContributionButton').click(function(){
       var inputContr = document.getElementById("inputContribution");
       inputContr.style.visibility="visible";
   });
});


/*
$(function(){


        function AddContribution(){

            var self = this;


            self.contributionToAdd = ko.observable("");
        };


);

*/
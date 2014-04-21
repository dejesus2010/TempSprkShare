$(function() {
    function UserpageVM() {
        var self = this;

        self.followees = ko.observable('');
        self.imgURL = ko.observable('');
        self.avatar = ko.observable('');

        self.$imgURL = $('#imgURL');
        self.$avatar = $('#avatar');
        self.$followees = $('#left');
        self.$rightContent = $('#right');

        // TODO: Get userId from session.
        //self.usedId = ko.observable('');
    };

    UserpageVM.prototype.performUserRequest = function(data, event) {

        var self = this;
        var URL = '/api/update/user/' + event.target.id;

        console.log(URL);

        $.ajax({
            url: URL,
            type: "GET",
            data: { userId: 1 },
            success: function (data) {
                if (data.hasErrors) {
                    console.log('Error!');
                } else {
                    console.log('Success!');
                  }
                }
            });
        };



    UserpageVM.prototype.getUserFollowees = function() {

        $.ajax({
            url: '/api/update/user/getUserFollowees',
            type: "GET",
            data: { userId: 1 },
            success: function (data) {
                if (data.hasErrors) {
                    console.log('Failed to get Followees!');
                } else {
                    console.log(data);
                }
            }
        });
    };

    UserpageVM.prototype.submitImage = function() {
        var self = this;

        $.ajax({
            url: '/api/update/user/avatar',
            type: "POST",
            // TODO: Get userId() to work from session.
            data: { imgURL: self.imgURL() },
            success: function(data) {
                if(data.hasErrors) {
                    alert('something went wrong');
                } else {
                    alert('pic updated to' + data.newAvatarURL);
                }
            }
        });
    };

    ko.applyBindings(new UserpageVM());
});
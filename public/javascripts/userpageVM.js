$(function() {
    function UserpageVM() {
        var self = this;

        // TODO: Get actual userId from session.
        self.userId = window.location.pathname.split('/')[2];
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

        $.ajax({
            url: URL,
            type: "GET",
            data: { userId: self.userId },
            success: function (data) {
                if (data.hasErrors) {
                    console.log('Error!');
                } else {
                    console.log(data);
                  }
                }
            });
        };



    UserpageVM.prototype.getUserFollowees = function() {
        var self = this;
        var URL = '/api/update/user/getUserFollowees';

        $.ajax({
            url: URL,
            type: "GET",
            data: { userId: self.userId },
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
        var URL = '/api/update/user/avatar';

        $.ajax({
            url: URL,
            type: "POST",
            data: { imgURL: self.imgURL(), userId: self.userId },
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
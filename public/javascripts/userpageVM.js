$(function() {
    function UserpageVM() {
        var self = this;

        // TODO: Get actual userId from session.
        self.userId = window.location.pathname.split('/')[2];
        self.followees = ko.observable('');
        self.imgURL = ko.observable('');
        self.avatar = ko.observable('');
        self.rightContent = ko.observableArray([]);

        self.$imgURL = $('#imgURL');
        self.$avatar = $('#avatar');
        self.$followees = $('#left');
        self.$rightContent = $('#right');

        // TODO: Get userId from session.
        //self.usedId = ko.observable('');
    };

    function UserpageContentVM(title, content, userid, sharecount) {
        var self = this;

        self.posttitle = title;
        self.postcontent = content;
        self.postuserid = userid;
        self.postsharecount = sharecount + ' share(s)';
    };

    UserpageVM.prototype.performUserRequest = function(data, event) {

        var self = this;
        var URL = '/api/update/user/' + event.target.id;

        console.log(self.userId);
        $.ajax({
            url: URL,
            type: "POST",
            data: { userId: self.userId },
            success: function (data) {
                if (data.hasErrors) {
                    self.hasErrors(true);
                    console.log("Failed to Fetch Rows data!");
                } else {
                    console.log(data);
                    var content = data;

                    for (var i = 0; i < content.length; i++) {
                        self.rightContent.push( new UserpageContentVM(content[i].posttitle, content[i].postcontent, content[i].postuserid, content[i].postsharecount));
                    }
                  }
                }
            });
        };



    UserpageVM.prototype.getUserFollowees = function() {
        var self = this;
        var URL = '/api/update/user/getUserFollowees';

        $.ajax({
            url: URL,
            type: "POST",
            data: { userId: self.userId },
            success: function (data) {
                if (data.hasErrors) {
                    self.hasErrors(true);
                    console.log("Failed to Fetch Followees!");
                } else {
                    /*
                    console.log(data);
                    var content = data;

                    for (var i = 0; i < content.length; i++) {
                        self.rightContent.push( new UserpageVM(content[i].posttitle, content[i].postcontent, content[i].postuserid));
                    }
                    */
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
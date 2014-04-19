
function ChangeAvatarVM() {
    var self = this;

    self.imgURL = ko.observable('');
};

ChangeAvatarVM.prototype.submitImage = function() {
    var self = this;

    $.ajax({
        url: '/api/update/user/avatar',
        type: "POST",
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

ko.applyBindings(new ChangeAvatarVM());


function UpdateUserPostsVM() {
    var self = this;

    self.userId = ko.observable('');
};

UpdateUserPostsVM.prototype.getPosts = function(data, event) {
    var self = this;

    $.ajax({
        url: '/api/update/user/' + data.target.id,
        type: "GET",
        data: { userId: self.userId },
        success: function(data) {
                    if (data.hasErrors) {
                        console.log('Error!');
                    } else {
                        console.log(data);
                    }
                }
    });
};

ko.applyBindings(new UpdateUserPostsVM());
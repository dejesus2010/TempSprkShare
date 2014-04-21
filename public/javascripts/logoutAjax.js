$(function() {
    $('#logoutButton').click(function () {
        console.log('inside button');
        $.ajax({
            type: "POST",
            url: '/api/auth/logout',
            success: function (data) {
                if (data.hasErrors) {
                    alert('Failed to logout :\'(');
                } else {
                    window.location = '/';
                }
            }
        });
    });
});
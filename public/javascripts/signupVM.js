/**
 * Created by jorgep on 4/18/14.
 */
$(function(){
    function signupVM() {
        var self = this;

        // could also be te user's email
        self.email = ko.observable("");
        self.password = ko.observable("");
        self.passwordRetype = ko.observable("");
        self.hasErrors = ko.observable(false);
        self.errors = ko.observableArray([]);

        // jquery variables
        self.$emailInput = $('#emailControl');
        self.$passwordInput = $('#passwordControl');
        self.$passwordRetypeInput = $('#passwordRetypeControl');
        self.fiels = [ self.$emailInput, self.$passwordInput, self.$passwordRetypeInput ];
        self.errorClass = 'has-error';
    };

    signupVM.prototype.removeAlerts = function() {
        var self = this;
        self.hasErrors(false);
        self.errors([]);

        for(var i = 0; i < self.fiels.length; i++){
            self.fiels[i].removeClass(self.errorClass );
        }
    }

    signupVM.prototype.createAccount = function(){
        var self = this;
        self.removeAlerts();

        if(!self.email()) {
            self.hasErrors(true);
            self.errors().push("email is required");
            self.$emailInput.addClass(self.errorClass );
        }

        if(!self.password()) {
            self.hasErrors(true);
            self.errors().push("password is required");
            self.$passwordInput.addClass(self.errorClass );
        }

        if(!self.passwordRetype()) {
            self.hasErrors(true);
            self.errors().push("gotta double check your password")
            self.$passwordRetypeInput.addClass(self.errorClass );
        }

        if(self.passwordRetype() !== self.password()) {
            self.hasErrors(true);
            self.errors().push("password and retype don't match");
            self.$passwordInput.addClass(self.errorClass );
            self.$passwordRetypeInput.addClass(self.errorClass );
        }

        if(!self.hasErrors()) {
            $.ajax({
                type: "POST",
                url: "/api/auth/register",
                data: { email : self.email(), password: self.password },
                success: function() {
                            window.location = '/userpage';
                        }
            });
        }
    };

    ko.applyBindings(new signupVM());
});
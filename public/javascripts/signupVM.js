/**
 * Created by jorgep on 4/18/14.
 */
$(function(){
    function MessageVM(m){
        var self = this;
        self.message = m;
    }

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
            self.errors().push( new MessageVM("email is required"));
            self.$emailInput.addClass(self.errorClass );
        }

        if(!self.password()) {
            self.hasErrors(true);
            self.errors().push( new MessageVM("password is required"));
            self.$passwordInput.addClass(self.errorClass );
        }

        if(!self.passwordRetype()) {
            self.hasErrors(true);
            self.errors().push( new MessageVM("gotta double check your password"));
            self.$passwordRetypeInput.addClass(self.errorClass );
        }

        if(self.passwordRetype() !== self.password()) {
            self.hasErrors(true);
            self.errors().push( new MessageVM("password and retype don't match"));
            self.$passwordInput.addClass(self.errorClass );
            self.$passwordRetypeInput.addClass(self.errorClass );
        }

        if(!self.hasErrors()) {
            $.ajax({
                type: "POST",
                url: "/api/auth/register",
                data: { email : self.email(), password: self.password },
                success: function(data) {
                                if(!data.hasErrors) {
                                    window.location = '/userpage';
                                } else {
                                    self.hasErrors(true);
                                    for(var i =0; i < data.messages.length; i++) {
                                        self.errors.push(data.messages[i]);
                                    }
                                }
                        }
            });
        }
    };

    ko.applyBindings(new signupVM());
});
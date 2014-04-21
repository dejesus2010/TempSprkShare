$(function(){
    function SignupVM() {
        var self = this;

        // could also be te user's email
        self.email = ko.observable("");
        self.password = ko.observable("");
        self.passwordRetype = ko.observable("");
        self.hasErrors = ko.observable(false);
        self.errors = ko.observableArray([]);

        // jquery variables
        self.$emailInputLogin = $('#emailControlLogin');
        self.$passwordInputLogin = $('#passwordControlLogin');
        self.$emailInputSignup = $('#emailControlSignup');
        self.$passwordInputSignup = $('#passwordControlSignup');
        self.$passwordRetypeInput = $('#passwordRetypeControl');
        self.fields = [
            self.$emailInputLogin,
            self.$passwordInputLogin,
            self.$emailInputSignup,
            self.$passwordInputSignup,
            self.$passwordRetypeInput ];
        self.errorClass = 'has-error';
    };

    SignupVM.prototype.removeAlerts = function() {
        var self = this;
        self.hasErrors(false);
        self.errors([]);

        for(var i = 0; i < self.fields.length; i++){
            self.fields[i].removeClass(self.errorClass );
        }
    }



    SignupVM.prototype.submit = function(){
        var self = this;
        self.removeAlerts();
        var isLogingIn = $('#login_modal').hasClass('in');
        var url = isLogingIn ?  "/api/auth/login" : "/api/auth/register";


        if(!self.email()) {
            self.hasErrors(true);
            self.errors.push( "email is required");


            if(isLogingIn){
                self.$emailInputLogin.addClass(self.errorClass );
            } else {
                self.$emailInputSignup.addClass(self.errorClass );
            }
        }

        if(!self.password()) {
            self.hasErrors(true);
            self.errors.push("password is required");

            if(isLogingIn){
                self.$passwordInputLogin.addClass(self.errorClass );
            } else {
                self.$passwordInputSignup.addClass(self.errorClass );
            }
        }

        if(!self.passwordRetype()  && !isLogingIn) {
            self.hasErrors(true);
            self.errors.push("gotta double check your password");
            self.$passwordRetypeInput.addClass(self.errorClass );
        }

        if(self.passwordRetype() !== self.password() && !isLogingIn) {
            self.hasErrors(true);
            self.errors.push( "password and retype don't match");
            self.$passwordInputSignup.addClass(self.errorClass );
            self.$passwordRetypeInput.addClass(self.errorClass );
        }

        if(!self.hasErrors()) {
            $.ajax({
                type: "POST",
                url: url,
                data: { email : self.email(), password: self.password() },
                success: function(data) {
                                if(!data.hasErrors) {
                                    window.location = '/userpage/' + data.userId;
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

    ko.applyBindings(new SignupVM());
});
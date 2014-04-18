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
        self.formHasErrors = ko.observable(false);
        self.errors = ko.observableArray([]);

        // jquery variables
        self.$emailInput = $('#email');
        self.$password = $('#password');
        self.passwordRetypeInput = $('#password_again');
        self.fiels = [ self.$emailInput, self.$emailInput, self.$emailInput ];
    };

    signupVM.prototype.removeAlerts = function() {
        var thereAreErrors = false;
        self.errors([]);

        for(var i = 0; i < self.fiels.length; i++){
            self.fiels[i].removeClass( '' );
        }
    }

    signupVM.prototype.createAccount = function(){
        var self = this;

        self.removeAlerts();

        if(!self.email())
        {
            thereAreErrors = true;
            self.errors().push("email is required");
            return;
        }

        if(!self.password())
        {
            thereAreErrors = true;
            self.errors().push("password is required");
            return;
        }

        if(!self.passwordRetype())
        {
            thereAreErrors = true;
            self.errors().push("gotta double check your password");
            return;
        }

        if(self.passwordRetype() !== self.password())
        {
            thereAreErrors = true;
            self.errors().push("password and retype don't match");
            return;
        }

        if(!thereAreErrors){
            $.ajax({
                type: "POST",
                url: "/api/auth/register",
                data: { email : self.email(), password: self.password },
                success: function() {
                            alert("account created");
                        }
            });
        }

        self.formHasErrors(thereAreErrors);
    };

    ko.applyBindings(new signupVM());
});
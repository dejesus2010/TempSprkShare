
function Contribution(){
    this.contribid = ko.observable(1);
    this.contribuserid = ko.observable(1);
}

function AppViewModel(){
    this.contributions = [];
    this.lastName = ko.observable("Bertington");
}

console.log("Applying Binding");
ko.applyBindings( new AppViewModel() );
console.log("applied Bindings");


/*
function ContributionsData(){

    this.userImage = 'images/default_avatar.png';
    this.contributionText = 'This is a contribution';
    this.userpage = 'userpage';

    ko.track(this);
}

function AppViewModel(){
    this.contributions = [new ContributionsData(), new ContributionsData(), new ContributionsData()];

    ko.track(this);
}

$(function(){
    console.log( 'Applying model');
    ko.applyBindings( new AppViewModel() );
    console.log( 'Applied bindings ');
});

$('#sidebar').affix({
    offset: {
        top: 235
    }
});

console.log( 'loaded js');
    */
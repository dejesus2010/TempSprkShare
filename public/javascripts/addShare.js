/**
 * Created by ryandejesus on 4/21/14.
 */
$('#share').click(function() {

    var text=parseInt($('#postShareAmount').text());
    console.log(text);

    $('#postShareAmount').text(text+1);

});
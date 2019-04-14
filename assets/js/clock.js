$(document).ready(function () {

var time = moment().format('HH:mm');

$("#clock").html(time);

setInterval(myClock, 1000);

function myClock() {
  var time = moment().format('HH:mm');
  $("#clock").html(time);
}

});
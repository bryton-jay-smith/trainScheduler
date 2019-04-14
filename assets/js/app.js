$(document).ready(function () {
  console.log("JQurey Ready");

  var time = moment().format('HH:mm');
  $("#clock").html(time);
  setInterval(myClock, 1000);

  function myClock() {
    var time = moment().format('HH:mm');
    $("#clock").html(time);
  };


  $("#submit").on('click', fillData());

  function fillData() {
    //event.preventDefault();
    $("#dataContent").empty();

    // console.log("Button Pressed");

    name = $("#name").val();
    destination = $("#destination").val();
    tFrequency = $("#frequency").val();
    firstTime = $("#firstTime").val();


    moment().format('MMMM Do YYYY, h:mm:ss a');

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    //console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    timeTill = tMinutesTillTrain;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    tdName = "<td>" + name + "</td>";
    tdDestination = "<td>" + destination + "</td>";
    tdFrequency = "<td>" + tFrequency + "</td>";
    tdNextArrival = "<td>" + arrivalTime + "</td>";
    tdTimeTill = "<td>" + timeTill + "</td>";

    database.ref().push({
      "name": name,
      "destination": destination,
      "frequency": tFrequency,
      "firstTime": firstTime
    });

    $("#dataContent").append(tdName, tdDestination, tdFrequency, tdNextArrival, tdTimeTill);
  }

  database.ref().on("value", function (childSnapshot) {
    name = childSnapshot.val().name;
    destination = childSnapshot.val().destination;
    tFrequency = childSnapshot.val().frequency;
    arrivalTime = childSnapshot.val().next;
    timeTill = childSnapshot.val().timeTill;
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  console.log(name);
  console.log(destination);
  console.log(tFrequency);
  console.log(arrivalTime);
  console.log(timeTill);

  fillData();
});
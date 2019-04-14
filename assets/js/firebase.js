$(document).ready(function () {

  function calcTime(x, y) {

    moment().format('MMMM Do YYYY, h:mm:ss a');

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(x, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % y;
    //console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = y - tRemainder;
    timeTill = tMinutesTillTrain;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  }

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyPKG6F1oSJkkxUboTRlGo2ZxGrI_GXNQ",
    authDomain: "click-counter-bjsmith.firebaseapp.com",
    databaseURL: "https://click-counter-bjsmith.firebaseio.com",
    projectId: "click-counter-bjsmith",
    storageBucket: "click-counter-bjsmith.appspot.com",
    messagingSenderId: "337987674087"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Initialize Variables
  var name = "";
  var destination = "";
  var frequency = 0;
  var firstTime = "";
  var arrivalTime = "";
  var timeTill = "";

  // Capture Button Click
  $("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    console.log(name);

    destination = $("#destination").val().trim();
    console.log(destination);

    frequency = $("#frequency").val().trim();
    console.log(frequency);

    firstTime = $("#firstTime").val().trim();
    console.log(firstTime);

    if (name == "" | destination == "" | frequency == "" | firstTime == "") {
      alert("Please fill out all feilds");
    } else {

      calcTime(firstTime, frequency);

      // Code for handling the push
      database.ref().push({
        name: name,
        frequency: frequency,
        destination: destination,
        firstTime: firstTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      $("#name").val("");
      $("#destination").val("");
      $("#frequency").val("");
      $("#firstTime").val("");
      console.log("cleared inputs");
    }

  });

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.frequency);
    console.log(sv.destination);
    console.log(sv.firstTime);

    calcTime(sv.firstTime, sv.frequency);

    console.log(arrivalTime);

    console.log(timeTill);




    // Change the HTML to reflect
    tdName = "<td>" + sv.name + "</td>";
    tdDestination = "<td>" + sv.destination + "</td>";
    tdFrequency = "<td>" + sv.frequency + "</td>";
    tdNextArrival = "<td>" + arrivalTime + "</td>";
    tdTimeTill = "<td>" + timeTill + "</td>";

    var newRow = $("<tr>");

    newRow.append(tdName, tdDestination, tdFrequency, tdNextArrival, tdTimeTill);

    $("#dataContent").append(newRow);

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
});
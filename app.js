var config = {
    apiKey: "AIzaSyA7lMdLR_3bKS3_GEWA4EN33RXvHU9DKnM",
    authDomain: "clickbuttoncounter-e1c0f.firebaseapp.com",
    databaseURL: "https://clickbuttoncounter-e1c0f.firebaseio.com",
    projectId: "clickbuttoncounter-e1c0f",
    storageBucket: "clickbuttoncounter-e1c0f.appspot.com",
    messagingSenderId: "160964536622"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var currentTime = moment().format("HH:mm");
  var currentMins = moment().format("mm")
  console.log(currentTime);
  console.log(currentMins);


  // Set up Click Event for the Submit button
  $("#submit").on("click", function (event) {
    console.log("SUBMITTING FORM");
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();
    console.log(trainName, destination, firstTime, frequency);

    // push information into firebase

    database.ref("/trains").push({
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });

})

// Set up the child_added event for firebase employees location
database.ref("/trains").on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var newRow = $("<div>").addClass("row");
    var nameCol = $("<div>").addClass("col-3").text(snapshot.val().name);
    var destinationCol = $("<div>").addClass("col-3").text(snapshot.val().destination);
    var frequencyCol = $("<div>").addClass("col-2").text(snapshot.val().frequency);
    // var firstTimeConverted = moment(snapshot.val().firstTime, "HH:mm").subtract(1, "years");
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var minutesAway = snapshot.val().frequency - (currentMins % snapshot.val().frequency);
    var nextTrain = moment().add(minutesAway, "m");
    console.log(nextTrain);
    var nextArrivalCol = $("<div>").addClass("col-2").text(moment(nextTrain).format("hh:mm a"));
    var minutesAwayCol = $("<div>").addClass("col-2").text(minutesAway);
    newRow.append(nameCol, destinationCol, frequencyCol, nextArrivalCol, minutesAwayCol);

    $("#train-list").append(newRow);

});
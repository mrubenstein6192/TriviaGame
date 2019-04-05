    
window.onload = function() {
//make the timer start at 5 minutes (300 seconds)
var counter = 10;
var intervalId;
var clockRunning = false;

//start the timer on click of "start-button"
$("#start").on("click", run);


function run() {
  if (!clockRunning) {
    intervalId = setInterval(decrement, 1000);
    clockRunning = true;
  }
  // DONE: Change the "display" div to "00:00."
}

function decrement() {
  counter-- ;
   //  Show the number in the #timer tag.
   $("#timer").html("<h2>" + counter + "</h2>");
   var converted = timeConverter(counter);
  $("#timer").text(converted);
   if (counter === 0) {
    stop();
    alert("Time's Up! Let's see how you did.");
    showResults();
  }
}

function stop() {
  clearInterval(intervalId);
}

function timeConverter(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}




//array for correct answers referring to ids from HTML
var questions = [];
var wrongAnswers = ["q1a", "q1b", "q1c", "q2b", "q2c", "q2d", "q3a", "q3c", "q3d", "q4b", "q4c", "q4d", "q5a", "q5b", "q5c"];
var correctAnswers = ["q1d", "q2a", "q3b", "q4a", "q5d"];
var score = 0;

//variable to hold number of correct answers

if ($('input[type=radio]:checked').val() === correctAnswers[i])
{
  score++;
}


function showResults() {
$("#results").html("You got " + score + " out of 5 questions correct!");
}
$("#submit").on("click", stop);
$("#submit").on("click", showResults);


}
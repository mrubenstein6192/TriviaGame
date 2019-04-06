
var counter = 120;
var intervalId;
var clockRunning = false;

//start the timer on click of "start-button"
$("#start").on("click", run);
$("#start").on("click", renderQuestions);


function run() {
  if (!clockRunning) {
    intervalId = setInterval(decrement, 1000);
    clockRunning = true;
  }
 
}

function decrement() {
  counter-- ;
   //  Show the number in the #timer tag.
   $("#timer").html("<h2>" + counter + "</h2>");
   var converted = timeConverter(counter);
  $("#timer").text(converted);
   if (counter === 0) {
    stop();
    alert("Time's Up! Let's see how you did. Your score will be displayed at the bottom of the quiz.");
    checkQuiz();
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


var questions = [
  {
    question: 'Which direwolf belongs to the youngest Stark sibling?',
    answer: 'Shaggydog',
    choices: ['Ghost', "Nymeria", "Lady", "Shaggydog"],
    userAnswer: ""
  },
  {
    question: 'Which dragon is killed by the Night King?',
    answer: 'Viserion',
    choices: ['Drogon', "Rhaegal", "Viserion", "Balerion"],
    userAnswer: ""
  },
  {
    question: 'Which character is responsible for reviving Beric Dondarion?',
    answer: 'Thoros of Myr',
    choices: ['Thoros of Myr', "Melisandre", "Arya", "The Hound"],
    userAnswer: ""
  },
  {
    question: 'How many Unsullied soldiers does Daenerys buy in Astapor?',
    answer: '8000',
    choices: ['5000', "6000", "7000", "8000"],
    userAnswer: ""
  },
  {
    question: 'Which castle is home to Hounse Lannister?',
    answer: 'Casterly Rock',
    choices: ['Winterfell', "Casterly Rock", "RiverRun", "Dragonstone"],
    userAnswer: ""
  },
  {
    question: 'What is the name of the song that plays to taunt the Starks before the massacre known as the "Red Wedding?',
    answer: 'The Rains of Castamere',
    choices: ['The Rains of Castamere', "Hear Me Roar", "Lannisters Always Pay Their Debts", "Book of the Stranger"],
    userAnswer: ""
  },
  {
    question: 'Which of the following is the only character to survive the Battle at the Wall in season 4?',
    answer: 'Janos Slynt',
    choices: ['Janos Slynt', 'Ygritte', 'Grenn', 'Pyp'],
    userAnswer: ""
  },
  {
    question: 'According to Osha (the wildling who looks after Bran and Rickon), what does a red comet indicate?',
    answer: 'Dragons',
    choices: ['Dragons', 'A great victory in the war', "Impending Betrayals", "Winter is coming"],
    userAnswer: ""
  },
  {
    question: 'Who teaches Ser Davos how to read?',
    answer: 'Shireen Baratheon',
    choices: ['Shireen Baratheon', "Stannis Baratheon", "Samwell Tarly", "Melisandre"],
    userAnswer: ""
  },
  {
    question: 'Which city is not a slave city (before Daenerys arrives) in Essos?',
    answer: 'Braavos',
    choices: ['Braavos', "Astapor", "Meereen", "Yunkai"],
    userAnswer: ""
  }

];

// set user score
var correct = 0;

// function to print all questions to page
function renderQuestions() {
  // clear out form
  $("#quiz-form").empty();



  // Loop through questions array
  questions.forEach(function (question, index) {
    // create div to hold question
    var $question = $("<div>").addClass("form-group");
      // <div class="form-group"></div>
    
    // add question to div
    var $label = $("<h4>")
      .text(question.question)
      .appendTo($question);
        /*
          <div class="form-group"> 
            <h4>Question 1</h4> 
          </div>
        */ 

    // shuffle choices
    question.choices = question.choices.sort(function() {
      return .5 - Math.random();
    });

    // create a loop to iterate through question's choices and create radio buttons for each one
    for (var i = 0; i < question.choices.length; i++) {
      // create a div for choice and add bootstrap classes
      var $choice = $('<div>');
      $choice.addClass('form-check form-check-inline');
      
      // create an input tag for the radio button
      var $radio = $('<input>');

      // add attributes to provide the answer choice
      // the "name" attribute is super important, all radio buttons per question need to have the same "name" so they know which question it applies to
      $radio
        .attr({
          type: "radio",
          value: question.choices[i],
          name: index,
          class: "form-check-input"
        })
        .appendTo($choice);
      
      // create label to actually print the choice to the page
      var $choiceLabel = $('<label>');
      $choiceLabel
        .text(question.choices[i])
        .addClass('form-check-label')
        .appendTo($choice);
      
      // add whole radio button choice to question
      $choice.appendTo($question);
    }
    // when done making all of the choices, add whole question to the page
    $("#quiz-form").append($question);
  });
}

// create on "change" listener for all radio buttons but bind them to quiz-form since it's permanently on the page
$("#quiz-form").on("change", ".form-check-input", function() {
  console.log(this);
  
  // GET question index out of "name" attribute so we know what question you answered
  var questionIndex = $(this).attr("name");

  console.log(questions[questionIndex]);

  // get value out of radio button you selected
  var answer = $(this).val();

  // set answer to question's userAnswer property
  questions[questionIndex].userAnswer = answer;
  
});



function checkQuiz () {
  for (var i = 0; i < questions.length; i++) {
  if (questions[i].userAnswer === questions[i].answer) {
    correct ++;
    console.log(correct);
  }}
  $("#results").text("You got " + correct + " out of 10 questions correct!");
  $("#answer-key").text("Answer Key:  Shaggydog;  Viserion;  Thoros of Myr;  8000; Casterly Rock;  The Rains of Castamere;  Janos Slynt;  Dragons;  Shireen Baratheon;  Braavos");
}

$("#submit").on("click", stop);
$("#submit").on("click", checkQuiz);

function submitOn() {
  if (clockRunning === false) {
    $("#submit").hide();
  }
  else {
    $("#submit").show();
  }
}
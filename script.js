

"use strict";

const data = [
  {
    question: "What is the capital of New York?",
    answers: ["NYC", "Albany", "Buffalo", "Cooperstown"],
    correct_choice: 1
  },
  {
    question: "What is the capital of California?",
    answers: ["San Fransisco", "Los Angeles", "Sacramento", "Berkeley"],
    correct_choice: 2
  },
  {
    question: "What is the capital of Florida?",
    answers: ["Miami", "Orlando", "Tallahassee", "Fort Lauderdale"],
    correct_choice: 2
  }

];



let turn = 0;
let score = 0;

showQuestion();




function showQuestion() {
  // set the counter
  $('#counter').text("Question: " + (turn + 1));

  // show question text
  $('#question').text(data[turn].question);

  // render element for answers
  $('#answers').empty();

  for (let index in data[turn].answers) {

    let button = $("<span id=thechoices>");
    button.text(data[turn].answers[index]);

    button.data('choice', index);


    $('#answers').append(button);


    button.draggable();
  }


  $('#question').droppable(
    {
      drop: function(event, ui) {

        let userchoice = ui.draggable.data('choice');

        checkAnswer(userchoice);
      }
    }
  );
}

function checkAnswer(choice) {

  if (choice == data[turn].correct_choice) {
    score++;
    $('#wrong').empty();
    $('#right').text("Correct answer! Drag and drop your next choice onto the question box.")
    
  
    showScore();
    
    $(function() {
      $("#dialog").dialog();
    });

    nextQuestion();
  } else {

    $('#wrong').text("Wrong answer!");
    $('#right').empty();
  }
}


function nextQuestion() {
  turn++;
  if (turn < data.length) {
    showQuestion();
  } else {
    //$('#progressbar').html("You Won! Game Over!");
    $(function() {
      var progressbar = $("#progressbar"),
        progressLabel = $(".progress-label");

      progressbar.progressbar({
        value: false,
        change: function() {
          progressLabel.text(progressbar.progressbar("value") + "%");
        },
        complete: function() {
          progressLabel.text($('#progressbar').html("You Won! Game Over!"));
        }
      });

      function progress() {
        var val = progressbar.progressbar("value") || 0;

        progressbar.progressbar("value", val + 7);

        if (val < 99) {
          setTimeout(progress, 80);
        }
      }

      setTimeout(progress, 2000);

    });
  }
}

function showScore() {

  $('#score').text("Score: " + score);

}
showScore();




















































$(document).ready(function () {
    // List all trivia questions
    const trivia = [
        {
            question: "How many legs does a spider have?",
            options: [6, 8, 4, 10],
            answer: 1,
            image: "assets/images/spider.jpg"
        },
        {
            question: "How many rings make up the symbol of the Olympic Games?",
            options: [12, 10, 8, 6, 5],
            answer: 4,
            image: "assets/images/olympic.jpg"
        },
        {
            question: "How many grams are there in a kilogram?",
            options: [100, 10, 1000],
            answer: 2,
            image: "assets/images/kilogram.jpg"
        },
        {
            question: "How many lungs do humans normally have?",
            options: [1, 2, 0],
            answer: 1,
            image: "assets/images/lungs.jpg"
        },
        {
            question: "What’s the total number of dots on a pair of dice?",
            options: [32, 42, 26, 38],
            answer: 1,
            image: "assets/images/dices.jpg"
        },
        {
            question: "How many sides does an octagon have?",
            options: [6, 9, 5, 10, 8],
            answer: 4,
            image: "assets/images/octagon.jpg"
        },
        {
            question: "How many keys are there in the music?",
            options: [7, 10, 12, 24, 6],
            answer: 3,
            image: "assets/images/musickeys.jpg"
        }
    ]

    // Declare variables
    let correct = 0;
    let wrong = 0;
    let unanswer = 0;
    let index = 0;
    let timer = 10;
    let guess = "";
    let item;
    let clock;

    // Start game
    $("#replay").hide()
    $("#start").on("click", function () {
        $("#start").hide();
        runTimer();
        loadQuestion();
    });

    // Load question to page
    function loadQuestion() {
        $("#answer").empty();
        item = trivia[index];
        index++;
        $("#question").html("<h3>" + item.question + "</h3>");
        for (let i = 0; i < item.options.length; i++) {
            let answerOptions = $('<button data-target="#popMessage">');
            answerOptions.addClass("guess");
            answerOptions.html(item.options[i]);
            answerOptions.val(i);
            $("#answer").append(answerOptions);
            $("#message").empty();
        }

        // When player choose answer
        $(".guess").on("click", function () {
            guess = Number.parseInt($(this).val());
            if (guess === item.answer) {
                stopTimer();
                correct++;
                guess = "";
                $("#message").text("Correct!");
                showScores();
            } else {
                stopTimer();
                wrong++;
                guess = "";
                $("#message").text("Wrong!");
                showScores();
            }
        });
    }

    // Timer settings
    function setTimer() {
        $("#timer").html("<p>Time remaining: " + timer + "</p>");

        timer--;
        if (timer < 0) {
            stopTimer();
            unanswer++;
            $("#answer").html("<h4>Time is up! The correct answer is: " + item.options[item.answer] + "</h4>");
            showScores();
        }
    }

    function runTimer() {
        clock = setInterval(setTimer, 1000);
    }

    function stopTimer() {
        clearInterval(clock);
    }

    // Display scores
    function showScores() {
        setTimeout(function () {
            $("#answer").empty();
            timer = 10;
            if (wrong + correct + unanswer === trivia.length) {
                $("#question").empty();
                $("#timer").empty();
                $("#message").empty();
                $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answer").append("<h4> Correct: " + correct + "</h4>");
                $("#answer").append("<h4> Incorrect: " + wrong + "</h4>");
                $("#answer").append("<h4> Unanswered: " + unanswer + "</h4>");
                $("#replay").show();
                correct = 0;
                wrong = 0;
                unanswer = 0;
            } else {
                runTimer();
                loadQuestion();
            }
        }, 2000);
    }

    // Replay game again
    $("#replay").on("click", function(){
        $("#replay").hide();
        runTimer();
        $("question").empty();
        index = 0;
        loadQuestion();
    })
});

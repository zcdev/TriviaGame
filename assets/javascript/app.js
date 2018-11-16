$(document).ready(function () {
    // List all trivia questions
    const trivia = [
        {
            question: "How many legs does a spider have?",
            options: [6, 8, 4, 10],
            answer: 1,
            image: "https://media.giphy.com/media/rAbKGNGM99DBC/giphy.gif"
        },
        {
            question: "How many rings make up the symbol of the Olympic Games?",
            options: [12, 10, 8, 6, 5],
            answer: 4,
            image: "https://media.giphy.com/media/26ufmepVftH5Y2V7q/giphy.gif"
        },
        {
            question: "How many grams are there in a kilogram?",
            options: [100, 10, 1000],
            answer: 2,
            image: "https://media.giphy.com/media/l44Qj5UpKZaR5jrPy/giphy.gif"
        },
        {
            question: "How many lungs do humans normally have?",
            options: [1, 2, 0],
            answer: 1,
            image: "https://media.giphy.com/media/l4Ep98nbQvNj9sN0I/giphy.gif"
        },
        {
            question: "What’s the total number of dots on a pair of dice?",
            options: [32, 42, 26, 38],
            answer: 1,
            image: "https://media.giphy.com/media/5T0klia2LqiIPM87lt/giphy.gif"
        },
        {
            question: "How many sides does an octagon have?",
            options: [6, 9, 5, 10, 8],
            answer: 4,
            image: "https://media.giphy.com/media/l0Nvr0QqmtpiizdhC/giphy.gif"
        },
        {
            question: "How many keys are there in the music?",
            options: [7, 10, 12, 24, 6],
            answer: 3,
            image: "https://media.giphy.com/media/TM9YFrIGikk80/giphy.gif"
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
    $("#replay").hide();
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
            let answerOptions = $("<button>");
            answerOptions.addClass("guess");
            answerOptions.html(item.options[i]);
            answerOptions.val(i);
            $("#answer").append(answerOptions);
        }

        // When player choose answer
        $(".guess").on("click", function () {
            guess = Number.parseInt($(this).val());
            if (guess === item.answer) {
                stopTimer();
                correct++;
                guess = "";
                $("#answer").html("<p>Correct!</p>");
                showScores();
            } else {
                stopTimer();
                wrong++;
                guess = "";
                $("#answer").html("<p>Wrong! The correct answer is: " + item.options[item.answer] + "</p>");
                $("#answer").append("<img src="+ item.image + ">");
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
            $("#answer").html("<p>Time is up! The correct answer is: " + item.options[item.answer] + "</p>");
            $("#answer").append("<img src="+ item.image + ">");
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
                $("#question").html("<h3>GAME OVER!  Here's how you did: </h3>");
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
        }, 3000);
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

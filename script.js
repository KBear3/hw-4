var body = document.body;

var h1El = document.getElementById("jumboHead");
var jumbo = document.getElementById("myJumbo");
var buttonTostrt = document.getElementById("buttonTostrt");
var main = document.getElementById("main");
var timer = document.getElementById("timer");
var scores = document.getElementById("scores");
var formSubmit = document.getElementById("formSubmit");
var resultsPage = document.getElementById("results");

var form = document.createElement("form");
var label = document.createElement("label");
var input = document.createElement("input");
var submit = document.createElement("input");
var div = document.createElement("div");

h1El.textContent = "> Coding Quiz";
jumbo.textContent = "This test will have three questions. you will have 30 seconds to answer. A wrong answer will take off 3 seconds of your time. ";
buttonTostrt.textContent = "Start";
scores.textContent = " scores";
main.style.visibility = "hidden";
var userScore = 0;
var timeRem = 30;
var questionIndex = 0;
var correctAnswer = "";
var allUsers = []
var pastUsers = [];

initial();


var questions = [
    {
        question: "What is the name of the Washington Baseball team?",
        choices: [
            "Nationals",
            "Capitals",
            "Redskins",
            "Mystics",
        ],
        correct: "Nationals",
    },
    {
        question: "What kind of cat does Kyle have?",
        choices: [
            "Persian",
            "Tuxedo",
            "Siamese",
            "Russian Blue",
        ],
        correct: "Tuxedo",
    },
    {
        question: "What is the superior gaming system",
        choices: [
            "Xbox",
            "Playstation",
            "PPC Master Race",
            "Whatever you have fun with",
        ],
        correct: "Whatever you have fun with",
    },
    
]

function theQuestion() {
    var questionNow = questions[questionIndex];
    main.textContent = questionNow.question;
    
    for (var i = 0; i < questionNow.choices.length; i++) {
        
        var li = document.createElement("li");
        li.setAttribute("button-index", i);

        var button = document.createElement("button");
        button.textContent = questionNow.choices[i];

        li.appendChild(button);
        main.appendChild(li);
        
        console.log(li);

        correctAnswer = questionNow.correct;

        console.log(questionIndex);
    }
}

function quizStart() {
    buttonTostrt.style.visibility = "hidden";
    main.style.visibility = "visible";
    getQuestion();
    setTime();
}

function setTime() {
    var timerInterval = setInterval(function() {
        timeRem--;
        timer.textContent = timeRem;

        if(timeRem < 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function timePenalty() {
    timeRem -= 3;
}

function attrs(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function endQuiz() {
    timer.style.visibility = "hidden";
    timeRem = 0;
    main.textContent = "> You scored " + userScore + "! Enter initials below.";

    attrs(label, {"for": "userInitials", "margin-top": "10px"});
    attrs(input, {"type": "text", "id": "userInitials", });
    attrs(submit, {"type": "submit", "value": "Submit"});

    main.appendChild(form)
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(submit);
}

main.addEventListener("click", function(event) {
    var element = event.target;
    var userClick = event.target.textContent;
    console.log(userClick);

    if (element.matches("button") === true && event.target.textContent === correctAnswer) {
        ++userScore;
        console.log(userScore);
        questionIndex++;
       
        if (questionIndex < 8) {
        getQuestion();
        }
        else {
            endQuiz();
        }
    }

    else {
        if (element.matches("button")) {
            --userScore;
            console.log(userScore);
            timeTakenoff();
            questionIndex++;
            if (questionIndex < 4) {
                getQuestion();
            }
            else {

                endQuiz();
            }
        }
    }
}
)

function initial() {
    var storedUsers = JSON.parse(localStorage.getItem("allUsers"));

    if (storedUsers !== null) {
        allUsers = storedUsers;
    }
    console.log(allUsers);
}


function recUsers() {
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

submit.addEventListener("click", function(event) {
    event.preventDefault();
    
   var user = {
       user: input.value,
       score: userScore,
   }
   console.log(user);
   if (user.user === "") {
       alert(" Enter your initials")
   }
    allUsers.push(user);
    recUsers();
    scores();
})

function scores() {
    timeRem = 0
    main.textContent = "leaderboard: ";
    var lastUser = JSON.parse(localStorage.getItem("allUsers"));
    console.log(lastUser);
    lastUser.sort((a, b) => a.score - b.score);
    lastUser.reverse();
    console.log(lastUser);
    for (var i = 0; i < allUsers.length; i++) {
        var div = document.createElement("div");
        var li = document.createElement("li");
        main.append(div);
        div.appendChild(li);
        li.textContent = "user: " + lastUser[i].user + " result: " + lastUser[i].score;
    }
}
//getting all required elements
var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = document.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var timeCount = quiz_box.querySelector(" .timer .timer_sec");
var timeLine = quiz_box.querySelector(".timer .time_line");

// start button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
    startTimer(30)
}

// exit button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

// continue button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
}

let timeValue = 30;
let que_count = 0;
let que_numb = 1;
let score = 0;
let counter;

var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 30;
    que_count = 0;
    que_numb = 1;
    score = 0;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload();
}


var next_btn = quiz_box.querySelector(".next_btn");
var bottom_ques_counter = quiz_box.querySelector(".total_que");

//if next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    } else {
        clearInterval(counter);
        showResultBox();
    }

}
//retreiving questions and options from array
function showQuestions(index) {
    var que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    //debugger;
    var option = option_list.querySelectorAll(".option");

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}

let checkIcon = '<span class="material-symbols-outlined" id="check"> done </span>';
let crossIcon = '<span class="material-symbols-outlined" id="cross"> close </span>';


function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    var allOptions = option_list.children.length;
    if (userAns == correctAns) {
        score += 1;
        console.log("Answer is correct");
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", checkIcon);
    } else {
        console.log("Answer is wrong");
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        //function timePenalty();


        //when answer is incorrect, correct answer is shown
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", checkIcon);
            };
        }

    }
    //disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}


function showResultBox() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    if (score > 3) {
        let scoreTag = '<span> CONGRATS! You got <p>' + score + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (score > 1) {
        let scoreTag = '<span> You got <p>' + score + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span> You got <p>'   + score +   '</p> out of <p>' + questions.length + ',Try again!</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "0";
            const allOptions = option_list.children.length;
            let correctAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show");
        }
    }
}


function timePenalty() {
    timeLine = - 10;
    timeCount.textContent = time;
}


function queCounter(index) {

    let totalQuesCountTag = '<span><p>' + index + '</p>of<P>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

//getting all required elements
var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = document.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");

// start button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
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

let que_count = 0;
let que_numb = 1;

var next_btn = quiz_box.querySelector(".next_btn");

//if next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
    } else {
        console.log("Questions completed");
    }
}
//retreiving questions and options from array
function showQuestions(index) {
    var que_text = document.querySelector(".que_text");
    var option_list = document.querySelector(".option_list");
    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    //var option = option_list.querySelectorAll(".option");
    //for (let i = 0; i < option.length; index++) {
    // option[i].setAttribute("onclick", "optionSelected(this)");
    //}
}

//function optionSelected(answer) {
// let userAns = answer.textContent;
//console.log(userAns);
//}

function queCounter(index) {
    var bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<P>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

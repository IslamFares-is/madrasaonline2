// Select Elements
let count = document.querySelector(".quiz-app .count span");
let quiz_container = document.querySelector(".quiz-container");
let submit_button = document.querySelector(".submit-button");
let right_answer_area = document.querySelector(".right");
let wrong_answer_area = document.querySelector(".wrong");
let total_result = document.querySelector(".mark");


let currentIndex = 0;
let n_right_ans_choosen = 0;
// create a function to get questions from JSON file
function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET",("questions.JSON"), true);
    myRequest.send();
    
    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 & this.status === 200) {
            let questions_object = JSON.parse(this.responseText)
            let q_count = questions_object.length
            count.textContent = q_count;
            
            // A function to create all questions with their answers
            create_question(questions_object)

            // when submitting the answers
            submit_button.addEventListener("click",()=>{
                show_results(questions_object, q_count);
            })
        }

    }
    
}

getQuestions();



// A function to create a question with answers
function create_question(obj) {

    for(let i = 0; i < obj.length; i++){
        let question_div = `<div class="quiz">
                <div class="question">
                    <h2>${obj[i].title}</h2>
                </div>
                <div class="answer">
                    <div> 
                        <span>a</span>
                        <input type = "radio" name = "answers_${i}" id="answer_1_${i}" data-answer = "${obj[i].answer_1}">
                        <label for = "answer_1_${i}"> ${obj[i].answer_1} </label>
                    </div>
                    <div>
                    <span>b</span> 
                        <input type = "radio" name = "answers_${i}" id="answer_2_${i}" data-answer = "${obj[i].answer_2}">
                        <label for = "answer_2_${i}"> ${obj[i].answer_2} </label>
                    </div>
                    <div>
                    <span>c</span> 
                        <input type = "radio" name = "answers_${i}" id="answer_3_${i}" data-answer = "${obj[i].answer_3}">
                        <label for = "answer_3_${i}"> ${obj[i].answer_3} </label>
                    </div>
                    <div>
                    <span>d</span> 
                        <input type = "radio" name = "answers_${i}" id="answer_4_${i}" data-answer = "${obj[i].answer_4}">
                        <label for = "answer_4_${i}"> ${obj[i].answer_4} </label>
                    </div>
                </div>
            </div>`
            quiz_container.innerHTML += question_div;
    }

}


// Submit function

function show_results(obj, count) {
    n_right_ans_choosen = 0;
    // loop on each question and then loop on each answer
    for(let i = 0; i < count; i++){
        let answers = Array.from(document.getElementsByName(`answers_${i}`));
        let selected_answer;

        for(let j = 0; j < answers.length; j++){
            if(answers[j].checked == true) {
                selected_answer = answers[j].dataset.answer;

                if(selected_answer == obj[i].right_answer) {
                    n_right_ans_choosen++;
                    answers[j].nextElementSibling.style.cssText = "background-color:rgb(2, 160, 118); color:white"
                } else if(answers[j].checked === true && selected_answer != obj[i].right_answer ) {
                    answers[j].nextElementSibling.classList.add("wrong-answer");
                }
            }
        }

    }
    right_answer_area.textContent = n_right_ans_choosen;
    wrong_answer_area.textContent = count - n_right_ans_choosen;
    total_result.textContent = `${n_right_ans_choosen} / ${count}`
}


// Select Elements
let count = document.querySelector(".count span");
let quiz_app = document.querySelector(".quiz-app");
let quiz_container = document.querySelector(".quiz-container");
let submit_button = document.querySelector(".submit-button");
let results_section = document.querySelector(".results");
let total_result = document.querySelector(".results .mark");
let total_result_hidden = document.querySelector(".hidden-results .mark");
let revise = document.querySelector(".revise");
let hidden_results = document.querySelector(".hidden-results");
let currentIndex = 0;
let n_right_ans_choosen = 0;



// create a function to get questions from JSON file
function getQuestions(){
    
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET","Unit2_1.JSON", true);
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
                quiz_app.classList.add("hide");
                results_section.classList.remove("hide");
                submit_button.classList.add("hide");
                
            })
            
            // revise button
            revise.addEventListener("click",()=>{
                quiz_app.classList.remove("hide");
                revise.classList.add("hide");
                results_section.classList.add("hide");
                hidden_results.classList.remove("hidden-results")
                total_result_hidden.textContent = total_result.textContent;
                let inputs = document.querySelectorAll("input");
                inputs.forEach((input)=>{
                    input.setAttribute("Disabled","diabled")
                })
            })
        }

    }
    
}

getQuestions();



// A function to create a question with answers
function create_question(obj) {

    for(let i = 0; i < obj.length; i++){
        let question_div = 
            `<div class="quiz">
                <div class="question">
                    <h4>${obj[i].title}</h4>
                </div>
                <div class="answer row">
                    <div class="col-12 col-md-6"> 
                        <input type = "radio" name = "answers_${i}" id="answer_1_${i}" data-answer = "${obj[i].answer_1}">
                        <label for = "answer_1_${i}"> <span>A</span> ${obj[i].answer_1} </label>
                    </div>
                    <div class="col-12 col-md-6"> 
                        <input type = "radio" name = "answers_${i}" id="answer_2_${i}" data-answer = "${obj[i].answer_2}">
                        <label for = "answer_2_${i}"> <span>B</span> ${obj[i].answer_2} </label>
                    </div>
                    <div class="col-12 col-md-6"> 
                        <input type = "radio" name = "answers_${i}" id="answer_3_${i}" data-answer = "${obj[i].answer_3}">
                        <label for = "answer_3_${i}"> <span>C</span> ${obj[i].answer_3} </label>
                    </div>
                    <div class="col-12 col-md-6"> 
                        <input type = "radio" name = "answers_${i}" id="answer_4_${i}" data-answer = "${obj[i].answer_4}">
                        <label for = "answer_4_${i}"> <span>D</span> ${obj[i].answer_4} </label>
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

            // check whether the answer is check or not
            if(answers[j].checked == true) {

                //  assign selected_answer to the value of the selected answer
                selected_answer = answers[j].dataset.answer;
                // check if the selected_answer is equal to the right answer from the object
                if(selected_answer == obj[i].right_answer) {
                    n_right_ans_choosen++;
                    answers[j].nextElementSibling.style.cssText = "background-color:rgb(2, 160, 118); color:white"
                } else if(answers[j].checked === true && selected_answer != obj[i].right_answer ) {
                    answers[j].nextElementSibling.classList.add("wrong-answer");
                }
            }
            // set backround to all right answers
            if(answers[j].dataset.answer == obj[i].right_answer) {
                answers[j].nextElementSibling.style.cssText = "background-color:rgb(2, 160, 118); color:white";
            } 
        }
    }
    total_result.textContent = `${n_right_ans_choosen} / ${count}`
}
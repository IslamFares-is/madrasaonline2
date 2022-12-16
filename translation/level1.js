let questions_section = document.querySelector(".translation-questions");
console.log(questions_section)
// create a function to get questions from JSON file
function getQuestions(){
    
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET","level1.JSON", true);
    myRequest.send();
    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 & this.status === 200) {
            let questions_object = JSON.parse(this.responseText)
            let q_count = questions_object.length
            
            // A function to create all questions with their answers
            create_question(questions_object)
        }

    }
    
}

getQuestions();



// A function to create a question with answers
function create_question(obj) {

    for(let i = 0; i < obj.length; i++){
        let question_div = 
            `<div class="question">
                <h5 class="p-3">${obj[i].title}</h5>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header text-center" id="flush-heading${i}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                            اظهار الترجمة
                            </button>
                        </h2>
                        <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">${obj[i].answer}</div>
                        </div>
                    </div>
                </div>
            </div>`
            questions_section.innerHTML += question_div;
    }

}

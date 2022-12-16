// Start_Customize ToDo List

let tasksContainer = document.querySelector(".tasks");
let input = document.querySelector("#input");
let add = document.querySelector("#add-button");
let date = document.querySelector(".date span");
let todo_btn = document.querySelector(".todo-btn");
let todo = document.querySelector(".todo");


let tasksArray = [];

if(localStorage.stored_tasks != null) {
    tasksArray = JSON.parse(localStorage.stored_tasks);
} 
getStorage();
add.addEventListener("click",()=>{
    
    if(input.value !== ""){
        taskOjbect(); // add task object to tasksArray
        input.value = ""; // to empty the input after clicking
    }
    
    
})



// create task objects
function taskOjbect(){
    let task = {
        id: Date.now(),
        title: input.value,
        completed: false
    }
    tasksArray.push(task)
    taskDiv(tasksArray)
    setStorage();
    
}

//create task div 
function taskDiv(task){
    // create the div that contains the task
    tasksContainer.innerHTML = '';
    task.forEach((task)=>{
        let div = document.createElement('div');
        div.classList.add("task");
        div.setAttribute("data-id", task.id);
        div.setAttribute("completed", task.completed)
        div.innerHTML = `
        <div class="bullet" ></div>
        <div class="write">
        <input type="text" name="taskValue" class="taskValue" value="${task.title}">
        <p class="dots">------------------------------</p>
        </div>
        <div class="delete">Delete</div>
        
        `
        tasksContainer.append(div)
    })
}

    
//set local storage
function setStorage(){
    window.localStorage.setItem("stored_tasks", JSON.stringify(tasksArray));
}

// get from local storage 
function getStorage(){
    if(localStorage.stored_tasks){
        let stored_data = JSON.parse(localStorage.stored_tasks);
        taskDiv(stored_data)
    }

}



// delete function and Highlight
tasksContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
        // function to remove from local storage
        remove_from_stroage(e.target.parentElement.getAttribute("data-id"))
    }

    if(e.target.classList.contains('bullet')){
        e.target.parentElement.classList.toggle('done');
        highlight_local_stroage(e.target.parentElement.getAttribute("data-id"))
        // function to toggle local storage
    }
    
    // if the current element is input
    if(e.target.classList.contains('taskValue')){
        // when the mouse leaves the input box
        e.target.addEventListener(("mouseout"),()=>{
        // update value in the local storage
            update(e.target.parentElement.parentElement.getAttribute("data-id"), e.target)
        })

    }
})

function remove_from_stroage(element){
    tasksArray = tasksArray.filter((task)=> task.id != element);
    setStorage();
}


// Done Function 
function highlight_local_stroage(element){

    for(let i = 0; i<tasksArray.length; i++){
        if(tasksArray[i].id == element){
            tasksArray[i].completed == false ? tasksArray[i].completed = true
            : tasksArray[i].completed = false
        }
    }
    setStorage()
    taskDiv(tasksArray)

}


// edit function
function update(element, input){

    for(let i = 0; i < tasksArray.length; i++){

        if(tasksArray[i].id == element) {
            tasksArray[i].title = input.value;
        }
        
    }
    setStorage()
    taskDiv(tasksArray)

}

// End_Customize ToDo List


// Start_Customize Pomodoro Timer
let pomodoro_btns = document.querySelectorAll(".type button");
let minutes = document.querySelector("#min");
let seconds = document.querySelector("#sec");
let start = document.querySelector(".pomodorobtns .start");
let reset = document.querySelector(".pomodorobtns .reset");
let audio_start = new Audio("sound.wav");
let audio_end = new Audio("sound.wav")

// toggle between pomodoro and the break
pomodoro_btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        pomodoro_btns.forEach((b)=>{
            b.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})

// making pomodoro timer

let myInterval;
start.addEventListener("click",()=>{
    minutes.setAttribute("readonly", "readonly");
    seconds.setAttribute("readonly", "readonly");
    let min = +minutes.value; // minutes as an integer
    let sec = +seconds.value; // seconds as an integer
    audio_start.play()
    if(start.innerHTML == "Start") {
        myInterval = setInterval(()=>{
            min < 10 ? minutes.value = 0 + String(min): minutes.value = String(min);
            sec < 10 ? seconds.value = "0" + String(sec) : seconds.value = String(sec);
            // seconds.value = String(sec);
            if(0< sec < 60) {
                // check that minutes are less than 60
                if(sec > 0) {
                    sec -= 1;
                } else if (sec == 0) {
                    if(min > 0) {
                        sec = 59;
                        min -= 1;
                    } else {
                        clearInterval(myInterval)
                        audio_end.play();
                        minutes.value = "";
                        seconds.value = "";
                        minutes.removeAttribute("readonly");
                        start.innerHTML = "Start"
                    }
                } 
    
            } else {
                clearInterval(myInterval)
                audio_end.play();
                minutes.value = "";
                seconds.value = "";
                minutes.removeAttribute("readonly");
                start.innerHTML = "Start"
            }
    
        }, 1000)

        start.innerHTML = "Stop";
    } else {
        clearInterval(myInterval);
        start.innerHTML = "Start"
    }
})

reset.addEventListener("click",()=>{
    clearInterval(myInterval)
    start.innerHTML = "Start";
    seconds.value = "";
    minutes.value = "";
    minutes.removeAttribute("readonly");
    seconds.removeAttribute("readonly");
})
// End_Customize Pomodoro Timer



// Start_When click on any class, increase the height of the container
let classes = document.querySelectorAll(".main-classes");
classes.forEach((c)=>{
    c.addEventListener("click",()=>{
        
        if(c.style.height != "190px") {
            c.style.height = "190px";
        } else {
            c.style.height = "60px";
        }
    })
})
// End_When click on any class, increase the height of the container

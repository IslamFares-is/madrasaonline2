// Start_When click on any unit, increase the height of the unit container
let playlist = document.querySelector(".playlist")
let playlistHead = document.querySelector(".playlist-head");
let units = document.querySelectorAll(".units-container > div");
let unitsTitle = document.querySelectorAll(".units-container > div .title");
let lessonsCount = document.querySelector(".lesson-count .count");
let titles = document.querySelectorAll(".units-container > div > a");
let iframes = document.querySelectorAll(".videos-iframes iframe");
let videoPlayer = document.querySelector(".video-section > div");
let optionTabs = document.querySelectorAll(".options button");
let videoSections = document.querySelectorAll(".sections > div");
lessonsCount.textContent = iframes.length;

for(let i = 0; i < units.length; i++){
    unitsTitle[i].addEventListener("click",()=>{
        if(units[i].style.height != "120px") {
            units[i].style.cssText = "height:120px;"
        } else {
            units[i].style.height = "60px";
        }
    })
}


// take the iframe from iframes container and display it on video section
for(let i = 0; i < titles.length; i++){

    titles[i].addEventListener("click",()=>{
        videoPlayer.innerHTML = "";
        videoPlayer.appendChild(iframes[i]);
        console.log(titles[i])
    })
}


// Customise option buttons to nav between sections.
optionTabs.forEach((tab)=>{
    tab.addEventListener("click",()=>{
        optionTabs.forEach((e)=>{
            e.classList.remove("active")
        })
        tab.classList.add("active")
        sectionContent()
    })
})

function sectionContent(){
    for(let i = 0 ; i < videoSections.length; i++){
        videoSections[i].classList.remove("active");
        if(optionTabs[i].classList.contains("active")){
            videoSections[i].classList.add("active")
        }
    }
}



// Responsive Playlist expands on medium and small screens
playlistHead.addEventListener("click",()=>{
    console.log(playlist.style.height)
    if(playlist.style.height != "300px") {
        playlist.style.height = "300px";
    } else  {
        playlist.style.height = "60px"
    }
})



// Games Section: Navigate between games
let games_display = document.querySelector(".games-section .game-display");
let drop_items_1 = document.querySelectorAll(".games-section .dropdown:nth-of-type(1) .dropdown-item");
let drop_items_2 = document.querySelectorAll(".games-section .dropdown:nth-of-type(2) .dropdown-item");
let drop_items_3 = document.querySelectorAll(".games-section .dropdown:nth-of-type(3) .dropdown-item");
let drop_items_4 = document.querySelectorAll(".games-section .dropdown:nth-of-type(4) .dropdown-item");
let drop_items_5 = document.querySelectorAll(".games-section .dropdown:nth-of-type(5) .dropdown-item");
let drop_items_6 = document.querySelectorAll(".games-section .dropdown:nth-of-type(6) .dropdown-item");
let unit1_games = document.querySelectorAll(".games-iframes .unit1-games iframe");
let unit2_games = document.querySelectorAll(".games-iframes .unit2-games iframe");
let unit3_games = document.querySelectorAll(".games-iframes .unit3-games iframe");
let unit4_games = document.querySelectorAll(".games-iframes .unit4-games iframe");
let unit5_games = document.querySelectorAll(".games-iframes .unit5-games iframe");
let unit6_games = document.querySelectorAll(".games-iframes .unit6-games iframe");

drop_items_1.forEach(function(di, index){
    di.addEventListener("click",()=>{
        games_display.innerHTML = "";
        games_display.append(unit1_games[index])
    })
})
drop_items_2.forEach(function(di, index){
    di.addEventListener("click",()=>{
        games_display.innerHTML = "";
        games_display.append(unit2_games[index])
    })
})
drop_items_3.forEach(function(di, index){
    di.addEventListener("click",()=>{
        games_display.innerHTML = "";
        games_display.append(unit3_games[index])
    })
})
drop_items_4.forEach(function(di, index){
    di.addEventListener("click",()=>{
        games_display.innerHTML = "";
        games_display.append(unit4_games[index])
    })
})
drop_items_5.forEach(function(di, index){
    di.addEventListener("click",()=>{
        games_display.innerHTML = "";
        games_display.append(unit5_games[index])
    })
})
drop_items_6.forEach(function(di, index){
    di.addEventListener("click",()=>{
        games_display.innerHTML = "";
        games_display.append(unit6_games[index])
    })
})




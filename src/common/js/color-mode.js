const mode_color = window.matchMedia('(prefers-color-scheme: dark)')
const mode = document.getElementById("color-mode")

let mode_name = "auto"

auto()

mode_color.addEventListener("change", auto);

function auto(){
    if(mode_name === "drak"){
        mode.classList.add("mode--dark")
    }else if(mode_name === "light"){
        mode.classList.remove("mode--dark")
    }else if(mode_name === "auto"){
        const auto_vale = mode_color.matches;
        console.log(auto_vale)
        if(auto_vale){
            mode.classList.add("mode--dark")
            console.log("auto--dark")
        }else{
            mode.classList.remove("mode--dark")
            console.log("auto--light")
        }
    };
}
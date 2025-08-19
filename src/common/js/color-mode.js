const mode = document.getElementById("color-mode")

let mode_name = "drak"


if(mode_name === "drak"){
    mode.classList.add("mode--dark")
}else if(mode_name === "light"){
    mode.classList.remove("mode--dark")
}else if(mode_name === "auto"){
    const modes = auto();
};

function auto(){
let mode_name = aaa;

    return(mode_name)
}
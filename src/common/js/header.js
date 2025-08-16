const menu = document.getElementById("menu");
const menu_box = document.getElementById("menu_box")
const header = document.getElementById("header");
let open = false;

menu.addEventListener("click",()=>{
    if(open === false){
        header.classList.remove("Close")
        open = true;
    }else{
        header.classList.add("Close")
        open = false;
    };
});
menu_box.addEventListener("click",()=>{
    if(open === false){
        header.classList.remove("Close")
        open = true;
    }else{
        header.classList.add("Close")
        open = false;
    };
});
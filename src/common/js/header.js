const menu = document.getElementById("menu");
const menu_box = document.getElementById("menu_box")
const header = document.getElementById("header");
let open = false;

//ハンバーガーメニューのボタン処理
menu.addEventListener("click",()=>{
    if(open === false){
        header.classList.remove("Close")
        open = true;
    }else{
        header.classList.add("Close")
        open = false;
    };

    change(open);
});

//メニューが開かれているとき、背景を押された場合の処理。
menu_box.addEventListener("click",()=>{
    if(open === false){
        header.classList.remove("Close")
        open = true;
    }else{
        header.classList.add("Close")
        open = false;
    };

    change(open);
});

//aria-labelとexpandedを変更する。
function change(open){
    if(open){
        menu.ariaLabel = "メニューを非表示にする";
    }else{
        menu.ariaLabel = "メニューを表示する";
    }
    menu.ariaExpanded = open;
}
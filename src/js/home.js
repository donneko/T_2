//取得
const val_max = document.getElementById("max-value");
const val_nal = document.getElementById("nal-value");
const val_min = document.getElementById("min-value");

//button
const bu_start = document.getElementById("start");
const bu_relode = document.getElementById("relode");

//変更NOW
const text_load = document.getElementById("text-lodes");





//始まる処理
function start(){
    const min = val_min.value;
    const max = val_max.value;
    const query = val_nal.value;

    const send = {
        min:min,
        max:max,
        query:query
    }

    const send_url = new URLSearchParams(send).toString();
    const url = `/index.html?${send_url}`;

    window.location.href = url;
}

//クリックイベント
bu_start.addEventListener("click",()=>{
    start()
})

//ここまで送信部分

//保存的


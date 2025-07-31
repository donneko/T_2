//取得
const val_max = document.getElementById("max-value");
const val_nal = document.getElementById("nal-value");
const val_min = document.getElementById("min-value");

//button
const bu_start = document.getElementById("start");
const bu_relode = document.getElementById("relode");

//変更NOW
const text_load = document.getElementById("text-lodes");

const version = ("0.1")//データの互換性をバージョンによって変わるかもなので、バージョン管理
const Storage_Key = ("KEY-MAIN")//メインのストレージのキー
const key_name =("KEY_TH")//子のキーの名前

const storedRaw = JSON.parse(localStorage.getItem(`${Storage_Key}`))
const Alldata_list = storedRaw ? storedRaw : null;

console.log(Alldata_list)

let Key_Number = (Alldata_list?.AllData_Number ?? 0)
console.log(Key_Number)

//初期
history();

//-------------------

//クリックイベント
bu_start.addEventListener("click",()=>{
    Key_Number++
    start(Key_Number,key_name)
    save()
})

//ここまで送信部分

//保存的
function save(){


        const data_list = {
            version:version,
            key_name:key_name,
            AllData_Number:Key_Number,
        };

        console.log(data_list);

        localStorage.setItem(Storage_Key,JSON.stringify(data_list));
        console.log(localStorage.getItem(Storage_Key))
    }

    //始まる処理
function start(name,key_name){
    const min = val_min.value;
    const max = val_max.value;
    const query = val_nal.value;

    const send = {
        min:min,
        max:max,
        query:query,
        Key_Number:name,
        Key_name:key_name,
    };

    const send_url = new URLSearchParams(send).toString();
    const url = `/index.html?${send_url}`;

    window.location.href = url;
}


function history(){

}
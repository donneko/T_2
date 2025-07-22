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
const Storage_Key = ("KEY-0001")//メインのストレージのキー
const key_name =("KEY_TH")//子のキーの名前

const Alldata_list = localStorage.getItem(`${Storage_Key}`)
let Key_Number = ((Alldata_list.data_list.AllData_Number)?? "?")


//始まる処理
function start(name){
    const min = val_min.value;
    const max = val_max.value;
    const query = val_nal.value;

    const send = {
        min:min,
        max:max,
        query:query,
        Key_Number:name,
    };

    const send_url = new URLSearchParams(send).toString();
    const url = `/index.html?${send_url}`;

    // window.location.href = url;
}

//クリックイベント
bu_start.addEventListener("click",()=>{
    Key_Number++
    start(Key_Number)
    save()
})

//ここまで送信部分

//保存的
    function save(){
        
        data_NameList.push

        const data_list = {
            version:version,
            key_name:key_name,
            AllData_Number:Key_Number,
        }

        console.log(data_list)
    }

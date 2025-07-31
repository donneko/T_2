//取得
const val_max = document.getElementById("max-value");
const val_nal = document.getElementById("nal-value");
const val_min = document.getElementById("min-value");

const historys = document.getElementById("history-body");

//button
const bu_start = document.getElementById("start");
const bu_relode = document.getElementById("relode");

const bu_resolve = document.querySelectorAll(".resolve")
const bu_detail = document.querySelectorAll(".detail")

//変更NOW
const text_load = document.getElementById("text-lodes");

const version = ("0.1") //データの互換性をバージョンによって変わるかもなので、バージョン管理
const Storage_Key = ("KEY-MAIN")    //メインのストレージのキー
const key_name =("KEY_TH")  //子のキーの名前

const storedRaw = JSON.parse(localStorage.getItem(`${Storage_Key}`))
const Alldata_list = storedRaw ? storedRaw : null;

console.log(Alldata_list)

let Key_Number = (Alldata_list?.AllData_Number ?? 0)
console.log(Key_Number)

//初期
history();
attachHistoryButtons();

//-------------------

//クリックイベント
bu_start.addEventListener("click",()=>{
    Key_Number++
    start(Key_Number,key_name)
    save()
});
bu_relode.addEventListener("click", () => {
  history();             // ① 作り直す
  attachHistoryButtons(); // ② もう一度装着 ←ココがポイント
});

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
    const url = `/generate.html?${send_url}`;

    window.location.href = url;
}


function history(){

    //リセット
    historys.innerHTML = "";

    //件数表示
    text_load.textContent = (`${Key_Number}件`);

    for(let i = 0;Key_Number > i;i++){
        
        const j = (i + 1)

        const stress = JSON.parse(localStorage.getItem(`${key_name}${j}`))
        const Problem_stress = stress ?? null;
        
        console.log(Problem_stress)

        const correct = Problem_stress?.correct_rate ?? null;
        console.log(correct)

        const error = (100 - correct).toFixed(1);
        const miss = Math.ceil(Number(error))
        const correc = Math.ceil(Number(correct))

        const utcDate =formatEpochJP(Problem_stress.date);
        console.log(formatEpochJP(Problem_stress.date));

        console.log(`${miss}:${correc}`)



        //設定
        let Miss_Bar_display;
        let Miss_Rate_display;
        let Correct_Bar_display;
        let Correct_Rate_display;
        let Miss_Rate_text;
        let Correct_Rate_text;
        let history_name;
        let color;
        let font_size;

        //名前の取得
        const name = Problem_stress?.name ?? null;
        if(name !== null){
            history_name = name;
            color = "var(--text-color-main)";
            font_size ="4em";
        }else{
            history_name = "【エラー！】タイトルのデータがありません。";
            color = "var(--bu-error-color)";
            font_size ="1.5em";
        };
        console.log(history_name)
        
        //ここでパーセンの表示
        if(correc === 0){
            Miss_Rate_text = (`ミス率:${error}%`)
            Correct_Bar_display = "none";
            Correct_Rate_display = "none";
            console.log(`${error}`)
        }else if(miss === 0){
            Miss_Bar_display = "none";
            Miss_Rate_display = "none";
            Correct_Rate_text = (`正答率:${correct}%`)
            console.log(`正答率を表示${correct}`)
        }else{
            Correct_Rate_text = (`正答率:${correct}%`)
            Miss_Rate_text = (`ミス率:${error}%`)
            console.log("ゼロではない")

        };
        if(correct === null){
            Miss_Rate_text = "【エラー！】データがありません。";
            console.log(`エラー、データがnullです。`)
        };

        //HTMLを組み立て
        const AddHtml =(`
                <div class="history--box">
                    <div class="history--date">
                        <p>${utcDate}</p>
                    </div>
                        <div>
                            <div class="history__title">
                                <div class="history__title--bu" id >
                                    <button class="resolve" data-index="${j}">もう一度解く</button>
                                    <button class="detail" data-index="${j}">詳細を見る</button>
                                </div>
                                <h3 style="color:${color};font-size:${font_size};">${history_name}</h3> 
                            </div>
                            <div class="ratio">
                                <div class="ratio--box">
                                    <div class="ratio__ratios">
                                        <span style="width:${correct}%;display:${Correct_Bar_display}"></span>
                                        <span style="width:${error}%;display:${Miss_Bar_display}"></span>
                                    </div>
                                    <div class="ratio__info">
                                        <p style="display:${Correct_Rate_display}">${Correct_Rate_text}</p>
                                        <p style="display:${Miss_Rate_display}">${Miss_Rate_text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `)


    historys.innerHTML +=AddHtml;
    };
};


// formatEpochJPはAIが作成。
function formatEpochJP(epoch, tz = 'Asia/Tokyo') {
    
    // 1) 10桁なら「秒」→「ミリ秒」にする
    const ms = epoch < 1e12 ? epoch * 1000 : epoch;

    // 2) Intl.DateTimeFormat の “部品取り” モードを作る
    const formatter = new Intl.DateTimeFormat('ja-JP', {
        timeZone : tz,          // ← これが変換の肝
        year     : 'numeric',
        month    : '2-digit',
        day      : '2-digit',
        hour     : '2-digit',
        minute   : '2-digit',
        hour12   : false        // 24時間固定
    });

    // 3) formatToParts で「year」「month」…を配列で受け取る
    //    [{type:'year', value:'2025'}, {type:'literal', value:'/'}, …]
    const parts = formatter.formatToParts(ms);

    // 4) literal（区切りの’/’等）を捨て → オブジェクト化 {year:'2025', ...}
    const map = Object.fromEntries(
                parts.filter(p => p.type !== 'literal')
                    .map(p => [p.type, p.value]));

    // 5) 好きな書式で連結して返す
    return `${map.year}年${map.month}月${map.day}日`
        + `${map.hour}時${map.minute}分`;
}
//attachHistoryButtonsはAI作成。
function attachHistoryButtons(){
    const bu_resolve = document.querySelectorAll(".resolve");
    const bu_detail  = document.querySelectorAll(".detail");

    bu_resolve.forEach(btn => {
        btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        window.location.href =
            "/solving.html?" + new URLSearchParams({ key_name:`${key_name}${index}`, request:"All" });
        });
    });

    bu_detail.forEach(btn => {
        btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        window.location.href =
            "/confirm.html?" + new URLSearchParams({ key_name:`${key_name}${index}` });
        });
    });
}
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

const version = ("1") //データの互換性をバージョンによって変わるかもなので、バージョン管理
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
    console.log("これこれこれお"+(val_min.value)*(val_max.value)*(val_nal.value));

    if( 0===(val_min.value)*(val_max.value)*(val_nal.value)){
        
        val_min.placeholder="0または空白は使用できません。";
        val_max.placeholder="0または空白は使用できません。";
        val_nal.placeholder="0または空白は使用できません。";

        val_min.style.setProperty("--inpot-pl-color","#da0303")
        val_max.style.setProperty("--inpot-pl-color","#da0303")
        val_nal.style.setProperty("--inpot-pl-color","#da0303")

        val_min.value="";
        val_max.value="";
        val_nal.value="";

    }else{

        val_min.placeholder="数値を入力";
        val_max.placeholder="数値を入力";
        val_nal.placeholder="数値を入力";

        val_min.style.setProperty("--inpot-pl-color","#898989")
        val_max.style.setProperty("--inpot-pl-color","#898989")
        val_nal.style.setProperty("--inpot-pl-color","#898989")
        
        
        if(val_nal.value >!0){
            Key_Number++
            start(Key_Number,key_name)
            save(Key_Number)
        }else{
            val_nal.placeholder="1以上の数値が必要";
            val_nal.style.setProperty("--inpot-pl-color","#da0303")

            val_nal.value="";
        }

    }

});
bu_relode.addEventListener("click", () => {
    history();
    attachHistoryButtons(); 
});

//保存的
function save(KeyNumber){


        const data_list = {
            version:version,
            key_name:key_name,
            AllData_Number:KeyNumber,
        };

        console.log(data_list);

        localStorage.setItem(Storage_Key,JSON.stringify(data_list));
        console.log(localStorage.getItem(Storage_Key))
}

console.log("これこれこれお"+(val_min.value)*(val_max.value)*(val_nal.value));


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
    const url = `generate.html?${send_url}`;

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
        if(Problem_stress !== null){
        console.log(Problem_stress)

        const correct = Problem_stress?.correct_rate ?? null;
        console.log(correct)

        const error = (100 - correct).toFixed(1);
        const miss = Math.ceil(Number(error))
        const correc = Math.ceil(Number(correct))

        const utcDate =formatEpochJP(Problem_stress.date ?? null);
        console.log(formatEpochJP(Problem_stress.date));

        console.log(`${miss}:${correc}`)

        const interference_set = 10;  //ラインをどれぐらいにじませるかの値
        const interference = ((interference_set/2) * (1-(Math.abs((correct/100)-(miss/100)))));



    //バーの色を変える。
    const bar = `linear-gradient(to right, var(--bu-answer-color) ${correc-(interference)}%, var(--bu-error-color) ${correc+(interference)}%)`;


        //設定
        let Miss_Rate_display;
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
        }else{
            history_name = "【エラー！】タイトルのデータがありません。";
            color = "var(--bu-error-color)";
            font_size ="1.5em";
        };
        console.log(history_name)


        //ここでパーセンの表示
        if(correc === 0){
            Miss_Rate_text = (`ミス率:${error}%`)
            Correct_Rate_display = "none";
            console.log(`${error}`)
        }else if(miss === 0){
            Miss_Rate_display = "none";
            Correct_Rate_text = (`正答率:${correct}%`)
            console.log(`正答率を表示${correct}`)
        }else{
             //エラー（例外）処理 NULLとか
            Correct_Rate_text = (`正答率:${correct}%`)
            Miss_Rate_text = (`ミス率:${error}%`)
            console.log("ゼロではない")
        };

        if((correct === null)||(correct === "NaN")){
            Miss_Rate_text = "【エラー！】データがありません。";
            console.log(`エラー、データがnullまたはnanです。`)
            Correct_Bar_display = "none";
            Miss_Bar_display = "none";
            Correct_Rate_display = "none";
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
                                        <span style="background:${bar};"></span>
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

        }else{
            console.log("【エラー】致命的なエラーが発生！！データを消去しないと行けないかも…。大丈夫！自動で解消されるよ！！")
            const index = (Key_Number -1)
            save(index)
            window.location.reload();
        }
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
            "solving.html?" + new URLSearchParams({ key_name:`${key_name}${index}`, request:"All" });
        });
    });

    bu_detail.forEach(btn => {
        btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        window.location.href =
            "confirm.html?" + new URLSearchParams({ key_name:`${key_name}${index}` });
        });
    });
}
//取得
const val_max = document.getElementById("max-value");
const val_nal = document.getElementById("nal-value");
const val_min = document.getElementById("min-value");

const historys = document.getElementById("history-body");

//button
const bu_start = document.getElementById("start");
const bu_reload = document.getElementById("reload");

const bu_resolve = document.querySelectorAll(".resolve")
const bu_detail = document.querySelectorAll(".detail")

//変更NOW
const text_load = document.getElementById("text-loads");

const VERSION = ("1") //データの互換性をバージョンによって変わるかもなので、バージョン管理
const ALL_DATA_KEY = ("KEY-MAIN")    //メインのストレージのキー
const CHILD_KEY_PREFIX =("KEY_TH")  //子のキーの名前

const storedAllDataRaw = JSON.parse(localStorage.getItem(ALL_DATA_KEY))
const storedAllData = storedAllDataRaw ? storedAllDataRaw : null;

let hasSeenHowTo=(storedAllData?.How_to_use ?? false)

let allDataWorking;
if (storedAllData === null) {
    saveAllData(0);
    const allDataFromStorage = (JSON.parse(localStorage.getItem(ALL_DATA_KEY)));
    allDataWorking = allDataFromStorage ? allDataFromStorage : null;
} else {
    allDataWorking = storedAllData;
}

const allData = allDataWorking;

console.log(allData)


let entryCount = (allData?.AllData_Number ?? 0);
console.log(entryCount)

//初期
renderHistory();
attachHistoryButtons();

//-------------------

//クリックイベント
bu_start.addEventListener("click",()=>{

    if( Number(val_min.value) === 0 || Number(val_max.value) === 0 || Number(val_nal.value) === 0){
        
        val_min.placeholder="0または空白は使用できません。";
        val_max.placeholder="0または空白は使用できません。";
        val_nal.placeholder="0または空白は使用できません。";

        val_min.style.setProperty("--input-pl-color","#da0303")
        val_max.style.setProperty("--input-pl-color","#da0303")
        val_nal.style.setProperty("--input-pl-color","#da0303")

        val_min.value="";
        val_max.value="";
        val_nal.value="";

    }else{

        val_min.placeholder="数値を入力";
        val_max.placeholder="数値を入力";
        val_nal.placeholder="数値を入力";

        val_min.style.setProperty("--input-pl-color","#898989")
        val_max.style.setProperty("--input-pl-color","#898989")
        val_nal.style.setProperty("--input-pl-color","#898989")
        
        
        if(Number(val_nal.value) > 0){
            entryCount++
            navigateToGenerate(entryCount,CHILD_KEY_PREFIX)
            saveAllData(entryCount)
        }else{
            val_nal.placeholder="1以上の数値が必要";
            val_nal.style.setProperty("--input-pl-color","#da0303")

            val_nal.value="";
        }

    }

});
bu_reload.addEventListener("click", () => {
    renderHistory();
    attachHistoryButtons(); 
});




//保存的
function saveAllData(KeyNumber){


        const data_list = {
            VERSION:VERSION,
            CHILD_KEY_PREFIX:CHILD_KEY_PREFIX,
            AllData_Number:KeyNumber,
            How_to_use:hasSeenHowTo ? hasSeenHowTo : false,
            };

        localStorage.setItem(ALL_DATA_KEY,JSON.stringify(data_list));
}



    //始まる処理
function navigateToGenerate(name,CHILD_KEY_PREFIX){
    const min = val_min.value;
    const max = val_max.value;
    const query = val_nal.value;

    const send = {
        min:min,
        max:max,
        query:query,
        Key_Number:name,
        Key_name:CHILD_KEY_PREFIX,
    };

    const send_url = new URLSearchParams(send).toString();
    const url = `generate.html?${send_url}`;

    window.location.href = url;
}


function renderHistory(){

    //リセット
    historys.innerHTML = "";

    if((hasSeenHowTo) === false ){
        //使い方等
        //【将来的なメモ】この方式だと、後々の拡張機能や保守性がないのかもしれない…

        const set_html1 = `
                <div class="history--box" id="farst">
                    <div class="first_time">
                        <div class="first_time__info">
                            <p>はじめてですか？</p>
                            <p>まずは使い方を見てみましょう！！</p>
                        </div>
                        <div class="first_time__button">
                            <a id="first_time" href="./site/info.html">使い方</a>
                            <button id="skip">スキップ</button>
                        </div>
                    </div>
                </div>`;

        historys.innerHTML += set_html1;

    }


    //件数表示
    text_load.textContent = (`${entryCount}件`);

    for(let i = 0;entryCount > i;i++){
        const j = (i + 1)

        const entryData = JSON.parse(localStorage.getItem(`${CHILD_KEY_PREFIX}${j}`))
        const problemEntry = entryData ?? null;
        if(problemEntry !== null){
        console.log(problemEntry)

        const correctRate = problemEntry?.correct_rate ?? null;
        console.log(correctRate)

        const missRateRaw = (100 - correctRate).toFixed(1);
        const missRate = Math.ceil(Number(missRateRaw))
        const correctRateRounded = Math.ceil(Number(correctRate))
        
        let createdAtJP ="データなし";
        if(problemEntry.date ?? null ==! null){
            createdAtJP =formatEpochJP(problemEntry.date);
        }

        console.log(`${missRate}:${correctRateRounded}`)

        const interference_set = 10;  //ラインをどれぐらいにじませるかの値
        const interference = ((interference_set/2) * (1-(Math.abs((correctRate/100)-(missRate/100)))));



        //バーの色を変える。
        const bar = `linear-gradient(to right, var(--bu-answer-color) ${correctRateRounded-(interference)}%, var(--bu-error-color) ${correctRateRounded+(interference)}%)`;


        //設定
        let Miss_Rate_display;
        let Correct_Rate_display;
        let Miss_Rate_text;
        let Correct_Rate_text;
        let history_name;
        let color;
        let font_size;

        //名前の取得
        const name = problemEntry?.name ?? null;
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
        if(correctRateRounded === 0){
            Miss_Rate_text = (`ミス率:${missRateRaw}%`)
            Correct_Rate_display = "none";
            console.log(`${missRateRaw}`)
        }else if(missRate === 0){
            Miss_Rate_display = "none";
            Correct_Rate_text = (`正答率:${correctRate}%`)
            console.log(`正答率を表示${correctRate}`)
        }else{
             //エラー（例外）処理 NULLとか
            Correct_Rate_text = (`正答率:${correctRate}%`)
            Miss_Rate_text = (`ミス率:${missRateRaw}%`)
            console.log("ゼロではない")
        };

        if((correctRate === null)||(Number.isNaN(correctRate))){
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
                        <p>${createdAtJP}</p>
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
            const index = (entryCount -1)
            saveAllData(index)
            window.location.reload();
        }
    };
};


const bu_skip = document.getElementById("skip")
const farst = document.getElementById("farst")
if(bu_skip){
    bu_skip.addEventListener("click",()=>{
        hasSeenHowTo = true
        saveAllData(entryCount)
        farst.style.display="none";
    })
}





// AIがさくせい、ここから
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
            "solving.html?" + new URLSearchParams({ key_name:`${CHILD_KEY_PREFIX}${index}`, request:"All" });
        });
    });

    bu_detail.forEach(btn => {
        btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        window.location.href =
            "confirm.html?" + new URLSearchParams({ key_name:`${CHILD_KEY_PREFIX}${index}` });
        });
    });
}
//ここまで。
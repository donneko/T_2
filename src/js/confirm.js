//取得

const Correct_Bar = document.getElementById("Correct-Bar");
const Miss_Bar = document.getElementById("Miss-Bar");

const Correct_Rate = document.getElementById("Correct-Rate");
const Miss_Rate = document.getElementById("Miss-Rate");

const BackToHome = document.getElementById("BackToHome");
const ViewTheIssue = document.getElementById("ViewTheIssue");

const history = document.getElementById("history")
const eend = document.getElementById("end")

const title = document.getElementById("title")

const requests =[]
//オブジェクト


//処理


//データーを取得する。
const data = set()
function set(){
    
    const parment = new URLSearchParams(window.location.search)

    const key = parment.get('key_name');
    const in_data = localStorage.getItem(key);
    const confirmation_data = JSON.parse(in_data);
    const key_data = confirmation_data ? confirmation_data : null;

    const save = {
        key_name:key_data?.key_name ?? null,
        date:key_data?.data ?? null, //日日
        correct_rate:key_data?.correct_rate ?? null, //正当率
        Response_rate:key_data?.Response_rate ?? null, //回答率
        Number_questions:key_data?.Number_questions ?? null, //問題数
        Problem_Answer:key_data?.Problem_Answer ?? null, //問題の答え
        Problem_Content:key_data?.Problem_Content ?? null, //問題の内容
        User_Answers:key_data?.User_Answers ?? null, //ユーザーの入力
    }

    return (save);
}
console.log(data)

set_title()
//タイトルの取得
function set_title(){
            //名前の取得
        const name = data?.name ?? null;
        if(name !== null){
            history_name = name;
            color = "var(--text-color-main)";
        }else{
            history_name = "【エラー！】タイトルのデータがありません。";
            color = "var(--bu-error-color)";
            font_size ="1.5em";
        };
        console.log(history_name);
        
        title.textContent=history_name;
        title.style.color =color;
        title.style.fontSize=font_size;
}

//バーの表示
set_ber(data.correct_rate)
function set_ber(correct){
    
    const error = (100 - correct).toFixed(1);
    const miss = Math.ceil(Number(error))
    const correc = Math.ceil(Number(correct))
    
    const interference_set = 10;  //ラインをどれぐらいにじませるかの値
    const interference = ((interference_set/2) * (1-(Math.abs((correct/100)-(miss/100)))));
    console.log(Math.abs(((correct/100)-(miss/100))))
    console.log((interference_set/2))
    console.log(interference)

    console.log(`${correc}:${miss}`);


    //バーの色を変える。
    Correct_Bar.style.background = `linear-gradient(to right, var(--bu-answer-color) ${correc-(interference)}%, var(--bu-error-color) ${correc+(interference)}%)`;

    //テキストの表示や非表示の処理
    if(correc === 0){
        Miss_Rate.textContent = (`ミス率:${error}%`)
        Correct_Rate.style.display = "none";
        console.log(`${error}`)
    }else if(miss === 0){
        Miss_Rate.style.display = "none";
        Correct_Rate.textContent = (`正答率:${correct}%`)
        console.log(`正答率を表示${correct}`)
    }else{
        //エラー（例外）処理 NULLとか
        Correct_Rate.textContent = (`正答率:${correct}%`)
        Miss_Rate.textContent = (`ミス率:${error}%`)
        console.log("ゼロではない")

    };

    if(correct === null){
        Miss_Rate.textContent = "【エラー！】データがありません。";
        console.log(`エラー、データがnullです。`)
    };
    
}

//HTMLに付いて

AddHtml()
function AddHtml(){
    const query = data.Number_questions;
    console.log(query)



        const AddContents = data.Problem_Content;

        AddContents.forEach((AddContent,i) =>{

        const AddAnswer = data?.Problem_Answer[i] ?? 0;
        const AddUser = data?.User_Answers[i] ?? 0;
        let color;
        if( Number(AddAnswer) === Number(AddUser)){
            color = "var(--bu-answer-color)";
        }else{
            color = "var(--bu-error-color)";
        }
        
        const AddToHtml= (`
            <div class="answer--box">
                <button class="retry--button" data-index="${i}">もう一度解く</button>
                <p style="color:${color};">${AddContent}=${AddUser}</p>
                <div class="answer__correct">
                    <div class="answer__correct--box">
                        <span>答え</span>
                        <p>${AddAnswer}</p>
                    </div>
                </div>
            </div>
        `);

        history.innerHTML += AddToHtml;

        })
};

//ここからもう一度解く処理
history.addEventListener("click", (e) => {
    if (e.target.classList.contains("retry--button")) {
        const index = e.target.dataset.index;
        requests.push(index)
        send(requests)
    }
});
//内容を見る
ViewTheIssue.addEventListener("click",()=>{
    const AddContents = data.Problem_Content;
    AddContents.forEach((e,i)=>{
        requests.push(i)
    })
    send("All")
});
//ホームに戻る
BackToHome.addEventListener("click",()=>{
    const url = `index.html`;
    window.location.href = url;
});
eend.addEventListener("click",()=>{
    const url = `index.html`;
    window.location.href = url;
});

//送信
function send(requests){

    let sese;
    if(requests === "All"){
        sese = "All"
    }else{
        sese = [...requests];
    }

    const send_data = {
        key_name:data.key_name,
        request:sese,
    };

    requests.length = 0;

    console.log(send_data.request);
    console.log(requests);

    const send_url = new URLSearchParams(send_data).toString();
    const url = `solving.html?${send_url}`;

    console.log(url);

    window.location.href = url;

}
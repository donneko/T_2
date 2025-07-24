//取得

const Correct_Bar = document.getElementById("Correct-Bar");
const Miss_Bar = document.getElementById("Miss-Bar");

const Correct_Rate = document.getElementById("Correct-Rate");
const Miss_Rate = document.getElementById("Miss-Rate");

const BackToHome = document.getElementById("BackToHome");
const ViewTheIssue = document.getElementById("ViewTheIssue");

const history = document.getElementById("history")
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
    }

    return (save);
}
console.log(data)

//バーの表示
set_ber(data.correct_rate)
function set_ber(correct){
    
    const error = (100 - correct)
    const miss = Math.ceil(Number(error))
    const correc = Math.ceil(Number(correct))
    
    Correct_Bar.style.width = (`${correct}%`);
    Miss_Bar.style.width = (`${error}%`)

    console.log(`${miss}:${correc}`)

    if(correc === 0){
        Miss_Rate.textContent = (`ミス率:${error}%`)
        Correct_Bar.style.display = "none";
        Correct_Rate.style.display = "none";
        console.log(`${error}`)
    }else if(miss === 0){
        Miss_Bar.style.display = "none";
        Miss_Rate.style.display = "none";
        Correct_Rate.textContent = (`正答率:${correct}%`)
        console.log(`正答率を表示${correct}`)
    }else{
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

        const AddAnswer = data.Problem_Answer[i];

        const AddToHtml= (`
            <div class="answer--box">
                <button class="retry--button" data-index="${i}">もう一度解く</button>
                <p>${AddContent}</p>
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
        send()
    }
});

//送信
function send(){

    const send_data = {
        key_name:data.key_name,
        request:0,
    }

    const send_url = new URLSearchParams(send_data).toString();
    const url = `/solving.html?${send_url}`;
    console.log(url)
    // window.location.href = url;

}
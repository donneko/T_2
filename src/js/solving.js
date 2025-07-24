        //  ここからボタン取得
        const eend = document.getElementById("end")
        const returnn = document.getElementById("return")
        const answer = document.getElementById("answer")
        const next = document.getElementById("next")
        const menu = document.getElementById("menu")

        //  ここから表示メッセージなどの取得
        const title = document.getElementById("title")
        const problem = document.getElementById("problem")
        const nu = document.getElementById("nu")

        // ここからユーザーの入力を取得
        const user_input = document.getElementById("user-input")


//初期
let query_th = 1

//Start
const data = set()
const data_query = data.request;
const data_key = data.key_name;
const data_list = data_set(data_key,data_query);
updata(data_list,query_th);


//関数達！！↓コードがかわいいいねえええええええええ
//だいすきいいいいいいい可愛い子供ねええねええええ
//キモすぎ１！👍
function set(){
    const parment = new URLSearchParams(window.location.search);

    const key_name = parment.get('key_name')
    const request = ((parment.get('request') ?? "").split(",").map(Number));

    const save = {
        key_name:key_name ?? null,
        request:request ?? null,
    }
    console.log(`【デバッグ】セーブ:${save}`);
    console.log(save);

    return(save);
}

function data_set(key,query){

    const data1 = localStorage.getItem(key);
    const data2 = JSON.parse(data1);
    const data3 = data2 ?? null;


    const data_two1 = data3?.Problem_Content ?? null;//問題の内容
    const data_three1 = data3?.User_Answers ?? null;//ユーザーの入力
    const data_four1 = data3?.Problem_Answer ?? null;//問題の答え

    const data_two2 = [];
    const data_three2 = [];
    const data_four2 = [];

    query.forEach((query,i) => {
        console.log(`【デバッグ】${i}回目のクエリ:${query}`)

        const content1 = data_two1[query];//問題の内容
        const content2 = data_three1[query];//ユーザーの入力
        const content3 = data_four1[query];//問題の答え

        data_two2.push(content1)//問題の内容
        data_three2.push(content2)//ユーザーの入力
        data_four2.push(content3)//問題の答え

    });
    const data_set = {
        Problem_Content:data_two2, //問題の内容
        User_Answers:data_three2, //ユーザーの入力
        Problem_Answer:data_four2, //問題の答え
    };

        console.log("===<データ>===")
        console.log(data_set)

    return (data_set)

    };

function updata(data,query){

    const th = (data.Problem_Content.length);
    const que = (query - 1);
    //テキスト変更

    nu.textContent = (`${th}/${query}`)
    problem.textContent = (`${data.Problem_Content[que]}=`);
    user_input.value =(`${data.User_Answers[que]}`)


    //ボタンの変更
    if(!((data +1)< th)){
        next.style.color = ("var(--bu-end-color)");
        next.style.borderColor = ("var(--bu-end-color)");
        next.style.backgroundColor = ("var(--bg-bu-color)");
        next.textContent ="終了";

    }
    if(!((data)> 0)){
        returnn.style.color = ("var(--bu-invalid-color)");
        returnn.style.borderColor = ("var(--bu-invalid-color)");
        returnn.disabled = true;
    }

};


    function anser(user,th){

        //↓ここで表示をユーザーの回答付きにする。
        problem.textContent = (`${data_list.Problem_Content[(th - 1)]}=${user}`);
        console.log((th - 1))
        if(data_list.Problem_Answer[(th - 1)] === user){
            problem.style.color = "var(--bu-answer-color)";
        }else{
            problem.style.color = "var(--bu-end-color)";
        }

    }

//キーによるイベント
    //終了
    eend.addEventListener("click",() =>{
        alert("未実装です。")
    })

    //次
    next.addEventListener('click',() => {
        if((query_th +1)< data_list.Problem_Content.length){
            query_th++;
            update(data_list,query_th);
        }else{
            //end();
            console.log("end")
        }
    });

    //戻る
    returnn.addEventListener('click',() => {
        if((query_th)> 0){
            query_th--;
            update(data_list,query_th);
        }
    });

    user_input.addEventListener("input",() => {
        if(user_input.value.trim() === ''){
            answer.style.color = ("var(--bu-invalid-color)");
            answer.style.borderColor = ("var(--bu-invalid-color)");
            answer.disabled = true;
        }else{
            answer.style.color = ("var(--bu-answer-color)");
            answer.style.borderColor = ("var(--bu-answer-color)");
            answer.disabled = false;
        };
    });

    //メニュー
    menu.addEventListener("click",()=>{
        alert("未実装です。")
    });
        //回答確認
    answer.addEventListener('click',() => {
        if(user_input.value !== ""){
            anser(Number(user_input.value),query_th);
        };
    });
    //エンターキーで回答確認
    user_input.addEventListener("keydown",(event) =>{
        if(event.key === "Enter" && user_input.value !== ""){
            anser(Number(user_input.value),query_th);
        }
    });


    //終了
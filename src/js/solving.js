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
const won_type = "数学";
const twe_type = "正負の数";
const user_input_value = [];
const user_answer_flag = [];

//Start
const data = set()
const data_queryy = data.request;
const data_key = data.key_name;
const [data_list,data_list2,data_query] = data_set(data_key,data_queryy);
ui_set(data_list,won_type,twe_type)
updata(data_list,query_th);


//関数達！！↓コードがかわいいいねえええええええええ
//だいすきいいいいいいい可愛い子供ねええねええええ
//キモすぎ１！👍

        //ジャンル
//------------------------------------------

//仕事がちゃんとできない、疲れてきた。
//最近良く眠れない、ちょっとつかれたし、もう転生したいな、
    // 初期設定（リストにデータを入れる）
    function ui_set(setting,won_type,twe_type){
        document.title=(`${won_type}・${twe_type}`)
        title.textContent=(`${won_type}・${twe_type}`)

        for(let i = 0; i < setting.Problem_Content.length;i++){
            user_input_value.push(null);
            user_answer_flag.push(false);
        }

        console.log(user_answer_flag);
        console.log(user_input_value);
    };



function set(){
    const parment = new URLSearchParams(window.location.search);

    const key_name = parment.get('key_name')

    let requests

    if((parment.get('request') ?? "") === "All"){
        requests ="All";
    }else{
        requests = ((parment.get('request') ?? "").split(",").map(Number));
    }
    const request = requests; 

    const save = {
        key_name:key_name ?? null,
        request:request ?? null,
    }
    
    console.log(`【デバッグ】セーブ:${save}`);
    console.log(save);

    return(save);
}

function data_set(key,queryy){

    const data1 = localStorage.getItem(key);
    const data2 = JSON.parse(data1);
    const data3 = data2 ?? null;


    const data_two1 = data3?.Problem_Content ?? null;//問題の内容
    const data_three1 = data3?.User_Answers ?? null;//ユーザーの入力
    const data_four1 = data3?.Problem_Answer ?? null;//問題の答え

    const data_two2 = [];
    const data_three2 = [];
    const data_four2 = [];

    let query;
    console.log(queryy)
    if(queryy === "All"){
        query = [];
        data_two1.forEach((e,i)=>{
            query.push(i);
        })
        console.log(`ALL:${query}`);
    }else{
        query = queryy;
        console.log(`指定:${query}`);
    };
    
    console.log(`回数:${query}`);

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

    
        console.log("===<データ>===")
        console.log(data3)

    return ([data_set,data3,query])

    };

function updata(data,query){

    const th = (data.Problem_Content.length);
    const que = (query - 1);
    //テキスト変更

    nu.textContent = (`${th}/${query}`)
    problem.textContent = (`${data.Problem_Content[que]}=`);
    user_input.value =(`${data.User_Answers[que]}`)

    //真ん中
    console.log(`【デバッグ】ユーザーの回答:${user_input_value[que]},入手する回答番号:${que};`)
    console.log(user_input_value)
        if(user_answer_flag[que] === true){
            //回答済み
            problem.textContent += (`${user_input_value[que]}`);

            console.log(`【デバッグ】正解:${data_list.Problem_Answer[(que)]},ユーザーの回答:${user_input_value[que]};`)
            if(Number(data_list.Problem_Answer[(que)]) === Number(user_input_value[que])){
                problem.style.color = "var(--bu-answer-color)";
            }else{
                problem.style.color = "var(--bu-end-color)";
            };

            user_input.value = user_input_value[que];
        }else{
            //回答していない
            problem.textContent = (`${data.Problem_Content[que]}=`);
            problem.style.color ="var(--text-color-main)";

            if(user_input_value[que] !== null){
                user_input.value = user_input_value[que];
            }else{
                user_input.value = "";
            }
        }


    //ボタンを変える処理
    if(!((que +1)< th)){
        updata_button(1,true);
    }else{
        updata_button(1,false);
    }
    if(!((que)> 0)){
        updata_button(2,true);
    }else{
        updata_button(2,false);
    }
    //回答部の最新を取得
    anser_button();

};
//隣のやつがうざい、まじでツンツンしないでほしい、きもすぎやろ(笑)
//コメ

function updata_button(af,at){
console.log(`【デバッグ--ボタン】af:${af},at:${at};`)
const ans_style = (answer.style);
const nex_style = (next.style);
const ret_style = (returnn.style)

    answer.disabled = true;
    ans_style.color = ("var(--bu-invalid-color)");
    ans_style.borderColor = ("var(--bu-invalid-color)");


    //ボタンの変更
    if(at === true && af === 1){
        nex_style.color = ("var(--bu-end-color)");
        nex_style.borderColor = ("var(--bu-end-color)");
        nex_style.backgroundColor = ("var(--bg-bu-color)");
        next.textContent ="終了";

    }else if(af === 1){
    nex_style.color = ("var(--text-color-next)");
    nex_style.borderColor = ("var(--bu-next-color)");
    nex_style.backgroundColor = ("var(--bu-next-color)");
    next.textContent = "次へ";
    };
    if(at === true && af === 2){
        ret_style.color = ("var(--bu-invalid-color)");
        ret_style.borderColor = ("var(--bu-invalid-color)");
        returnn.disabled = true;

    }else if(af === 2){
    ret_style.color = ("var(--text-color-main)");
    ret_style.borderColor = ("var(--bu-next-color)");
    returnn.disabled =false;

    };
};
function anser_button(){

        console.log(`【デバッグ--アンサーボタン】ユーザーの入力値:${(user_input_value[(query_th -1 )])},選択サれている番号:${(query_th -1 )};`)
        if(((user_input_value[(query_th -1 )]) === null) || (((user_input_value[(query_th -1 )]) === ""))){
            answer.style.color = ("var(--bu-invalid-color)");
            answer.style.borderColor = ("var(--bu-invalid-color)");
            answer.disabled = true;
        }else{
            answer.style.color = ("var(--bu-answer-color)");
            answer.style.borderColor = ("var(--bu-answer-color)");
            answer.disabled = false;
        };
}

//ユーザの回答付きにする。
function anser(user,th){

        //↓ここで表示をユーザーの回答付きにする。
        problem.textContent = (`${data_list.Problem_Content[(th)]}=${user}`);
        console.log((th));
        user_answer_flag.splice((th),1,true)

        if(data_list.Problem_Answer[(th)] === user){
            problem.style.color = "var(--bu-answer-color)";
        }else{
            problem.style.color = "var(--bu-end-color)";
        };

}


//------------------------------------------
    //回答を確認を作成
    //回答を確認を作成
    function end(){
        let anser_conp = 0;
        let ans_all= (data_list2.Number_questions);
        const User_in = data_list2.User_Answers

        const date = Date.now(); //日日の取得
        const key_name = data_list2.key_name; //キーの取得

        user_input_value.forEach((index,i)=>{

            User_in.splice(data_query[i],1,index);

        });

        User_in.forEach((index,i)=>{
            if(index === null){
                User_in.splice(i,1,'0');
            }else{
                User_in.splice(i,1,index);
            }
            if(Number(User_in[i]) === Number(data_list2.Problem_Answer[i])){
                anser_conp++
            }
        });


        let conp_pa = ((anser_conp / ans_all) * 100).toFixed(1);

        console.log(conp_pa)
        console.log(anser_conp)
        console.log(ans_all)



        const save = {
            key_name:key_name,
            date:date, //日日
            correct_rate:conp_pa, //正当率
            Response_rate:100, //回答率
            Number_questions:data_list2.Number_questions, //問題数
            Problem_Answer:data_list2.Problem_Answer, //問題の答え
            Problem_Content:data_list2.Problem_Content, //問題の内容
            User_Answers:User_in,
        };
        console.log(save);

        localStorage.setItem(key_name,JSON.stringify(save))

        const send = {
            key_name:key_name,
        }
        const send_url = new URLSearchParams(send).toString();
        const url = `confirm.html?${send_url}`;
        console.log(url)
        window.location.href = url;
    }




//キーによるイベント
//終了
eend.addEventListener("click",() =>{
            end();
})

//次
next.addEventListener('click',() => {

        if((query_th +1) <= data_list.Problem_Content.length){
            query_th++;
            updata(data_list,query_th);
        }else{
            //end();
            end();
        }
});

    //戻る
returnn.addEventListener('click',() => {
        if((query_th)> 0){
            query_th--;
            updata(data_list,query_th);
        }
});

    //回答ボタン
user_input.addEventListener("input",() => {
    user_input_value.splice((query_th -1 ),1,user_input.value)
    console.log(`【デバッグ--ボタン】:${user_input_value}:${user_input_value[(query_th -1 )]}:${(query_th -1 )}`);
    anser_button();
});
    //メニュー
menu.addEventListener("click",()=>{
        alert("未実装です。")
});
        //回答確認
answer.addEventListener('click',() => {
        if(user_input.value !== ""){
            anser(Number(user_input_value[(query_th -1 )]),(query_th -1 ));
        };
});
//エンターキーで回答確認
user_input.addEventListener("keydown",(event) =>{
        if(event.key === "Enter" && user_input_value[(query_th -1 )] !== ""){
            anser(Number(user_input_value[(query_th -1 )]),(query_th -1 ));
        }
});


    //終了
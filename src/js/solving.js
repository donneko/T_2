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
const query_th = 1

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

    }
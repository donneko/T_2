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


//Start
const data = set()
const data_list = data_set(data.key_name,data.request)
data_set(data_list)

//関数達！！↑コードがかわいいいねえええええええええ
//だいすきいいいいいいい可愛い子供ねええねええええ
//キモすぎ１！
function set(){
    const parment = new URLSearchParams(window.location.search);

    const key_name = parment.get('key_name')
    const request = parment.get('request')

    const save = {
        key_name:key_name ?? null,
        request:request ?? null,
    }
    return(save);
}
console.log(data);

function data_set(key,query){

    const data1 = localStorage.getItem(key);
    const data2 = JSON.parse(data1);
    const data3 = data2 ?? null;

    const data_two1 = data3.Problem_Content;//問題の内容
    const data_three1 = data3.User_Answers;//ユーザーの入力
    const data_four1 = data3.Problem_Answer;//問題の答え

    const data_two2 = [];
    const data_three2 = [];
    const data_four2 = [];

    query.forEach((query,i)=>{
        
        const b = query[i]
        const content1 = data_two1[b];//問題の内容
        const content2 = data_three1[b];//ユーザーの入力
        const content3 = data_four1[b];//問題の答え

        data_two2.push(content1)
        data_three2.push(content2)
        data_four2.push(content3)
        
    });

}

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


//関数達！！↑コードがかわいいいねえええええええええ
//だいすきいいいいいいい可愛い子供ねええねええええ
function set(){
    const parment = new URLSearchParams(window.location.search);

    const key_name = parment.get('key_name')
    const request = parment.get('request')

    const save = {
        key_name:key_name,
        request:request,
    }
    return(save);
}
console.log(data);

function data_set(){

}
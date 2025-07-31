        //  ここからボタン取得
        const eend = document.getElementById("end")
        const menu = document.getElementById("menu")
        //すべて昔のコードなので後で整理



// 問題設定用のオブジェクト
        const setting_in = {
            max: 100,
            min: -100,
            query: 2,
            typee:2,
            key:"local",
            key_name:"local"
        };
        const setting = set();

        //設定があるか確認
        function set(){
            const par = new URLSearchParams(window.location.search);
            
            const max = par.get('max');
            const min = par.get('min');
            const query = par.get('query');
            const key_name = par.get('Key_Number');
            const key_names = par.get("Key_name")

            let setting;
            // チェック
            if(max === null || min === null || query === null){
                setting = setting_in;
            }else{
                setting = {
                    max: Number(max),
                    min: Number(min),
                    query: Number(query),
                    typee: 2,
                    key: Number(key_name),
                    key_name: (key_names),
                };
            }
            console.log(setting);
            return setting;
        }
        console.log(setting);

        const prob = {
            1: "+",
            2: "-"
        }
        //問題のリスト
        let left_term = [];
        let right_term = [];
        let operator = [];
        let answers = [];
        let text = [];

        //ユーザーの移動のリスト
        let user_input_value = [];
        let user_answer = [];
        let user_onput_flag = [];
        //回答数
        let conten = 0;

        //ジャンル
        let won_type = "数学";
        let twe_type = "正負の数";

        sett()
        // 初期設定（リストにデータを入れる）
        function sett(){
            document.title=(`${won_type}・${twe_type}`)
            title.textContent=(`${won_type}・${twe_type}`)

            for(let i = 0; i < setting.query;i++){
                user_input_value.push(0);
                user_onput_flag.push(false)
                user_answer.push(false);
            }
        }
        console.log(user_answer);
        console.log(user_input_value);


        Generate(setting.max,setting.min,setting.query,setting.typee)
        //ここから、問題を生成する場所。
        function Generate(max,min,query,typee){
            for(let i = 0; i < query; i++){
                left_term.push(Math.round(Math.random() * (max - min) + min));
                right_term.push(Math.round(Math.random() * (max - min) + min));
                operator.push(Math.round(Math.random() * (typee - 1) + 1));
                
                text.push(`(${left_term[i]})${prob[operator[i]] ?? "?"}(${right_term[i]})`);

                //ここに回答を記録する。
                answers.push(eval(`${left_term[i]} ${prob[operator[i]]} ${right_term[i]}`));
            }
        }
        console.log(`左側の数値:${left_term}`)
        console.log(`右側の数値:${right_term}`)
        console.log(`演算子:${operator}`)
        console.log(`演算結果:${answers}`)
    end()
    //回答を確認を作成
    function end(){
        let anser_conp = 0;
        let ans_all= (user_input_value.length);
        let ans_ContAndUser = [];
        let User_in =[]

        const key_name = `${setting.key_name}${setting.key}`;

        for(let i = 0; i < ans_all;i++){
            
            ans_ContAndUser.push(`${text[i]}`);
            User_in.push(`${user_input_value[i]}`);

            if(user_input_value[i] === answers[i]){
                anser_conp++
            }
        };

        let conp_pa = ((anser_conp / ans_all) * 100).toFixed(1);
        const date = Date.now();

        const save = {
            key_name:key_name,
            date:date, //日日
            correct_rate:conp_pa, //正当率
            Response_rate:0, //回答率
            Number_questions:setting.query, //問題数
            Problem_Answer:answers, //問題の答え
            Problem_Content:ans_ContAndUser, //問題の内容
            User_Answers:User_in,
        };
        console.log(save);

        localStorage.setItem(key_name,JSON.stringify(save))

        const send = {
            key_name:key_name,
            request:"All",
        }
        const send_url = new URLSearchParams(send).toString();
        const url = `solving.html?${send_url}`;
        console.log(url)
        window.location.href = url;
    }



        //end
    eend.addEventListener("click",() =>{
        alert("未実装です。")
    })

    //メニュー
    menu.addEventListener("click",()=>{
        alert("未実装です。")
    });



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




        update(conten);

        function update(corrent_answer){

        const cunnt = (setting.query.toString().length);
        const text2 = ((corrent_answer + 1).toString().padStart(cunnt,"0"));
        const text3= (`${setting.query}/${text2}`);

        // テキストを変える

        if(user_answer[corrent_answer] === true){

            problem.textContent = (`${text[corrent_answer]}=${user_input_value[corrent_answer]}`);

            if(answers[corrent_answer] === user_input_value[corrent_answer]){
                problem.style.color = "var(--bu-answer-color)";
            }else{
                problem.style.color = "var(--bu-end-color)";
            };

            user_input.value = user_input_value[corrent_answer];
        }else{
            problem.textContent = (`${text[corrent_answer]}`);
            problem.style.color ="var(--text-color-main)";
            if(user_onput_flag[corrent_answer] === true){
                user_input.value = user_input_value[corrent_answer];
            }else{
                user_input.value = "";
            }
        }

        nu.textContent =text3;
        

        //ここからボタンの無効化
        //一度リセット
        answer.disabled = true;
        answer.style.color = ("var(--bu-invalid-color)");
        answer.style.borderColor = ("var(--bu-invalid-color)");
        next.style.color = ("var(--text-color-next)");
        returnn.style.color = ("var(--text-color-main)");
        next.style.borderColor = ("var(--bu-next-color)");
        returnn.style.borderColor = ("var(--bu-next-color)");
        next.style.backgroundColor = ("var(--bu-next-color)");
        next.textContent = "次へ";
        returnn.disabled =false;

        if(!((conten +1)< setting.query)){
            next.style.color = ("var(--bu-end-color)");
            next.style.borderColor = ("var(--bu-end-color)");
            next.style.backgroundColor = ("var(--bg-bu-color)");
            next.textContent ="終了";
        }else if(!((conten)> 0)){
            returnn.style.color = ("var(--bu-invalid-color)");
            returnn.style.borderColor = ("var(--bu-invalid-color)");
            returnn.disabled = true;

        }
    }


    // 次へ・戻る処理
    //次へ
    next.addEventListener('click',() => {
        if((conten +1)< setting.query){
            conten++;
            update(conten);
        }else{
            end();
        }
    });

    //戻る
    returnn.addEventListener('click',() => {
        if((conten)> 0){
            conten--;
            update(conten);
        }

    });

    //end
    eend.addEventListener("click",() =>{
        alert("未実装です。")
    })


    //回答確認
    answer.addEventListener('click',() => {
        if(user_input.value !== ""){
            anser(Number(user_input.value));
        };
    });
    //エンターキーで回答確認
    user_input.addEventListener("keydown",(event) =>{
        if(event.key === "Enter" && user_input.value !== ""){
            anser(Number(user_input.value));
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
            Response_rate:100, //回答率
            Number_questions:setting.query, //問題数
            Problem_Answer:answers, //問題の答え
            Problem_Content:ans_ContAndUser, //問題の内容
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

    //回答保存
    user_input.addEventListener('input',()=>{
        user_input_value.splice(conten ,1 ,Number(user_input.value))
        user_onput_flag.splice(conten,1,true)
        console.log(user_onput_flag)
    })

    function anser(user){

        //↓ここで表示をユーザーの回答付きにする。
        problem.textContent = (`${text[conten]}=${user}`);
        user_answer.splice(conten,1,true)

        if(answers[conten] === user){
            problem.style.color = "var(--bu-answer-color)";
        }else{
            problem.style.color = "var(--bu-end-color)";
        }

    }
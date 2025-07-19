        // // ここからボタン取得
        // const end = document.getElementById("end")
        const returnn = document.getElementById("return")
        const answer = document.getElementById("answer")
        const next = document.getElementById("next")
        // const menu = document.getElementById("menu")

        // // ここから表示メッセージなどの取得
        // const title = document.getElementById("title")
        const problem = document.getElementById("problem")
        const nu = document.getElementById("nu")

        // //ここからユーザーの入力を取得
        const user_input = document.getElementById("user-input")

        // 問題設定用のオブジェクト
        const setting = {
            max: 10,
            min: -10,
            query: 10000,
            typee:2
        };

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

        console.log(setting.query)

        set()
        // 初期設定（リストにデータを入れる）
        function set(){
            for(let i = 0; i < setting.query;i++){
                user_input_value.push(null);
                user_answer.push(false);
                console.log(i)
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

        //回答数
        let conten = 0;


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
            user_input.value = "";
        }

        nu.textContent =text3;
        

        //ここからボタンの無効化
        //一度リセット
        next.style.color = ("var(--text-color-next)");
        returnn.style.color = ("var(--text-color-main)");
        next.style.bordercolor = ("var(--bu-next-color)");
        returnn.style.borderColor = ("var(--bu-next-color)");
        next.style.backgroundColor = ("var(--bu-next-color)");


        if(!((conten +1)< setting.query)){
            next.style.color = ("var(--bu-invalid-color)");
            next.style.borderColor = ("var(--bu-invalid-color)");
            next.style.backgroundColor = ("var(--bg-bu-color)");

        }else if(!((conten)> 0)){
            returnn.style.color = ("var(--bu-invalid-color)");
            returnn.style.borderColor = ("var(--bu-invalid-color)");
            console.log((conten -1))

        }
    }


    // 次へ・戻る処理
    //次へ
    next.addEventListener('click',() => {
        if((conten +1)< setting.query){
            conten++;
            update(conten);
        }
    });

    //戻る
    returnn.addEventListener('click',() => {
        if((conten)> 0){
            conten--;
            update(conten);
        }

    });


    //回答確認
    answer.addEventListener('click',() => {
        anser(Number(user_input.value));
    });

    //回答保存
    user_input.addEventListener('input',()=>{
    user_input_value.splice(conten ,conten ,Number(user_input.value))
    })

    function anser(user){

        //↓ここで表示をユーザーの回答付きにする。
        problem.textContent = (`${text[conten]}=${user}`);
        user_answer.splice(conten,conten,true)

        if(answers[conten] === user){
            problem.style.color = "var(--bu-answer-color)";
        }else{
            problem.style.color = "var(--bu-end-color)";
        }

    }
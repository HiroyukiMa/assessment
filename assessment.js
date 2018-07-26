(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    function sindan(){ // function ()を() =>に書き換えることができるアロー関数と呼ぶ
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;
        }
       
        // 診断結果表示エリアの作成
        while (resultDivided.firstChild){
            resultDivided.removeChild(resultDivided.firstChild);
        }
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent(result) + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute ('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = result;
        tweetDivided.appendChild(anchor);
        
    }
    

    assessmentButton.onclick = sindan;


    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            sindan();
        }
    }


    const answers = [
        ' {userName}のいいところは声です。',
        ' {userName}のいいところは自制心です。',
        ' {userName}のいいところは情熱です。'
    ];
    /**
     * 名前を渡すと、診断結果を返す関数
     * @param {string} userName　ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName){
        // 入力された名前を数値に変換して、足し合わせる処理
        let sumOfCharCode = 0;
        for (let i = 0; i < userName.length; i++){
            sumOfCharCode += userName.charCodeAt(i);
        }

        // 文字コードの合計数を回答の配列の数で割った余りを求める
        const index = sumOfCharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);


        return result;
    }

    // テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しい'

    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しく'
    );

    console.log(assessment("太"));

    
})();

'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きい湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: '次のうち最初にリリースされた言語は?', c: ['Python', 'JavaScript', 'HTML']},
]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  

	
  function shuffle(arr) {
    //①配列arrの要素分から1を引くと、indexで最後の要素が選べる。
    //②iが0より大きい時まで繰り替えす
    //③iから1ずつ引いていく
    for(let i = arr.length - 1; i > 0; i--) {

        // 定数jに、ランダムな整数値iを代入 i + 1は配列内でのindex番号を獲得するため
        const j = Math.floor(Math.random() * (i + 1));

        // 分割代入を用いて配列最後の要素iと、ランダムに選ばれた変数jを入れ替える
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer (li) {
    // if (isAnswered === true) {
    if (isAnswered) {
        return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
        li.classList.add('correct');
        score++;
    } else {
        li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
        choices.removeChild(choices.firstChild);
    }

    const shuffleChoices = shuffle([...quizSet[currentNum].c]);
    shuffleChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => {
            checkAnswer(li);
        }); 
        choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
        btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) {
        return;
      }
      btn.classList.add('disabled');

      if (currentNum === quizSet.length - 1) {
        scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
        result.classList.remove('hidden');
      } else {
        currentNum++;
        setQuiz();
    }
});
}
const quiz = [
  {Q:'What is Mr. Krabs\' first name?', 
  1: 'Jeremy', 
  2: 'Eugene', 
  3: 'Gerald', 
  4: 'Pearl', 
  Answer: 'Eugene'},
  
  {Q:'What is Plankton\'s computer-wife\'s name?', 
  1: 'Carol', 
  2: 'Catherine', 
  3: 'Karen', 
  4: 'Christa', 
  Answer: 'Karen'},
  
  {Q:'What instrument does Squidward play?', 
  1: 'Flute', 
  2: 'Clarinet', 
  3: 'Saxophone', 
  4: 'Oboe', 
  Answer: 'Clarinet'},
  
  {Q:'Mr. Krabs\' house is a(n)...', 
  1: 'Rock', 
  2: 'Moai', 
  3: 'Pineapple', 
  4: 'Anchor', 
  Answer: 'Anchor'},
  
  {Q:'Plankton\'s favorite food is holographic what?', 
  1: 'Meatloaf', 
  2: 'Jellyfish', 
  3: 'Krabby Patties', 
  4: 'Pizza', 
  Answer: 'Meatloaf'},
  
  {Q:'What is inside of Davy Jone\'s locker?', 
  1: 'Treasure', 
  2: 'Coral', 
  3: 'Dumbbells', 
  4: 'Smelly Gym Socks', 
  Answer: 'Smelly Gym Socks'},
  
  {Q:'Which of these is NOT a characteristic of the Alaskan Bull Worm?', 
  1: 'Big', 
  2: 'Pink', 
  3: 'Hairy', 
  4: 'Scary', 
  Answer: 'Hairy'},
  
  {Q:'What U.S state is Sandy Cheeks from?', 
  1: 'Alabama', 
  2: 'Mississippi', 
  3: 'Missouri', 
  4: 'Texas', 
  Answer: 'Texas'},
  
  {Q:'What is the name of Plankton\'s restaurant?', 
  1: 'The Krusty Krab', 
  2: 'Weenie Hut', 
  3: 'The Chum Bucket', 
  4: 'The Salty Spitoon', 
  Answer: 'The Chum Bucket'},
  
  {Q:'During Spongebob\'s only pizza delivery, what drink did he forget to bring?', 
  1: 'Dr. Kelp', 
  2: 'Kelpa Cola', 
  3: 'Diet Kelp', 
  4: 'Diet Dr. Kelp', 
  Answer: 'Diet Dr. Kelp'}
];

let currentQuestionCounter = 0;
let correctAnswerCounter = 0;

function renderGreetingMessage() {
  $('.main').append(`
      <section class="main-greeting-box">
        <h2 class="greeting">Are you ready kids?!</div>
        <input type="button" class="begin-button" value="Aye Aye Captain!">
      </section>`);
}

function clearMain() {
  $('.main').empty();
}

function addCorrectChoice(quiz,i) {
  $('.main-form-box').append(`
  <input type="button" role="button" class="choice choice-unclicked correct" value="${quiz[currentQuestionCounter][i]}">`);
}

function addIncorrectChoice(quiz,i) {
  $('.main-form-box').append(`
  <input type="button" role="button" class="choice choice-unclicked incorrect" value="${quiz[currentQuestionCounter][i]}">`);
}

function checkIfCorrect(quiz,i) {
  if (quiz[currentQuestionCounter][i] === quiz[currentQuestionCounter].Answer) {
    addCorrectChoice(quiz,i);
  }
  else {
    addIncorrectChoice(quiz,i);
  }
}

function addChoices(quiz) {
  for (let i = 1; i <= 4; i++) {
    checkIfCorrect(quiz,i);
  }
}

function addBottomRowElements() {
  $('.main-form-box').append(`
    <div class="correct-counter">${correctAnswerCounter}/10 Correct</div>
    <div class="question-counter">Question ${currentQuestionCounter+1}</div>
    <input type="button" role="button" class="next-question-unclickable" value=" ">`);
}

function nextButtonClickable() {
  $('.next-question-unclickable').val('Next').toggleClass('next-question-clickable').toggleClass('next-question-unclickable');  
}

function incrementCurrentQuestionCounter() {
  currentQuestionCounter++;
}

function renderQuestion(quiz) {
  $('.main').append(`<form class="main-form-box">\
        <h2 class="question-box">${quiz[currentQuestionCounter].Q}</h2>\
        </form>`);
  addChoices(quiz);
  addBottomRowElements();
  incrementCurrentQuestionCounter();
}

function beginQuiz(quiz) {
  $('.begin-button').on('click', event => {
    clearMain();
    renderQuestion(quiz);
  });
}

function incrementCorrectAnswerCounter() {
  correctAnswerCounter++;
}

function correctAnswerClicked() {
  $('.main').on('click', '.correct', event => {
    $('.correct').toggleClass('correct-clicked').toggleClass('choice-unclicked').toggleClass('correct');
    $('.incorrect').toggleClass('incorrect-not-clicked').toggleClass('choice-unclicked').toggleClass('incorrect');
    incrementCorrectAnswerCounter();
    nextButtonClickable();
  });
}

function incorrectAnswerClicked() {
  $('.main').on('click', '.incorrect', event => {
    $(event.currentTarget).toggleClass('incorrect-clicked').toggleClass('choice-unclicked').toggleClass('incorrect');
    $('.correct').toggleClass('correct-not-clicked').toggleClass('choice-unclicked').toggleClass('correct');
    $('.incorrect').toggleClass('incorrect-not-clicked').toggleClass('choice-unclicked').toggleClass('incorrect');
    nextButtonClickable();
  });
}

function renderFinalScore() {
  correctPercent = correctAnswerCounter * 10;
  $('.main').append(`
      <section class="quiz-finished-box">
        <h2 class="finished-message">You got ${correctPercent}% correct!</h2>
        <input type="button" class="restart-button" value="Let's do it again!">
      </section>`);
}

function restartQuiz(quiz) {
  $('.main').on('click', '.restart-button', event => {
    currentQuestionCounter = 0;
    correctAnswerCounter = 0;
    clearMain();
    renderQuestion(quiz);
  });
}

function goToNextQuestion(quiz) {
  $('.main').on('click', '.next-question-clickable', event => {
    clearMain();
    if (currentQuestionCounter < 10) {
      renderQuestion(quiz);
    }
    else {
      renderFinalScore();
    }
  });
}

function handleQuiz(quiz) {
  renderGreetingMessage();
  beginQuiz(quiz);
  correctAnswerClicked();
  incorrectAnswerClicked();
  goToNextQuestion(quiz);
  restartQuiz(quiz);
}

handleQuiz(quiz);
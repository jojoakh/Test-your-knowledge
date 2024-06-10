window.addEventListener('DOMContentLoaded', function() {
  // Elements from the HTML DOM
  const showRulesBtn = document.getElementById('show-rules-btn');
  const rulesContainer = document.getElementById('rules-container');
  const closeRulesBtn = document.getElementById('close-rules-btn');
  const startButton = document.getElementById('start-btn');
  const startSection = document.getElementById('start-section');
  const questionSection = document.getElementById('question-section');
  const questionElement = document.getElementById('question');
  const answersButtonsElement = document.getElementById('answers-buttons');
  const finalScoreContainer = document.getElementById('final-score-container');
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  const usernameSection = document.getElementById('username-section');
  const usernameInput = document.getElementById('username-input');
  const submitUsernameBtn = document.getElementById('submit-username-btn');

  // The Quiz variables
  let shuffledQuestions, timerId, currentQuestionIndex = 0, scores, time;
  let username = '';

  // Event listeners to the buttons
  showRulesBtn.addEventListener('click', displayRules);
  closeRulesBtn.addEventListener('click', closeRules);
  startButton.addEventListener('click', startQuiz);
  submitUsernameBtn.addEventListener('click', submitUsername);

  // Function to display the quiz rules container
  function displayRules() {
    rulesContainer.classList.remove('hide');
  }

  // Hides the rules container
  function closeRules() {
    rulesContainer.classList.add('hide');
  }
 

 // Starts the quiz
  function startQuiz() {
    // start the timer with 1-second intervals
    timerId = setInterval(timeTick, 1000);

    startButton.classList.add('hide');
    startSection.classList.add('hide');

    // Shuffle the questions to show randomly
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionSection.classList.remove('hide');
    finalScoreContainer.innerHTML = '';
    scores = 0;
    time = 10;
    nextQuestion();
  }

  // Display next question
  function nextQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
      endQuiz();
    } else {
      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
  }

  // Display question and the options
  function showQuestion(question) {
    questionElement.innerText = question.question;
    answersButtonsElement.innerHTML = '';
    question.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('btn');

      // Mark the correct answer with data attribute
      if (option === question.answer) {
        button.dataset.correct = true;
      }
      button.addEventListener('click', selectAnswer);
      answersButtonsElement.appendChild(button);
    });
    answersButtonsElement.appendChild(timerElement);
    timerElement.textContent = `Time left: ${time} seconds`;
  }

  // Function to reset the quiz for the next question
  function resetQuiz() {
    clearStatusClass(document.body);
    while (answersButtonsElement.firstChild) {
      answersButtonsElement.removeChild(answersButtonsElement.firstChild);
    }
   
  }

  // Handle answer selection
  function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(document.body, correct);

    if (correct) {
      selectedButton.style.backgroundColor = 'green';
      scores++;
    } else {
      selectedButton.style.backgroundColor = 'red';
    }

    Array.from(answersButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = 'green';
      }
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++;
      setTimeout(nextQuestion, 1000);
      time = 10;
    } else {
      setTimeout(endQuiz, 1000);
    }
  }

  // Set the status class based on the answer
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  // Handle username submission
  function submitUsername() {
    username = usernameInput.value.trim();
    if (username !== '') {
      displayFinalScore();
    } else {
      alert('Please enter a username to view your final score.');
    }
  }

  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerId);
    resetQuiz();
    questionSection.classList.add('hide');
    usernameSection.classList.remove('hide');
  }
// Display the final score and restart the quiz
  function displayFinalScore() {
    usernameSection.classList.add('hide');
    finalScoreContainer.innerHTML = '';
    finalScoreContainer.classList.remove('hide');
    const scoreMessage = document.createElement('div');
    scoreMessage.innerText = `Your final score is: ${scores}/${shuffledQuestions.length}`;
    scoreMessage.classList.add('final-score-message');
    finalScoreContainer.appendChild(scoreMessage);
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Quiz';
    restartButton.classList.add('btn', 'restart-btn');
    restartButton.addEventListener('click', startQuiz);
    finalScoreContainer.appendChild(restartButton);
  }

  
   // Timer countdown
  function timeTick() {
    time--;
    timerElement.textContent = `Time left: ${time} seconds`;
    if (time <= 0) {
      endQuiz();
    }
  }

  // Quiz questions 
  let questions = [
    {
      question: "Which country has the longest coastline in the world?",
      answer: "Canada",
      options: ["China", "Mexico", "Kenya", "Canada"]
    },
    {
      question: "In which UK city would you find the river Clyde?",
      answer: "Glasgow",
      options: ["Bristol", "London", "Glasgow", "Plymouth"]
    },
    {
      question: "What is the currency of Sweden?",
      answer: "Krona",
      options: ["Pound", "Dirham", "Dollar", "Krona"]
    },
    {
      question: "Constantinople and Byzantium are former names of which major city?",
      answer: "Istanbul",
      options: ["Istanbul", "USA", "Stockholm", "Poznan"]
    },
    {
      question: "Which continent is in all four hemispheres?",
      answer: "Africa",
      options: ["America", "Europe", "Africa", "Asia"]
    },
    {
      question: "What percentage of the River Nile is located in Egypt?",
      answer: "22 percent",
      options: ["22 percent", "18 percent", "28 percent", "12 percent"]
    }
  ];
});
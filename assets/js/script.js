window.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-btn');
  const questionSection = document.getElementById('question-section');
  const questionElement = document.getElementById('question');
  const answersButtonsElement = document.getElementById('answers-buttons');
  const nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  nextButton.classList.add('hide');
  const timerElement = document.createElement('div'); // Create a new element to display the timer
  timerElement.classList.add('timer'); // Add a class for styling

  let shuffledQuestions, timerId, currentQuestionIndex = 0, time = 60; // Set the initial time to 60 seconds

  startButton.addEventListener('click', startQuiz);

  function startQuiz() {
    timerId = setInterval(clockTick, 1000); // Start the timer
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionSection.classList.remove('hide');
    nextQuestion();
  }

  function nextQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
      endQuiz(); // Call the endQuiz function when there are no more questions
      return;
    }
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    answersButtonsElement.innerHTML = '';
    question.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('btn');
      if (option === question.answer) {
        button.dataset.correct = true;
      }
      button.addEventListener('click', selectAnswer);
      answersButtonsElement.appendChild(button);
    });
    answersButtonsElement.appendChild(nextButton);
    answersButtonsElement.appendChild(timerElement); // Append the timer element to the answersButtonsElement
    timerElement.textContent = `Time left: ${time} seconds`; // Display the initial time
  }

  function selectAnswer(element) {
    const selectedButton = element.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);

    Array.from(answersButtonsElement.children).forEach(button => {
      button.classList.add('hide');
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      endQuiz(); // Call the endQuiz function when there are no more questions
    }
  }

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
    time = 60; // Reset the timer when moving to the next question
  });

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

  function clockTick() {
    time--;
    timerElement.textContent = `Time left: ${time} seconds`; // Update the timer display
    if (time <= 0) {
      endQuiz();
    }
  }

  function endQuiz() {
    clearInterval(timerId); // Stop the timer
    resetState(); // Call the resetState function to reset the quiz state
    // Add any additional logic you need to handle the end of the quiz
  }

  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answersButtonsElement.firstChild) {
      answersButtonsElement.removeChild(answersButtonsElement.firstChild);
    }
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }

 
});
  // Quiz questions defined here
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

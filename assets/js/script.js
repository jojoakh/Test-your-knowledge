window.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-btn');
  const questionSection = document.getElementById('question-section');
  const questionElement = document.getElementById('question');
  const answersButtonsElement = document.getElementById('answers-buttons');
  const finalScoreContainer = document.getElementById('final-score-container'); // Add a new container for the final score
  
  const timerElement = document.createElement('div'); 
  timerElement.classList.add('timer'); 
  
  let shuffledQuestions, timerId, currentQuestionIndex = 0, scores = 0, time = 10; // Set the initial time to 10 seconds

  startButton.addEventListener('click', startQuiz);

  function startQuiz() {
    timerId = setInterval(timeTick, 1000); // Start the timer
    startButton.classList.add('hide'); // Hide the start button
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Shuffle the questions
    currentQuestionIndex = 0; // Reset the question index
    questionSection.classList.remove('hide'); // Show the question section
    finalScoreContainer.innerHTML = ''; // Clear previous final score
    scores = 0; // Reset the scores
    time = 10; // Reset the timer
    nextQuestion(); // Show the next question
  }

  function nextQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
      endQuiz(); // Call the endQuiz function when there are no more questions
      return;
    }
    showQuestion(shuffledQuestions[currentQuestionIndex]); // Show the next question
  }

  function showQuestion(question) {
    questionElement.innerText = question.question; // Set the question text
    answersButtonsElement.innerHTML = ''; // Clear previous answers
    question.options.forEach(option => {
      const button = document.createElement('button'); // Create a button for each option
      button.innerText = option; // Set the button text
      button.classList.add('btn'); // Add the 'btn' class to the button
      if (option === question.answer) {
        button.dataset.correct = true; // Mark the correct answer
      }
      button.addEventListener('click', selectAnswer); // Add click event listener
      answersButtonsElement.appendChild(button); // Add button to the answers container
    });
    
    answersButtonsElement.appendChild(timerElement); // Append the timer element to the answers container
    timerElement.textContent = `Time left: ${time} seconds`; // Display the initial time
  }

  function resetQuiz() {
    clearStatusClass(document.body); // Clear status classes
    while (answersButtonsElement.firstChild) {
      answersButtonsElement.removeChild(answersButtonsElement.firstChild); // Remove previous answers
    }
    startButton.innerText = 'Restart'; // Set start button text to 'Restart'
    startButton.classList.remove('hide'); // Show the start button
  }

  function selectAnswer(event) {
    const selectedButton = event.target; // Get the clicked button
    const correct = selectedButton.dataset.correct === 'true'; // Check if the answer is correct
    setStatusClass(document.body, correct); // Set the status class

    if (correct) {
      selectedButton.style.backgroundColor = 'green'; // Correct answer is green
      scores++; // Increment score if the answer is correct
    } else {
      selectedButton.style.backgroundColor = 'red'; // Wrong answer is red
    }

    // Disable all buttons
    Array.from(answersButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === 'true') {
        button.style.backgroundColor = 'green'; // Correct answers are green
      }
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++; // Move to the next question
      setTimeout(nextQuestion, 1000); // Wait for 1 second before showing the next question
      time = 10; // Reset the timer for the next question
    } else {
      setTimeout(endQuiz, 1000); // End the quiz after a short delay
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element); // Clear previous status classes
    if (correct) {
      element.classList.add('correct'); // Add 'correct' class if the answer is correct
    } else {
      element.classList.add('wrong'); // Add 'wrong' class if the answer is wrong
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct'); // Remove 'correct' class
    element.classList.remove('wrong'); // Remove 'wrong' class
  }

  function endQuiz() {
    clearInterval(timerId); // Stop the timer
    resetQuiz(); // Reset the quiz state

    // Create a button to display the final score
    const scoreButton = document.createElement('button');
    scoreButton.innerText = `Your final score is: ${scores}/${shuffledQuestions.length}`;
    scoreButton.classList.add('btn', 'final-score-btn'); // Add classes to style the button

    // Append the score button to the final score container
    finalScoreContainer.appendChild(scoreButton);

    // Create the restart button
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Quiz';
    restartButton.classList.add('btn', 'restart-btn'); // Add classes to style the button
    restartButton.addEventListener('click', startQuiz); // Add click event listener to restart the quiz

    // Append the restart button to the final score container
    finalScoreContainer.appendChild(restartButton);
  }

  function timeTick() {
    time--; // Decrease the time by 1 second
    timerElement.textContent = `Time left: ${time} seconds`; // Update the timer display
    if (time <= 0) {
      endQuiz(); // End the quiz if time runs out
    }
  }

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
});

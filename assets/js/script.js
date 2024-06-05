window.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-btn'); 
    const questionSection = document.getElementById('question-section');
    const questionElement = document.getElementById('question');
    const answersButtonsElement = document.getElementById('answers-buttons');
    
  
    let shuffledQuestions,  currentQuestionIndex = 0;
  
    startButton.addEventListener('click', startQuiz);
  
    function startQuiz() {
      startButton.classList.add('hide');
      shuffledQuestions = questions.sort(() => Math.random() - .5);
      currentQuestionIndex = 0;
      questionSection.classList.remove('hide');
      nextQuestion();
    }
  
    function nextQuestion() {
      if (currentQuestionIndex >= shuffledQuestions.length) {
     resetState()
      }
      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
    
    
    function showQuestion(question) {
  questionElement.innerText = question.question;
  console.log(question)
  answersButtonsElement.innerHTML = '' 
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    if (option.correct) { // Use option.correct here
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answersButtonsElement.appendChild(button);
  });
}
   
   
    
    function selectAnswer(element) {
      const selectedButton = element.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  
  Array.from(answersButtonsElement.children).forEach(button => {
    button.classList.add('hide'); // Hide all buttons after selection
  });
  
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide'); // Show next button if more questions
  } else {
    // ... rest of your code to handle quiz end and restart button
   startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
    }

  
    // Quiz questions defined here
    let questions = [
      {
        question: "Which country has the longest coastline in the world?",
        answer: "Canada",
        options: ["China", "Mexico", "Kenya", "Canada"],
      },

      {
        question: "In which UK city would you find the river Clyde?",
        answer: "Glasgow",
        options: ["Bristol", "London", "Glasgow", "Plymouth"],
      },
     
      {
        question: "What is the currency of Sweden?",
        answer: "Krono",
        options: ["Pound", "Dirham", "Dollar", "Krono",],
      },

      {
        question: "Constantinople and Byzantium are former names of which major city?",
        answer: "Istanbul",
        options: ["Istanbul", "USA", "Stockholm","Poznam",],
      },

      {
        question: "Which continent is in all four hemispheres?",
        answer:"Africa",
        options: ["America", "Europe", "Africa","Asia",],
      },

      {
        question: "What percentage of the River Nile is located in Egypt?",
        answer:"22 percent",
        options: ["22 percent", "18 percent",  "28 percent","12 percent",],
      },
     
    ];
  });
  
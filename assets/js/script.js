window.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-btn'); // Line 1: Select start button
    const questionSection = document.getElementById('question-section');
    const answersButtonsElement = document.getElementById('answers-buttons');
    const questionElement = document.getElementById('question');
  
    let shuffledQuestions, currentQuestionIndex;
  
    startButton.addEventListener('click', startQuiz);
  
    function startQuiz() {
      console.log("started");
      startButton.classList.add('hide');
      shuffledQuestions = questions.sort(() => Math.random() - .5);
      currentQuestionIndex = 0;
      questionSection.classList.remove('hide');
      nextQuestion();
    }
  
    function nextQuestion() {
      if (currentQuestionIndex >= shuffledQuestions.length) {
        // Handle the end of the quiz
        console.log("Quiz finished!");
        return;
      }
      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
  
    function showQuestion(question) {
      questionElement.innerText = question.question;

      
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
  
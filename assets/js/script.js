const startButton = document.getElementById('start-btn')
const questionSection = document.getElementById('question-section')


startButton.addEventListener('click', startQuiz)

function startQuiz() {
    console.log("started")
    startButton.classList.add('hide')
    questionSection.classList.remove('hide')
    


    


}




const startButton = document.getElementById('start-btn')
const questionSection = document.getElementById('question-section')


startButton.addEventListener('click', startQuiz)

function startQuiz() {
    console.log("started")
    startButton.classList.add('hide')
    
    questionSection.classList.remove('hide')

}

let questions = [
    {
        question1  : `Which country has the longest coastline in the world?`,
        optionA  : "China",
        optionB : "Mexico",
        optionC : "Kenya",
        optionD : "Canada",
        answer : "Canada",
 },
   

    {
        question2  : `In which UK city would you find the river Clyde?`,
        optionA  : "Bristol",
        optionB : "London",
        optionC : "Glasgow",
        optionD : "Plymouth",
        answer : "Glasgow",
 },
 
 {
    question3  : `What is the currency of Sweden?`,
        optionA  : "Pound",
        optionB : "Dirham",
        optionC : "Dollar",
        optionD : "Krono",
        answer : "Krono",
 },

 {
    question4  : `Constantinople and Byzantium are former names of which major city?`,
        optionA  : "Istanbul",
        optionB : "USA",
        optionC : "Stockholm",
        optionD : "Poznam",
        answer : "Istanbul",
 },

 {
    question5  : `Which continent is in all four hemispheres?`,
    optionA  : "America",
    optionB : "Europe",
    optionC : "Africa",
    optionD : "Asia",
    answer : "Africa",
 },

 {
    question6  : `What percentage of the River Nile is located in Egypt?`,
    optionA  : "22 percent",
    optionB :  "18 percent",
    optionC :  "28 percent",
    optionD : "12 percent",
    answer :  "2 percent",
 }
    
]



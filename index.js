'use strict';

class Quiz{
  constructor(){
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
  }



  toggleActive() {
    this.active = !this.active;
  }

  changeScore(){
    score++;
  }
  
  getQuestions(){
    //something something TriviaAPI
  }


  questionController(){
    
    while (this.unasked.length !== 0){
    askQuestion()
    checkAnswer()

    }
  }

  askQuestion(){
    //CHANGE FOR RENDER
    let currentQuestion = this.unasked.pop();
    let answerChoices = [...currentQuestion.answers, currentQuestion.correctAnswer];
    console.log(currentQuestion.text);
    console.log(answerChoices);
    let answer = prompt('Your answer?' 0);
    checkAnswer(currentQuestion, answer)
    askQuestion();
  }

  checkAnswer(answer){
    let shortCheck = currentQuestion.answerStatus;
    if (shortCheck(answer) ===1){
      console.log('You are Correct')
      changeScore();
    } else if(shortCheck(answer)===0){
      console.log('YOU ARE SO WRONG!')
    } else console.log('Skipped');
  }




  reset(){
    this.asked=[];
    this.score = 0;
  }

}
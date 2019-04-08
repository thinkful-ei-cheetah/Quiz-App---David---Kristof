'use strict';

class Quiz{
  constructor(){
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.checkValue = null

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

  getUnaskedQuestions(){
    const questions = TriviaAPI.getQuestions;
    this.unasked.push(questions);
    }

  questionController(){
    toggleActive()
    while (this.unasked.length !== 0){
    askQuestion()
    promptUser()
    this.checkValue = checkAnswer(currentQuestion.userAnswer);
    }
    toggleActive()
  }

  promptUser(){
    currentQuestion.userAnswer = prompt('Your answer?' 0);
  }  
  askQuestion(){
    //CHANGE FOR RENDER
    let currentQuestion = this.unasked.pop();
    let answerChoices = [...currentQuestion.answers, currentQuestion.correctAnswer];
    console.log(currentQuestion.text);
    console.log(answerChoices);
    
  }

  logQuizResponse(answer){
    if (this.checkValue ===1){
      console.log('You are Correct')
      changeScore();
    } else if(this.checkValue ===0){
      console.log('YOU ARE SO WRONG!')
    } else console.log('Skipped');
  }

  reset(){
    this.asked=[];
    this.score = 0;
  }

}


class Question{
  constructor(text, answers, correctAnswer, userAnswer){
    this.text = '';
    this.answers = [];
    this.correctAnswer = '';
    this.userAnswer = '';
  }
  submitAnswer(answer){
    this.userAnswer = answer;
  }
  answerStatus(){
    if (this.userAnswer !== this.correctAnswer){
      return 0;
    }
    else if (this.userAnswer === this.correctAnswer){
      return 1;
    }
    else{
      return -1;
    }
  }
}

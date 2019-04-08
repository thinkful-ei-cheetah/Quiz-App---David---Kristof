'use strict';

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

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
  constructor(text, incorrect_answers, correct_answer){
    this.text = text;
    this.incorrectAnswers = incorrect_answers;
    this.correctAnswer = correct_answer;
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











class TriviaApi {
constructor(){
  this.allQuestions = [];
}

  errorHandler(response) {
    let error;
    if (!response.ok) {
      error.status = response.status;
      if (response.headers.get('Content-Type').includes('json')) {
        error.message = response.statusText;
        return Promise.reject(error);
      }
    }
    if (error) {
      error.message = response.message;
      return Promise.reject(error);
    }
    return response.json();
  }

  api() {
    console.log('hello');
    const BASE_URL = 'https://opentdb.com/api.php?amount=5';

    // function getQuestion() {
  
  fetch(`${BASE_URL}`)
      .then(this.errorHandler)
      .then(res => res.results.forEach(question => {
        this.allQuestions.push( new Question(question.question, question.incorrect_answers, question.correct_answer));
      }))
      .catch(e => console.log(e.message));
    // }
  }

}
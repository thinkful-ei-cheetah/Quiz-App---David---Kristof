'use strict';


class TriviaAPI {
  constructor(){
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

  static getQuestions() {

    const BASE_URL = 'https://opentdb.com/api.php?amount=5';
  
    return fetch(`${BASE_URL}`)
      .then(this.errorHandler)
      .then(res => res.json());
  
    //.then(this.errorHandler)
    // .then(res => res.results.forEach(question => {
    //allQuestions.push( new Question(question.question, question.incorrect_answers, question.correct_answer));
    // }))
    // .catch(e => console.log(e.message));
    // }
    
  }

}

class Quiz{
  constructor(){
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.checkValue = null;

  }

  toggleActive() {
    this.active = !this.active;
  }

  changeScore(){
    this.score++;
  }
  
  getQuestions(){
    //something something TriviaAPI
  }

  quizInitialize(){
    try{
      this.getUnaskedQuestions();
      this.toggleActive();
    } catch (e){
      console.log(e);
    }
  }

  getUnaskedQuestions(){
    return TriviaAPI.getQuestions()
      .then( questions => {
        questions.results.forEach(item=> {
          this.unasked.push(new Question(item.question, item.incorrect_answers, item.correct_answer));
        });
      })
      .then(()=>{
        this.questionController();
      });

    //this.unasked.push(...questions);
  }


  questionController(){
    while (this.unasked.length !== 0){
      this.askQuestion();
      this.promptUser();
    }
    this.toggleActive();
  }

  promptUser(){
    let chosenQuestion = this.asked[0];
    //HARD CODED
    chosenQuestion.userAnswer = chosenQuestion.incorrectAnswers[1];

    this.logQuizResponse(chosenQuestion.answerStatus());
    //console.log(this.asked[0])
  }  
  askQuestion(){
    //CHANGE FOR RENDER
    let currentQuestion = this.unasked.pop();

    let answerChoices = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  
    answerChoices = shuffle(answerChoices);

    console.log(currentQuestion.text);
    console.log(answerChoices);

    this.asked.push(currentQuestion);
  }

  logQuizResponse(checkValue){
    if (checkValue ===1){
      console.log('You are Correct');
      changeScore();
    } else if(checkValue ===0){
      console.log('YOU ARE SO WRONG!');
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

let x = new Quiz();

x.quizInitialize();
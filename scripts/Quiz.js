/* global Model, TriviaAPI */
'use strict';

/**
 * You can replace this Quiz with the version you worked on yesterday. It's just
 * provided as an example.
 */

class Quiz extends Model {          // eslint-disable-line no-unused-vars

  // This class property could be used to determine the no. of quiz questions
  // In later implementations, the user could provide a quiz length and override
  // static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();
    // Your Quiz model's constructor logic should go here. There is just examples below.
    this.active = false;
    this.questions = [{ id: 1, text: 'Question 1' }];
    this.unasked = [];
    this.asked = [];
    this.scoreHistory = [];
    this.score = null;
    this.currentState = 0;
    this.currentGrade = null;
  }


  quizInitialize() {
    this .toggleActive();
    this.getUnaskedQuestions()
      .catch (console.log);
  }

  toggleActive() {
    this.active = !this.active;
  }

  getUnaskedQuestions() {
    return TriviaAPI.getQuestions()
      .then(questions => {
        questions.results.forEach((item,index) => {
          this.unasked.push(new Question(item.question, item.incorrect_answers, item.correct_answer, index+1));
        });
      })
      .then(() => {
        this.currentState = 1;
        this.update();
      });

  }

  askNextQuestion(){
    //CHANGE FOR RENDER
    let currentQuestion = this.unasked[0];

    let answerChoices = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    this.currentState = 1;
    answerChoices = shuffle(answerChoices);

    return{
      text: currentQuestion.text,
      ansChoices: answerChoices,
      id: currentQuestion.id,
    };
  }

  checkAnswer(value){
    this.asked.unshift(this.unasked.shift());
    this.asked[0].userAnswer = value;
    if (this.asked[0].answerStatus()) this.score++;

    this.currentGrade = {
      text: this.asked[0].text,
      correct: this.asked[0].answerStatus(),
      correctAns: this.asked[0].correctAnswer,
      userAns: value
    };
    this.currentState = 2;
  }

  getFinalScore(){
    this.scoreHistory.push(this.score);
    const highScore= Math.max(...this.scoreHistory);
    this.toggleActive();


    return{
      thisHighest: this.score > highScore ? true : false,
      score: this.score,
      highScore,
    };
  }

  reset(){
    this.score = 0;
    this.asked= [];
  }
}





// class Quiz {
//   constructor() {
//     this.unasked = [];
//     this.asked = [];
//     this.score = 0;
//     this.scoreHistory = [];
//     this.active = false;
//     this.checkValue = null;

//   }

//   toggleActive() {
//     this.active = !this.active;
//   }

//   changeScore() {
//     this.score++;
//   }

//   quizInitialize() {
//     try {
//       this.toggleActive();
//       this.getUnaskedQuestions();
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   getUnaskedQuestions() {
//     return TriviaAPI.getQuestions()
//       .then(questions => {
//         questions.results.forEach((item,index) => {
//           this.unasked.push(new Question(item.question, item.incorrect_answers, item.correct_answer, index+1));
//         });
//       })
//       .then(() => {
//         this.questionController();
//       });

//     //this.unasked.push(...questions);
//   }


//   questionController() {
//     while (this.unasked.length !== 0) {
//       this.askQuestion();
//       this.promptUser();
//     }
//     this.toggleActive();
//   }

//   // promptUser() {
//   //   let chosenQuestion = this.asked[0];
//   //   //HARD CODED
//   //   chosenQuestion.userAnswer = chosenQuestion.incorrectAnswers[1];

//   //   this.logQuizResponse(chosenQuestion.answerStatus());
//     //console.log(this.asked[0])
  
//   askNextQuestion(){
//     //CHANGE FOR RENDER
//     let currentQuestion = this.unasked.pop();

//     let answerChoices = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];

//     function shuffle(a) {
//       for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//       }
//       return a;
//     }

//     answerChoices = shuffle(answerChoices);
//     this.asked.push(currentQuestion);

//     return{
//       text: currentQuestion.text,
//       ansChoices: answerChoices,
//       id: currentQuestion.Id,
//     }
//   }

//  
//   reset() {
//     this.asked = [];
//     this.score = 0;
//   }

// }


class Question {
  constructor(text, incorrect_answers, correct_answer) {
    this.text = text;
    this.incorrectAnswers = incorrect_answers;
    this.correctAnswer = correct_answer;
    this.userAnswer = '';
  }
 
  answerStatus() {
    if (this.userAnswer !== this.correctAnswer) {
      return 0;
    }
    else if (this.userAnswer === this.correctAnswer) {
      return 1;
    }
  }
}

// let x = new Quiz();

// x.quizInitialize();
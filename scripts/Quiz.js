/* global Model */
'use strict';

/**
 * You can replace this Quiz with the version you worked on yesterday. It's just
 * provided as an example.
 */

class Quiz extends Model {          // eslint-disable-line no-unused-vars

  // This class property could be used to determine the no. of quiz questions
  // In later implementations, the user could provide a quiz length and override
  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();

    // Your Quiz model's constructor logic should go here. There is just examples below.
    this.active = false;
    this.questions = [{ id: 1, text: 'Question 1' }];
  }

  startNewGame() {
    this.active = true;
  }

}



class Quiz {
  constructor() {
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

  changeScore() {
    this.score++;
  }

  getQuestions() {
    //something something TriviaAPI
  }

  quizInitialize() {
    try {
      this.getUnaskedQuestions();
      this.toggleActive();
    } catch (e) {
      console.log(e);
    }
  }

  getUnaskedQuestions() {
    return TriviaAPI.getQuestions()
      .then(questions => {
        questions.results.forEach(item => {
          this.unasked.push(new Question(item.question, item.incorrect_answers, item.correct_answer));
        });
      })
      .then(() => {
        this.questionController();
      });

    //this.unasked.push(...questions);
  }


  questionController() {
    while (this.unasked.length !== 0) {
      this.askQuestion();
      this.promptUser();
    }
    this.toggleActive();
  }

  promptUser() {
    let chosenQuestion = this.asked[0];
    //HARD CODED
    chosenQuestion.userAnswer = chosenQuestion.incorrectAnswers[1];

    this.logQuizResponse(chosenQuestion.answerStatus());
    //console.log(this.asked[0])
  }
  askQuestion() {
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

  logQuizResponse(checkValue) {
    if (checkValue === 1) {
      console.log('You are Correct');
      changeScore();
    } else if (checkValue === 0) {
      console.log('YOU ARE SO WRONG!');
    } else console.log('Skipped');
  }

  reset() {
    this.asked = [];
    this.score = 0;
  }

}


class Question {
  constructor(text, incorrect_answers, correct_answer) {
    this.text = text;
    this.incorrectAnswers = incorrect_answers;
    this.correctAnswer = correct_answer;
    this.userAnswer = '';
  }
  submitAnswer(answer) {
    this.userAnswer = answer;
  }
  answerStatus() {
    if (this.userAnswer !== this.correctAnswer) {
      return 0;
    }
    else if (this.userAnswer === this.correctAnswer) {
      return 1;
    }
    else {
      return -1;
    }
  }
}

let x = new Quiz();

x.quizInitialize();
/* global Renderer */
'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .next': 'handleSubmit',

    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateQuestion(questionObj) {

    console.log(questionObj);
    return `
      <div>
        ${questionObj.text}
      </div>
         <form>
        <input type="radio" role="button" class="js-answer" name="answerOption"/>
        <label for="answerOption" title="text">${questionObj.ansChoices[0]}</label>
        <input type="radio" role="button" class="js-answer" name="answerOption"/>
        <label for="answerOption" title="text">${questionObj.ansChoices[1]}</label>
        <input type="radio" role="button" class="js-answer" name="answerOption"/>
        <label for="answerOption" title="text">${questionObj.ansChoices[2]}</label>
        <input type="radio" role="button" class="js-answer" name="answerOption"/>
        <label for="answerOption" title="text">${questionObj.ansChoices[3]}</label>
      <div>
      <button class='next'>Submit</button>
      </div> 
      </form>
    `;
  }

  _generateGraded(gradedObj) {
    if (gradedObj.correct) {
      return `
      <div>
        ${gradedObj.text}
      </div>
      <div>
      You got it!</div>
      <div>
      The correct answer was:
      ${gradedObj.correctAns}
      </div>
      <div>
      <button class='continue'>Continue</button>
      </div> 
`;
    }
    else {
      return `
      <div>
        ${gradedObj.text}
      </div>
      <div>
      Sorry, that's incorrect.</div>
      <div>
      You answered: 
      ${gradedObj.userAns}
      </div>
      <div>
      The correct answer was:
      ${gradedObj.correctAns}
      </div>
      <div>
      <button class='continue'>Continue</button>
      </div> 
      `;
    }
  }

  _generateFinal(finalObj){
    if (){
      return `
    <div>
    Good job!
    </div>
    <div>
    Your final score was ${finalObj.score} out of 5!
    That's a new high score!
    <div>
      <button class='playAgain'>Play Again</button>
    </div> 
    `;
    } else {
    return `
    <div>
    Good job!
    </div>
    <div>
    Your final score was ${finalObj.score} out of 5!
    </div>
    <div>
      <button class='playAgain'>Play Again</button>
    </div> 
    `;
  }



  template() {
    if (this.model.active) {
      return this._generateQuestion(this.model.askNextQuestion());
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.quizInitialize();

  }

  handleSubmit() {
    this.model.checkAnswer();
    this.model.update();
  }
}
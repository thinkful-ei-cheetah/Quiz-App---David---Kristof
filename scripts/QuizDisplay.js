/* global Renderer */
'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .next': 
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

  _generateQuestion() {
    return `
      <div>
        ${this.model.questions[0].text}
      </div>
         <form>
        <input type="radio" role="button" class="js-answer" name="answerOption1"/>
        <label for="answerOption1" title="text">           </label>
        <input type="radio" role="button" class="js-answer" name="answerOption2"/>
        <label for="answerOption2" title="text">           </label>
        <input type="radio" role="button" class="js-answer" name="answerOption3"/>
        <label for="answerOption3" title="text">           </label>
        <input type="radio" role="button" class="js-answer" name="answerOption4"/>
        <label for="answerOption4" title="text">           </label>
      <div>
      <button class='next'>Submit</button>
      </div> 
      </form>
    `;
  }

  template() {
    if (this.model.active) {
      return this._generateQuestion();
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.startNewGame();
    this.model.update();
  }
}
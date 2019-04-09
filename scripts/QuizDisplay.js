/* global Renderer, $ */
'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .next': 'handleSubmit',
      'click .continue': 'handleContinue',
      'click .playAgain': 'handlePlayAgain',

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
    if(questionObj.ansChoices.length < 3){
      return `
      <div>
        ${questionObj.text}
      </div>
         <form>
        <input type="radio" role="button" class="js-answer" name="answerOption" id="answerOption1"/>
        <label for="answerOption1" title="text">${questionObj.ansChoices[0]}</label>
        <input type="radio" role="button" class="js-answer" name="answerOption" id="answerOption2"/>
        <label for="answerOption2" title="text">${questionObj.ansChoices[1]}</label>
      <div>
      <button class='next'>Submit</button>
      </div> 
      </form>
    `;
    } else {
      return `
        <div>
          ${questionObj.text}
        </div>
           <form>
          <input type="radio" role="button" class="js-answer" name="answerOption" id="answerOption1"/>
          <label for="answerOption1" title="text">${questionObj.ansChoices[0]}</label>
          <input type="radio" role="button" class="js-answer" name="answerOption" id="answerOption2"/>
          <label for="answerOption2" title="text">${questionObj.ansChoices[1]}</label>
          <input type="radio" role="button" class="js-answer" name="answerOption" id="answerOption3"/>
          <label for="answerOption3" title="text">${questionObj.ansChoices[2]}</label>
          <input type="radio" role="button" class="js-answer" name="answerOption" id="answerOption4"/>
          <label for="answerOption4" title="text">${questionObj.ansChoices[3]}</label>
        <div>
        <button class='next'>Submit</button>
        </div> 
        </form>
      `;
    }

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

  _generateFinal(finalObj) {
    if (finalObj.thisHighest) {
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
    Your current high score is ${finalObj.highScore}!
    </div>
    <div>
      <button class='playAgain'>Play Again</button>
    </div> 
    `;
    }
  }

  template() {
    console.log('aa');
    switch(this.model.currentState){
    case 0:
      return this._generateIntro();
    case 1: 
      return this._generateQuestion(this.model.askNextQuestion());
    case 2: {
      this.model.currentState = 1;
      return this._generateGraded(this.model.currentGrade);
    } 
    case 3: {
      return this._generateFinal(this.model.getFinalScore());
    }


    }
  }

  handleStart() {
    this.model.quizInitialize();
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = $('input:checked + label').text();
    this.model.checkAnswer(text);
    this.model.update();
  }

  handleContinue(){
    if(this.model.unasked.length){
      this.model.currentState = 1;
      this.model.update();
    } else{
      this.model.currentState = 3;
      this.model.update();
    }
        
    // this.model.update();
  }

  handlePlayAgain(){
    this.model.reset();
    this.model.quizInitialize();
  }

}
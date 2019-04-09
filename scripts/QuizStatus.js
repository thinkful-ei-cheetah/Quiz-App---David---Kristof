/* global Renderer */
'use strict';

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    let progressView = this.model.currentQuestionNum === 'inactive' ? 'inactive' :
      `${ this.model.currentQuestionNum } of 5`;
    return `
      <span>
      Score: ${this.model.score}
      </span>
      <span>
      High Score: ${this.model.highScore}
      </span>
      <span>
      Progress: ${progressView}
      </span>
    `;
  }
}

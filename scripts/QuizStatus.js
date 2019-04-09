/* global Renderer */
'use strict';

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    let progressView = this.model.currentQuestionNum === 'inactive' ? 'inactive' :
      `${ this.model.currentQuestionNum } of 5`;
    return `
      <div>
      Score: ${this.model.score}
      High Score: ${this.model.highScore}
      Progress: ${progressView}
      </div>
    `;
  }
}

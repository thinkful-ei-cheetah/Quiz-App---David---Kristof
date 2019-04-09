/* global Renderer */
'use strict';

class QuizError extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    if (this.model.error)
      return `
      <div>You have an error</div>
    `;
    return '<div></div>';
  }
}

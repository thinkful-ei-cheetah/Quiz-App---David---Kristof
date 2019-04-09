'use strict';

class TriviaAPI {
  constructor() {
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
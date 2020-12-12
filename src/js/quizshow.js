import React from 'react'

export const QuizShow = () => {
    return 'Hello';
}

export class Question {
    constructor(questionText, choices, correctAnswer) {
        this._text = questionText
        if (typeof correctAnswer === 'undefined') {
            throw new Error('Questions need a correct answer')
        } else {
            this._correctAnswer = correctAnswer
        }
        this._correctAnswer = correctAnswer
        if (choices.length < 2) {
            throw new Error('Questions need at least two choices')
        } else if (choices.length > 10) {
            throw new Error('Questions may not have more than 10 answers')
        } else {
            this._choices = choices
        }
    }
    get text() {return this._text}
    get choices() {return this._choices}
}

export class Board {
    constructor(questions) {
        if (typeof questions === 'undefined') {
            throw new Error('The Board needs questions')
        } else if (Array.isArray(questions) && questions.length < 1) {
            throw new Error('The Board needs questions')
        } else if (Array.isArray(questions) && questions.length > 12) {
            throw new Error('No more than 12 questions allowed')
        } else {
            this._questions = questions
        }
    }
    get questions() {
        return this._questions
    }

}

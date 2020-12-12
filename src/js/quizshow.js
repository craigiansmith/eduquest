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
        } else {
            this._choices = choices
        }
    }
    get text() {return this._text}
    get choices() {return this._choices}
}

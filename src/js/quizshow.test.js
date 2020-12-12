import React from 'react'

import {Question, Board} from 'quizshow'

describe('Set up', () => {
    it('should run tests', () => {
    })
})

describe('Components', () => {
    describe('Questions', () => {
        it('should include at least two choices', () => {
            const question = new Question('test', [1,2], 1)
            expect(question.choices.length).toBeGreaterThanOrEqual(2)
        })

        it('should throw an Error with fewer than two choices', () => {
            expect(() => {new Question('test', [1], 1)}).toThrow(Error)
        })

        it('should have a correct answer', () => {
            expect(() => {new Question('test', [1,2])}).toThrow(Error)
        })

        it('should not have more than 10 choices', () => {
            expect(() => {new Question('test', [
                1,2,3,4,5,6,7,8,9,10,11
            ], 1)}).toThrow(Error)
        })
    })
    describe('Board', () => {
        it('should have at least one question', () => {
            expect(() => {new Board()}).toThrow(Error)
            expect(() => {new Board([])}).toThrow(Error)
        })

        it('should have no more than 12 questions', () => {
            let questions = []
            for (let i = 0; i < 13; i ++) {
                questions.push(new Question(i, [1,2], 1))
            }
            expect(() => {new Board(questions)}).toThrow(Error)
        })
        it('should allow access to questions', () => {
            let questions = []
            for (let i = 0; i < 12; i ++) {
                questions.push(new Question(i, [1,2], 1))
            }
            const board = new Board(questions)
            expect(board.questions).toBeTruthy()
        })
    })
})

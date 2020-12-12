import React from 'react'

import {Question} from 'quizshow'

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
    })
})

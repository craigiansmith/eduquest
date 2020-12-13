import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

import {Question, QuestionDisplay,  Board} from 'quizshow'

describe('Set up', () => {
    it('should run tests', () => {
    })
})

describe('Game Mechanics', () => {
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
        it('should instantiate', () => {
            const question = new Question('test', [1,2], 1)
            const board = new Board(question)
            expect(board).toBeTruthy()
        })

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

describe('React components', () => {
    let container = null
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
        container = null
    })
    describe('<QuestionDisplay>', () => {
        it('should display a symbol in the board', () => {
            const symbol = '*'
            const qdisplay = shallow(<QuestionDisplay text={symbol}/>)
            expect(qdisplay.text()).toEqual(symbol) 
        })

        it('should show the question when clicked', () => {
            const question = new Question('text', [1,2,3,4], 2)
            const qdisplay = shallow(<QuestionDisplay text='?' 
                                        question={question} />)
            qdisplay.simulate('click')
            expect(qdisplay.text()).toEqual('?')

        })

        it('should show the choices when clicked', () => {
        
        })

        it('should accept an answer', () => {

        })

        it('should say whether the answer is correct', () => {

        })
    })
    
})

import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

import {Answers, AnswerLevel, Choice, Result, Question, QuestionDisplay,  Board} from 'quizshow'

describe('Set up', () => {
    it('should run tests', () => {
    })
})

describe('Game Mechanics', () => {
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
            const qdisplay = shallow(<QuestionDisplay initialText={symbol}/>)
            expect(qdisplay.text()).toEqual(symbol) 
        })

        it('should show the question when clicked', () => {
            const qdisplay = shallow(<QuestionDisplay />)
            const box = qdisplay.find('.box')
            box.simulate('click')
            expect(qdisplay.find('.modal').length).toEqual(1)

        })
    })
    describe('<Answers />', () => {
        it('should show the choices', () => {
            const choices = [{
                text: 'answer one',
                correct: false
            },{
                text: 'answer two',
                correct: true
            }]
            const answers = shallow(<Answers choices={choices} />)

            expect(answers.find(AnswerLevel).length).toEqual(1)
        })

        it('should accept an answer', () => {

        })

        it('should say whether the answer is correct', () => {

        })
    })
    
})

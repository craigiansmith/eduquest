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
        it('should show two choices on each level', () => {
            const choices = [{
                text: 'answer one',
                correct: false
            },{
                text: 'answer two',
                correct: true
            },{
                text: 'answer three',
                correct: false
            }]
            const answers = shallow(<Answers choices={choices.slice(0,2)} />)
            expect(answers.find(AnswerLevel).length).toEqual(1)

            const answersNext = shallow(<Answers choices={choices} />)
            expect(answersNext.find(AnswerLevel).length).toEqual(2)
        })

        it('should accept an answer', () => {
            const spyOnReport = jest.fn((a) => true)
            const choices = [{
                text: 'answer one',
                correct: false
            },{
                text: 'answer two',
                correct: true
            },{
                text: 'answer three',
                correct: false
            }]
            const answers = shallow(<Answers choices={choices} report={spyOnReport} />)
            answers.find('form').simulate('submit', {preventDefault: () => true})
            expect(spyOnReport).toHaveBeenCalled()
        })

        it('should say whether the answer is correct', () => {
            const spyOnReport = jest.fn((arg) => arg)
            const choice = {
                text: 'correct answer',
                correct: true
            }
            const answers = shallow(<Answers choices={[choice]} report={spyOnReport}/>)
            answers.instance().onChoiceChange('incorrect answer')
            answers.find('form').simulate('submit', {preventDefault: () => 0})
            expect(spyOnReport).toHaveBeenCalledWith(false)

            answers.instance().onChoiceChange(choice.text)
            answers.find('form').simulate('submit', {preventDefault: () => 0})
            expect(spyOnReport).toHaveBeenCalledWith(true)
        })
    })
    
})

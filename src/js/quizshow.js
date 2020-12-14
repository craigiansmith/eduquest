import React from 'react'

const questions = JSON.parse(document.getElementById('questions').textContent)

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong</h1>
        }

        return this.props.children
    }
}


export class Choice extends React.Component {
    render() {
        return (
            <div className='tile is-child'>
                <div className=''>
                <label>
                    <input type='radio' name='answer' />
                    {this.props.text}
                </label>
                </div>
            </div>
        )
    }
}


export class AnswerLevel extends React.Component {
    render() {
        return (
            <div className='tile is-parent'>
                {this.props.choices} 
            </div>
        )
    }
}


export class Answers extends React.Component {
    render() {
        let choices = []
        this.props.choices.forEach((choice, index) => {
           choices.push(<Choice key={choice.text.toString()} text={choice.text.toString()} />)
        })
        let answersEachLevel = 2
        let numberOfLevels = choices.length / answersEachLevel
        let levels = []
        for (let i = 0; i < numberOfLevels; i++) {
            let first = i * answersEachLevel
            let last = (i + 1) * answersEachLevel
            levels.push(<AnswerLevel key={i} choices={choices.slice(first, last)} />) 
        }

        return (
            <form action='' method='POST'>
                <div className='tile is-ancestor is-vertical'>
                    <div className='control'>
                        {levels}
                    </div>
                    <input type='submit' value='Go!' />
                </div>
            </form>
        )
    }
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

export class QuestionDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.initialText,
            questionText: props.text,
            choices: props.choices
        }
    }

    handleClick() {
        this.setState({
            text: this.state.questionText,
            active: true
        })
    }

    unclicked() {
        return (
            <div className='level-item'>
                <div className='box' onClick={() => this.handleClick()} style={{
                    height: '10vw',
                    width: '10vw'
                }}>
                   <p>{this.state.text}</p> 
                </div>
            </div>)
    }

    closeModal(){
        this.setState({active: false})
    }

    active() {
        return (<div className='modal is-active'>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <div className='modal-card-head'>
                    <div className='modal-card-title'>
                       <h2>{this.state.text}</h2>
                    </div>
                </div>
                <div className='modal-card-body'>
                    <Answers choices={this.state.choices} />
                </div>
                <div className='modal-card-foot'>

                </div>
            </div>
            <button className='modal-close is-large' onClick={() => this.closeModal()}>
            </button>
        </div>)
    }

    render() {
        if (this.state.active) {
            return this.active()
        } else {
            return this.unclicked()
        }
    }
}

export class QuestionLevel extends React.Component {
    render() {
        return (
            <div className='level'>
                {this.props.questions}
            </div>
        )
    }
}

export class Board extends React.Component {
    constructor(props) {
        super(props)
        if (typeof props.questions === 'undefined') {
            throw new Error('The Board needs questions')
        } else if (Array.isArray(props.questions) && props.questions.length < 1) {
            throw new Error('The Board needs questions')
        } else if (Array.isArray(props.questions) && props.questions.length > 12) {
            throw new Error('No more than 12 questions allowed')
        } else {
            this.state = {questions: props.questions}
        }
    }
    get questions() {
        return this._questions
    }
}

export class BoardContainer extends React.Component {
    constructor() {
        super()
        //const board = new Board({questions: questions})
    }
    render() {
        let output = []
        questions.forEach((question, index) => {
            output.push(<QuestionDisplay
                            key={question.text.toString()}
                            initialText={index}
                            text={question.text}
                            choices={question.answers}
                            correctAnswer={1} />)
        })
        return <div>
            <QuestionLevel 
                level={1}
                questions={output.slice(0,4)}
            />
            <QuestionLevel 
                level={2}
                questions={output.slice(4,8)}
            />
            <QuestionLevel 
                level={3}
                questions={output.slice(8,12)}
            />
            </div>
    }
}

export const QuizShow = () => {
    return (
        <ErrorBoundary>
            <BoardContainer />
        </ErrorBoundary>
    ) 
}

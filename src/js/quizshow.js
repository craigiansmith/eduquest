import React from 'react'

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
            questionText: props.text
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
        let questions = []
        for (let i = 0; i < 12; i++) {
            questions.push(<QuestionDisplay 
                            key={i}
                            initialText={i} 
                            text={'question' + i}
                            choices={[1,2]}
                            correctAnswer={1} />)
        }
        return <div>
            <QuestionLevel 
                level={1}
                questions={questions.slice(0,4)}
            />
            <QuestionLevel 
                level={2}
                questions={questions.slice(4,8)}
            />
            <QuestionLevel 
                level={3}
                questions={questions.slice(8,12)}
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

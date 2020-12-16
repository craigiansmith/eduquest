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


export class Choice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {chosenAnswer: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
        this.setState({chosenAnswer: e.target.value})
    }

    render() {
        let disabled
        console.log(this.state.chosenAnswer)
        if (!this.props.chosenAnswer) {
            disabled = ''
        } else if (this.props.answered) {
            disabled = this.props.chosenAnswer == this.props.text.toString() ? '': 'yes'
        }
        console.log('disabled: ' + disabled)
        return (
            <div className='tile is-child'>
                <div className=''>
                <label>
                    <input type='radio' name='answer' value={this.props.text.toString()} onChange={this.handleChange} disabled={disabled} />
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
    constructor(props) {
        super(props)
        this.state = {choice: '', disabled: 'disabled', answered: false}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChoiceChange = this.onChoiceChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        let result = false
        this.props.choices.forEach((choice, index) => {
            if (this.state.choice == choice.text && choice.correct) {
                result = true
            }
        })
        this.props.report(result)
        this.setState({disabled: 'disabled', answered: true})
    }

    onChoiceChange(choice){
        if (!this.state.answered) {
            this.setState({choice: choice, disabled: ''})
        }
    }

    render() {
        const buttonColour = this.state.disabled? '': 'is-primary'
        let choices = []
        this.props.choices.forEach((choice, index) => {
           choices.push(<Choice
                        key={choice.text.toString()}
                        text={choice.text.toString()}
                        onChange={this.onChoiceChange}
                        answered={this.state.answered} 
                        chosenAnswer={this.state.choice}
               />)
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
            <form onSubmit={this.handleSubmit}>
                <div className='tile is-ancestor is-vertical'>
                    <div className='control'>
                        {levels}
                    </div>
                    <input className={`button ${buttonColour}`} type='submit' value='Go!' disabled={this.state.disabled} />
                </div>
            </form>
        )
    }
}


export class Result extends React.Component {
    constructor(props) {
        super(props)
    }

    render(props) {
        let buttonColour = this.props.disabled? '': 'is-primary'
        let buttonLabel = this.props.lastQuestion? 'End quiz': 'Next question'
        let colouring = this.props.correct? 'success': 'warning-light'
        return (
            <div>
                <button className={`button is-size-3 ${buttonColour}`} 
                        onClick={this.props.close}
                        disabled={this.props.disabled}
                >{buttonLabel}</button>
                <span className={`has-background-${colouring} is-size-3`}>{this.props.message} </span>
            </div>
        )
    }
}

export class QuestionDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.initialText,
            questionText: props.text,
            choices: props.choices,
            result: ' ',
            modalActive: 'is-active',
            disabled: 'yes'
        }
        this.report = this.report.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    handleClick() {
        this.setState({
            text: this.state.questionText,
            active: true
        })
    }

    closeModal(){
        this.setState({modalActive: '', active: false, clicked:true})
        this.props.reportToBoard(this.state.correct) 
    }

    report(result) {
        this.setState({
            message: result? 'Correct' : 'Whoops, incorrect answer',
            correct: result,
            disabled: ''
            })
    }

    inactive() {
        let box
        if (!this.state.clicked) {
            box = <div className='box' onClick={() => this.handleClick()} style={{
                                height: '10vw',
                                width: '10vw'
                            }}>
                   <p className='has-text-centered has-font-weight-bold is-size-1 has-text-info-dark'>{this.state.text}</p> 
                </div>
        } else {
            box = <div className='box has-background-info' style={{
                                height: '10vw',
                                width: '10vw'
                            }}>
                   <p className='has-text-centered'>{this.state.text}</p> 
                </div>
        }
        return (
            <div className='level-item'>
                {box}
            </div>)
    }

    active() {
        return (<div className={`modal ${this.state.modalActive}`}>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <div className='modal-card-head'>
                    <div className='modal-card-title'>
                       <h2>{this.state.text}</h2>
                    </div>
                </div>
                <div className='modal-card-body'>
                    <Answers choices={this.state.choices} report={this.report} />
                </div>
                <div className='modal-card-foot'>
                    <Result
                        message={this.state.message}
                        correct={this.state.correct}
                        close={this.closeModal}
                        lastQuestion={this.props.lastQuestion} 
                        disabled={this.state.disabled}
                        />
                </div>
            </div>
            <button className='modal-close is-large' 
                    onClick={() => this.closeModal()}>
            </button>
        </div>)
    }

    render() {
        if (this.state.active) {
            return this.active()
        } else {
            return this.inactive()
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


export class Feedback extends React.Component {
    render() {
        return (
            <div className='section'>
                <h2 className='is-size-2 is-font-weight-bold is-light'>Thank you for playing, here are your results:</h2>
                <div className='block'>
                    <p>You got {this.props.results.correctAnswers} out of {this.props.results.totalAnswered}.</p>
                    <p>That is a good effort, keep trying to see how much you will achieve!</p>
                </div>
            </div>
        )
    }
}

export class BoardContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            score: 0,
            questionsAnswered: 0
        }
        this.reportToBoard = this.reportToBoard.bind(this)
        this.questions = JSON.parse(document.getElementById('questions').textContent)
    }

    reportToBoard(result) {
        this.setState({
        score: result? this.state.score + 1: this.state.score,
        questionsAnswered: this.state.questionsAnswered + 1,
        lastQuestion: this.state.questionsAnswered >= this.questions.length - 2,
        quizFinished: this.state.questionsAnswered >= this.questions.length - 1})
    }

    quiz() {
        let output = []
        this.questions.forEach((question, index) => {
            output.push(<QuestionDisplay
                            key={question.text.toString()}
                            initialText={index + 1}
                            text={question.text}
                            choices={question.answers}
                            reportToBoard={this.reportToBoard}
                            lastQuestion={this.state.lastQuestion} />)
        })
        return <div>
            <p className='has-text-centered is-size-3 has-background-primary-light' >
            {this.state.score.toString() + '/' + this.state.questionsAnswered.toString()}
            </p>
                <div  className='section'>
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
            </div>
    }

    render() {
        if(!this.state.quizFinished) {

            return this.quiz()
        } else {
            return <Feedback results={{correctAnswers: this.state.score, totalAnswered: this.state.questionsAnswered}} />
        }
    }
}

export const QuizShow = () => {
    return (
        <ErrorBoundary>
            <BoardContainer />
        </ErrorBoundary>
    ) 
}

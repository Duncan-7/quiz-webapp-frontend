import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from '../../components/Question/Question';
import QuizSummary from '../QuizSummary/QuizSummary';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './CreateQuizResponse.module.css';

class CreateQuizResponse extends Component {
  state = {
    template: null,
    started: false,
    currentQuestion: 0,
    answeringQuestion: false,
    complete: false,
    answers: []
  }

  componentDidMount() {
    this.props.onCreateResponseInit();
    //use params to find the correct quiz template to render
    const template = this.props.quizTemplates.filter(template => (
      template._id === this.props.match.params.id
    ))[0];

    this.setState({
      template: template
    });
  }

  startQuiz = () => {
    this.setState({
      started: true,
      answeringQuestion: true
    });
  }

  nextQuestion = () => {
    const nextQuestionIndex = this.state.currentQuestion + 1
    this.setState({
      currentQuestion: nextQuestionIndex,
      answeringQuestion: true
    });
  }

  selectAnswer = (answerIndex) => {
    const updatedAnswers = [...this.state.answers];
    updatedAnswers.push(answerIndex);
    //check if all questions have been answered
    const quizComplete = this.state.template.questions.length === updatedAnswers.length ? true : false;
    this.setState({
      answeringQuestion: false,
      answers: updatedAnswers,
      complete: quizComplete
    });
  }

  reset = () => {
    this.setState({
      started: false,
      currentQuestion: 0,
      answeringQuestion: false,
      complete: false,
      answers: []
    });
  }

  submitResponse = () => {
    const responseData = {
      templateId: this.state.template._id,
      userId: this.props.userId,
      answers: this.state.answers
    };

    this.props.onSubmitResponse(responseData);
  }

  render() {
    //before quiz is found, or if finding quiz fails
    let title = null;
    let content = <p>Problem loading Quiz, please try again.</p>
    let controls = null;
    //once quiz is found
    if (this.state.template) {
      title = <h2>{this.state.template.title}</h2>
      content = <p>Make your predictions for each question, then submit your results!</p>;
      controls = <Button btnType="Success" clicked={this.startQuiz} >Begin Quiz</Button>;
    }
    if (this.state.started) {
      let question = this.state.template.questions[this.state.currentQuestion]
      content = <Question
        questionNumber={this.state.currentQuestion + 1}
        questionText={question.question}
        answerOptions={question.answerOptions}
        selectedAnswer={this.state.answers[this.state.currentQuestion]}
        selectAnswer={this.selectAnswer} />
      //hide next question button if currently answering question
      const hideButton = this.state.answeringQuestion
      controls = <Button btnType="Success" clicked={this.nextQuestion} hidden={hideButton} >Next Question</Button>;
    }

    if (this.state.complete) {
      content = <QuizSummary
        template={this.state.template}
        answers={this.state.answers} />
      controls = [<Button key="0" btnType="Success" clicked={this.submitResponse} >Submit Response</Button>,
      <Button key="1" btnType="Danger" clicked={this.reset} >Reset</Button>];
    }

    if(this.props.submitted) {
      content = <p>Answers submitted!</p>
      controls = null;
    }

    return <div>
      {title}
      {content}
      {controls}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    quizTemplates: state.template.templates,
    submitted: state.response.created
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitResponse: (responseData) => dispatch(actions.createResponse(responseData)),
    onCreateResponseInit: () => dispatch(actions.createResponseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizResponse);
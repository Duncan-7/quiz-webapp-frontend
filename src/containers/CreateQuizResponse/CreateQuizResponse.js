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
    answers: [],
    addingAnswersToTemplate: false
  }

  componentDidMount() {
    this.props.onCreateResponseInit();
    this.props.onUpdateTemplateInit();
    //use params to find the correct quiz template to render
    const template = this.props.quizTemplates.find(template => (
      template._id === this.props.match.params.id
    ));

    this.setState({
      template: template
    });
  }

  componentDidUpdate() {
    //update UI if template live state changes
    const template = this.props.quizTemplates.find(template => (
      template._id === this.props.match.params.id
    ));

    if (template.live !== this.state.template.live) {
      this.setState({
        template: template,
      });
    }
  }

  startQuiz = () => {
    this.setState({
      started: true,
      answeringQuestion: true
    });
  }

  scoreQuiz = () => {
    this.setState({
      started: true,
      answeringQuestion: true,
      addingAnswersToTemplate: true
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
    const quizComplete = this.state.template.questions.length === updatedAnswers.length;
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
    //use these answers to update template
    if (this.state.addingAnswersToTemplate) {
      let updatedQuestions = [...this.state.template.questions]
      updatedQuestions = updatedQuestions.map((question, index) => {
        let updatedQuestion = { ...question };
        updatedQuestion.answerIndex = this.state.answers[index]
        return updatedQuestion
      });
      const templateData = {
        userId: this.props.userId,
        title: this.state.template.title,
        closingDate: this.state.template.closingDate,
        questions: updatedQuestions,
        live: false,
        results: true
      }
      this.props.onUpdateTemplate(this.state.template._id, templateData);
      return
    };

    //submit new response
    const responseData = {
      templateId: this.state.template._id,
      userId: this.props.userId,
      answers: this.state.answers
    };

    this.props.onSubmitResponse(responseData);
  }

  toggleLive = () => {
    const templateData = { ...this.state.template };
    const newLiveState = !this.state.template.live;
    templateData.live = newLiveState;
    templateData.userId = this.props.userId;
    this.props.onUpdateTemplate(this.state.template._id, templateData);
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
      if (this.props.isAdmin) {
        controls = [<Button key="startquiz" btnType="Success" clicked={this.startQuiz} >Begin Quiz</Button>,
        <Button key="scorequiz" btnType="Neutral" clicked={this.scoreQuiz} >Enter Answers</Button>,
        <Button
          key="togglelive"
          btnType={this.state.template.live ? "Success" : "Danger"}
          clicked={this.toggleLive}>
          {this.state.template.live ? "Live" : "Not Live"}
        </Button>]
      }
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
      <Button key="1" btnType="Danger" clicked={this.reset} >Reset</Button>,
      ];
    }
    //show success message on submit response
    if (this.props.responseSubmitted) {
      content = <p>Answers submitted!</p>
      controls = null;
    }
    //show success message on score quiz
    if (this.props.templateUpdated) {
      content = <p>Quiz scored!</p>
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
    isAdmin: state.auth.admin,
    quizTemplates: state.template.templates,
    responseSubmitted: state.response.created,
    templateUpdated: state.template.created
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitResponse: (responseData) => dispatch(actions.createResponse(responseData)),
    onCreateResponseInit: () => dispatch(actions.createResponseInit()),
    onUpdateTemplateInit: () => dispatch(actions.createTemplateInit()),
    onUpdateTemplate: (templateId, templateData) => dispatch(actions.updateTemplate(templateId, templateData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizResponse);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './CreateQuiz.module.css';
import * as actions from '../../store/actions/index';

class CreateQuiz extends Component {
  state = {
    informationFields: {
      title: {
        label: 'Title',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Quiz Title'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      closingDate: {
        label: 'Closing Date',
        elementType: 'input',
        elementConfig: {
          type: 'date',
          placeholder: ''
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      live: {
        label: 'Live',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: true, displayValue: 'Yes' },
            { value: false, displayValue: 'No' }
          ]
        },
        value: false,
        validation: {},
        valid: true,
      },
      results: {
        label: 'Results Finalised',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: true, displayValue: 'Yes' },
            { value: false, displayValue: 'No' }
          ]
        },
        value: false,
        validation: {},
        valid: true,
      },
    },
    questions: [
      {
        questionText: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Question'
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true
          },
        },
        answerOptions: [
          {
            answerOption: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Answer Option'
              },
              value: '',
              valid: false,
              touched: false,
              validation: {
                required: true
              },
            }
          },
          {
            answerOption: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Answer Option'
              },
              value: '',
              valid: false,
              touched: false,
              validation: {
                required: true
              },
            }
          }
        ]
      },
      {
        questionText: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Question'
          },
          value: '',
          valid: false,
          touched: false,
          validation: {
            required: true
          },
        },
        answerOptions: [
          {
            answerOption: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Answer Option'
              },
              value: '',
              valid: false,
              touched: false,
              validation: {
                required: true
              },
            }
          },
          {
            answerOption: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Answer Option'
              },
              value: '',
              valid: false,
              touched: false,
              validation: {
                required: true
              },
            }
          }
        ]
      }
    ]
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    // const updatedControls = {
    //   ...this.state.controls,
    //   [controlName]: {
    //     ...this.state.controls[controlName],
    //     value: event.target.value,
    //     valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
    //     touched: true,
    //   }
    // };
    // this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  addQuestion = (event) => {
    event.preventDefault();
    const addedQuestion = [...this.state.questions,
    {
      questionText: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Question'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        },
      },
      answerOptions: [
        {
          answerOption: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Question'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
              required: true
            },
          }
        },
        {
          answerOption: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Question'
            },
            value: '',
            valid: false,
            touched: false,
            validation: {
              required: true
            },
          }
        }
      ]
    }
    ]
    this.setState({
      ...this.state,
      questions: addedQuestion
    });
  }

  removeQuestion = (event) => {
    event.preventDefault();
    const questions = [...this.state.questions]
    questions.pop()
    this.setState({
      ...this.state,
      questions: questions
    });
  }

  addAnswer = (event, questionIndex) => {
    event.preventDefault();
    const answers = [...this.state.questions[questionIndex].answerOptions, {
      answerOption: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Question'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        },
      }
    }];
    const questions = [...this.state.questions];
    questions[questionIndex].answerOptions = answers
    this.setState({
      ...this.state,
      questions: questions
    });
  }

  removeAnswer = (event, questionIndex) => {
    event.preventDefault();
    const answers = [...this.state.questions[questionIndex].answerOptions];
    answers.pop();
    const questions = [...this.state.questions];
    questions[questionIndex].answerOptions = answers
    this.setState({
      ...this.state,
      questions: questions
    });
  }

  render() {
    //generate inputs for fixed fields
    const informationElementsArray = [];
    for (let key in this.state.informationFields) {
      informationElementsArray.push({
        id: key,
        config: this.state.informationFields[key]
      });
    }
    //generate inputs for fixed fields
    let informationFields = informationElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        label={formElement.config.label}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    //generate input fields for questions and answers
    let questionFields = this.state.questions.map((question, index) => {
      return <div key={"Q" + (index + 1)} className={classes.Question}>
        <Input
          key={"question" + (index + 1)}
          label={"Question " + (index + 1)}
          elementType={question.questionText.elementType}
          elementConfig={question.questionText.elementConfig}
          value={question.questionText.value}
          invalid={!question.questionText.valid}
          shouldValidate={question.questionText.validation}
          touched={question.questionText.touched}
          changed={(event) => this.inputChangedHandler(event, index)} />

        {question.answerOptions.map((answer, ind) => {
          return <Input
            key={"Q" + (index + 1) + "A" + (ind + 1)}
            label={"Answer " + (ind + 1)}
            elementType={answer.elementType}
            elementConfig={answer.elementConfig}
            value={answer.value}
            invalid={!answer.valid}
            shouldValidate={answer.validation}
            touched={answer.touched}
            changed={(event) => this.inputChangedHandler(event, index, ind)} />
        })}

        <Button
          key={`AddAnswerQ${index}`}
          btnType="Success"
          disabled={this.state.questions[index].answerOptions.length >= 5}
          clicked={(event) => this.addAnswer(event, index)}>Add Answer</Button>
        <Button
          key={`RemoveAnswerQ${index}`}
          btnType="Danger"
          disabled={this.state.questions[index].answerOptions.length <= 2}
          clicked={(event) => this.removeAnswer(event, index)}>Remove Answer</Button>
      </div>
    })

    const addQuestionButton = <Button
      key={"Add Question"}
      btnType="Success"
      disabled={this.state.questions.length >= 10}
      clicked={this.addQuestion}>Add Question</Button>

    const removeQuestionButton = <Button
      key={"Remove Question"}
      btnType="Danger"
      disabled={this.state.questions.length <= 1}
      clicked={this.removeQuestion}>Remove Question</Button>

    questionFields.push(addQuestionButton);
    questionFields.push(removeQuestionButton);



    if (this.props.loading) {
      // form = <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      < div className={classes.Auth} >
        {errorMessage}
        < form onSubmit={this.submitHandler} >
          {informationFields}
          {questionFields}
          < Button btnType="Success">Create Quiz</Button >
        </form >
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
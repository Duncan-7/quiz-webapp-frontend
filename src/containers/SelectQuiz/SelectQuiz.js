import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './SelectQuiz.module.css';

import TemplatePreview from '../../components/TemplatePreview/TemplatePreview';

class SelectQuiz extends Component {
  render() {
    //remove templates that have already been scored
    let liveTemplates = this.props.quizTemplates.filter(template => {
      return !template.results;
    })
    //remove templates that are not live or that the user already entered if user is not an admin
    if (!this.props.isAdmin) {
      liveTemplates = this.props.quizTemplates.filter(template => {
        return template.live;
      })
      liveTemplates = liveTemplates.filter(template => {
        let notYetEntered = true;
        this.props.quizResponses.forEach(response => {
          if (response.template === template._id) {
            notYetEntered = false;
          }
        });
        return notYetEntered;
      });
    }

    let templatesList = liveTemplates.map(template => {
      return <TemplatePreview
        key={template._id}
        id={template._id}
        title={template.title}
        date={template.closingDate}
        numberOfQuestions={template.questions.length}
        live={template.live} />
    })

    console.log(templatesList)

    if (templatesList.length === 0) {
      templatesList = <p>You've entered all our quizzes! Check back later for more.</p>
    }

    return <div>
      {templatesList}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    quizTemplates: state.template.templates,
    quizResponses: state.response.responses,
    isAdmin: state.auth.admin
  }
}

export default connect(mapStateToProps)(SelectQuiz);
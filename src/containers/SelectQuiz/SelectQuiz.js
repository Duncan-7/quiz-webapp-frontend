import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './SelectQuiz.module.css';

import TemplatePreview from '../../components/TemplatePreview/TemplatePreview';

class SelectQuiz extends Component {
  onSelectQuiz = () => {

  }

  render() {
    const liveTemplates = this.props.quizTemplates.filter(template => {
      return template.live;
    })

    const templatesList = liveTemplates.map(template => {
      return <TemplatePreview
        key={template._id}
        id={template._id}
        title={template.title}
        date={template.closingDate}
        numberOfQuestions={template.questions.length} />
    })

    return <div>
      {templatesList}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    quizTemplates: state.template.templates
  }
}

export default connect(mapStateToProps)(SelectQuiz);
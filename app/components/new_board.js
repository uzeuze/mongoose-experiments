import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import  { browserHistory } from 'react-router';

class NewBoard extends Component {

  handleFormSubmit(formProps) {
    axios.post(`http://localhost:8080/api/users/${this.props.params.userId}/boards`, formProps)
      .then(response => {
        browserHistory.push(`/users/${response.data._id}`);
      });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <label>Name</label>
          <div>
            <Field name="name" component="input" type="text" placeholder="Name"/>
          </div>
        </div>
        <div>
          <button type="submit">CREATE BOARD</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newBoard'
})(NewBoard);

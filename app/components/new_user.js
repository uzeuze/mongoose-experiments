import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import  { browserHistory } from 'react-router';

class NewUser extends Component {

  handleFormSubmit(formProps) {
    axios.post('http://localhost:8080/api/users', formProps)
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
          <label>Email</label>
          <div>
            <Field name="email" component="input" type="email" placeholder="Email"/>
          </div>
        </div>
        <div>
          <label>isAdmin</label>
          <div>
            <label><Field name="isAdmin" component="input" type="radio" value="true"/>Yes</label>
            <label><Field name="isAdmin" component="input" type="radio" value="false"/>No</label>
          </div>
        </div>
        <div>
          <button type="submit">CREATE USER</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newUser'
})(NewUser);

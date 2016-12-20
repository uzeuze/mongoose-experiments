import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import  { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EditUser extends Component {

  componentWillMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  handleFormSubmit(formProps) {
    axios.put(`http://localhost:8080/api/users/${this.props.params.userId}`, formProps)
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
          <label htmlFor="isAdmin">isAdmin</label>
          <div>
            <Field name="isAdmin" component="input" type="checkbox"/>
          </div>
        </div>
        <div>
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.user.displayedUser
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'editUser',
  enableReinitialize: true
})(EditUser));

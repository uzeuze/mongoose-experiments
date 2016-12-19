import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.userId);
  }
  render() {
    if(!this.props.user) {
      return <div>Loading...</div>;
    }
    const user = this.props.user;
    return (
      <div>
        <h4>User Name: {user.name}</h4>
        <p>User Email: {user.email}</p>
        <p>isAdmin: {user.isAdmin ? "Yes" : "No" }</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.displayedUser
  };
}

export default connect(mapStateToProps, actions)(User);

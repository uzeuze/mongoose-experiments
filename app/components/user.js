import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class User extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillUnmount() {
    this.props.clearUser();
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
        <Link to={`/users/${this.props.params.userId}/boards/new`}>Add Board</Link>
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

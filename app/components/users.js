import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Users extends Component {
  constructor() {
    super();
    this.renderUser = this.renderUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser(user) {
    return (
      <li key={user.email}>{user.email}</li>
    );
  }

  render() {
    if(!this.props.users) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>Users</h2>
        <Link to='/new-user'>New User</Link>
        <ul>
          {this.props.users.map(this.renderUser)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users
  }
}

export default connect(mapStateToProps, actions)(Users);

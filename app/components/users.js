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
      <tr key={user.email}>
        <td><Link to={`/users/${user._id}`}>{user.email}</Link></td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
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
       <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map(this.renderUser)}
        </tbody>
       </table>
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

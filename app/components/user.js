import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class User extends Component {
  constructor() {
    super();
    this.renderBoard = this.renderBoard.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  renderBoard(board, i) {
    return (
      <div key={i}>
        <Link to={`/boards/${board._id}`}>{board.name}</Link>
      </div>
    );
  }

  render() {
    if(!this.props.user || !this.props.user.boards) {
      return <div>Loading...</div>;
    } else if(this.props.user.boards.length <= 0) {
      return (
        <div>
          <h4>User Name: {this.props.user.name}</h4>
          <p>User Email: {this.props.user.email}</p>
          <p>isAdmin: {this.props.user.isAdmin ? "Yes" : "No" }</p>
          <h4>User does not have any board.</h4>
          <Link to={`/users/${this.props.params.userId}/boards/new`}>Add a Board</Link>
        </div>
      );
    }

    const user = this.props.user;
    return (
      <div>
        <h4>User Name: {user.name}</h4>
        <p>User Email: {user.email}</p>
        <p>isAdmin: {user.isAdmin ? "Yes" : "No" }</p>
        <Link to={`/users/${this.props.params.userId}/boards/new`}>Add Board</Link>
        <div>
          <h3>Users Boards</h3>
          {user.boards.map(this.renderBoard)}
        </div>
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

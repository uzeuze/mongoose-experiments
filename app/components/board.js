import React, { Component } from 'react';
import axios from 'axios';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      board: undefined
    }
    this.renderUser = this.renderUser.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/api/boards/${this.props.params.boardId}`)
      .then(response => {
        this.setState({ board: response.data })
      });
  }

  renderUser(user, i) {
    return (
      <div key={i}>
        <h5>{`${user.name} - ${user.email}`}</h5>
      </div>
    )
  }

  render() {
    if(!this.state.board) {
      return <div>Loading...</div>
    }
    const { board } = this.state;
    return (
      <div>
        <h2>{board.name}</h2>
        <div>
          <h4>Users of this board</h4>
          {board.users.map(this.renderUser)}
        </div>
      </div>
    );
  }
}

export default Board;

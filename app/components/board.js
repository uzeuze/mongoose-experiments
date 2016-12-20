import React, { Component } from 'react';

class Board extends Component {
  render() {
    return (
      <h2>{this.props.params.boardId}</h2>
    );
  }
}

export default Board;

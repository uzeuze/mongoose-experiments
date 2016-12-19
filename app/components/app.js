import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => {
  return (
    <div>
      <h1><Link to="/">App</Link></h1>
      {children}
    </div>
  );
}

export default App;

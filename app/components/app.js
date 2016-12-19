import React from 'react';

const App = ({ children }) => {
  return (
    <div>
      <h1>App Header</h1>
      {children}
    </div>
  );
}

export default App;

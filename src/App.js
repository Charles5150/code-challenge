import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ArticleList } from './ArticleList';

export class App extends Component {
  // Renders
  render() {
    return (
      <div className="App">
        <h2>Billin code challenge</h2>
        <Router>
        <Route exact path="/" component={ArticleList} />
        </Router>
      </div>
    );
  }
}

export default App;

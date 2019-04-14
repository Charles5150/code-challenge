import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { ArticleList } from './ArticleList';
import { ArticleFull } from './ArticleFull';

export class App extends Component {
  // Renders
  render() {
    return (
      <div className="App">
        <h2>Billin code challenge</h2>
        <Router>
          <Route exact path="/" component={ArticleList} />
          <Route path="/:id" component={ArticleFull} />
        </Router>
      </div>
    );
  }
}

export default App;

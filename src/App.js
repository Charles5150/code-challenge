import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { ArticleList } from './ArticleList';
import { ArticleFull } from './ArticleFull';
import { Header } from './Header';
import { Footer } from './Footer';

export class App extends Component {
  // Renders
  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <Route exact path="/" component={ArticleList} />
          <Route path="/:id" component={ArticleFull} />
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;

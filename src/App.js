import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import ArticleListContainer from './ArticleListContainer';
import ArticleFullContainer from './ArticleFullContainer';
import Header from './Header';
import Footer from './Footer';

export const App = () => (
  <div className="App">
    <Router>
      <Header/>
      <Route exact path="/" component={ArticleListContainer} />
      <Route path="/:id" component={ArticleFullContainer} />
      <Footer/>
    </Router>
  </div>
)

export default App;

import React, { Component } from 'react';
import request from './request';
import { ARTICLES_QUERY } from './queries';

import { ArticleItem } from './ArticleItem';

class App extends Component {
  // definition
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  // lifecycle
  componentWillMount() {
    request(ARTICLES_QUERY).then(response => {
      this.setState({ articles: response.data.articles });
    });
  }

  // Renders
  render() {
    return (
      <div className="App">
        <h2>Billin code challenge</h2>
        <h3>Header</h3>
        {this.state.articles.map((item, key) =>
        <ArticleItem
            author={item.author}
            excerpt={item.excerpt}
            key={key}
        />
        )}
        <h3>Footer</h3>
      </div>
    );
  }
}

export default App;

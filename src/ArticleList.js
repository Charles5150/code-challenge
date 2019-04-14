import React, { Component } from 'react';

import request from './request';
import { ARTICLES_QUERY } from './queries';

import { ArticleItem } from './ArticleItem';

export class ArticleList extends Component {
  // definition
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  // lifecycle
  componentWillMount() {
    request(ARTICLES_QUERY).then(response => {
      this.setState({ articles: response.data.articles });
      console.log('articlelist state', this.state);
      console.log('articlelist props', this.props);
    });
  }

  // Renders
  render() {
    const articles = this.state.articles.map((item, key) => (
      <ArticleItem
        author={item.author}
        excerpt={item.excerpt}
        key={key}
      />
    ));

    return (
      <div>
        <h3>Header</h3>
        <div>{articles}</div>
        <h3>Footer</h3>
      </div>
    );
  }
}


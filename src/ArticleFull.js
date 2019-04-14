import React, {Component} from 'react';

import request from './request';
import {ARTICLE_BY_ID} from './queries';

export class ArticleFull extends Component{
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentWillMount() {
    request(ARTICLE_BY_ID(this.props.match.params.id)).then(response => {
      this.setState({ article: response.data.article });
      console.log('articlefull state', this.state);
      console.log('articlefull props', this.props);
    });
  }

  render() {
    let tags = <div></div>;
    if(this.state.article.tags) {
      tags = this.state.article.tags.map((item, key) => (
        <div key={key} className="rounded">{item}</div>
      ));
    }

    return (
      <div className="rounded">
        <div className="rounded">
          {this.state.article.author}
        </div>
        <div className="rounded">
          {this.state.article.content}
        </div>
        <div className="rounded">
          {this.state.article.published}
        </div>
        <div className="rounded">
          {tags}
        </div>
        <div className="rounded">
          {this.state.article.title}
        </div>
      </div>
    );
  }
}
import React, {Component} from 'react';

import request from './request';
import {ARTICLE_BY_ID, ARTICLE_REMOVE} from './queries';

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

  remove = () => {
    if (window.confirm(`Remove Article id ${this.state.article.id} ???`)) {
      let query = ARTICLE_REMOVE;
      query = query.replace('#id',this.state.article.id);
      request(query).then(response => {
        console.log('article removed');
        this.props.history.push('/');
      });
    } else {

    }

  }


  render() {
    let published = <div>Not Published</div>;
    if( this.state.article.published) {
      published = <div>Published</div>
    }

    let tags = <div></div>;
    if(this.state.article.tags) {
      tags = this.state.article.tags.map((item, key) => (
        <div key={key} className="rounded">{item}</div>
      ));
    }

    return (
      <div className="rounded">
        <button onClick={this.remove}>Remove</button>
        <div className="rounded">
          {this.state.article.author}
        </div>
        <div className="rounded">
          {this.state.article.content}
        </div>
        <div className="rounded">
          {published}
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
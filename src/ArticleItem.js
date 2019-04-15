import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class ArticleItem extends Component{
  render() {
    return (
      <div className="rounded">
        <Link to={`/${this.props.id}`}>
          View
        </Link>
        <div className="rounded">
          {this.props.author}
        </div>
        <div className="rounded">
          {this.props.excerpt}
        </div>
      </div>
    );
  }
}

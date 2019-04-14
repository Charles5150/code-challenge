import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class ArticleItem extends Component{
  render() {
    return (
      <Link to={`/${this.props.id}`}>
        <div className="rounded">
          <div className="rounded">
            {this.props.author}
          </div>
          <div className="rounded">
            {this.props.excerpt}
          </div>
        </div>
      </Link>
    );
  }
}

import React, {Component} from 'react';

export class ArticleItem extends Component{
  render() {
    return (
      <div className="rounded">
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

import React, {Component} from 'react';

import request from './request';
import {ARTICLE_BY_ID, ARTICLE_REMOVE} from './queries';

export class ArticleFull extends Component{
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      editing: false,
    };
  }

  componentWillMount() {
    request(ARTICLE_BY_ID(this.props.match.params.id)).then(response => {
      this.setState({ article: response.data.article });
      console.log('articlefull state', this.state);
      console.log('articlefull props', this.props);
    });
  }

  updateState = () => {
    const liElements = this.refs.tags.getElementsByTagName('li');
    let tagValues = [];
    for(let i=0; i<liElements.length; i++) {
      tagValues.push(liElements.item(i).children[0].value);
    }

    const updatedArticle = {
      id: this.state.article.id,
      author: this.refs.author.value,
      content: this.refs.content.value,
      published: this.refs.published.checked,
      tags: tagValues,
      title: this.refs.title.value,
    };
    this.setState({ article: updatedArticle})
  };

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
  };

  edit = () => {
    this.setState({originalArticle: this.state.article});
    this.setState({editing: true});
  };

  cancel = () => {
    this.setState({editing: false});
    this.setState({article: this.state.originalArticle});
  }

  addTag = () => {
    this.refs.tags.innerHTML += '<li><input type="text" value="" onChange={this.updateState} /></li>';
  }

  removeTag = (key) => {
    console.log('key', key);
  }


  render() {
    /*
    let published = <div>Not Published</div>;
    if( this.state.article.published) {
      published = <div>Published</div>
    }
    */

    let tags = <div></div>;
    /*
    if(this.state.article.tags) {
      tags = this.state.article.tags.map((item, key) => (
        <div key={key} className="rounded">{item}</div>
      ));
    }
    */
    if(this.state.article.tags) {
      tags = this.state.article.tags.map((item, key) => (
        <li key={key}><button onClick={this.removeTag(key)} >Remove</button><input type="text" disabled={!this.state.editing} value={item} onChange={this.updateState} /></li>
      ));
    }

    return (
      <div className="rounded">
        <button onClick={this.remove}>Remove</button>
        <button onClick={this.edit}>Edit</button>
        <button onClick={this.cancel}>Cancel</button>
        <div className="rounded">
          <div>Author</div>
          <input type="text" disabled={!this.state.editing} value={this.state.article.author} onChange={this.updateState} ref="author"/>
        </div>
        <div className="rounded">
          <div>Content</div>
          <textarea rows="10" cols="50" disabled={!this.state.editing} value={this.state.article.content} onChange={this.updateState} ref="content" />
        </div>
        <div className="rounded">
          <div>Published</div>
          <input type="checkbox" disabled={!this.state.editing} checked={this.state.article.published} onChange={this.updateState} ref="published" />
        </div>
        <div className="rounded">
          <div>Tags</div>
          <button onClick={this.addTag}>Add Tag</button>
          <ul ref="tags">
          {tags}
          </ul>
        </div>
        <div className="rounded">
          <div>Title</div>
          <input type="text" disabled={!this.state.editing} value={this.state.article.title} onChange={this.updateState} ref="title" />
        </div>
      </div>
    );
  }
}
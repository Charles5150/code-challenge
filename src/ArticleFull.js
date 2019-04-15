import React, {Component} from 'react';

import request from './request';
import {ARTICLE_BY_ID, ARTICLE_REMOVE, ARTICLE_UPDATE, ARTICLE_INSERT} from './queries';

export class ArticleFull extends Component{
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      editing: false,
    };
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    if(id === "new") {
      const emptyArticle = {
        id : "new",
        author : "",
        content : "",
        published : false,
        tags : [],
        title : "",
      }
      this.setState({article : emptyArticle});
      this.setState({editing: true});
      console.log('articlefull state', this.state);
      console.log('articlefull props', this.props);
    } else {
      request(ARTICLE_BY_ID(id)).then(response => {
        this.setState({article: response.data.article});
        console.log('articlefull state', this.state);
        console.log('articlefull props', this.props);
      });
    }
  }

  updateState = () => {
    const liElements = this.refs.tags.getElementsByTagName('li');
    let tagValues = [];
    for(let i=0; i<liElements.length; i++) {
      tagValues.push(liElements.item(i).children[1].value);
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

  save = () => {
    let query;
    if( this.state.article.id === "new") {
      query = ARTICLE_INSERT;
    } else {
      query = ARTICLE_UPDATE;
      query = query.replace('#id', this.state.article.id);
    }

    query = query.replace('#author', this.state.article.author);
    query = query.replace('#content', this.state.article.content.replace(/(\r\n|\n|\r)/gm, ''));
    query = query.replace('#published', this.state.article.published);
    query = query.replace('#tags', JSON.stringify(this.state.article.tags));
    query = query.replace('#title', this.state.article.title);
    request(query).then(response => {
      console.log('article updated or inserted');
      this.props.history.push('/');
    });

  };

  edit = () => {
    this.setState({originalArticle: this.cloneArticle()});
    this.setState({editing: true});
  };

  cancel = () => {
    this.setState({editing: false});
    if( this.state.article.id === "new") {
      this.props.history.push('/');
    } else {
      this.setState({article: this.state.originalArticle});
    }
  };

  cloneArticle = () => {
    const clonedArticle = {
      id: this.state.article.id,
      author: this.state.article.author,
      content: this.state.article.content,
      published: this.state.article.published,
      tags: this.state.article.tags,
      title: this.state.article.title,
    };
    return clonedArticle;
  };

  addTag = () => {
    const cloned = this.cloneArticle();
    cloned.tags.push(" ");
    this.setState({article: cloned});
  };

  removeTag = (event) => {
    const id = event.target.parentElement.id;
    const cloned = this.cloneArticle();
    cloned.tags.splice(id, 1);
    this.setState({article: cloned});
  };


  render() {

    let tags = <div></div>;
    if(this.state.article && this.state.article.tags) {
      tags = this.state.article.tags.map((item, key) => (
        <li id={key} key={key}><button disabled={!this.state.editing} onClick={this.removeTag} >Remove</button><input type="text" disabled={!this.state.editing} value={item} onChange={this.updateState} /></li>
      ));
    }

    return (
      <div className="rounded">
        <button disabled={this.state.editing} onClick={this.remove}>Remove</button>
        <button disabled={this.state.editing} onClick={this.edit}>Edit</button>
        <button disabled={!this.state.editing} onClick={this.cancel}>Cancel</button>
        <button disabled={!this.state.editing} onClick={this.save}>Save</button>
        <div className="rounded">
          <div>Author</div>
          <input type="text" disabled={!this.state.editing} value={this.state.article.author} onChange={this.updateState} ref="author" />
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
          <button disabled={!this.state.editing} onClick={this.addTag}>Add Tag</button>
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
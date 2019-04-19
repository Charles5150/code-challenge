import React, {Component} from 'react';

class ArticleFull extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  };

  update = (article) => {
    this.props.onUpdate(article);
  }

  updateState = () => {
    this.update(this.cloneArticle());
  };

  cloneArticle = () => {
    const liElements = this.refs.tags.getElementsByTagName('li');
    let tagValues = [];
    for(let i=0; i<liElements.length; i++) {
      tagValues.push(liElements.item(i).children[1].value);
    }

    const clonedArticle = {
      id: this.props.article.id,
      author: this.refs.author.value,
      content: this.refs.content.value,
      published: this.refs.published.checked,
      tags: tagValues,
      title: this.refs.title.value,
    };

    return clonedArticle;
  };

  remove = () => {
    if (window.confirm(`Remove Article id ${this.props.article.id} ???`)) {
      this.props.onRemove();
      this.props.history.push('/');
    } else {

    }
  };

  save = () => {
    this.props.onSave();
    this.props.history.push('/');
  };

  edit = () => {
    this.setState({editing: true});
  };

  cancel = () => {
    this.setState({editing: false});
    this.props.onCancel();
  };

  addTag = () => {
    const cloned = this.cloneArticle();
    cloned.tags.push("")
    this.update(cloned);
  };

  removeTag = (event) => {
    const id = event.target.parentElement.id;
    const cloned = this.cloneArticle();
    cloned.tags.splice(id, 1);
    this.update(cloned);
  };



  render() {

    let tags = <div></div>;
    if(this.props.article && this.props.article.tags) {
      tags = this.props.article.tags.map((item, key) => (
        <li id={key} key={key}><button disabled={!this.state.editing} onClick={this.removeTag} >Remove</button><input type="text" disabled={!this.state.editing} value={item} onChange={this.updateState} /></li>
      ));
    }

    if(this.props.fetching) {
      return <div>Fetching ...</div>
    } else {
      return (
        <div className="rounded">
          <button disabled={this.state.editing || this.props.article.id==='new'} onClick={this.remove}>Remove</button>
          <button disabled={this.state.editing} onClick={this.edit}>Edit</button>
          <button disabled={!this.state.editing} onClick={this.cancel}>Cancel</button>
          <button disabled={!this.state.editing} onClick={this.save}>Save</button>
          <div className="rounded">
            <div>Author</div>
            <input type="text" disabled={!this.state.editing} value={this.props.article.author}
                   onChange={this.updateState} ref="author"/>
          </div>
          <div className="rounded">
            <div>Content</div>
            <textarea rows="10" cols="50" disabled={!this.state.editing} value={this.props.article.content}
                      onChange={this.updateState} ref="content"/>
          </div>
          <div className="rounded">
            <div>Published</div>
            <input type="checkbox" disabled={!this.state.editing} checked={this.props.article.published}
                   onChange={this.updateState} ref="published"/>
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
            <input type="text" disabled={!this.state.editing} value={this.props.article.title}
                   onChange={this.updateState} ref="title"/>
          </div>
        </div>
      );
    }
  }
}

export default ArticleFull;
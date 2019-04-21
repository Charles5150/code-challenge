import React from 'react';
import {Button, Preloader, Modal, TextInput, Textarea, Card, Checkbox, Row, Col} from 'react-materialize';

class ArticleFull extends React.Component{
  constructor(props) {
    super();
    this.state = {
      editing: false
    }
  };

  update = (article) => {
    this.props.onUpdate(article);
  };

  updateState = () => {
    this.update(this.cloneArticle());
  };

  cloneArticle = () => {
    const tagElements = document.getElementsByName('tagItem');
    let tagValues = [];
    for(let i=0; i<tagElements.length; i++) {
      tagValues.push(tagElements[i].value);
    }

    return {
      id: this.props.article.id,
      author: document.getElementById('author').value,
      content: document.getElementById('content').value,
      excerpt: document.getElementById('content').value.slice(0, 350),
      published: document.getElementById('published').checked,
      tags: tagValues,
      title: document.getElementById('title').value,
    };
  };

  remove = () => {
    this.props.onRemove();
    this.props.history.push('/');
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
    cloned.tags.push("");
    this.update(cloned);
  };

  removeTag = (event) => {
    const id = Number(event.currentTarget.name);
    const cloned = this.cloneArticle();
    cloned.tags.splice(id, 1);
    this.update(cloned);
  };

  render() {
    let tags = "<Row></Row>";
    if(this.props.article && this.props.article.tags) {
      tags = this.props.article.tags.map((item, key) => (
        <Row key={key}>
          <Col s={1}>
            <Button
              name={key}
              float="left"
              floating
              small
              className="red"
              waves="light"
              icon="delete_forever"
              disabled={!this.state.editing}
              onClick={this.removeTag} >
              Remove
            </Button>
          </Col>
          <Col s={11}>
            <input type="text"
              name="tagItem"
              disabled={!this.state.editing}
              value={item}
              onChange={this.updateState}
            />
          </Col>
        </Row>
      ));
    }

    if(this.props.fetching) {
      return <Preloader size="big" />;
    } else {
      return (

        <Card className="indigo lighten-5">
          <Modal
            id="delete-modal"
            header="Confirm Delete"
            actions={[<Button waves="light" modal="close" onClick={this.remove}>Delete</Button>, <Button waves="light" modal="close">Cancel</Button>]}
          >
            <p>Remove Article id {this.props.article.id} ?</p>
          </Modal>
          <Button waves="light" disabled={this.state.editing || this.props.article.id==='new'} className="modal-trigger" href="#delete-modal">Remove</Button>
          <Button waves="light" disabled={this.state.editing} onClick={this.edit}>Edit</Button>
          <Button waves="light" disabled={!this.state.editing} onClick={this.cancel}>Cancel</Button>
          <Button waves="light" disabled={!this.state.editing} onClick={this.save}>Save</Button>
          <Card title="Author">
            <TextInput id="author" disabled={!this.state.editing} value={this.props.article.author}
                   onChange={this.updateState} ref="author"/>
          </Card>
          <Card title="Content">
            <Textarea id="content" disabled={!this.state.editing} value={this.props.article.content}
                      onChange={this.updateState} ref="content"/>
          </Card>
          <Card>
            <Checkbox id="published" label="Published" value="Published" disabled={!this.state.editing} checked={this.props.article.published}
                   onChange={this.updateState} />
          </Card>
          <Card title="Tags">
            <Button floating
                    className="red"
                    waves="light"
                    icon="add" disabled={!this.state.editing} onClick={this.addTag}>Add Tag</Button>
            <div>
              {tags}
            </div>
          </Card>
          <Card title="Title">
            <TextInput id="title" disabled={!this.state.editing} value={this.props.article.title}
                   onChange={this.updateState} ref="title"/>
          </Card>
        </Card>
      );
    }
  }
}

export default ArticleFull;

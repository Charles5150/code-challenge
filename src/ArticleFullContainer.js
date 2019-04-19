import React from 'react';
import {observer} from 'mobx-react';
import {decorate} from 'mobx';
import ArticleFull from './ArticleFull';
import {store} from './store';


class ArticleFullContainer extends React.Component  {
  constructor(props) {
    super(props);
    store.selectCurrent(this.props.match.params.id);
  }

  render(){
    return (
      <ArticleFull
        fetching={store.currentArticle.fetching}
        article={store.currentArticle.content}
        onSave={store.currentArticle.save}
        onRemove={store.currentArticle.remove}
        onUpdate={store.currentArticle.update}
        onCancel={store.currentArticle.cancel}
        history={this.props.history}
      />
    )
  }
}

decorate(ArticleFullContainer,{
  this: observer,
});

export default ArticleFullContainer;
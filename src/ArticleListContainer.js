import React from 'react';
import {observer} from 'mobx-react';
import ArticleList from './ArticleList';
import {store} from './store';


const ArticleListContainer = observer(() => {
  return (
    <ArticleList
      fetching={store.fetching}
      articles={store.list}
    />
  )
});

export default ArticleListContainer;

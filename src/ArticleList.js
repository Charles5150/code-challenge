import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({fetching, articles}) => {
  if( fetching ) {
    return <div>Fetching....</div>
  } else {
    const list = articles.map((item, key) => (
      <ArticleItem
        author={item.author}
        excerpt={item.excerpt}
        id={item.id}
        key={key}
      />
    ));

    return (
      <div>
        <div>{list}</div>
      </div>
    );
  }
}

export default ArticleList;



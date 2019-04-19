import React from 'react';
import {Link} from 'react-router-dom';

const ArticleItem = ({id, author, excerpt}) => {
  return (
    <div className="rounded">
      <Link to={`/${id}`}>
        View
      </Link>
      <div className="rounded">
        {author}
      </div>
      <div className="rounded">
        {excerpt}
      </div>
    </div>
  );
}

export default ArticleItem;

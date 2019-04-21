import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Card} from 'react-materialize';

const ArticleItem = ({id, author, excerpt}) => {
  return(
    <Col s={4}>
      <Link to={`/${id}`}>
        <Card
          className="deep-purple darken-1"
          textClassName="white-text"
          title={author}
        >
          {excerpt}
        </Card>
      </Link>
    </Col>
  )
};

export default ArticleItem;

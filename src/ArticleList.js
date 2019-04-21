import React from 'react';
import ArticleItem from './ArticleItem';
import {Button, Icon, Preloader, Row, Card} from 'react-materialize';
import {Link} from "react-router-dom";

const ArticleList = ({fetching, articles}) => {
  if( fetching ) {
    return <Preloader size="big" />;
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
      <Card className="indigo lighten-5">
      <Link to="/new">
        <Button waves="light" style={{marginRight: '5px'}}>
          New
          <Icon left>
            add
          </Icon>
        </Button>
      </Link>
      <Row>{list}</Row>;
      </Card>
    )
  }
};

export default ArticleList;



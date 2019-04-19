
import { decorate, observable, action } from 'mobx';
import request from "./request";
import {ARTICLES_QUERY} from "./queries";
import {ARTICLE_BY_ID, ARTICLE_REMOVE, ARTICLE_UPDATE, ARTICLE_INSERT} from "./queries";

class ArticleList {

  list = [];
  fetching = false;
  currentArticle = {};

  constructor() {
    this.fetchList();
    this.currentArticle = new Article(this);
  }

  fetchList = () => {
    this.fetching = true;
    request(ARTICLES_QUERY).then(response => {
      this.list = response.data.articles ;
      this.fetching = false;
    });
  }

  selectCurrent = (id) => {
    this.currentArticle.fetchArticle(id);
  }
}

class Article {
  fetching = false;
  content = {};
  parent = {};

  constructor(parent) {
    this.parent = parent;
    this.fetchArticle('new');
  };

  fetchArticle = (id) => {
    this.fetching = true;
    if(id === 'new') {
      this.content = {
        id : "new",
        author : "",
        content : "",
        published : false,
        tags : [],
        title : "",
      };
      this.fetching = false;
    } else {
      request(ARTICLE_BY_ID(id)).then(response => {
        this.content = response.data.article;
        this.fetching = false;
      });
    }
  }

  save = () => {
    let query;
    if( this.content.id === "new") {
      query = ARTICLE_INSERT;
    } else {
      query = ARTICLE_UPDATE;
      query = query.replace('#id', this.content.id);
    }

    query = query.replace('#author', this.content.author);
    query = query.replace('#content', this.content.content.replace(/(\r\n|\n|\r)/gm, ''));
    query = query.replace('#published', this.content.published);
    query = query.replace('#tags', JSON.stringify(this.content.tags));
    query = query.replace('#title', this.content.title);
    request(query).then(response => {
      console.log('article updated or inserted');
      this.parent.fetchList();
    });
  };

  remove = () => {
    let query = ARTICLE_REMOVE;
    query = query.replace('#id',this.content.id);
    request(query).then(response => {
      console.log('article removed');
      this.parent.fetchList();
    });
  };

  update = (article) => {
    this.content = article;
  }

  cancel = () => {
    this.fetchArticle(this.content.id);
  }
}

decorate(ArticleList, {
  list: observable,
  fetching: observable,
  selectCurrent : action,
});

decorate(Article, {
  content : observable,
  fetching : observable,
  currentArticle : observable,
  cancel : action,
  update: action,
});

const store = new ArticleList();
console.log('store', store);

export {store} ;


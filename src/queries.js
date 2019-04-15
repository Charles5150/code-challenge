export const ARTICLES_QUERY = `{
  articles {
    author
    excerpt
    id
    title
  }
}`;

export const ARTICLE_BY_ID = (id) => `{
  article(id: "${id}") {
    id
    author
    content
    published
    tags
    title
  }
}`;

export const ARTICLE_REMOVE = 'mutation{remove(id:"#id"){id}}';

export const ARTICLE_UPDATE = 'mutation{update(id:"#id",author:"#author",content:"#content",published:#published,tags:#tags,title:"#title"){id}}';

export const ARTICLE_INSERT = 'mutation{insert(author:"#author",content:"#content",published:#published,tags:#tags,title:"#title"){id}}';
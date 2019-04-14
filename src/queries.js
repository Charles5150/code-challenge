export const ARTICLES_QUERY = `{
  articles {
    author
    excerpt
    id
    title
  }
}`;

export const ARTICLES_FULL = `{
  articles {
    author
    content
    published
    tags
    title
  }
}`;

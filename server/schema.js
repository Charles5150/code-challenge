import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} from 'graphql';
import db from './db';

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'This represents a Article',
  fields: () => ({
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    excerpt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    published: {
      type: GraphQLBoolean,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    articles: {
      type: new GraphQLList(articleType),
      resolve() {
        return db.Article.find();
      },
    },
    article: {
      type: articleType,
      args: {
        id: { type: GraphQLString}
      },
      resolve(obj, { id }) {
        return db.Article.findById(id);
      }
    }
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    remove: {
      type: articleType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }) {
        return db.Article.remove({ _id: id });
      },
    },

  },
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation
});

export default Schema;

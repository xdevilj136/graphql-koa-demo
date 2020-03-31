const {
  gql
} = require('apollo-server-koa');

// Construct a schema, using GraphQL schema language
const typeDefs = gql `
  type Query {
    bookList(names: [String]): [BookInfo]
    bookInfo(id: String!): BookInfo
    authorInfo(name: String!): AuthorInfo
  }
  type BookInfo {
    _id: String!
    name: String
    author: String
    isbn: String
    url: String
    img: String
  }
  type AuthorInfo {
    _id: String!
    name: String
    address: String
    company: String
    books: [String]
  }
`;

console.log('typeDefs', typeDefs)

module.exports = {
  typeDefs
};

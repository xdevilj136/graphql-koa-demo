// gql标签函数，用于解析查询模版字符串生成graphql标准的AST以便组件能进行统一处理
const { gql } = require("apollo-server-koa");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query { 
    bookList(names: [String]): [BookInfo]
    bookDetail(id: String): BookDetail
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
    books: [BookInfo]
  }
  type BookDetail {
    bookInfo: BookInfo,
    authorInfo: AuthorInfo
  }
`;

module.exports = {
  typeDefs
};

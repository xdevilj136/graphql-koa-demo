// Provide resolver functions for your schema fields

const monk = require('monk');
const db = monk('localhost/library');
const books = db.get('books');
const authors = db.get('authors');

const resolvers = {
  Query: {
    bookList(parent, args, context, info) {
      // 根据书名查询书籍信息
      const names = args.names;
      let params = Array.isArray(names) ? {
        name: {
          $in: names
        }
      } : {};
      return books.find(params, {
        sort: {
          img: -1
        }
      });
    },
    // 根据id查询书籍信息
    bookInfo(parent, args, context, info) {
      const id = args.id;
      return books.findOne({
        _id: id
      });
    },
    // 根据作者名称查询作者信息
    authorInfo(parent, args, context, info) {
      const name = args.name;
      return authors.findOne({
        name
      });
    }
  },
};

/**
 * mock数据测试用
 * */
// const resolvers = {
//   Query: {
//     bookList(){return [{
//         author: "Stoyan Stefanov",
//         img: "https://www.safaribooksonline.com/library/cover/9781449336059/250w/",
//         isbn: "978-1449320195",
//         name: "JavaScript for PHP Developers",
//         url: "http://books.google.co.in/books?id=QT56xKb-S3sC",
//         _id: "53de0a545ac981c45fc30acd"
//       },
//       {
//         author: "Stoyan Stefanov",
//         isbn: "978-1449320195",
//         name: "JavaScript for PHP Developers",
//         url: "http://books.google.co.in/books?id=QT56xKb-S3sC",
//         _id: "53de0a545ac981c45fc30acd"
//       }
//     ]},
//     bookInfo(parent, args, context, info) {
//       return {
//         author: "Stoyan Stefanov",
//         img: "https://www.safaribooksonline.com/library/cover/9781449336059/250w/",
//         isbn: "978-1449320195",
//         name: "JavaScript for PHP Developers",
//         url: "http://books.google.co.in/books?id=QT56xKb-S3sC",
//         _id: "53de0a545ac981c45fc30acd"
//       }
//     },
//     authorInfo(parent, args, context, info) {
//       return {
//         "_id": "test001",
//         "name": "Stoyan Stefanov",
//         "address": "Los Angeles, California",
//         "company": "Yahoo",
//         "books": ["JavaScript Patterns", "Object-Oriented Javascript", "Book of Speed [Online]", "JavaScript for PHP Developers"]
//       }
//     }
//   },
// };

module.exports = {
  resolvers
};

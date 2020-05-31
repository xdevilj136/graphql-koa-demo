// Provide resolver functions for your schema fields

const monk = require('monk');
const db = monk('localhost/library');
const books = db.get('books');
const authors = db.get('authors');

const resolvers = {
  Query: {
    // 根据书名查询书籍信息
    bookList(parent, args, context, info) {
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
    // 根据id查询书籍详情
    async bookDetail(parent, args, context, info){
      const id = args.id;
      const bookInfo = await books.findOne({
        _id: id
      });
      const authorInfo = await authors.findOne({
        name: bookInfo.author
      });
      let params = {
        name:{
          $in: authorInfo.books
        }
      }
      const otherBookInfos = await books.find(params);

      return {bookInfo, authorInfo:{
        ...authorInfo,
        books:otherBookInfos
      }};
    }

  },
};


module.exports = {
  resolvers
};

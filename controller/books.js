'use strict';
const monk = require('monk');
const db = monk('localhost/library');
const books = db.get('books');
const authors = db.get('authors');


// 获取books 列表
module.exports.all = async (ctx, next) => {
  try {
    const bookList = await books.find({}, {
      sort: {
        img: -1
      }
    });
    ctx.body = {
      bookList
    }
    ctx.status = 200
  } catch (error) {
    console.log(error);
    ctx.body = {
      data: {
        info: '错误'
      }
    }
    ctx.status = -1
  }
};

// API id获取书籍信息
module.exports.fetchBookInfoById = async (ctx, next) => {
  const id = ctx.request.query.id;
  try {
    const bookInfo = await books.findOne({
      _id: id
    });
    ctx.body = {
      bookInfo
    }
    ctx.status = 200
  } catch (error) {
    console.log('fetchBookInfoById error', error);
    ctx.body = {
      data: {
        info: 'fetchBookInfoById ' + id + ' error'
      }
    }
    ctx.status = -1
  }
};

// API 根据作者名字获取作者信息
module.exports.fetchAuthorInfoByName = async (ctx, next) => {
  let name = ctx.request.query.name;
  try {
    const authorInfo = await authors.findOne({
      name
    });
    ctx.body = {
      authorInfo
    }
    ctx.status = 200
  } catch (error) {
    console.log('fetchAuthorInfoByName error', error);
    ctx.body = {
      data: {
        info: 'fetchAuthorInfoByName ' + name + ' error'
      }
    }
    ctx.status = -1
  }
};

// API 书名获取书籍信息
module.exports.fetchBookInfoByName = async (ctx, next) => {
  let body = ctx.request.body;
  let names = body.names;
  try {
    const publishBookInfo = await books.find({
      name: {
        $in: names
      }
    });
    ctx.body = {
      publishBookInfo
    }
    ctx.status = 200
  } catch (error) {
    console.log('fetchBookInfoByName error', error);
    ctx.body = {
      data: {
        info: 'fetchBookInfoByName ' + names + ' error'
      }
    }
    ctx.status = -1
  }
};

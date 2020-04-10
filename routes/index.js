const router = require('koa-router')()
const books = require('../controller/books');


// router.get('/', async (ctx, next) => {
//   ctx.redirect('/index.html'); 
// })

router.post('/fetchBookList/', books.fetchBookList);
router.get('/fetchBookInfoById/', books.fetchBookInfoById);
router.get('/fetchAuthorInfoByName/', books.fetchAuthorInfoByName);

module.exports = router

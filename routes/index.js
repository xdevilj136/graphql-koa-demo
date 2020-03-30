const router = require('koa-router')()
const books = require('../controller/books');


// router.get('/', async (ctx, next) => {
//   ctx.redirect('/index.html'); 
// })

router.get('/books/', books.all);
router.get('/fetchBookInfoById/', books.fetchBookInfoById);
router.get('/fetchAuthorInfoByName/', books.fetchAuthorInfoByName);
router.post('/fetchBookInfoByName/', books.fetchBookInfoByName);

module.exports = router

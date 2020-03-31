const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaWebpack = require('koa-webpack')
const index = require('./routes/index')
const webpackConfig = require('./web/webpack.config.js')
const { ApolloServer } = require('apollo-server-koa');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');


const isProd = process.env.NODE_ENV === 'production';
// error handler
onerror(app)

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))



// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// routes
app.use(index.routes(), index.allowedMethods())
// app.use(route.get('/books/', async(ctx)=>{
//   ctx.body = []
// }));

// app.use(history({
//   htmlAcceptHeaders: ['text/html'],
//   index: '/'
// }));
// app.use(require('koa-static')(__dirname + '/vue-dist'))
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.use(async (ctx, next) => {
  isProd ? '' : await registerWebpack();
  await next()
})

// 创建graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({
  app
});
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

async function registerWebpack() {
  return new Promise(resolve => {
    koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        stats: 'minimal'
      }
    }).then(middleware => {
      app.use(middleware)
      resolve()
    })
  })
}

app.listen({
    port: 4000
  }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);

module.exports = app

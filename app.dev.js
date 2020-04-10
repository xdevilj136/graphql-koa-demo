const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const staticServer = require("koa-static");
const koaWebpack = require("koa-webpack");
const index = require("./routes/index");
const webpackConfig = require("./web/webpack.dev.config.js");
const { ApolloServer } = require("apollo-server-koa");
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");

// middlewares
app.use(logger());

//渲染引擎
app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);
// bodyparser
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
// pretty-json 美化json输出
app.use(json());

// routes allowedMethods方法自动设置status、丰富response的header
app.use(index.routes(), index.allowedMethods());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.use(async (ctx, next) => {
  await registerWebpack();
  await next();
});

// 创建graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true
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
        stats: "minimal"
      }
    }).then(middleware => {
      app.use(middleware);
      resolve();
    });
  });
}

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

module.exports = app;

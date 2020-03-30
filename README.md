__如何启动?__

```sh
1. 安装mongodb

2. 导入数据
$ cd graphql-koa-demo
$ mongoimport -d library -c books ./books.json  # Import the DB, makes sure mongod is running.
$ mongoimport -d library -c authors ./authors.json  # Import the DB, makes sure mongod is running.

$ npm install

$ npm run start



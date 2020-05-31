import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

// 提供客户端通过http链接请求graphql接口
const httpLink = new HttpLink({
  // 可增加请求选项和 http headers 
  credentials: 'same-origin'
});

const client = new ApolloClient({
  httpLink,
  cache: new InMemoryCache()  // 处理graphql本地缓存的组件
});

Vue.prototype.graphqlClient = client;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

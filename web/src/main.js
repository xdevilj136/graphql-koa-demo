import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";

// 集中错误处理
const errorLink = onError(({ response, operation, graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError){
    // console.log(`[Network error]: ${networkError}`);
  } 
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  // Additional fetch options like `credentials` or `headers`
  credentials: 'same-origin'
});

const link = httpLink.concat(errorLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

Vue.config.productionTip = false;
Vue.prototype.graphqlClient = client;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

<template>
  <div class="home">
    <button @click="getgraphql">获取graphql</button>

    <h1>Book List:</h1>
    <ul class="books">
      <router-link
        class="book-item"
        v-for="(book,index) in bookList"
        :key="index"
        :to="'/detail/'+encodeURIComponent(book._id)"
      >
        <img class="book-item-img" :src="book.img" alt />
        <span>{{ book.name }}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "List",
  components: {},
  data() {
    return {
      bookList: []
    };
  },
  created() {
    this.initBookList();
  },
  methods: {
    async postFetch(url, data) {
      let response = await fetch(url, {
        body: JSON.stringify(data || {}), // must match 'Content-Type' header
        headers: {
          "content-type": "application/json"
        },
        method: "POST" // *GET, POST, PUT, DELETE, etc.
      });
      return await response.json();
    },
    async initBookList() {
      // 查询所有书籍列表
      let { bookList } = await this.postFetch("/fetchBookList", {});
      this.bookList = bookList;
    },
    getgraphql() {
      this.graphqlClient
        .query({
          query: gql`
            query GetBookList {
              bookList {
                _id
                name
              }
            }
          `,
          fetchPolicy: 'network-only'  // default 'cache-first'
        })
        .then(result => console.log(result));
    }
  }
};
</script>

<style lang="less" scoped>
.books {
  display: flex;
  flex-flow: column;
  justify-content: center;
  .book-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .book-item-img {
    margin-right: 8px;
    width: 40px;
  }
}

a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  color: #42b983;
}
a.router-link-exact-active {
  color: #42b983;
}
</style>>
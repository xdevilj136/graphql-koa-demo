<template>
  <div class="home">
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
    async getFetch(url, data) {
      let response = await fetch(url);
      return await response.json();
    },
    async initBookList() {
      let { bookList } = await this.getFetch("/books");
      this.bookList = bookList;
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
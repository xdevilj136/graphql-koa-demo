<template>
  <div class="book-info">
    <div class="book-detail">
      <img alt :src="bookInfo.img" width="260" />
      <p>{{bookInfo.name}}</p>
      <p v-if="bookInfo.isbn">isbn: {{bookInfo.isbn}}</p>
    </div>
    <div class="author-detail">
      <p>作者：{{bookInfo.author}}</p>
      <p>出版书籍：</p>
      <div class="publish-books">
        <div class="book-item" v-for="(publishBook,index) in publishBooks" :key="index">
          <img alt :src="publishBook.img" height="60" />
          <p>{{publishBook.name}}</p>
          <p v-if="publishBook.isbn">isbn: {{publishBook.isbn}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  components: {},
  data() {
    return {
      bookId: "",
      bookInfo: {},
      authorDetail: {},
      publishBooks: []
    };
  },
  created() {
    this.fetchDetailInfo();
  },
  methods: {
    async getFetch(url, data) {
      let response = await fetch(url);
      return await response.json();
    },
    async postFetch(url, data) {
      let response = await fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
          "content-type": "application/json"
        },
        method: "POST" // *GET, POST, PUT, DELETE, etc.
      });
      return await response.json();
    },
    async fetchDetailInfo() {
      this.bookId = this.$route.params.id;
      let { bookInfo } = await this.getFetch(
        `/fetchBookInfoById?id=${this.bookId}`
      );
      console.log("bookInfo", bookInfo);
      this.bookInfo = bookInfo;
      let author = bookInfo.author;
      let { authorInfo } = await this.getFetch(
        `/fetchAuthorInfoByName?name=${author}`
      );
      console.log("authorInfo", authorInfo);
      let { publishBookInfo } = await this.postFetch("/fetchBookInfoByName", {
        names: authorInfo.books
      });
      console.log("publishBookInfo", publishBookInfo);
      this.publishBooks = publishBookInfo;
    }
  }
};
</script>

<style lang="less" scoped>
.book-info {
  display: flex;
  justify-content: center;
  .book-detail {
    margin-right: 20px;
  }
}
.author-detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;
}
.publish-books {
  display: flex;
  justify-content: center;
  .book-item {
    margin-right: 8px;
  }
}
</style>>

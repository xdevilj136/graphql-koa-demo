<template>
  <div class="book-info">
    <div class="book-detail">
      <img alt :src="bookInfo.img" width="260" />
      <p>{{ bookInfo.name }}</p>
      <p v-if="bookInfo.isbn">isbn: {{ bookInfo.isbn }}</p>
    </div>
    <div class="author-detail">
      <p>作者：{{ bookInfo.author }}</p>
      <p>出版书籍：</p>
      <div class="publish-books">
        <div
          class="book-item"
          v-for="(publishBook, index) in publishBooks"
          :key="index"
        >
          <img alt :src="publishBook.img" height="60" />
          <p>{{ publishBook.name }}</p>
          <p v-if="publishBook.isbn">isbn: {{ publishBook.isbn }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "Detail",
  components: {},
  data() {
    return {
      bookId: "",
      bookInfo: {},
      publishBooks: []
    };
  },
  created() {
    // this.fetchDetailInfo();
    this.getGraphqlBookDetail().then(res=>{
      console.log(res)
      let bookDetail = res.data.bookDetail;
      this.bookInfo = bookDetail.bookInfo;
      this.publishBooks = bookDetail.authorInfo.books;
    });
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
      // 查询书籍详情
      this.bookId = this.$route.params.id;
      let { bookInfo } = await this.getFetch(
        `/fetchBookInfoById?id=${this.bookId}`
      );
      console.log("bookInfo", bookInfo);
      this.bookInfo = bookInfo;
      // 根据书籍作者名称查询作者详情
      let author = bookInfo.author;
      let { authorInfo } = await this.getFetch(
        `/fetchAuthorInfoByName?name=${author}`
      );
      console.log("authorInfo", authorInfo);
      // 查询作者出版的其他书籍详情
      let { bookList } = await this.postFetch("/fetchBookList", {
        names: authorInfo.books
      });
      console.log("bookList", bookList);
      this.publishBooks = bookList;
    },
    // graphql接口查询书籍列表
    getGraphqlBookDetail() {
      this.bookId = this.$route.params.id;
      return this.graphqlClient.query({
        query: gql`
          {
            bookDetail(id: "${this.bookId}") {
              bookInfo {
                name
                img
                isbn 
                author
              }
              authorInfo {
                books {
                  name
                  img
                  isbn
                }
              }
            }
          }
        `,
        fetchPolicy: "network-only" // default 'cache-first'
      });
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
}</style
>>

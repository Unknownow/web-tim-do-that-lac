<template>
  <div style="background-color: #ffffff; margin: 50px;">
    <div>
      <search-component></search-component>
      <div>
        <h1>{{ $t("category.title") }}</h1>
      </div>
      <div>
        <a-row :gutter="8">
          <a-col
            class="gutter-row"
            :lg="{ span: 12 }"
            :sm="{ span: 12 }"
            :xs="{ span: 24 }"
          >
            <div
              class="gutter-box"
              style="cursor: pointer"
              v-on:click="handleRenderPostCategory('phone')"
            >
              <img src="/category/phone.jpg" width="100%" />
              <div class="centered">{{ $t("category.phone") }}</div>
            </div>
          </a-col>
          <a-col
            class="gutter-row"
            :lg="{ span: 12 }"
            :sm="{ span: 12 }"
            :xs="{ span: 24 }"
          >
            <div
              class="gutter-box"
              style="cursor: pointer"
              v-on:click="handleRenderPostCategory('paper')"
            >
              <img src="/category/personaldocument.jpg" width="100%" />
              <div class="centered">{{ $t("category.paper") }}</div>
            </div>
          </a-col>
          <a-col
            class="gutter-row"
            :lg="{ span: 8 }"
            :sm="{ span: 8 }"
            :xs="{ span: 24 }"
          >
            <div
              class="gutter-box"
              style="cursor: pointer"
              v-on:click="handleRenderPostCategory('wallet')"
            >
              <img src="/category/wallet.jpg" width="100%" />
              <div class="centered">{{ $t("category.wallet") }}</div>
            </div>
          </a-col>
          <a-col
            class="gutter-row"
            :lg="{ span: 8 }"
            :sm="{ span: 8 }"
            :xs="{ span: 24 }"
          >
            <div
              class="gutter-box"
              style="cursor: pointer"
              v-on:click="handleRenderPostCategory('atm')"
            >
              <img src="/category/atm.png" width="100%" />
              <div class="centered">{{ $t("category.atm") }}</div>
            </div>
          </a-col>
          <a-col
            class="gutter-row"
            :lg="{ span: 8 }"
            :sm="{ span: 8 }"
            :xs="{ span: 24 }"
          >
            <div
              class="gutter-box"
              style="cursor: pointer"
              v-on:click="handleRenderPostCategory('laptop')"
            >
              <img src="/category/laptop.jpg" width="100%" />
              <div class="centered">{{ $t("category.laptop") }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div>
      <news-component
        v-bind:dataPost="this.$store.state.dataPost"
      ></news-component>
    </div>
    <div>
      <a-pagination
        v-model="currentPage"
        :total="totalPost"
        style="margin-top: 500px"
        :defaultPageSize="9"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script>
import News from "../components/News.vue";
import Search from "../components/Search.vue";
import axios from "axios";
export default {
  components: {
    "news-component": News,
    "search-component": Search
  },
  data() {
    return {
      // dataPost: null
      category: null,
      totalPost: 0,
      indexStart: 0,
      indexEnd: 8,
      currentPage: 1
    };
  },
  beforeCreate() {},
  beforeMount() {
    this.$store.state.dataPost = null;
    this.category = this.$router.history.current.params.category;
    this.getPostCategory(this.category, this.indexStart, this.indexEnd);
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to.params.category);
    this.$store.state.dataPost = null;
    this.category = to.params.category;
    this.getPostCategory(this.category, this.indexStart, this.indexEnd);
    next();
  },
  methods: {
    handleRenderPostCategory(category) {
      // console.log("renders");
      this.$router.push({
        name: "news",
        params: { category: category }
      });
    },
    changePage: function(page) {
      this.currentPage = page;
      this.indexStart = (this.currentPage - 1) * 6;
      this.indexEnd = this.currentPage * 6 - 1;
      this.getPostCategory(this.category, this.indexStart, this.indexEnd);
    },
    getPostCategory: function(category, start, end) {
      let url =
        "http://localhost:3000/post/search?&categories=" +
        category +
        "&start=" +
        start +
        "&end=" +
        end;
      console.log(url);
      axios
        .get(url)
        .then(response => {
          this.$store.state.dataPost = response.data.results;
          // console.log(this.dataPost);
          this.totalPost = this.$store.state.dataPost.length;
          console.log(this.$store.state.dataPost.length);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
    }
  }
};
</script>
<style scoped>
.centered {
  color: white;
  /* width: 94%;
  background: rgba(0, 0, 0, .2) ; */
  /* font-size: 55px; */
  font-size: 3vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.gutter-box {
  /* background: #00a0e9; */
  padding: 0px 15px 0px 15px; /* bot, right. top. left */
}
</style>

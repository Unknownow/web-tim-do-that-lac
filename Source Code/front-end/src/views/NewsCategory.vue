<template>
  <div style="background-color: #ffffff; margin: 50px">
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
              <img
                src="/category/phone.jpg"
                style="filter: brightness(70%); margin-bottom: 5px"
                width="100%"
              />
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
              <img
                src="/category/personaldocument.jpg"
                style="filter: brightness(70%); margin-bottom: 5px"
                width="100%"
              />
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
              <img
                src="/category/wallet.jpg"
                style="filter: brightness(70%);"
                width="100%"
              />
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
              <img
                src="/category/atm.png"
                style="filter: brightness(70%);"
                width="100%"
              />
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
              <img
                src="/category/laptop.jpg"
                style="filter: brightness(70%);"
                width="100%"
              />
              <div class="centered">{{ $t("category.laptop") }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- <div style="width: 100%; height: 100%; margin: 0 auto;"> -->
    <a-spin :spinning="spinning" size="large">
      <!-- </div> -->
      <div>
        <news-component
          v-bind:dataPost="this.$store.state.dataPost"
        ></news-component>
      </div>
    </a-spin>
    <a-pagination
      style="width: 100%; height: 100%; margin-top: 66%"
      v-model="this.$store.state.currentPage"
      :total="this.$store.state.totalPost"
      :defaultPageSize="9"
      @change="changePage"
    />
    <!-- <div style="position: relative;">
      <a-pagination
        v-model="this.$store.state.currentPage"
        :total="this.$store.state.totalPost"
        :defaultPageSize="9"
        @change="changePage"
      />
    </div> -->
  </div>
</template>

<script>
import News from "../components/News.vue";
import Search from "../components/Search.vue";
import axios from "axios";
import { CookieFunctions } from "../functions/CookieFunctions";
export default {
  components: {
    "news-component": News,
    "search-component": Search
  },
  data() {
    return {
      // dataPost: null
      category: null,
      indexStart: 0,
      indexEnd: 4,
      spinning: true
    };
  },
  mounted() {
    this.$store.state.dataPost = null;
    this.$store.state.currentPage = 1;
    this.$store.state.totalPost = 0;
    this.category = this.$router.history.current.params.category;
    this.getPostCategory(this.category, this.indexStart, this.indexEnd);
  },
  beforeRouteUpdate(to, from, next) {
    // console.log("asdsaj", to.params.category);
    this.$store.state.dataPost = null;
    this.$store.state.currentPage = 1;
    this.$store.state.totalPost = 0;
    this.category = to.params.category;
    this.getPostCategory(this.category, 0, 8);
    next();
  },
  methods: {
    handleRenderPostCategory(category) {
      this.$store.state.currentPage = 1;
      this.$store.state.totalPost = 0;
      // console.log("renders");
      window.scrollBy(0, 450);
      this.$router.push({
        name: "news",
        params: { category: category }
      });
    },
    changePage(page) {
      this.$store.state.currentPage = page;
      this.indexStart = (page - 1) * 9;
      this.indexEnd = page * 9 - 1;
      this.getPostCategory(this.category, this.indexStart, this.indexEnd);
    },
    getPostCategory(category, start, end) {
      this.spinning = true;
      let url =
        "http://202.191.56.159:2828/post/search?&categories=" +
        category +
        "&start=" +
        start +
        "&end=" +
        end;
      // console.log(url);
      axios
        .get(url)
        .then(response => {
          if (
            CookieFunctions.readCookie("sessionId") === null ||
            CookieFunctions.readCookie("sessionId") === ""
          ) {
            // nếu chưa đăng nhập sẽ che số điện thoại đi
            this.encodeTel(response.data.results.listPosts);
          }
          this.$store.state.dataPost = response.data.results.listPosts;
          // console.log(this.dataPost);
          this.$store.state.totalPost = response.data.results.countDocuments;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
      this.spinning = false;
    },
    encodeTel: function(dataPost) {
      dataPost.map(post => {
        post.tel = post.tel.slice(0, post.tel.length - 3);
        post.tel = post.tel + "xxx";
        // console.log("xaxs");
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

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
    <div style="margin-bottom: 830px">
      <news-component
        v-bind:dataPost="this.$store.state.dataPost"
      ></news-component>
    </div>
    <div style="color: white">.....</div>
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
    };
  },
  beforeCreate() {
    axios
      .get("http://202.191.56.159:2828/post/getPost?start=0&end=5")
      .then(response => {
        if (
          CookieFunctions.readCookie("sessionId") === null ||
          CookieFunctions.readCookie("sessionId") === ""
        ) {
          // nếu chưa đăng nhập sẽ che số điện thoại đi
          this.encodeTel(response.data.results);
        }
        this.$store.state.dataPost = response.data.results;
        // console.log(response.data.results);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  },
  methods: {
    encodeTel: function(dataPost) {
      dataPost.map(post => {
        post.tel = post.tel.slice(0, post.tel.length - 3);
        post.tel = post.tel + "xxx";
        // console.log("xaxs");
      });
    },
    handleRenderPostCategory(category) {
      // console.log("renders");
      this.$router.push({
        name: "news",
        params: { category: category }
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

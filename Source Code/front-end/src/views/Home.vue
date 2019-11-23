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
            <div class="gutter-box">
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
            <div class="gutter-box">
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
            <div class="gutter-box">
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
            <div class="gutter-box">
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
            <div class="gutter-box">
              <img src="/category/laptop.jpg" width="100%" />
              <div class="centered">{{ $t("category.laptop") }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div style="margin-bottom: 330px">
      <news-component v-bind:dataPost="dataPost"></news-component>
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
      dataPost: null
    };
  },
  beforeCreate() {
    axios
      .get("http://localhost:3000/post/getPost?start=0&end=5")
      .then(response => {
        this.dataPost = response.data.results;
        // console.log(this.dataPost);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  },
  methods: {}
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

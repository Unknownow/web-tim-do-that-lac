<template>
  <div style="width: 100%; background-color: #ffffff; margin-top: 50px;">
    <div style="position: relative">
      <img src="/category/headerdetail.jpg" width="100%" />
      <div
        id="leftContent"
        style="font-size: 20px; margin-left: 60px; color: white"
      >
        <div style="font-size: 30px;">
          {{ this.title }}
        </div>
        <div style="margin-left: 0px;">
          <a-icon theme="filled" type="phone" />
          <span style="margin-left: 10px">
            {{ this.nameContact }}: {{ this.tel }}</span
          >
        </div>
        <div style="margin-left: 0px;">
          <a-icon theme="filled" type="compass" />
          <span style="margin-left: 10px"> {{ this.address }}</span>
        </div>
        <!-- <div id="category" style="margin-left: 0px">Ví</div> -->
      </div>
      <div id="rightContent">
        <div style="font-size: 25px; color: white">
          <div style="display:inline-block">
            <a-icon theme="filled" type="message" />
            <span style="margin-left: 10px">{{ $t("detail.reply") }}</span>
          </div>
          <div style="display:inline-block; margin-left: 40px">
            <a-icon type="share-alt" />
            <span style="margin-left: 10px">{{ $t("detail.share") }}</span>
          </div>
        </div>
        <div style="margin-top: 30px">
          <a-button type="primary" v-scroll-to="'#endPage'">
            {{ $t("detail.comment") }}</a-button
          >
          <a-button
            type="primary"
            style="margin-left: 30px"
            v-if="this.canModify"
            v-on:click="routeEdit"
          >
            Sửa bài viết</a-button
          >
        </div>
      </div>
    </div>
    <div id="mainContent">
      <div
        style="display:inline-block; width: 60%; float:left; margin-left: 50px;"
      >
        <div id="description">
          <div style="float: left; font-size: 25px">
            <a-icon type="info-circle" />
            <span style="margin-left: 10px;">{{ $t("detail.detail") }}</span>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div id="description" style="width: 100%; text-align: left">
          {{ this.description }}
          <div style="margin-top: 50px">
            <a-carousel arrows>
              <div
                slot="prevArrow"
                class="custom-slick-arrow"
                style="left: 10px;zIndex: 1"
              >
                <a-icon type="left-circle" />
              </div>
              <div
                slot="nextArrow"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle" />
              </div>
              <div v-for="imgLink in imageLinks" :key="imgLink.index">
                <img :src="imgLink" width="100%" />
              </div>
            </a-carousel>
          </div>
        </div>
      </div>
      <div style="display:inline-block; float: left">
        <div id="category">
          <div style="margin-left: -30%">
            <a-icon type="check-circle" />
            <span style="margin-left: 10px;">{{ $t("detail.category") }}</span>
          </div>
          <div>
            <hr style="width: 50%; margin-top: 3px; margin-left: 20%" />
          </div>
          <div style="margin-top: 15px; margin-left: 100px">
            <!-- <a-checkbox-group>
              <div>
                <a-checkbox value="wallet">{{
                  $t("navbar.wallet")
                }}</a-checkbox>
              </div>
              <div>
                <a-checkbox value="paper">{{ $t("navbar.paper") }}</a-checkbox>
              </div>
              <div>
                <a-checkbox value="phone">{{ $t("navbar.phone") }}</a-checkbox>
              </div>
              <div>
                <a-checkbox value="other">{{ $t("navbar.other") }}</a-checkbox>
              </div>
            </a-checkbox-group> -->
            <div style="width: 100px">
              <a-checkbox
                style="float:left"
                :checked="checkWallet"
                value="wallet"
                >{{ $t("navbar.wallet") }}</a-checkbox
              >
            </div>
            <div style="width: 115px">
              <a-checkbox
                style="float:left"
                :checked="checkPaper"
                value="paper"
                >{{ $t("navbar.paper") }}</a-checkbox
              >
            </div>
            <div style="width: 120px">
              <a-checkbox
                style="float:left"
                :checked="checkPhone"
                value="phone"
                >{{ $t("navbar.phone") }}</a-checkbox
              >
            </div>
            <div style="width: 100px">
              <a-checkbox
                style="float:left"
                :checked="checkOther"
                value="other"
                >{{ $t("navbar.other") }}</a-checkbox
              >
            </div>
          </div>
        </div>
      </div>
    </div>
     <div style="margin-top: 150px">
      <comment-facebook id="elementComment"></comment-facebook>
    </div>
    <div id="endPage"></div>
  </div>
</template>

<script>
import CommentFacebook from "../components/CommentFacebook.vue";
import axios from "axios";
export default {
  data() {
    return {
      idPost: null,
      title: null,
      nameContact: null,
      tel: null,
      address: null,
      imageLinks: null,
      categories: null,
      description: null,
      checkWallet: false,
      checkPaper: false,
      checkPhone: false,
      checkOther: false,
      canModify: false
    };
  },
  components: {
    "comment-facebook": CommentFacebook
  },
  methods: {
    routeEdit: function() {
      this.$router.push({
        name: "editPost",
        params: { idPost: this.$router.history.current.params.idPost }
      });
    }
  },
  beforeCreate() {
    // console.log(this.$router);
    this.idPost = this.$router.history.current.params.idPost;
    let url;
    if (this.$store.state.token === null || this.$store.state.token === "") {
      // nếu chưa đăng nhập thì k cần check xem bài viết có chỉnh sửa được hay không
      url =
        "https://tim-do-that-lac-backend.herokuapp.com/post/getPost/" +
        this.idPost;
    } else {
      url =
        "https://tim-do-that-lac-backend.herokuapp.com/post/getPost/loggedIn/" +
        this.idPost;
    }

    axios
      .get(url, {
        headers: {
          Authorization: this.$store.state.token
        }
      })
      .then(response => {
        // console.log(response);
        this.title = response.data.results.title;
        this.nameContact = response.data.results.name;
        this.tel = response.data.results.tel;
        this.address = response.data.results.address;
        this.description = response.data.results.description;
        this.categories = response.data.results.categories;
        this.imageLinks = response.data.results.imgLinks;

        //set check box
        this.categories.map(category => {
          if (category === "wallet") {
            this.checkWallet = true;
          } else if (category === "paper") {
            this.checkPaper = true;
          } else if (category === "phone") {
            this.checkPhone = true;
          } else {
            this.checkOther = true;
          }
        });

        if (response.data.canModify !== null) {
          this.canModify = response.data.canModify;
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }
};
</script>
<style scoped>
#leftContent {
  position: absolute;
  top: 70%;
  left: 10%;
  transform: translate(-50%, -50%);
}
#rightContent {
  position: absolute;
  float: right;
  top: 80%;
  right: 1%;
  transform: translate(-50%, -50%);
}
#description {
  position: relative;
  width: 100%;
  margin-top: 20px;
  margin-left: 8%;
  font-size: 15px;
  float: left;
}
#category {
  position: absolute;
  width: 25%;
  margin-top: 20px;
  margin-left: 8%;
  font-size: 25px;
  float: left;
}
hr {
  position: absolute;
  width: 100%;
  margin-top: 40px;
  float: left;
}

.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 800px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide img {
  color: #fff;
}
</style>

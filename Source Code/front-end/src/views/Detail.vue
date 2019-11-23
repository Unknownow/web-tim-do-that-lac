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
          <a-button type="primary" v-scroll-to="'#elementComment'">
            {{ $t("detail.comment") }}</a-button
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
            <div style="width: 100px">
              <a-checkbox
                style="float:left"
                :checked="checkPaper"
                value="paper"
                >{{ $t("navbar.paper") }}</a-checkbox
              >
            </div>
            <div style="width: 100px">
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
    <comment-facebook
      id="elementComment"
      style="margin-top: 200px; margin-bottom: 60px;"
    ></comment-facebook>
  </div>
</template>

<script>
import CommentFacebook from "../components/CommentFacebook.vue";
import axios from "axios";
export default {
  data() {
    return {
      title: null,
      nameContact: null,
      tel: null,
      address: null,
      categories: null,
      description: null,
      checkWallet: false,
      checkPaper: false,
      checkPhone: false,
      checkOther: false
    };
  },
  components: {
    "comment-facebook": CommentFacebook
  },
  methods: {},
  beforeCreate() {
    // console.log(this.$router);
    let idPost = this.$router.history.current.params.idPost;
    let url = "http://localhost:3000/post/getPost/" + idPost;

    axios
      .get(url, {
        headers: {
          Authorization: this.$store.state.token
        }
      })
      .then(response => {
        // console.log(response);
        this.title = response.data.results.title;
        this.nameContact = response.data.results.title;
        this.tel = response.data.results.title;
        this.address = response.data.results.address;
        this.description = response.data.results.description;
        this.categories = response.data.results.categories;

        //set check box
        this.categories.map(category => {
          if (category === "wallet") {
            this.checkWallet = true;
          } else if (category === "paper") {
            this.checkPaper = true;
          } else if (category === "phone") {
            this.checkPhone = true;
          } else if (category === "other") {
            this.checkOther = true;
          }
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  },
  created() {
    // console.log(this.$router);
    // console.log(this.$router.history.current.params.idPost);
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
</style>

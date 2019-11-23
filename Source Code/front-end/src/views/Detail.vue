<template>
  <div style="width: 100%; background-color: #ffffff; margin-top: 50px;">
    <div style="position: relative">
      <img src="/category/headerdetail.jpg" width="100%" />
      <div
        id="leftContent"
        style="font-size: 20px; margin-left: 60px; color: white"
      >
        <div style="font-size: 30px; margin-left: 360px;">
          Đánh rơi ví màu nâu chứa 50 nghìn VNĐ
        </div>
        <div style="margin-left: 30px">
          <a-icon theme="filled" type="phone" />
          <span style="margin-left: 10px">Đức Mập: 032748123</span>
        </div>
        <div style="margin-left: 140px">
          <a-icon theme="filled" type="compass" />
          <span style="margin-left: 10px"> 25/111 Hoàng Huynh, Nam Định</span>
        </div>
        <div id="category" style="margin-left: -100px">Ví</div>
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
          Góc nhờ vả! Vào lúc 18h15 Trên đường đi nguyễn lương bằng tới khúc
          hoàng quốc việt q7 hcm. Mình có đánh rơi 1 chiếc ví trong đó có 1 pass
          port, 1 cmnd mang tên đinh ngọc khánh, 1 bằng lái xe và vài cmnd khác,
          và thẻ ngân hàng các thứ với hơn 500k. Ai nhặt được vui lòng liên hệ
          0935424362. Mình cảm ơn và hậu tạ.
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
          <div style="margin-top: 15px;">
            <a-checkbox-group>
              <a-row>
                <a-col :span="12" :style="{ align: 'left' }">
                  <a-checkbox value="A">{{ $t("navbar.wallet") }}</a-checkbox>
                </a-col>
                <a-col :span="12" :style="{ align: 'left' }"
                  ><a-checkbox value="B">{{
                    $t("navbar.paper")
                  }}</a-checkbox></a-col
                >
                <a-col :span="12" :style="{ align: 'left' }"
                  ><a-checkbox value="C">{{
                    $t("navbar.phone")
                  }}</a-checkbox></a-col
                >
                <a-col :span="12" :style="{ align: 'left' }"
                  ><a-checkbox value="D">{{
                    $t("navbar.other")
                  }}</a-checkbox></a-col
                >
              </a-row>
            </a-checkbox-group>
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
    return {};
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
        console.log(response);
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
#xx {
  background-color: blue !important;
  align-items: flex-end !important;
}
</style>

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
          <div style="display:inline-block; cursor: pointer">
            <a-icon theme="filled" type="message" />
            <span style="margin-left: 10px;" v-on:click="show">{{
              $t("detail.reply")
            }}</span>
          </div>
          <div style="display:inline-block; margin-left: 40px">
            <div>
              <div
                class="fb-share-button"
                :data-href="this.$store.state.linkshareFB"
                data-layout="button"
                data-size="large"
              >
                <a
                  target="_blank"
                  :href="this.$store.state.linkshareFB"
                  class="fb-xfbml-parse-ignore"
                  >Chia sẻ</a
                >
              </div>
            </div>
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
        <a-spin :spinning="spinning" size="large">
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
              <div
                v-if="this.canModify"
                style="margin-bottom: 20px; color: #0abde3; cursor: pointer"
                v-on:click="showListReply"
              >
                Danh sách phản hồi của bài viết
              </div>
              <div class="clearfix" id="pageDetail">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :fileList="fileListImagePost"
                  @preview="handlePreview"
                  @change="handleChange"
                >
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%;" :src="previewImage" />
                </a-modal>
              </div>
            </div>
          </div>
        </a-spin>
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
    <div>
      <comment-facebook id="elementComment"></comment-facebook>
    </div>
    <div id="endPage"></div>
    <modal name="modal-reply" :height="350" :width="600">
      <div
        style="text-align: center; margin-top: 10px; font-size: 20px; color: black"
      >
        {{ $t("detail.title") }}
        <a-alert
          v-if="this.errorReply"
          type="error"
          :message="$t('postnews.error')"
          banner
        />
        <a-alert
          v-if="this.successReply"
          message="Bạn đã phản hồi bài đăng thành công"
          type="success"
          showIcon
        />
      </div>

      <div id="formPostNews" style="margin-top: 0px; margin-left: 30px">
        <a-spin :spinning="spinningReply" size="large">
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item
              :label="$t('detail.content')"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-textarea
                style="margin-left: 10px"
                :placeholder="$t('detail.content')"
                v-decorator="['contentReply', {}]"
                autosize
              />
            </a-form-item>
            <a-form-item
               :label="$t('detail.picture')"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
            >
              <div style="margin-left: 10px; width: 100%">
                <div class="clearfix">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    :fileList="fileList"
                    @preview="handlePreview"
                    @change="handleChange"
                  >
                    <div v-if="fileList.length < 2">
                      <a-icon type="plus" />
                      <div class="ant-upload-text">{{ $t('detail.upload')}}</div>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
              </div>
            </a-form-item>
            <a-form-item
              :wrapper-col="{ span: 12, offset: 5 }"
              style="margin-left: 150px;"
            >
              <a-button type="primary" html-type="submit">
                {{$t('detail.reply')}}
              </a-button>
            </a-form-item>
          </a-form>
        </a-spin>
      </div>
    </modal>
    <modal name="modal-listReply" :height="300" :width="600">
      <div
        style="text-align: center; margin-top: 10px; font-size: 20px; color: black"
      >
        Danh sách các phản hồi của bài viết
      </div>
      <div
        id="listReply"
        style="overflow-y: auto; max-height: 300px; margin-left: 20px"
      >
        <a-list
          style="margin-bottom: 30px"
          itemLayout="horizontal"
          :dataSource="dataReply"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <div style="margin-left: 10px; width: 100%">
              <div class="clearfix" id="pageDetail">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  :fileList="fileListImagereply[index]"
                  @preview="handlePreview"
                  @change="handleChange"
                >
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </div>

            <a-list-item-meta :description="item.description">
              <a slot="title" href="https://vue.ant.design/">{{ item.name }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </modal>
  </div>
</template>
<script
  async
  defer
  crossorigin="anonymous"
  src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v5.0&appId=2298226020420324&autoLogAppEvents=1"
></script>
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
      imageLinks: [],
      categories: null,
      description: null,
      checkWallet: false,
      checkPaper: false,
      checkPhone: false,
      checkOther: false,
      canModify: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      errorReply: false,
      successReply: false,
      dataReply: null,
      fileListImagereply: [],
      spinning: true,
      spinningReply: false,
      fileListImagePost: [{}]
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
    },
    show: function() {
      this.$modal.show("modal-reply");
      if (this.$store.state.token == null || this.$store.state.token == "") {
        this.errorReply = true;
      }
    },
    hide() {
      this.$modal.hide("modal-reply");
    },
    showListReply: function() {
      this.getListReply();
    },
    showListReplyModal: function() {
      this.$modal.show("modal-listReply");
    },
    hideListReply() {
      this.$modal.hide("modal-listReply");
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      //   console.log("------------------");
      //   console.log(fileList[0]);
      this.fileList = fileList;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let idPost = this.$router.history.current.params.idPost;
          if (
            this.$store.state.token !== null &&
            this.$store.state.token !== ""
          ) {
            let formData = new FormData();
            formData.append("description", values.contentReply);
            if (this.fileList !== null) {
              this.fileList.map(image => {
                if (image.originFileObj !== null) {
                  formData.append("images", image.originFileObj);
                }
              });
            }
            this.spinningReply = true;
            axios
              .post(
                "http://202.191.56.159:2828/reply/create/" + idPost,
                formData,
                {
                  headers: {
                    Authorization: this.$store.state.token
                  }
                }
              )
              .then(response => {
                console.log(response);
                this.spinningReply = false;
                this.successReply = true;
              })
              .catch(error => {
                this.errorReply = true;
                console.log(error);
              })
              .finally(() => {
                // always executed
              });
          } else {
            this.error = true;
          }
          // console.log(values);
        }
      });
    },
    getListReply: function() {
      let idPost = this.$router.history.current.params.idPost;
      axios
        .get("http://202.191.56.159:2828/reply/getAllReplies/" + idPost, {
          headers: {
            Authorization: this.$store.state.token
          }
        })
        .then(response => {
          this.dataReply = response.data.results.replies;
          if (this.dataReply !== null) {
            // this.dataReply.map((reply, indexReply) => {
            //   reply.imgLinks.map((imageLink, indexImg) => {
            //     let imageObject = {
            //       uid: indexImg,
            //       url: imageLink
            //     };
            //     // console.log(fileListImagereply);
            //     // this.fileListImagereply[indexReply].push(imageObject);
            //     console.log(imageObject);
            //     console.log(indexReply);
            //   });
            //   // console.log(reply);
            // });

            for (
              let indexReply = 0;
              indexReply < this.dataReply.length;
              indexReply++
            ) {
              let arrayImage = [];
              for (
                let indexImg = 0;
                indexImg < this.dataReply[indexReply].imgLinks.length;
                indexImg++
              ) {
                let imgObject = {
                  uid: indexImg,
                  url: this.dataReply[indexReply].imgLinks[indexImg]
                };
                arrayImage.push(imgObject);
              }
              this.fileListImagereply.push(arrayImage);
            }
            // console.log(this.fileListImagereply);
          }
          // console.log(response);
          this.showListReplyModal();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
    }
  },
  beforeCreate() {
    // console.log(this.$router);
    this.$store.state.linkshareFB =
      "http://202.191.56.159:2882" + this.$router.history.current.fullPath;
    this.spinning = true;
    this.idPost = this.$router.history.current.params.idPost;
    let url;
    if (this.$store.state.token === null || this.$store.state.token === "") {
      // nếu chưa đăng nhập thì k cần check xem bài viết có chỉnh sửa được hay không
      url = "http://202.191.56.159:2828/post/getPost/" + this.idPost;
    } else {
      url = "http://202.191.56.159:2828/post/getPost/loggedIn/" + this.idPost;
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

        for (let index = 0; index < this.imageLinks.length; index++) {
          let obj = {
            uid: index,
            url: this.imageLinks[index]
          };
          this.fileListImagePost.push(obj);
        }

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
          this.spinning = false;
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
<style>
#pageDetail .anticon-delete {
  display: none;
}
</style>
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
}</style
>>

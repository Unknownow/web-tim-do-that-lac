<template>
  <div>
    <div style="position: relative; margin-top: 50px">
      <img src="/category/headerpost.jpg" width="100%" />
      <div class="centered">Quản lý tài khoản</div>
    </div>
    <div style="cursor: pointer">
      <p
        style="float: left; margin-left: 100px; margin-top: 35px; color: #0abde3;"
        v-on:click="showListReply"
      >
        Danh sách các phản hồi
      </p>
    </div>
    <div id="formRegister">
      <a-form>
        <a-form-item v-bind="formItemLayout" label="E-mail">
          <a-input :value="this.emailCurrentUser" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            {{ $t("formRegister.username") }}&nbsp;
            <a-tooltip :title="$t('formRegister.tooltipUsername')">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input id="nameCurrentUser" :placeholder="this.nameCurrentUser" />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          :label="$t('formRegister.address')"
        >
          <a-input
            id="addressCurrentUser"
            :placeholder="this.addressCurrentUser"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          :label="$t('formRegister.phoneNumber')"
        >
          <a-input
            id="phoneCurrentUser"
            :placeholder="this.numberphoneCurrentUser"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '+84' }]"
              style="width: 70px"
            >
              <a-select-option value="84">+84</a-select-option>
              <a-select-option value="86">+86</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout" style="margin-top: -50px">
          <a style="cursor: pointer">Thay đổi mật khẩu</a>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout" style="margin-top: -50px;">
          <a-button type="primary" v-on:click="getData">Xác nhận</a-button>
        </a-form-item>
      </a-form>
    </div>
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
              <div class="clearfix">
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
<script>
// import i18n from "../i18n";
import axios from "axios";
export default {
  data() {
    return {
      emailCurrentUser: null,
      nameCurrentUser: "",
      numberphoneCurrentUser: null,
      addressCurrentUser: null,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          // chia thành 24 phần tag label chiếm 8 phần
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      dataReply: null,
      fileListImagereply: [],
      previewVisible: false,
      previewImage: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });

    //get infor current user
    axios
      .get("http://202.191.56.159:2828/user/me", {
        headers: {
          Authorization: this.$store.state.token
        }
      })
      .then(response => {
        this.emailCurrentUser = response.data.results.email;
        this.nameCurrentUser = response.data.results.name;
        this.numberphoneCurrentUser = response.data.results.tel;
        this.addressCurrentUser = response.data.results.address;
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  },
  methods: {
    getData: function() {
      let nameCurrentUser = document.getElementById("nameCurrentUser").value;
      let addressCurrentUser = document.getElementById("addressCurrentUser")
        .value;
      let phoneCurrentUser = document.getElementById("phoneCurrentUser").value;

      console.log(this.$store.state.token);
      axios
        .patch(
          "http://202.191.56.159:2828/user/me",
          {
            name: nameCurrentUser,
            tel: phoneCurrentUser,
            address: addressCurrentUser
          },
          {
            headers: {
              Authorization: this.$store.state.token
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showListReply: function() {
      this.getListReply();
    },
    getListReply: function() {
      axios
        .get("http://202.191.56.159:2828/reply/getAllReplies/me", {
          headers: {
            Authorization: this.$store.state.token
          }
        })
        .then(response => {
          this.dataReply = response.data.results.replies;
          if (this.dataReply !== null) {
            this.dataReply.map(reply => {
              reply.name = this.nameCurrentUser;
              // console.log(reply);
            });
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
    },
    showListReplyModal: function() {
      this.$modal.show("modal-listReply");
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    }
  }
};
</script>
<style scoped>
.centered {
  color: #ffffff;
  /* font-size: 55px; */
  font-size: 3vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#formRegister {
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 500px;
}
</style>

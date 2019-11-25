<template>
  <div>
    <div style="position: relative;">
      <img src="/category/headerpost.jpg" width="100%" />
      <div class="centered">Quản lý tài khoản</div>
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
  </div>
</template>
<script>
// import i18n from "../i18n";
import axios from "axios";
export default {
  data() {
    return {
      emailCurrentUser: null,
      nameCurrentUser: null,
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
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });

    //get infor current user
    axios
      .get("http://localhost:3000/user/me", {
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
          "http://localhost:3000/user/me",
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

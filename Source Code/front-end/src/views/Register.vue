<template>
  <div id="formRegister">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: $t('formRegister.notValidEmail')
                },
                {
                  required: true,
                  message: $t('formRegister.nullEmail')
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" :label="$t('formRegister.password')">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: $t('formRegister.nullPassword')
                },
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        :label="$t('formRegister.confirmPassword')"
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: $t('formRegister.nullConfirmPassword')
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          {{ $t("formRegister.username") }}&nbsp;
          <a-tooltip :title="$t('formRegister.tooltipUsername')">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'Username',
            {
              rules: [
                {
                  required: true,
                  message: $t('formRegister.nullUsername'),
                  whitespace: true
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        :label="$t('formRegister.phoneNumber')"
      >
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: $t('formRegister.nullPhoneNumber') }
              ]
            }
          ]"
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
      <a-form-item v-bind="formItemLayout" :label="$t('formRegister.address')">
        <a-input
          v-decorator="[
            'address',
            {
              rules: []
            }
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" style="margin-top: -30px;">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          {{ $t("formRegister.ihaveread") }}
          <a href>{{ $t("formRegister.agreement") }}</a>
        </a-checkbox>
      </a-form-item>
      <a-form-item
        v-bind="tailFormItemLayout"
        style="margin-top: -50px; margin-bottom: 50px"
      >
        <a-button type="primary" html-type="submit">{{
          $t("register")
        }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import i18n from "../i18n";
import axios from "axios";
import { CookieFunctions } from "../functions/CookieFunctions";
export default {
  data() {
    return {
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
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.agreement) {
            this.register(values);
          }
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        if (i18n.locale == "vi") {
          callback("Mật khẩu xác nhận không trùng khớp!");
        } else {
          callback("Two passwords that you enter is inconsistent!");
        }
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      let getPassword = form.getFieldValue("password");

      // kiểm tra mật khẩu có đúng định dạng không
      if (
        getPassword.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+_=|{}`~])[0-9a-zA-Z]{8,}/
        )
      ) {
        callback();
      } else {
        callback(
          "Mật khẩu cần phải có ít nhất 8 kí tự gồm: chữ thường, chữ hoa, số và ký tự"
        );
      }
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    register: function(values) {
      axios
        .post("http://202.191.56.159:2828/user/register", {
          role: "member",
          name: values.Username,
          email: values.email,
          password: values.password,
          tel: values.phone,
          address: values.address
        })
        .then(response => {
          if (response.data.message !== "Email has already existed") {
            this.$store.state.nameCurrentUser = values.Username;
            this.$store.state.loginState = true;
            this.$store.state.token = response.data.results.token;
            console.log(response);
            this.storeToken(values.Username, response.data.results.token);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    storeToken: function(token, username) {
      // login sẽ thực hiện trước hàm handleSubmit nên cần để router phía trên
      // console.log(this.$store.state.loginState);
      this.$store.state.token = token;
      CookieFunctions.writeCookie("sessionId", token, 3);
      CookieFunctions.writeCookie("sessionUserName", username, 3);
    }
  }
};
</script>
<style scoped>
#formRegister {
  margin: 0 auto;
  margin-top: 80px;
  width: 500px;
}
</style>

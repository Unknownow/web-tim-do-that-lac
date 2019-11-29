<template>
  <div>
    <div id="formResetPassword" v-if="!this.sendOTP">
      <h2>Nhập địa chỉ Email của bạn để Reset Password</h2>
      <a-form :form="form" @submit="handleSendOTP" style="margin-left: -250px;">
        <a-form-item v-bind="formItemLayout" label="Email">
          <a-input v-decorator="['emailOTP']" />
          <p style="color:red" v-if="this.showError">
            Địa chỉ Email không đúng hoặc Email chưa được đăng ký tài khoản
          </p>
        </a-form-item>
        <a-form-item
          v-bind="tailFormItemLayout"
          style="margin-top: -50px; margin-bottom: 50px"
        >
          <a-button type="primary" html-type="submit" style="margin-top: 10px"
            >Gửi mã OTP</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div id="formResetPassword" v-if="this.sendOTP">
      <a-alert message="Mã OTP đã được gửi đến Email của bạn" type="success" showIcon />
      <a-form :form="form" @submit="handleResetPassword">
        <a-form-item v-bind="formItemLayout" label="Mật khẩu mới">
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
        <a-form-item v-bind="formItemLayout" label="Xác nhận mật khẩu mới">
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
        <a-form-item v-bind="formItemLayout" label="Mã OTP">
          <a-input v-decorator="['codeOTP']" />
        </a-form-item>
        <a-form-item
          v-bind="tailFormItemLayout"
          style="margin-top: -50px; margin-bottom: 50px"
        >
          <a-button type="primary" html-type="submit">Xác nhận</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import i18n from "../i18n";
import axios from "axios";
export default {
  data() {
    return {
      emailSenOTP: null,
      sendOTP: false,
      showError: false,
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
    handleSendOTP(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let url =
            "http://localhost:8002/user/forgotPassword/" + values.emailOTP;
          axios
            .post(url, {})
            .then(() => {
              //   console.log(response);
              this.emailSenOTP = values.emailOTP;
              this.sendOTP = true;
            })
            .catch(err => {
              this.showError = true;
              console.log(err.message);
            });
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
    handleResetPassword: function(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let url =
            "http://localhost:8002/user/resetPassword/" + this.emailSenOTP;
          axios
            .post(url, {
              otp: values.codeOTP,
              password: values.password
            })
            .then(response => {
              console.log(response);
            })
            .catch(err => {
            //   this.showError = true;
              console.log(err.message);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
#formResetPassword {
  margin: 0 auto;
  margin-top: 80px;
  width: 500px;
}
</style>

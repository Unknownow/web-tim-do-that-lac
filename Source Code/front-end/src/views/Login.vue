<template>
  <div id="formLogin">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item v-bind="formItemLayout" :label="$t('formLogin.username')">
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, message: $t('formLogin.nullUsername') }]
            }
          ]"
          :placeholder="$t('formLogin.username')"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" :label="$t('formLogin.password')">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: $t('formLogin.nullPassword') }]
            }
          ]"
          type="password"
          :placeholder="$t('formLogin.password')"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label=" ">
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true
            }
          ]"
          style="margin-left: -70px"
          >{{ $t("formLogin.rememberme") }}</a-checkbox
        >
        <a class="login-form-forgot" href>{{
          $t("formLogin.forgotPassword")
        }}</a>
        <div v-if="wrongPass" style="color: red">{{ $t("formLogin.wrongPassText") }}</div>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          v-on:click="login"
          >{{ $t("login") }}</a-button
        >
        {{ $t("formLogin.or") }}
        <router-link :to="{ name: 'register' }" v-on:click="login">{{
          $t("formLogin.registernow")
        }}</router-link>
        <!-- <a href>register now!</a> -->
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { CookieFunctions } from "../functions/CookieFunctions";
export default {
  data() {
    return {
      wrongPass: false,
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
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          this.$store.state.nameCurrentUser = values.userName;
          if (this.$store.state.loginState) {
            this.$router.push("/home");
          }
        }
      });
    },
    login: function() {
      // login sẽ thực hiện trước hàm handleSubmit nên cần để router phía trên
      // console.log(this.$store.state.loginState);
      var sId = "AAXASDWQW";
      CookieFunctions.writeCookie("sessionId", sId, 3);
      if (sId !== null) {
        this.$store.state.loginState = true;
      } else {
        this.wrongPass = true;
      }
    }
  }
};
</script>
<style scoped>
#formLogin {
  margin: 0 auto;
  margin-top: 120px;
  width: 400px;
}
#components-form-demo-normal-login .login-form {
  max-width: 400px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}</style
>>

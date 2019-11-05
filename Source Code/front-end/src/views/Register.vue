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
                message: $t('formRegister.notValidEmail'),
              },
              {
                required: true,
                message: $t('formRegister.nullEmail'),
              },
            ],
          },
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
                message: $t('formRegister.nullPassword'),
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" :label="$t('formRegister.confirmPassword')">
        <a-input
          v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: $t('formRegister.nullConfirmPassword'),
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          {{$t('formRegister.username')}}&nbsp;
          <a-tooltip :title="$t('formRegister.tooltipUsername')">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
          'Username',
          {
            rules: [{ required: true, message: $t('formRegister.nullUsername'), whitespace: true }],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" :label="$t('formRegister.phoneNumber')">
        <a-input
          v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: $t('formRegister.nullPhoneNumber') }],
          },
        ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '+84' }]"
            style="width: 70px"
          >
            <a-select-option value="84">+84</a-select-option>
            <a-select-option value="85">+85</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" style="margin-top: -50px;">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          {{$t('formRegister.ihaveread')}}
          <a href>{{$t('formRegister.agreement')}}</a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" style="margin-top: -50px;">
        <a-button type="primary" html-type="submit">{{$t('register')}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import i18n from "../i18n";
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
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
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
        console.log(i18n.locale + " ------------ ");
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
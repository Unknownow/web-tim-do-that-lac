<template>
  <div>
    <div style="position: relative; margin: 50px;">
      <img src="/category/headerpost.jpg" width="100%" />
      <div class="centered">{{ $t("postnews.titlePostNews") }}</div>
    </div>
    <div id="formPostNews" style="margin-top: 30px">
      <h1 style="color: red" v-if="errorPost">
        {{ $t("postnews.error") }}
      </h1>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          :label="$t('postnews.typePost')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'typePost',
              {
                rules: [
                  { required: true, message: $t('postnews.errorTypePost') }
                ]
              }
            ]"
            :placeholder="$t('postnews.typePost')"
            @change="handleSelectChange"
          >
            <a-select-option value="lost">
              {{ $t("postnews.lost") }}
            </a-select-option>
            <a-select-option value="pick">
              {{ $t("postnews.pick") }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('postnews.title')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'titlePost',
              {
                rules: [{ required: true, message: $t('postnews.errorTitle') }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="$t('postnews.content')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            :placeholder="$t('postnews.contentPost')"
            v-decorator="[
              'content',
              {
                rules: [
                  {
                    required: true,
                    message: $t('postnews.errorcontentPost')
                  }
                ]
              }
            ]"
            autosize
          />
        </a-form-item>
        <a-form-item
          :label="$t('postnews.address')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                rules: [
                  { required: true, message: $t('postnews.errorAddress') }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="$t('postnews.street')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            showSearch
            v-decorator="[
              'street',
              {
                rules: [
                  { required: true, message: 'tên đường không được để trống!' }
                ]
              }
            ]"
            :placeholder="$t('postnews.street')"
            @change="handleChangeWard"
          >
            <a-select-option value="Bạch Mai">
              Bạch Mai
            </a-select-option>
            <a-select-option value="Lê Thanh Nghị">
              Lê Thanh Nghị
            </a-select-option>
            <a-select-option value="Trương Định">
              Trương Định
            </a-select-option>
            <a-select-option value="Trần Đại Nghĩa">
              Trần Đại Nghĩa
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('postnews.ward')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            showSearch
            v-decorator="[
              'ward',
              {
                rules: [
                  { required: true, message: 'Quận không được để trống!' }
                ]
              }
            ]"
            :placeholder="$t('postnews.ward')"
            @change="handleChangeWard"
          >
            <a-select-option value="Bách Khoa">
              Bách Khoa
            </a-select-option>
            <a-select-option value="Đống Đa">
              Đống Đa
            </a-select-option>
            <a-select-option value="Hoàng Mai">
              Hoàng Mai
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('postnews.category')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'category',
              {
                rules: [
                  { required: true, message: $t('postnews.errorCategory') }
                ]
              }
            ]"
            mode="multiple"
            size="default"
            :placeholder="$t('detail.category')"
            style="width: 100%"
            @change="handleChangeCategory"
          >
            <a-select-option value="wallet">
              {{ $t("navbar.wallet") }}
            </a-select-option>
            <a-select-option value="paper">
              {{ $t("navbar.paper") }}
            </a-select-option>
            <a-select-option value="phone">
              {{ $t("navbar.phone") }}
            </a-select-option>
            <a-select-option value="laptop">
              {{ $t("navbar.laptop") }}
            </a-select-option>
            <a-select-option value="other">
              {{ $t("navbar.other") }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('postnews.imageDescription')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <div>
            <div class="clearfix">
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 5">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">{{ $t("postnews.upload") }}</div>
                </div>
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
        </a-form-item>
        <div style="margin-bottom: 15px">
          <a-alert
            style="width: 60%; margin: auto;"
            v-if="successPost"
            :message="$t('postnews.successPostNews')"
            type="success"
            showIcon
          />
        </div>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div style="">AAAAAAAAAAAAAAAAA</div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      //upload image
      previewVisible: false,
      previewImage: "",
      uid: 0,
      lisCategory: null,
      fileList: [
        {
          uid: -1,
          name: "xxx.png",
          status: "done",
          url:
            "https://res.cloudinary.com/soict-hust/image/upload/v1567571813/sample.jpg"
        }
      ],
      successPost: false,
      errorPost: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.lisCategory = values.category;
          let currentTime;
          let today = new Date();

          let day;
          let month;
          if (today.getDate() < 10) {
            day = "0" + today.getDate();
          } else {
            day = today.getDate();
          }
          if (today.getMonth() + 1 < 10) {
            month = "0" + (today.getMonth() + 1);
          } else {
            month = today.getMonth() + 1;
          }
          let date =
            today.getFullYear() + "-" + month + "-" + day;
          let time;
          if (today.getHours() >= 0 && today.getHours() <= 9) {
            time = "0" + today.getHours() + ":" + today.getMinutes();
          } else {
            time = today.getHours() + ":" + today.getMinutes();
          }
          currentTime = date + "T" + time;
          let address =
            values.address + "-" + values.street + "-" + values.ward;

          let formData = new FormData();
          formData.append("type", values.typePost);
          formData.append("title", values.titlePost);
          formData.append("description", values.content);
          formData.append("address", values.address);
          formData.append("time", "2019-11-25T20:48");
          this.lisCategory.map(childCategory => {
            formData.append("categories", childCategory);
          });
          if (this.fileList !== null) {
            this.fileList.map(image => {
              if (image.originFileObj !== null) {
                formData.append("images", image.originFileObj);
              }
            });
          }
          // console.log(formData);

          axios
            .post("http://202.191.56.159:2828/post/create", formData, {
              headers: {
                Authorization: this.$store.state.token
              }
            })
            .then(() => {
              // console.log(response);
              this.successPost = true;
            })
            .catch(error => {
              console.log(error);
              this.errorPost = true;
            })
            .finally(() => {
              // always executed
            });
        }
      });
    },
    handleSelectChange(value) {
      // console.log(value);
      this.form.setFieldsValue({
        // note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },
    //upload image
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChangeCategory(value) {
      // console.log(`Selected: ${value}`);
    },
    handleChangeWard(value) {
      // console.log(`Ward: ${value}`);
    },
    handleChange({ fileList }) {
      //   console.log("------------------");
      //   console.log(fileList[0]);
      this.fileList = fileList;
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
/* upload image */
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>

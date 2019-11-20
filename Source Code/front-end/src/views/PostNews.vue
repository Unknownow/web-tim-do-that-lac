<template>
  <div>
    <div style="position: relative;">
      <img src="/category/headerpost.jpg" width="100%" />
      <div class="centered">Đăng tin</div>
    </div>
    <div id="formPostNews">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="Loại tin"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'gender',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
            @change="handleSelectChange"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Tiêu đề"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Nội dung"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            style="height: 100px"
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Quận"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            showSearch
            v-decorator="[
              'gender1',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Địa chỉ (Số nhà,ngõ, đường,...)"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Danh mục đồ thất lạc"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            showSearch
            v-decorator="[
              'gender1',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Hình ảnh minh họa"
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
                  <div class="ant-upload-text">Upload</div>
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
        <a-form-item
          label="Tên liên hệ"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Số điện thoại"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Địa chỉ Email"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-button
      type="primary"
      style="margin-bottom: 35px"
      v-on:click="uploadImage"
    >
      Upload Image
    </a-button>
    <div style="">AAAAAAAAAAAAAAAAA</div>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import { UploadImage } from "../functions/UploadImage";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),

      //upload image
      previewVisible: false,
      previewImage: "",
      uid: 0,
      fileList: [
        {
          uid: -1,
          name: "xxx.png",
          status: "done",
          url:
            "https://res.cloudinary.com/soict-hust/image/upload/v1567571813/sample.jpg"
        }
      ]
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        // note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },

    //upload image
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      console.log("------------------");
      console.log(file);
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      //   console.log("------------------");
      //   console.log(fileList[0]);

      this.fileList = fileList;
    },
    uploadImage: function() {
      this.uid += 1;
      let newImage = {
        uid: this.uid,
        name: "xxx.png",
        status: "done",
        url:
          "https://res.cloudinary.com/soict-hust/image/upload/v1567571813/sample.jpg"
      };
      this.fileList.push(newImage);
      console.log(this.fileList);
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

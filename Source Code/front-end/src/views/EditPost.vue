<template>
  <div>
    <div style="position: relative; margin: 50px;">
      <img src="/category/headerpost.jpg" width="100%" />
      <div class="centered">Đăng tin</div>
    </div>
    <div id="formPostNews" style="margin-top: 30px">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="Loại tin"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'typePost',
              {
                rules: [
                  { required: true, message: 'Loại tin không được để trống!' }
                ]
              }
            ]"
            placeholder="Loại bài đăng"
            @change="handleSelectChange"
          >
            <a-select-option value="lost">
              Tìm đồ
            </a-select-option>
            <a-select-option value="pick">
              Nhặt được đồ
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
              'titlePost',
              {
                rules: [
                  { required: true, message: 'Tiêu đề không được để trống!' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Nội dung"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            placeholder="Nội dung bài viết"
            v-decorator="[
              'content',
              {
                rules: [
                  {
                    required: true,
                    message: 'Nội dung bài viết không được để trống!'
                  }
                ]
              }
            ]"
            autosize
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
              'ward',
              {
                rules: [
                  { required: true, message: 'Quận không được để trống!' }
                ]
              }
            ]"
            placeholder="Quận"
            @change="handleChangeWard"
          >
            <a-select-option value="BackKhoa">
              Bách Khoa
            </a-select-option>
            <a-select-option value="DongDa">
              Đống Đa
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
              'address',
              {
                rules: [
                  { required: true, message: 'Địa chỉ không được để trống!' }
                ]
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
            v-decorator="[
              'category',
              {
                rules: [
                  { required: true, message: 'Please select your category!' }
                ]
              }
            ]"
            mode="multiple"
            size="default"
            placeholder="Danh mục"
            style="width: 100%"
            @change="handleChangeCategory"
          >
            <a-select-option value="wallet">
              Ví
            </a-select-option>
            <a-select-option value="paper">
              Giấy tờ
            </a-select-option>
            <a-select-option value="phone">
              Điện thoại
            </a-select-option>
            <a-select-option value="laptop">
              Laptop
            </a-select-option>
            <a-select-option value="other">
              Khác
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
      ]
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
          let date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          let time;
          if (today.getHours() >= 0 && today.getHours() <= 9) {
            time = "0" + today.getHours() + ":" + today.getMinutes();
          } else {
            time = today.getHours() + ":" + today.getMinutes();
          }
          currentTime = date + "T" + time;
          console.log(currentTime);
          let formData = new FormData();
          formData.append("type", values.typePost);
          formData.append("title", values.titlePost);
          formData.append("description", values.content);
          formData.append("address", values.address);
          formData.append("time", currentTime);
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

          axios
            .post("https://tim-do-that-lac-backend.herokuapp.com/post/create", formData, {
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

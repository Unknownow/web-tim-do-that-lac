<template>
  <div style="position: relative;">
    <div>
      <img
        src="/category/iphoneHeader.png"
        style="filter: brightness(70%); "
        width="100%"
      />
    </div>
    <div class="centered">
      <h2 style="color: #ffffff">{{ $t("titleSearch") }}</h2>
      <a-form layout="inline" style="width: 100%">
        <a-input
          :placeholder="$t('searchbar.keyword')"
          id="keyword"
          style="width: 20%; margin-right:3%"
        >
          <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
        </a-input>

        <a-select
          showSearch
          :placeholder="$t('category.select') + ' ' + $t('searchbar.address')"
          optionFilterProp="children"
          style="width: 20%; margin-right:3%"
          @focus="handleFocus"
          @change="handleChangeAddress"
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="address in dataAddress"
            :key="address"
            v-bind:value="address"
            >{{ address }}</a-select-option
          >
        </a-select>

        <a-select
          mode="multiple"
          showSearch
          :placeholder="$t('category.select') + ' ' + $t('navbar.category')"
          optionFilterProp="children"
          style="width:20%;margin-right:3%"
          @focus="handleFocus"
          @change="handleChangeCategory"
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="nameCategory in categoryData"
            :key="nameCategory.key"
            v-bind:value="nameCategory.key"
            >{{ nameCategory.name }}</a-select-option
          >
        </a-select>

        <a-button
          type="primary"
          html-type="submit"
          style="width:20%;margin-left:3%; text-align: center; overflow: hidden;
  text-overflow: ellipsis;"
          v-on:click="handleSearch"
        >
          <span style="overflow-wrap: break-word">
            {{ $t("searchbar.search") }}</span
          >
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      valueKeyword: null,
      valueAddress: null,
      valueCategory: null,
      dataAddress: [
        "Trương Định",
        "Bạch Mai",
        "Trần Đại Nghĩa",
        "Minh Khai",
        "Giải Phóng",
        "Đại Cồ Việt",
        "Trường Chinh",
        "Xã Đàn"
      ],
      categoryData: [
        { name: "Ví", key: "wallet" },
        { name: "CMND", key: "identitycard" },
        { name: "Giấy tờ", key: "paper" },
        { name: "Điện thoại", key: "phone" },
        { name: "Laptop", key: "laptop" },
        { name: "Thẻ ATM", key: "atm" },
        { name: "Giấy phép lái xe", key: "driverlicense" },
        { name: "Máy tính bảng", key: "tablet" },
        { name: "Thẻ nhớ", key: "memory" },
        { name: "Hộ chiếu", key: "passport" },
        { name: "Khác", key: "other" }
      ]
    };
  },

  methods: {
    handleChangeAddress(value) {
      // console.log(`selected ${value}`);
      this.valueAddress = value;
    },
    handleChangeCategory(value) {
      // console.log(`selected ${value}`);
      this.valueCategory = value;
      // console.log(value);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleFocus() {
      if (this.$i18n.locale == "en") {
        this.categoryData = [
          { name: "Wallet", key: "wallet" },
          { name: "Identity Card", key: "identitycard" },
          { name: "Personal Document", key: "paper" },
          { name: "Mobile Phone", key: "phone" },
          { name: "Laptop", key: "laptop" },
          { name: "ATM Card", key: "atm" },
          { name: "Driver license", key: "driverlicense" },
          { name: "Tablet", key: "tablet" },
          { name: "Memory", key: "memory" },
          { name: "Passport", key: "passport" },
          { name: "Other", key: "other" }
        ];
      } else {
        this.categoryData = [
          { name: "Ví", key: "wallet" },
          { name: "CMND", key: "identitycard" },
          { name: "Giấy tờ", key: "paper" },
          { name: "Điện thoại", key: "phone" },
          { name: "Laptop", key: "laptop" },
          { name: "Thẻ ATM", key: "atm" },
          { name: "Giấy phép lái xe", key: "driverlicense" },
          { name: "Máy tính bảng", key: "tablet" },
          { name: "Thẻ nhớ", key: "memory" },
          { name: "Hộ chiếu", key: "passport" },
          { name: "Khác", key: "other" }
        ];
      }
    },
    handleSearch: function() {
      this.valueKeyword = document.getElementById("keyword").value;
      let newKeyword = "";
      let newAddress = "";
      if (this.valueKeyword !== null && this.valueKeyword !== "") {
        newKeyword = this.valueKeyword.replace(/ /g, "+");
      }
      if (this.valueAddress !== null && this.valueAddress !== "") {
        newAddress = this.valueAddress.replace(/ /g, "+");
      }

      let urlCategory = "";
      if (this.valueCategory !== null) {
        this.valueCategory.map(childCategory => {
          if (childCategory !== null && childCategory !== "") {
            let newCategory = childCategory.replace(/ /g, "+");
            urlCategory += "&categories=" + newCategory;
          }
        });
      }
      let url;
      if (newKeyword === "" && urlCategory === "") {
        url =
          "http://202.191.56.159:2828/post/search?" +
          "address=" +
          newAddress +
          "&start=0&end=8";
      } else {
        url =
          "http://202.191.56.159:2828/post/search?keywords=" +
          newKeyword +
          "&address=" +
          newAddress +
          urlCategory +
          "&start=0&end=8";
      }

      console.log(url);

      axios
        .get(url)
        .then(response => {
          // this.dataPost = response.data.results;
          this.$store.state.dataPost = response.data.results.listPosts;

          //reset lai pagination
          this.$store.state.currentPage = 1;
          this.$store.state.totalPost = 0;
          // console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
    }
  }
};
</script>

<style scoped>
.centered {
  color: #ffffff;
  width: 80%;
  /* font-size: 55px; */
  font-size: 3vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

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
            :key="nameCategory"
            v-bind:value="nameCategory"
            >{{ nameCategory }}</a-select-option
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
      categoryData: ["Ví", "Giấy tờ", "Điện thoại", "Laptop", "Thẻ ATM"]
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
          "Wallet",
          "Personal Document",
          "Mobile Phone",
          "Laptop",
          "ATM Card"
        ];
      } else {
        this.categoryData = ["Ví", "paper", "Điện thoại", "Laptop", "Thẻ ATM"];
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
          "http://localhost:8002/post/search?" +
          "address=" +
          newAddress +
          "&start=0&end=8";
      } else {
        url =
          "http://localhost:8002/post/search?keywords=" +
          newKeyword +
          "&address=" +
          newAddress +
          urlCategory +
          "&start=0&end=8";
      }

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

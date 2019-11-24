<template>
  <div style="position: relative">
    <img src="/category/phone_copy.jpg" width="100%" />
    <div class="centered">
      <h2 style="color: #ffffff">Tìm đồ thất lạc của bạn</h2>
      <a-form layout="inline">
        <a-form-item>
          <a-input :placeholder="$t('searchbar.keyword')" id="keyword">
            <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-select
            showSearch
            :placeholder="$t('category.select') + ' ' + $t('searchbar.address')"
            optionFilterProp="children"
            style="width: 200px"
            @focus="handleFocus"
            @change="handleChangeAddress"
            :filterOption="filterOption"
          >
            <a-select-option
              v-for="name in data"
              :key="name"
              v-bind:value="name"
              >{{ name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select
            showSearch
            :placeholder="$t('category.select') + ' ' + $t('navbar.category')"
            optionFilterProp="children"
            style="width: 200px"
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
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" v-on:click="handleSearch">
            {{ $t("searchbar.search") }}
          </a-button>
        </a-form-item>
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
      data: ["Trương Định", "Cali", "AS"],
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
      let newKeyword = this.valueKeyword.replace(/ /g, "+");
      let newAddress = this.valueAddress.replace(/ /g, "+");
      let newCategory = this.valueCategory.replace(/ /g, "+");
      let url =
        "http://localhost:3000/post/search?keywords=" +
        newKeyword +
        "&address=" +
        newAddress +
        "&category=" +
        newCategory +
        "&start=0&end=9";
      axios
        .get(url)
        .then(response => {
          // this.dataPost = response.data.results;
          this.$store.state.dataPost = response.data.results;
          // console.log(this.dataPost);
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

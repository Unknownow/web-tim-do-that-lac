<template>
  <div>
    <div style="width: 100%">
      <div>
        <h1>{{ $t("news.title") }}</h1>
      </div>
      <div style="width: 100%; cursor: pointer;">
        <a-card-grid
          v-for="post in dataPost"
          :key="post._id"
          :bordered="true"
          v-on:click="clickPost(post._id)"
          style=" min-width: 200px; width: 25%; height: 300px; border: 1px solid black; margin: 50px; "
        >
          <h2 style="margin-top: -10px">{{ post.title }}</h2>
          <img
            src="/flag_en.svg"
            width="100%"
            height="70%"
            style="margin-left: 0 px"
            alt="english flag"
          />
          <div style="margin-top: 5px">
            <p>{{ post.address }}</p>
            <a-icon
              theme="filled"
              type="phone"
              style="color: black; margin-right: 10px"
            />
            <span>{{ post.name }} {{ post.tel }}</span>
          </div>
        </a-card-grid>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  props: {
    // numPost: {
    //   type: Number
    // }
    dataPost: {
      type: Array
    }
  },
  data() {
    return {
      currentPage: 2
    };
  },
  // beforeCreate(){
  //    axios
  //     .get("http://202.191.56.159:2828/post/getPost?start=0&end=5")
  //     .then(response => {
  //       this.dataPost = response.data.results;
  //       console.log(this.dataPost);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       // always executed
  //     });
  // },
  methods: {
    clickPost: function(idPost) {
      // console.log(idPost);
      // this.$router.push("/detail/"+this.id);
      this.$router.push({
        name: "detail",
        params: { idPost: idPost }
        // query: { page: "123" }
      });
    }
  }
};
</script>
<style scoped></style>

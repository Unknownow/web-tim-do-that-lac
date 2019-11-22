<template>
  <div>
    <div>
      <h1>{{ $t("news.title") }}</h1>
    </div>
    <div style="width: 100%; cursor: pointer;" v-on:click="clickPost">
      <a-card-grid
        v-for="post in dataPost"
        :key="post.index"
        :bordered="true"
        style=" min-width: 200px; width: 25%; height: 300px; border: 1px solid black; margin: 50px;"
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
          <p>{{ post.name }} {{ post.tel }}</p>
        </div>
      </a-card-grid>
    </div>
    <!-- thẻ div này để tránh list card bị footer che mất. -->
    <div style="cursor: point; height: 500px; width: 100%; color: #ffffff ">
      ............
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
      id: "222"
    };
  },
  // beforeCreate(){
  //    axios
  //     .get("http://localhost:3000/post/getPost?start=0&end=5")
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
    clickPost: function() {
      // this.$router.push("/detail/"+this.id);
      this.$router.push({
        name: "detail",
        params: { idPost: this.id }
        // query: { page: "123" }
      });
    }
  }
};
</script>
<style scoped></style>>

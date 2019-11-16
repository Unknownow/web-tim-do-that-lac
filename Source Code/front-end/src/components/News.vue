<template>
  <div>
    <div><h1>{{$t('news.title')}}</h1></div>
    <div
      style="width: 100%; cursor: pointer;"
      v-on:click="clickPost"
    >
      <a-card-grid
        v-for="index in 12"
        :key="index"
        :bordered="true"
        style=" min-width: 200px; width: 25%; height: 300px; border: 1px solid black; margin: 50px;"
      >
        <h2 style="margin-top: -10px">Card title</h2>
        <img
          src="/flag_en.svg"
          width="100%"
          height="70%"
          style="margin-left: 0 px"
          alt="english flag"
        />
        <div style="margin-top: 10px">
          <p>Địa chỉ</p>
          <p>Họ tên + Số đuiện thoại</p>
        </div>
      </a-card-grid>
    </div>
    <!-- thẻ div này để tránh list card bị footer che mất. -->
    <div style="cursor: point; height: 500px; width: 100%; color: #ffffff ">
      ...........................
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "222"
    };
  },
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

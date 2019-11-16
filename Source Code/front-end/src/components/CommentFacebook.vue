<template>
  <div>
    <div
      class="fb-comments"
      data-href="http://localhost:8080/vi/detail/123"
      data-width="500"
      data-numposts="5"
    ></div>
  </div>
</template>

<script>
export default {
  name: "FacebookComments",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (window.FB) {
        window.FB.init({
          appId: "648461539012173",
          status: true,
          xfbml: true,
          version: "v3.3"
        });
      }
    }
  }
};
</script>
<style scoped></style>>

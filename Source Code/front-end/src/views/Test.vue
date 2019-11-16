<template>
  <div>
    <h1>AAAAAAAAAAAAAAAAAA</h1>
    <div
      class="fb-comments"
      data-href="http://localhost:8080/vi/test"
      data-width="500"
      data-numposts="5"
    ></div>
    <div
      class="fb-share-button"
      data-href="http://localhost:8080/vi/test"
      data-layout="button_count"
      data-size="large"
    >
      <a
        target="_blank"
        href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fvi%2Ftest&amp;src=sdkpreparse"
        class="fb-xfbml-parse-ignore"
      >Chia sẻ</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FacebookComments",
  mounted() {
    this.init();
    // console.log(i18n.locale);
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
<style scoped>
</style>>

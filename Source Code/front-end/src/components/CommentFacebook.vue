<template>
  <div>
    <div>
      <div
        id="cmtFB"
        class="fb-comments"
        data-href="linkCommentFB"
        data-width="500"
        data-numposts="5"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
    document
      .getElementById("cmtFB")
      .setAttribute(
        "data-href",
        "http://202.191.56.159:2882/" + this.$router.history.current.params.idPost
      );
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

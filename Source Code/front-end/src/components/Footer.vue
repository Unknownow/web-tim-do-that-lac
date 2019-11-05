<template>
  <footer>
    <!-- <div class="row"> -->
    <!-- <div class="column"> -->
    <!-- <div style="margin-bottom: 10px">Kết nối</div> -->
    <div style="float: right; margin: 20px;">
      <a-icon type="twitter" class="icon-footer" :style="{ fontSize: '30px'}" />
      <a-icon type="facebook" class="icon-footer" :style="{ fontSize: '30px'}" />
      <a-icon type="google-plus" class="icon-footer" :style="{ fontSize: '30px'}" />
      <a-icon type="instagram" class="icon-footer" :style="{ fontSize: '30px'}" />
    </div>
    <!-- <span>Twitter</span>
        <br />
        <a-icon type="facebook" class="icon-footer" />
        <span>Facebook</span>
        <br />
        <a-icon type="google-plus" class="icon-footer" />
        <span>Google+</span>
        <br />
        <a-icon type="instagram" class="icon-footer" />
    <span>Instagram</span>-->
    <!-- </div> -->
    <!-- <div class="column" style="background-color:#bbb;">
        <h2>Column 2</h2>
        <p>Some text..</p>
    </div>-->
    <!-- </div> -->

    <!-- <div class="row">
      <div class="column" style="background-color:#ccc;">
        <h2>Column 3</h2>
        <p>Some text..</p>
      </div>
      <div class="column" style="background-color:#ddd;">
        <h2>Column 4</h2>
        <p>Some text..</p>
      </div>
    </div>-->
  </footer>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.column {
  float: left;
  width: 100px;
  margin-left: 150px;
  margin-right: 150px;
  background: gray;
}
.row {
  content: "";
  display: table;
  clear: both;
  margin: 0 auto;
  padding-top: 20px;
}
.icon-footer {
  margin-left: 20px;
  
}
footer {
  background: gray;
  height: 60px;
  color: white;
}
</style>

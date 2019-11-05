<template>
  <div>
    <a-menu id="navBar" v-model="current" mode="horizontal">
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="menu" /><span style="color:#595959">{{$t('navbar.category')}}</span>
        </span>
        <a-menu-item-group>
          <a-menu-item key="setting:wallet">{{$t('navbar.wallet')}}</a-menu-item>
          <a-menu-item key="setting:paper">{{$t('navbar.paper')}}</a-menu-item>
          <a-menu-item key="setting:phone">{{$t('navbar.phone')}}</a-menu-item>
          <a-menu-item key="setting:other">{{$t('navbar.other')}}</a-menu-item>
        </a-menu-item-group>
        <!-- <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">Option 3</a-menu-item>
          <a-menu-item key="setting:4">Option 4</a-menu-item>
        </a-menu-item-group>-->
      </a-sub-menu>
      <a-menu-item key="post">
        <a-icon type="form" />
        <span>
          <router-link :to="{ name: 'login' }" style="color:#595959">{{$t('navbar.post')}}</router-link>
        </span>
      </a-menu-item>
      <a-menu-item key="intro">
        <a-icon type="info-circle" /><span style="color:#595959">{{$t('navbar.about')}}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ["mail"] //chỉ định tab meunu nào được dùng khi khởi tạo (giá trị sử dụng là "key")
    };
  }
};
</script>
<style>
#navBar {
  background: white;
  border: none;
  float: left;
  margin-left: 60px;
}
</style>>
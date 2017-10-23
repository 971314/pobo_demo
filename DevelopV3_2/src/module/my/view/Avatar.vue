<template>
  <div class="avatar">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        头像
      </div>
      <div slot="footer">
        <a class="message" href="javascript:void(0);">
          <img src="../images/ellipsis-h.png">
        </a>
      </div>
    </navbar>
    <div class="body">
      <div class="avatar-container">
        <img :src="avatar">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      avatar: this.userInfo.avatar
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  }
}
</script>

<style>
.user-info .avatar .navbar-footer .message img {
  height: 4px;
}
.avatar .body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.avatar .avatar-container {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.avatar .avatar-container img {
  width: 100%;
}
</style>

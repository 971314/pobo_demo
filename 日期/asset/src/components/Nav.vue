<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <a :href="goBack" class="navbar-brand">
          <img src="../images/goback.png" alt="返回">
        </a>
      </div>
      <p class="navbar-text">{{title}}</p>
    </div>
  </nav>
</template>

<script>
var mapState = require('vuex').mapState;
module.exports =  {
  name: 'nav',
  computed: {
    ...mapState([
      'title',
      'goBack'
    ])
  }
}
</script>

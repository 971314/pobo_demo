<template>
  <div class="my-modal" :class="{ hide: !msg }">
    <div class="my-modal-backdrop"></div>
    <div class="my-modal-dialog">
      <div class="my-modal-content">
        <div class="my-modal-body">
          <div class="center">{{msg}}</div>
        </div>
        <div class="my-modal-footer">
          <input class="btn-center" type="button" @click="confirm" value="确定">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['msg'],
  methods: {
    confirm () {
      this.$emit('confirm');
    }
  }
}
</script>

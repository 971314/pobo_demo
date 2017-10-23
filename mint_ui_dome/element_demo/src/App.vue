<template>
  <div id="app">
    <div class="block">
      <span class="demonstration">默认不区分颜色</span>
      <el-rate v-model="value1"></el-rate>
    </div>
    <div class="block">
      <span class="demonstration">区分颜色</span>
      <el-rate
              v-model="value2"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              show-text
              :texts="['大哭','2','3','4','5']">
      </el-rate>
      <el-rate
              v-model="value3"
              show-text
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
    </div>

    <el-rate
            v-model="value4"
            :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
            void-icon-class="icon-rate-face-off"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
    <el-rate
            v-model="value5"
            disabled
            show-text
            text-color="#ff9900"
            text-template="{value}">
    </el-rate>
    <el-alert
            title="成功提示的文案"
            type="success"
            show-icon>
    </el-alert>
    <el-alert
            title="消息提示的文案"
            type="info"
            show-icon>
    </el-alert>
    <el-alert
            title="警告提示的文案"
            type="warning"
            show-icon>
    </el-alert>
    <el-alert
            title="错误提示的文案"
            type="error"
            show-icon>
    </el-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
        value1: null,
        value2: null,
        value3:null,
        value4:null,
        value5:3
    }
  },

  methods: {

  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

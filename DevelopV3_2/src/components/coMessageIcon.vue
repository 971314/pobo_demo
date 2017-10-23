<template>
  <a class="message-icon" href="#" @click="clickHandle">
    <img src="../assets/images/message.png">
    <span class="red" v-show="number>0"></span>
  </a>
</template>

<script>
  export default {
    name: 'message-icon',
    props: {
      // 默认跳转页
      addr: {
        type: String,
        default: "pobo:pageId=900005&url=message/index.html",
      },
    },
    data () {
      return {
        phone: "",
        number: 0
      }
    },
    created: function () {
      if (pbPage.getInitState()) {
        pbPage.addModuleFunCallback(90007, 111, this.unreadCallback);
        pbPage.addReloadFun(this.pageReload);

      } else {
        pbPage.initPage({
          reload: this.pageReload,
          callbacks: [{module: 90007, fun: 111, callback: this.unreadCallback}]
        });
        this.pageReload();
      }
      this.pageReload();
    },
    methods: {
      clickHandle() {
        if (this.addr) {
          window.location.href = this.addr;
        }
      },
      pageReload(){
        if (pbE.isPoboApp) {
          this.phone = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
          if (!this.phone)
            return;
        }
        else
          return;

        this.unreadCallback(pbE.MSG().ytzGetUnReadMsgCount());
        let hides = JSON.parse(pbE.SYS().readConfig("message/conf/message.json")).hides;
        let types = JSON.parse(pbE.MSG().ytzLoadHDMsgTypes(1)).Messages;
        types = types.concat(JSON.parse(pbE.MSG().ytzLoadHDMsgTypes(2)).Messages);
        for (var i = 0; i < types.length; i++) {
          if (hides.indexOf(types[i].typeid) == -1)
            pbE.MSG().ytzHandleMsgHistoryQuery(types[i].typeid - 0, "");
        }
      },
      unreadCallback(){
        this.number = pbE.MSG().ytzGetUnReadMsgCount();
      },
    }

  }
</script>
<style>
  .message-icon img {
    height: 14px;
  }

  .message-icon .red {
    background: red;
    border-radius: 3px;
    display: inline-block;
    width: 4px;
    height: 4px;
    position: relative;
    left: -5px;
    top: -7px;
  }
</style>


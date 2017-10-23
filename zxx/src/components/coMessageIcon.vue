<template>
  <a class="message-icon" href="javascript:void(0)" @click="clickHandle">
    <img src="../assets/img/导航栏-短信.png" height="14">
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
          this.phone = pbESYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
          if (!this.phone)
            return;
        }
        else
          return;

        this.unreadCallback(pbEMSG.ytzGetUnReadMsgCount());
        let hides = JSON.parse(pbESYS.readConfig("message/conf/message.json")).hides;
        let types = JSON.parse(pbEMSG.ytzLoadHDMsgTypes(1)).Messages;
        types = types.concat(JSON.parse(pbEMSG.ytzLoadHDMsgTypes(2)).Messages);
        for (var i = 0; i < types.length; i++) {
          if (hides.indexOf(types[i].typeid) == -1)
            pbEMSG.ytzHandleMsgHistoryQuery(types[i].typeid - 0, "");
        }
      },
      unreadCallback(){
        this.number = pbEMSG.ytzGetUnReadMsgCount();
      },
    }

  }
</script>


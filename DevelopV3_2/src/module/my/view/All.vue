<template>
  <div class="all">
    <group>
      <cell to="/userinfo/avatar" :hasArrow="hasArrow">
        头像
        <img class="avatar" slot="footer" :src="userInfo.avatar">
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/nickname" :hasArrow="hasArrow">
        昵称
        <span slot="footer">{{ userInfo.nickname }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/sex" :hasArrow="hasArrow">
        性别
        <span slot="footer">{{ sex }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/age" :hasArrow="hasArrow">
        年龄
        <span slot="footer">{{ age }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/job" :hasArrow="hasArrow">
        职业
        <span slot="footer">{{ userInfo.job }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/mail" :hasArrow="hasArrow">
        邮箱
        <span slot="footer">{{ cipherMail }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell @click="verifyPwd" :hasArrow="hasArrow">
        登录密码
        <span slot="footer">修改</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
    </group>
    <div class="completion">
      <div class="circle">
        <svg viewBox="0 0 100 100">
          <path d="M 50,50 m 0,-47
              a 47,47 0 1 1 0,94
              a 47,47 0 1 1 0,-94" stroke="#dfdfdf" stroke-width="5" fill-opacity="0">
          </path>
          <path d="M 50,50 m 0,-47
              a 47,47 0 1 1 0,94
              a 47,47 0 1 1 0,-94" stroke-linecap="round" stroke="#eb1212" stroke-width="6" fill-opacity="0" style="stroke-dasharray: 295.31px, 295.31px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;" :style="{ 'stroke-dashoffset': dashoffset + 'px' }">
          </path>
        </svg>
        <div v-if="completion < 100" class="circle-inner">
          <span>{{ completion }}</span><span>%</span>
        </div>
        <div v-else class="circle-inner">
          <span class="bolder">√</span>
        </div>
      </div>
      <p>资料完成度</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo'],
  data () {
    return {
      hasArrow: false
    }
  },
  computed: {
    sex: function () {
      if (this.userInfo.sexFlag) {
        var sex = this.getSex(this.userInfo.sexFlag);
        return sex;
      }
      return '';
    },
    age: function () {
      if (this.userInfo.birthday) {
        var age = this.getAge(this.userInfo.birthday);
        this.userInfo.age = age;
        return age;
      }
      return '';
    },
    cipherMail: function () {
      if (this.userInfo.mail) {
        var cipherMail = this.getCipherMail(this.userInfo.mail);
        this.userInfo.cipherMail = cipherMail;
        return cipherMail;
      }
      return '';
    },
    completion: function () {
      var completeNum = 0;
      if (this.userInfo.avatar) completeNum++;
      if (this.userInfo.nickname) completeNum++;
      if (this.userInfo.sexFlag) completeNum++;
      if (this.userInfo.birthday) completeNum++;
      if (this.userInfo.job) completeNum++;
      if (this.userInfo.mail) completeNum++;
      return Math.round(completeNum / 6 * 100);
    },
    dashoffset: function () {
      return (100 - this.completion) * 2.9531;
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = '';
  },
  methods: {
    getSex (flag) {
      if (flag == '1') {
        return '男';
      } else if (flag == '2') {
        return '女';
      }
      return '';
    },
    getAge (birthday) {
      var from = moment(birthday);
      var to = moment();
      var age = to.diff(from, 'years');
      return age;
    },
    getCipherMail (mail) {
      var index = mail.indexOf('@');
      var mailname = mail.substr(0, index);
      var maildomain = mail.substr(index);

      if (mailname.length > 3) {
        mailname = mailname.substr(0, 3) + '***';
      } else {
        mailname = mailname + '***';
      }
      return mailname + maildomain;
    },
    verifyPwd () {
      var _this = this;
      _this.$alert({
        btns: [{
          text: '取消'
        }, {
          text: '确定',
          click() {
            var password = document.getElementById('password').value;
            if (password) {
              _this.userInfo.password = password;
              _this.$router.push('/userinfo/pwd');
            }
          },
        }],
        title: '验证原密码',
        message: '<p>为保障您的数据安全，修改密码前请填写原密码。</p><input id="password" type="password" placeholder="请输入原密码" />',
      });
    }
  }
}
</script>

<style>
.all .group,
.all .cell {
  background-image: -webkit-gradient(linear,left top,left bottom,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent)),-webkit-gradient(linear,left bottom,left top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-webkit-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-o-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to bottom,#e4e7f0,#e4e7f0 50%,transparent 0),linear-gradient(to top,#e4e7f0,#e4e7f0 50%,transparent 0);
}
.all .group {
  margin-top: 10px;
}
.all .cell {
  padding-top: 0;
  padding-bottom: 0;
  height: 44px;
  line-height: 44px;
}
.all .group .cell:first-child {
  height: 60px;
  line-height: 60px;
}
.all .cell .cell-body {
  font-size: 15px;
  color: #1a1a1a;
}
.all .cell .cell-footer {
  font-size: 14px;
  color: #808086;
}
.all .cell .cell-footer img {
  position: relative;
  top: -2px;
}
.all .cell .cell-footer .avatar {
  width: 45px;
  height: 45px;
  border-radius: 5px;
}
.all .cell .cell-footer .more {
  margin-left: 8px;
  height: 13px;
}
.all .completion .circle {
  position: relative;
  margin: 20px auto 10px;
  width: 70px;
  height: 70px;
}
.all .completion .circle-inner {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  line-height: 1;
  color: #eb1212;
  text-align: center;
}
.all .completion .circle-inner span:last-child {
  font-size: 8px;
}
.all .completion .circle-inner span:first-child {
  font-size: 22px;
}
.all .completion .circle-inner .bolder {
  font-weight: bolder;
}
.all .completion p {
  margin: 0;
  font-size: 13px;
  color: #808086;
  text-align: center;
}
.alert .alert-modal {
  padding-top: 1rem;
  color: #1a1a1a;
}
.alert .alert-title {
  margin-bottom: 1rem;
  line-height: 1;
}
.alert .alert-message {
  padding-top: 0;
  padding-bottom: 1rem;
  font-size: 12px;
  color: #1a1a1a;
  line-height: 1;
}
.alert .alert-message p {
  margin-bottom: 1rem;
}
.alert .alert-message input {
  display: block;
  border: 1px solid #e4e7f0;
  border-radius: 3px;
  padding: 5px;
  width: 100%;
  height: 24px;
  font-size: 12px;
  line-height: 22px;
}
.alert .alert-message input:focus {
  outline: 0;
}
.alert .alert-footer {
  background-image: -webkit-gradient(linear,left top,left bottom,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent)),-webkit-gradient(linear,left bottom,left top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-webkit-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-o-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to bottom,#e4e7f0,#e4e7f0 50%,transparent 0),linear-gradient(to top,#e4e7f0,#e4e7f0 50%,transparent 0);
}

.alert .alert-footer .alert-btn:not(:first-child) {
  background-image: -webkit-gradient(linear,left top,right top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(left,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(left,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to right,#e4e7f0,#e4e7f0 50%,transparent 0);
}
</style>

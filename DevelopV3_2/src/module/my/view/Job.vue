<template>
  <div class="job">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        职业
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <group>
      <cell v-for="job in jobList" @click="setJob(job.cProid, job.cProname)" :hasArrow="hasArrow">
        {{ job.cProname }}
        <span v-show="jobFlag == job.cProid" slot="footer">√</span>
      </cell>
    </group>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      jobFlag: this.userInfo.jobFlag,
      job: this.userInfo.job,
      jobList: [],
      hasArrow: false
    }
  },
  created () {
    var _this = this;
    _this.$axios.post(_this.ws, {
      func: 613,
      cOrgid: _this.userAutInfo.cOrgid,
      cUserid: _this.userAutInfo.cUserid,
      token: _this.userAutInfo.token,
      data: null
    }).then(function (axiosData) {
      var data = axiosData.data;
      _this.jobList = data.data;
    }).catch(function (error) {
      console.error(error);
    });
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    setJob (jobFlag, job) {
      this.jobFlag = jobFlag;
      this.job = job;
    },
    save () {
      var _this = this;
      if (_this.jobFlag && _this.jobFlag != _this.userInfo.jobFlag) {
        _this.userInfo.jobFlag = _this.jobFlag;
        _this.userInfo.job = _this.job;
        _this.$axios.post(_this.ws, {
          func: 612,
          cOrgid: _this.userAutInfo.cOrgid,
          cUserid: _this.userAutInfo.cUserid,
          token: _this.userAutInfo.token,
          data: {
            cId: _this.userInfo.id,
            cLoginname: _this.userAutInfo.cLoginname,
            cProfession: _this.jobFlag + ''
          }
        }).then(function (axiosData) {
          var data = axiosData.data;
        }).catch(function (error) {
          console.error(error);
        });
      }
      _this.$router.push('/userinfo');
    }
  }
}
</script>

<style>
.job .navbar .navbar-footer {
  font-size: 14px;
}
.job .group,
.job .cell {
  background-image: -webkit-gradient(linear,left top,left bottom,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent)),-webkit-gradient(linear,left bottom,left top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-webkit-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-o-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to bottom,#e4e7f0,#e4e7f0 50%,transparent 0),linear-gradient(to top,#e4e7f0,#e4e7f0 50%,transparent 0);
}
.job .group {
  margin-top: 10px;
}
.job .cell {
  padding-top: 0;
  padding-bottom: 0;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
}
.job .cell .cell-footer {
  font-size: 16px;
  font-weight: bolder;
  color: #3366cc;
}
</style>

<template>
  <div class="opslog">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="操作日期">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select v-model="form.type" placeholder="请选择操作类型">
          <el-option value="用户登录操作"></el-option>
          <el-option value="获取指定用户列表"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery" :loading="queryStatus">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="error" v-if="queryError">
      <p>{{ queryError }}</p>
    </div>
    <el-row>
      <el-col :span="19">
        <el-table :data="opsData" max-height="500" style="width: 100%">
          <el-table-column prop="loginName" label="用户名" width="100px"></el-table-column>
          <el-table-column prop="time" label="操作时间" width="180px"></el-table-column>
          <el-table-column prop="ip" label="IP地址" width="150px"></el-table-column>
          <el-table-column prop="funcDesc" label="操作类型"></el-table-column>
          <el-table-column prop="result" label="状态" width="70px"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['userRootAuz'],
  data () {
    return {
      userInfo: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      form: {
        name: '',
        time: ['', ''],
        type: ''
      },
      queryError: '',
      queryStatus: false,
      opsData: []
    }
  },
  mounted () {
    let _this = this;
    let auz = _this.userRootAuz.children.filter(function (item) {
      return item.url === _this.$route.path;
    });
    if (auz.length == 0) {
      _this.$router.replace(_this.userRootAuz.children[0].url);
    }
    _this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    // _this.onQuery();
  },
  methods: {
    getDate (date) {
      return moment(date).format('YYYY-MM-DD');
    },
    onQuery () {
      let _this = this;
      _this.queryStatus = true;
      _this.queryError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '618',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          loginName: _this.form.name,
          desc: _this.form.type,
          funcCode: '',
          startTime: _this.form.time[0] ? _this.getDate(_this.form.time[0]) : '',
          endTime: _this.form.time[1] ? _this.getDate(_this.form.time[1]) : ''
        }]
      }).then(function (axiosData) {
        _this.queryStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.opsData = axiosData.data.data;
        } else {
          _this.queryError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.queryStatus = false;
        console.error(error);
      });
    }
  }
}
</script>
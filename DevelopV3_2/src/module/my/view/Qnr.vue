<template>
  <div class="qnr">
    <div class="qnr-group" v-for="(risk, index) in risklist">
      <p>{{ index + 1 }}. {{ risk.qtitle }}</p>
      <label class="icon" :class="{ selected: risk.myanswer == item.itemvalue }" v-for="item in risk.qitem">
        <i class="icon-radio"></i>
        <input type="radio" v-model="risk.myanswer" :name="'item' + (index + 1)" :value="item.itemvalue">
        <span>{{ item.itemtitle }}</span>
      </label>
    </div>
    <div class="footer">
      <input class="btn btn-block btn-thirdly" :disabled="disabled" type="button" @click.prevent="submit" value="提交">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ws: 'http://xx.com/account/modifyrisk',
      risklist: []
    }
  },
  created () {
    this.risklist = [
      {
        myanswer: '',
        qanswer: '004',
        qitem: [
          {
            itemtitle: 'A 养老',
            itemvalue: '001'
          },
          {
            itemtitle: 'B 子女教育',
            itemvalue: '002'
          },
          {
            itemtitle: 'C 购房置业',
            itemvalue: '003'
          },
          {
            itemtitle: 'D 资产增值',
            itemvalue: '004'
          }
        ],
        qno: '00001',
        qtitle: '您选择资产管理业务的目的是：'
      },
      {
        myanswer: '',
        qanswer: '004',
        qitem: [
          {
            itemtitle: 'A 获取微利，但收益保持稳定',
            itemvalue: '001'
          },
          {
            itemtitle: 'B 获取适度盈利，低于同期股市或期市表现，但波动性小',
            itemvalue: '002'
          },
          {
            itemtitle: 'C 获取与同期股市或期市相当的收益，但需承受与股市或期市相当的波动性',
            itemvalue: '003'
          },
          {
            itemtitle: 'D 获取超高收益，但需承受比股市或期市更大的波动',
            itemvalue: '004'
          }
        ],
        qno: '00002',
        qtitle: '您对资产管理产品的收益有何预期：'
      },
      {
        myanswer: '',
        qanswer: '004',
        qitem: [
          {
            itemtitle: 'A 1年以内',
            itemvalue: '001'
          },
          {
            itemtitle: 'B 1年到3年',
            itemvalue: '002'
          },
          {
            itemtitle: 'C 3年到5年',
            itemvalue: '003'
          },
          {
            itemtitle: 'D 5年到10年及以上',
            itemvalue: '004'
          }
        ],
        qno: '00003',
        qtitle: '您一般的投资年限是多久：'
      },
      {
        myanswer: '',
        qanswer: '004',
        qitem: [
          {
            itemtitle: 'A 全都不了解',
            itemvalue: '001'
          },
          {
            itemtitle: 'B 了解一种',
            itemvalue: '002'
          },
          {
            itemtitle: 'C 了解两种',
            itemvalue: '003'
          },
          {
            itemtitle: 'D 了解三种及以上',
            itemvalue: '004'
          }
        ],
        qno: '00004',
        qtitle: '您对债券、基金、股票、期货四类投资品种，有多少了解：'
      },
    ];
  },
  computed: {
    disabled () {
      var length = this.risklist.length;
      var disabled = false;
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          if (!this.risklist[i].myanswer) {
            disabled = true;
            break;
          }
        }
      } else {
        disabled = true;
      }
      return disabled;
    }
  },
  mounted () {
    document.getElementById('title').innerHTML = '风险测评';
  },
  methods: {
    submit () {
      var _this = this;
      if (_this.disabled) {
        alert('请回答所有问题');
      } else {
        var qnoandanswer = {};
        for (var i = 0, l = _this.risklist.length; i < l; i++) {
          var key = _this.risklist[i].qno;
          var value = _this.risklist[i].myanswer;
          qnoandanswer[key] = value;
        }
        console.log(JSON.stringify(qnoandanswer));
        // _this.$axios.post(_this.ws, {
        //   func: 612,
        //   cOrgid: _this.userAutInfo.cOrgid,
        //   cUserid: _this.userAutInfo.cUserid,
        //   token: _this.userAutInfo.token,
        //   data: {
        //     cId: _this.userInfo.id,
        //     cLoginname: _this.userAutInfo.cLoginname,
        //     cBirthday: _this.birthday
        //   }
        // }).then(function (axiosData) {
        //   var data = axiosData.data;
        //   var rslt = 3;
        //   _this.$router.push('/risk/rslt/' + rslt);
        // }).catch(function (error) {
        //   console.error(error);
        // });

        var rslt = 3;
        _this.$router.push('/risk/rslt/' + rslt);
      }
    }
  }
}
</script>

<style>
label.icon {
  display: block;
  font-size: 14px;
  font-weight: normal;
  color: #4c4c55;
  line-height: 14px;
  cursor: pointer;
}
.icon input[type="radio"],
.icon input[type="checkbox"] {
  position: absolute;
  visibility: hidden;
}
.icon-radio {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  width: 14px;
  height: 14px;
  background-image: url(../../../assets/images/radio1.png);
  background-size: contain;
  vertical-align: middle;
}
.selected .icon-radio {
  background-image: url(../../../assets/images/radio2.png);
}
.qnr .qnr-group {
  margin: 7px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 12px;
  background-color: #fff;
}
.qnr .qnr-group p {
  margin-bottom: 17px;
  font-size: 15px;
}
.qnr .qnr-group .icon + .icon {
  margin-top: 17px;
}
.qnr .qnr-group .icon:after {
  clear: both;
  display: table;
  content: " ";
}
.qnr .qnr-group .icon .icon-radio {
  float: left;
}
.qnr .qnr-group .icon span {
  float: left;
  width: calc(100% - 25px);
}
.qnr .footer {
  padding: 45px 15px;
}
.qnr .footer .btn-thirdly {
  border: none;
  border-radius: 5px;
  padding: 0;
  height: 38px;
  font-size: 15px;
  line-height:38px;
  color: #fff;
  background-color: #eb1212;
}
.qnr .footer .btn-thirdly:disabled {
  background-color: #dfdfdf;
  opacity: 1;
}
</style>

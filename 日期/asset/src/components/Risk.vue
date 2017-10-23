<template>
  <div class="risk">
    <div class="risk-group">
      <p>1.您选择资产管理业务的目的是：</p>
      <label class="icon" :class="{ selected: item1 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item1" name="item1" value="A">
        <span>A 养老</span>
      </label>
      <label class="icon" :class="{ selected: item1 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item1" name="item1" value="B">
        <span>B 子女教育</span>
      </label>
      <label class="icon" :class="{ selected: item1 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item1" name="item1" value="C">
        <span>C 购房置业</span>
      </label>
      <label class="icon" :class="{ selected: item1 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item1" name="item1" value="D">
        <span>D 资产增值</span>
      </label>
    </div>
    <div class="risk-group">
      <p>2.您对资产管理产品的收益有何预期：</p>
      <label class="icon" :class="{ selected: item2 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item2" name="item2" value="A">
        <span>A 获取微利，但收益保持稳定</span>
      </label>
      <label class="icon" :class="{ selected: item2 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item2" name="item2" value="B">
        <span>B 获取适度盈利，低于同期股市或期市表现，但波动性小</span>
      </label>
      <label class="icon" :class="{ selected: item2 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item2" name="item2" value="C">
        <span>C 获取与同期股市或期市相当的收益，但需承受与股市或期市相当的波动性</span>
      </label>
      <label class="icon" :class="{ selected: item2 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item2" name="item2" value="D">
        <span>D 获取超高收益，但需承受比股市或期市更大的波动</span>
      </label>
    </div>
    <div class="risk-group">
      <p>3.您一般的投资年限是多久：</p>
      <label class="icon" :class="{ selected: item3 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item3" name="item3" value="A">
        <span>A 1年以内</span>
      </label>
      <label class="icon" :class="{ selected: item3 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item3" name="item3" value="B">
        <span>B 1年到3年</span>
      </label>
      <label class="icon" :class="{ selected: item3 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item3" name="item3" value="C">
        <span>C 3年到5年</span>
      </label>
      <label class="icon" :class="{ selected: item3 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item3" name="item3" value="D">
        <span>D 5年到10年及以上</span>
      </label>
    </div>
    <div class="risk-group">
      <p>4.您对债券、基金、股票、期货四类投资品种，有多少了解：</p>
      <label class="icon" :class="{ selected: item4 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item4" name="item4" value="A">
        <span>A 全都不了解</span>
      </label>
      <label class="icon" :class="{ selected: item4 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item4" name="item4" value="B">
        <span>B 了解一种</span>
      </label>
      <label class="icon" :class="{ selected: item4 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item4" name="item4" value="C">
        <span>C 了解两种</span>
      </label>
      <label class="icon" :class="{ selected: item4 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item4" name="item4" value="D">
        <span>D 了解三种及以上</span>
      </label>
    </div>
    <div class="risk-group">
      <p>5.您的投资年限：</p>
      <label class="icon" :class="{ selected: item5 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item5" name="item5" value="A">
        <span>A 无投资经验</span>
      </label>
      <label class="icon" :class="{ selected: item5 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item5" name="item5" value="B">
        <span>B 少于2年</span>
      </label>
      <label class="icon" :class="{ selected: item5 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item5" name="item5" value="C">
        <span>C 2年至5年</span>
      </label>
      <label class="icon" :class="{ selected: item5 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item5" name="item5" value="D">
        <span>D 5年以上</span>
      </label>
    </div>
    <div class="risk-group">
      <p>6.您的金融资产或者最近三年个人年均收入情况：</p>
      <label class="icon" :class="{ selected: item6 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item6" name="item6" value="A">
        <span>A 个人金融资产小于300万元，个人最近三年平均年收入大于50万元</span>
      </label>
      <label class="icon" :class="{ selected: item6 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item6" name="item6" value="B">
        <span>B 个人金融资产大于300万元，个人最近三年平均年收入小于50万元</span>
      </label>
      <label class="icon" :class="{ selected: item6 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item6" name="item6" value="C">
        <span>C 个人金融资产大于300万元，个人最近三年平均年收入大于50万元</span>
      </label>
      <label class="icon" :class="{ selected: item6 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item6" name="item6" value="D">
        <span>D 个人金融资产大于500万元，个人最近三年平均年收入大于100万元及以上</span>
      </label>
    </div>
    <div class="risk-group">
      <p>7.您投资基金(非货币) 、股票或期货的资金占家庭总流动资产的比例：</p>
      <label class="icon" :class="{ selected: item7 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item7" name="item7" value="A">
        <span>A 不到一成</span>
      </label>
      <label class="icon" :class="{ selected: item7 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item7" name="item7" value="B">
        <span>B 一至三成左右</span>
      </label>
      <label class="icon" :class="{ selected: item7 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item7" name="item7" value="C">
        <span>C 三至五成左右</span>
      </label>
      <label class="icon" :class="{ selected: item7 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item7" name="item7" value="D">
        <span>D 五成及以上</span>
      </label>
    </div>
    <div class="risk-group">
      <p>8.您未来三年的收入成长情况如何：</p>
      <label class="icon" :class="{ selected: item8 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item8" name="item8" value="A">
        <span>A 收入状况不固定</span>
      </label>
      <label class="icon" :class="{ selected: item8 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item8" name="item8" value="B">
        <span>B 因退休或其他因素而减少</span>
      </label>
      <label class="icon" :class="{ selected: item8 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item8" name="item8" value="C">
        <span>C 成长速度会与通货膨胀率大体一致</span>
      </label>
      <label class="icon" :class="{ selected: item8 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item8" name="item8" value="D">
        <span>D 预期收入会有较快成长</span>
      </label>
    </div>
    <div class="risk-group">
      <p>9.投资有风险，在金融危机中，市场大幅波动，有些投资品的价格短期内可能大幅下跌。您能够承受的投资组合下跌的极限是多少：</p>
      <label class="icon" :class="{ selected: item9 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item9" name="item9" value="A">
        <span>A 跌幅10%以下</span>
      </label>
      <label class="icon" :class="{ selected: item9 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item9" name="item9" value="B">
        <span>B 跌幅介于10-20%</span>
      </label>
      <label class="icon" :class="{ selected: item9 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item9" name="item9" value="C">
        <span>C 跌幅介于20-30%</span>
      </label>
      <label class="icon" :class="{ selected: item9 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item9" name="item9" value="D">
        <span>D 无所谓，我能够承受任何下跌，甚至跌幅超过50%</span>
      </label>
    </div>
    <div class="risk-group">
      <p>10.您如何看待投资亏损：</p>
      <label class="icon" :class="{ selected: item10 == 'A' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item10" name="item10" value="A">
        <span>A 很难接受，但不影响正常的生活</span>
      </label>
      <label class="icon" :class="{ selected: item10 == 'B' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item10" name="item10" value="B">
        <span>B 对日后的投资受到一定的影响</span>
      </label>
      <label class="icon" :class="{ selected: item10 == 'C' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item10" name="item10" value="C">
        <span>C 平常心看待，对情绪没有明显的影响</span>
      </label>
      <label class="icon" :class="{ selected: item10 == 'D' }">
        <i class="icon-radio"></i>
        <input type="radio" v-model="item10" name="item10" value="D">
        <span>D 很正常，投资有风险，没有人只赚不赔</span>
      </label>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <div class="btn-bgc-white">
      <input class="btn btn-blue btn-asset-block" :disabled="disabled" type="button" @click="submit" value="提交">
    </div>
  </div>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  data () {
    return {
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      item5: '',
      item6: '',
      item7: '',
      item8: '',
      item9: '',
      item10: '',
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    disabled () {
      return !(this.item1 && this.item2 && this.item3 && this.item4 && this.item5 && this.item6 && this.item7 && this.item8 && this.item9 && this.item10);
    }
  },
  mounted () {
    this.$store.commit('changeGoBack', 'goBack');
    this.$store.commit('changeTitle', '风险测评');
  },
  methods: {
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    submit () {
      if (!this.item1 || !this.item2 || !this.item3 || !this.item4 || !this.item5 || !this.item6 || !this.item7 || !this.item8 || !this.item9 || !this.item10) {
        this.errMsg = '请回答全部问题';
        $('body').addClass('modal-open');
      } else {
        var data = {
          uid: this.$store.state.UserId,
          sid: this.$store.state.Token,
          loginname: this.$store.state.LoginName,
          orgid: this.$store.state.jgid,
          data: [
            {
              answers: []
            }
          ]
        };
        var wsUrl = window.config.serverAdd + window.config.registerWS;
        if (this.$route.params.flag == 0) {
          data.data[0].name = this.$store.state.name;
          data.data[0].id = this.$store.state.id;
        } else if (this.$route.params.flag == 1) {
          wsUrl = window.config.serverAdd + window.config.riskWS;
        }
        data.data[0].answers.push(this.item1);
        data.data[0].answers.push(this.item2);
        data.data[0].answers.push(this.item3);
        data.data[0].answers.push(this.item4);
        data.data[0].answers.push(this.item5);
        data.data[0].answers.push(this.item6);
        data.data[0].answers.push(this.item7);
        data.data[0].answers.push(this.item8);
        data.data[0].answers.push(this.item9);
        data.data[0].answers.push(this.item10);
        $.ajax({
          method: 'POST',
          url: wsUrl,
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json',
          xhrFields: {withCredentials: true},
          crossDomain: true,
          success: function (data) {
            if (data.retHead == 1) {
              this.$store.commit('changeLevel', data.data[0].risklevel);
              this.$router.push('/rslt');
            } else {
              this.errMsg = '测评失败，请稍后重试';
              $('body').addClass('modal-open');
            }
          }.bind(this),
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus);
          }
        });
      }
    }
  }
}
</script>

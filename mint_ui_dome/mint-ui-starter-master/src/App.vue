<template>
  <div id="app">
   <button @click="han">按钮</button>
   <!--  <mt-range v-model="rangeValue"></mt-range>
    <mt-range
            v-model="rangeValue"
            :min="10"
            :max="90"
            :step="10"
            :bar-height="5">
    </mt-range>
    <mt-range v-model="rangeValue">
      <div slot="start">0</div>
      <div slot="end">100</div>
    </mt-range>
    <span>{{rangeValue}}</span>
    <mt-progress :value="20" :bar-height="5"></mt-progress>
    <mt-progress :value="60">
      <div slot="start">0%</div>
      <div slot="end">100%</div>
    </mt-progress>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <mt-datetime-picker

            type="time"
            v-model="pickerValue">
    </mt-datetime-picker>
    <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm"
            cancelText="...">
    </mt-datetime-picker>
    <mt-index-list>
      <mt-index-section index="A">
        <mt-cell title="Aaron"></mt-cell>
        <mt-cell title="Alden"></mt-cell>
        <mt-cell title="Austin"></mt-cell>
      </mt-index-section>
      <mt-index-section index="B">
        <mt-cell title="Baldwin"></mt-cell>
        <mt-cell title="Braden"></mt-cell>
      </mt-index-section>
      ...
      <mt-index-section index="Z">
        <mt-cell title="Zack"></mt-cell>
        <mt-cell title="Zane"></mt-cell>
      </mt-index-section>
    </mt-index-list>
    <mt-palette-button content="+" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
                       direction="t" class="pb" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#26a2ff;"
                       style="left:30px;">
      <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)">1</div>
      <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(2)">2</div>
      <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(3)">3</div>
    </mt-palette-button>
    <mt-header fixed title="固定在顶部"></mt-header>
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <div slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-header title="多个按钮">
      <div slot="left">
        <mt-button icon="back">返回</mt-button>
        <mt-button @click="handleClose">关闭</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    -->

    <!--<mt-tab-container v-model="active">
      <mt-tab-container-item id="外卖">
        <mt-cell v-for="n in 11" title="tab-container 1"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="订单">
        <mt-cell v-for="n in 11" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="发现">
        <mt-cell v-for="n in 11" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <mt-cell v-for="n in 11" title="tab-container 4"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="active">
      <mt-tab-item id="外卖">
        <img slot="icon" src="src/assets/100x100.png"/>
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="src/assets/100x100.png"/>
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="src/assets/100x100.png"/>
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="src/assets/100x100.png"/>
        我的
      </mt-tab-item>
    </mt-tabbar>-->

    <!--<mt-navbar v-model="selected1">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>

    &lt;!&ndash; tab-container &ndash;&gt;
    <mt-tab-container v-model="selected1">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 10" :title="'内容 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>-->

    <!--<mt-cell title="标题文字"></mt-cell>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <mt-cell
            title="标题文字"
            to="//github.com"
            is-link
            value="带链接">
    </mt-cell>
    <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
    <mt-cell title="标题文字">
      <span>icon 是图片</span>
      <img slot="icon" src="src/assets/100x100.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="标题文字" is-link>
      <span style="color: green">这里是元素</span>
    </mt-cell>
    <mt-cell title="标题" label="描述信息" is-link></mt-cell>
    <mt-cell-swipe
            title="标题文字"
            :right="[
    {
      content: 'Delete',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('delete')
    }
  ]"></mt-cell-swipe>
    <mt-spinner color="#26a2ff" :size="20" type="snake"></mt-spinner>
    <mt-spinner color="#26a2ff" :size="20" type="double-bounce"></mt-spinner>
    <mt-spinner color="#26a2ff" :size="20" type="triple-bounce"></mt-spinner>
    <mt-spinner color="#26a2ff" :size="20" type="fading-circle"></mt-spinner>-->

    <!--<mt-tab-container v-model="active1" swipeable>
      <mt-tab-container-item id="tab-container1">
        <mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-search v-model="value"></mt-search>
    <mt-search
            v-model="value"
            cancel-text="取"
            placeholder="搜">
    </mt-search>
    <mt-search v-model="value" :result.sync="result1"></mt-search>-->
    <!--<mt-search v-model="value">
      <mt-cell
              v-for="item in result"
              :title="item.title"
              :value="item.value">
      </mt-cell>
    </mt-search>-->

    <!--<mt-switch v-model="value"></mt-switch>
    <mt-switch v-model="value">开关</mt-switch>-->

    <!--<mt-checklist title="复选框列表" v-model="value" :options="['选项A', '选项B', '选项C']" align="right"></mt-checklist>
    <span>{{value}}</span>
    <mt-radio
            title="单选框列表"
            v-model="value1"
            :options="['选项A', '选项B', '选项C']">
    </mt-radio>
    <span>{{value1}}</span>
    <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
    <mt-field label="网站" placeholder="请输入网址" type="url"></mt-field>
    <mt-field label="数字" placeholder="请输入数字" type="number"></mt-field>
    <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
    <mt-field label="邮箱" state="success"></mt-field>
    <mt-field label="邮箱" state="error"></mt-field>
    <mt-field label="邮箱" state="warning"></mt-field>
    <mt-field label="验证码">
      <img src="src/assets/100x100.png" height="45px" width="100px">
    </mt-field>
    <mt-badge size="small">30</mt-badge>
    <mt-badge size="normal">10</mt-badge>
    <mt-badge size="large">10</mt-badge><br/>
    <mt-badge type="primary">30</mt-badge>
    <mt-badge type="error">10</mt-badge>
    <mt-badge type="success">10</mt-badge>
    <mt-badge type="warning">10</mt-badge><br/>
    <mt-badge size="small" color="#888">自定义颜色</mt-badge>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){

  },
  data () {
    return {
        topStatus: '',
        list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        actions:[
            {
                name:'相册',
                method:function () {
                    console.log('111')
                }
            },
            {
                name:'本地',
                method:function () {
                    console.log('222')
                }
            }
        ],
        sheetVisible:false,
        rangeValue:10,
        slots: [
            {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot1',
                textAlign: 'right'
            }, {
                divider: true,
                content: '--',
                className: 'slot2'
            }, {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot3',
                textAlign: 'left'
            }
        ],
        active:'外卖',
        selected1:'1',
        active1:'tab-container1',
        result:[
            {title:'1',name:'11'},
            {title:'2',name:'22'},
            {title:'3',name:'33'}
        ],
        result1:[
            '1','2','3'
        ],
        value:[],
        value1:null
    }
  },
  methods: {
      loadMore() {
          this.loading = true;
          setTimeout(() => {
              let last = this.list[this.list.length - 1];
              for (let i = 1; i <= 10; i++) {
                  this.list.push(last + i);
              }
              this.loading = false;
          }, 2500);
      },
      han(){
          /*this.$messagebox({
              title: '提示',
              message: '确定执行此操作?',
              showCancelButton: true
          });*/
          this.$toast({
              message: '提示',
              position: 'bottom',
              duration: 100000
          })
//          this.sheetVisible = !this.sheetVisible
      },
      onValuesChange(picker, values) {
          if (values[0] > values[1]) {
              picker.setSlotValue(1, values[0]);
          }
          console.log(picker,values)
      },
      openPicker() {
          this.$refs.picker.open();
      },
      handleConfirm(value){
          console.log(value)
      },
      main_log(val) {
          console.log('main_log', val);
      },
      sub_log(val) {
          console.log('sub_log', val);
          this.$refs.target_1.collapse();
      },
      /*click(index){
          console.log(index);
          var _this = this;
          if(index == 1){
              _this.active = 'tab-container1'
          }else if(index == 2){
              _this.active = 'tab-container2'
          }else if(index == 3){
              _this.active = 'tab-container3'
          }else if(index == 4){
              _this.active = 'tab-container4'
          }
      }*/
  }
}
</script>

<style>
  body{
    /*background:firebrick;*/
    margin:0;
  }
.mint-swipe{
  height:100px;
}
</style>

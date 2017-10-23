<template>
  <div class="main-content">
    <div class="center-content">
      <div class="question-wapper">
        <div class="question-title">选择修改题号</div>
        <div class="question-list">
          <div class="question-item" v-for="n in 10" v-text="n"></div>
        </div>
      </div>
    </div>
    <div class="body-cover"></div>
  </div>
</template>

<script>

  export default {};
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  div {
    box-sizing: border-box;
  }
  @mixin font($font-size) {
    font-size: $font-size;

    [data-dpr = '2'] & {
      font-size: $font-size * 2;
    }

    [data-dpr = '3'] & {
      font-size: $font-size * 3;
    }
  }
  @function toRem($px) {
    @return $px / 75px * 1rem;
  }
  @mixin clearfix {
    &:after {
      clear: both;
      content: '.';
      display: block;
      height: 0;
      line-height: 0;
      overflow: hidden;
    }
    *height: 1%;
  }

  .main-content {
    .center-content {
      position: fixed;
      z-index: 1011;
      width: toRem(540px);
      height: toRem(516px);
      top: 50%;
      left: 50%;
      margin-top: -(toRem(258px));
      margin-left: -(toRem(270px));
      background-color: #ffffff;
      border-radius: toRem(20px);

      .question-wapper {
        padding: toRem(46px) toRem(48px);

        .question-title {
          color: #1a1a1a;
          font-size: toRem(38px);
          font-weight: 700;
          text-align: center;
        }

        .question-list {
          @include clearfix;
          margin-top: toRem(46px);
          .question-item {
            width: toRem(88px);
            height: toRem(88px);
            font-size: toRem(38px);
            line-height: toRem(88px);
            color: #3366cc;
            text-align: center;
            border: 1px solid #c0c6cd;
            float: left;
            margin-left: toRem(30px);
            border-radius: toRem(4px);
            &:nth-child(4n+1) {
              margin-left: 0;
            }
            &:nth-child(n+5) {
              margin-top: toRem(40px);
            }
          }
        }
      }
    }

    .body-cover {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1010;
    }

  }

</style>

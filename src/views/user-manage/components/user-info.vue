<template>
  <div class="user-info-warp">
    <div class="item-box">
      <span class="item-box-left">
        <i>手机号：</i>
        <i>15928137520</i>
      </span>
      <span class="item-box-right">
        <i>会员级别：</i>
        <i>初级会员</i>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>粉丝数：</i>
        <i>100</i>
      </span>
      <span class="item-box-right">
        <i>购物余额：</i>
        <i>100</i>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>可提现金额：</i>
        <i>1000</i>
      </span>
      <span class="item-box-right">
        <i>话　　费：</i>
        <i>1000</i>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .user-info-warp{
    .item-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      &:first-child{
        margin-top: 0;
      }
      span{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i{
        &:first-child{
          width: 100px;
          text-align: right;
        }
        &:last-child{
          width: 100px;
          text-align: left;
        }
        font-style: normal;
      }
      .item-box-left{
        width: 200px;
        text-align: right
      }
      .item-box-right{
        width: 200px;
        text-align: right
      }
    }
  }
</style>


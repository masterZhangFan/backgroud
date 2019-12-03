<!--
 * @Author: your name
 * @Date: 2019-12-02 21:37:37
 * @LastEditTime: 2019-12-03 23:47:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backgroud\src\views\user-manage\components\user-info.vue
 -->
<template>
  <div class="user-info-warp">
    <div class="item-box">
      <span class="item-box-left">
        <i>手机号：</i>
        <i>{{ curUserInfo.phone }}</i>
      </span>
      <span class="item-box-right">
        <i>会员级别：</i>
        <i>{{ curUserInfo.memberLevel | dealLevel() }}</i>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>粉丝数：</i>
        <i>{{ curUserInfo.cash }}</i>
      </span>
      <span class="item-box-right">
        <i>购物余额：</i>
        <i>￥{{ curUserInfo.shoppingBalance }}</i>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>可提现金额：</i>
        <i>￥{{ curUserInfo.cash }}</i>
      </span>
      <span class="item-box-right">
        <i>话　　费：</i>
        <i>￥{{ curUserInfo.callBalance }}</i>
      </span>
    </div>
  </div>
</template>

<script>
import { dealLevel } from '@/filters/index'
export default {
  filters: {
    dealLevel
  },
  props: {
    curUserInfo: {
      type: Object,
      default: () => {}
    }
  },
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


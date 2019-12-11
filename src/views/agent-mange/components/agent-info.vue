<template>
  <div v-loading="isLoading" :class="{'user-info-warp': true,'edit-box': isEdit===1}">
    <div class="item-box">
      <span class="item-box-left">
        <i>手机号码：</i>
        <i>{{ agentInfo.phone }}</i>
      </span>
      <span class="item-box-right">
        <i>代理类别：</i>
        <i v-if="isEdit===0">{{ agentInfo.delegateTypeName }}</i>
        <el-select v-else v-model="agentInfo.delegateTypeId" size="small" class="w180" placeholder="请选择">
          <el-option
            v-for="item in agentTypeList"
            :key="item.delegateTypeId"
            :label="item.delegateTypeName"
            :value="item.delegateTypeId"
          />
        </el-select>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>粉丝数：</i>
        <i>{{ agentInfo.fansNumber }}</i>
      </span>
      <span class="item-box-right">
        <i>购物余额：</i>
        <i>￥{{ agentInfo.shoppingBalance }}</i>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>可提现金额：</i>
        <i>￥{{ agentInfo.cash }}</i>
      </span>
      <span class="item-box-right">
        <i>话　　费：</i>
        <i>￥{{ agentInfo.callBalance }}</i>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>返现金额：</i>
        <i v-if="isEdit===0">￥{{ agentInfo.cashBackAmount }}</i>
        <el-input v-else v-model="agentInfo.cashBackAmount" size="small" class="w180" type="text" />
      </span>
      <span class="item-box-right">
        <i>状　　态：</i>
        <i v-if="isEdit===0">已启用</i>
        <el-select v-else v-model="status" size="small" class="w180" placeholder="请选择" @click="changeStatus">
          <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </div>
  </div>
</template>

<script>
// import Bus from '@/utils/bus'
import { getAgentInfo, setAgentInfo } from '@/api/agent'

export default {
  props: {
    curAgentId: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Number,
      default: -1
    },
    agentTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      agentInfo: {},
      status: '',
      statusArr: [{
        label: '启用',
        value: 1
      }, {
        label: '停用',
        value: 0
      }]
    }
  },
  watch: {
    curAgentId(val) {
      this.getAgentInfo(val)
    }
  },
  created() {
    this.getAgentInfo(this.curAgentId)
  },
  mounted() {

  },
  methods: {
    getAgentInfo(id) {
      this.isLoading = true
      getAgentInfo({
        userId: id
      }).then(res => {
        this.isLoading = false
        if (res.status * 1 === 0) {
          this.agentInfo = res.data
          if (res.data.delegateEnbale) {
            this.status = 1
          } else {
            this.status = 0
          }
        }
      })
    },
    changeStatus(status) {
      if (status) {
        this.agentInfo.delegateEnbale = true
      } else {
        this.agentInfo.delegateEnbale = false
      }
    },
    editAgentInfo() {
      setAgentInfo(this.agentInfo).then(res => {
        this.$message.success('操作成功')
        this.$emit('closeDialog')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-warp {
  .item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    i {
      &:first-child {
        width: 100px;
        text-align: right;
      }
      &:last-child {
        width: 100px;
        text-align: left;
      }
      font-style: normal;
    }
    .w180 {
      width: 180px !important;
    }
    .item-box-left,
    .item-box-right {
      width: 200px;
    }
  }
  &.edit-box {
    .item-box {
      i {
        &:first-child {
          width: 100px;
          text-align: right;
        }
        &:last-child {
          width: 180px;
          text-align: left;
        }
        font-style: normal;
      }
      .w180 {
        width: 180px !important;
      }
      .item-box-left,
      .item-box-right {
        width: 300px;
        &.item-box-right{
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>


<template>
  <div class="user-info-warp edit-box">
    <div class="item-box">
      <span class="item-box-left">
        <i>选择用户：</i>
        <el-select v-model="agentInfo.delegateTypeName" size="small" class="w180" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
      <span class="item-box-right">
        <i>代理类别：</i>
        <el-select v-model="agentInfo.delegateTypeName" size="small" class="w180" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>返现金额：</i>
        <el-input v-model="agentInfo.cashBackAmount" size="small" class="w180" type="text" />
      </span>
      <span class="item-box-right">
        <i>身份证正：</i>
        <el-input v-model="agentInfo.cashBackAmount" size="small" class="w180" type="text" />
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>身份证反：</i>
        <el-input v-model="agentInfo.cashBackAmount" size="small" class="w180" type="text" />
      </span>
      <span class="item-box-right">
        <i>营业执照：</i>
        <el-input v-model="agentInfo.cashBackAmount" size="small" class="w180" type="text" />
      </span>
    </div>
    <div class="item-box">
      <span class="item-box-left">
        <i>返现金额：</i>
        <el-input v-model="agentInfo.cashBackAmount" size="small" class="w180" type="text" />
      </span>
      <span class="item-box-right">
        <i>状　　态：</i>
        <el-select v-model="value" size="small" class="w180" placeholder="请选择">
          <el-option
            v-for="item in options"
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
import { getAgentInfo } from '@/api/agent'

export default {
  props: {
    curAgentId: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      isLoading: false,
      agentInfo: {},
      options: [],
      value: ''
    }
  },
  watch: {
    curAgentId(val) {
      this.getAgentInfo(val)
    }
  },
  created() {},
  mounted() {
    this.getAgentInfo(this.curAgentId)
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
        }
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


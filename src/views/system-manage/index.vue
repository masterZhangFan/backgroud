<!--
 * @Author: your name
 * @Date: 2019-11-30 14:53:29
 * @LastEditTime: 2019-12-04 01:44:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \member-agent-manage\src\views\system-manage\index.vue
 -->
<template>
  <div class="app-container">
    <el-card>
      <el-form style="width: 600px;" label-width="100px" :model="formLabelAlign">
        <el-form-item label="会员金额设置">
          <el-input v-model="formLabelAlign.memberPrice" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="一级返现金额">
          <el-input v-model="formLabelAlign.onceLevelCashback" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
         <el-form-item label="二级返现金额">
          <el-input v-model="formLabelAlign.secondLevelCashback" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="充值会员反话费">
        <el-input v-model="formLabelAlign.callAmountBack" placeholder="请输入内容">
          <template slot="append">元</template>
        </el-input>
        </el-form-item>
         <el-form-item label="充值会员反购物余额">
        <el-input v-model="formLabelAlign.shoppingAmountBack" placeholder="请输入内容">
          <template slot="append">元</template>
        </el-input>
        </el-form-item>
        <el-form-item label="税率设置">
          <el-input v-model="formLabelAlign.taxRate" placeholder="税率0-100" />
        </el-form-item>
        <el-form-item label="会员规则">
          <el-input
            v-model="formLabelAlign.memberRules"
            maxlength="200"
            show-word-limit
            type="textarea"
            :rows="9"
          />
        </el-form-item>
        <el-form-item label="高级会员权益">
          <el-input v-model="formLabelAlign.seniorMemberRules" maxlength="200" show-word-limit type="textarea" :rows="9" />
        </el-form-item>
        <el-form-item label="代理规则">
          <el-input v-model="formLabelAlign.delegateRules" maxlength="200" show-word-limit type="textarea" :rows="9" />
        </el-form-item>
        <el-form-item>
          <el-button @click="setSysConfig">设 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSysConfig, setSysConfig } from '@/api/system'

export default {
  data() {
    return {
      formLabelAlign: {
        memberPrice: '',
        onceLevelCashback: '',
        taxRate: '',
        memberRules: '',
        seniorMemberRules: ''
      }
    }
  },
  mounted() {
    getSysConfig().then(res => {
      this.formLabelAlign = res.data
    })
  },
  methods: {
    setSysConfig() {
      setSysConfig(this.formLabelAlign).then(res => {
        this.$message.success('设置成功！')
      })
    }
  }
}
</script>


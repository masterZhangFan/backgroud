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
          <el-input v-model="formLabelAlign.name" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="一级返现金额">
          <el-input v-model="formLabelAlign.region" placeholder="请输入内容">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="税率设置">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item label="处理会员利益">
          <el-input
            v-model="formLabelAlign.type1"
            maxlength="200"
            show-word-limit
            type="textarea"
            :rows="9"
          />
        </el-form-item>
        <el-form-item label="高级会员利益">
          <el-input v-model="formLabelAlign.type2" maxlength="200" show-word-limit type="textarea" :rows="9" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSysConfig } from '@/api/system'

export default {
  data() {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        type1: '',
        type2: ''
      }
    }
  },
  mounted() {
    getSysConfig().then(res => {

    })
  }
}
</script>


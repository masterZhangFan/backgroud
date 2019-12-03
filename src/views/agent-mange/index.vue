<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-form style="position: relative;" size="medium" :inline="true" :model="formInline" class="demo-form-inline" label-width="0">
          <el-form-item>
            <el-input v-model="formInline.user" style="width: 360px;" placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="onSubmit" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.region" style="width: 200px;" placeholder="活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item style="position: absolute;right: -10px;">
            <el-button type="primary" @click="openDialog(2)">添加代理</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table
        :table-data="list.slice(0,10)"
        :table-columns="tableColumns"
        :current-page="1"
        :page-size="10"
        :total-page="list.length"
      >
        <el-table-column
          slot="memberLevel"
          label="会员级别"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.memberLevel | dealLevel() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          slot="shoppingBalance"
          label="购物余额"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.shoppingBalance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          slot="cash"
          label="可提现金额"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          slot="callBalance"
          label="话费"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.callBalance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          slot="operate"
          label="操作"
          align="center"
          width="200px"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="openDialog(0,row.userId)">查看</el-button>
            <el-button type="warning" size="mini" @click="openDialog(1,row.userId)">编辑</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-card>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showAgentInfo"
      :width="dialogWidth"
      center
    >
      <component
        :is="currentComponent"
        ref="component"
        :cur-agent-id="curAgentId"
        :is-edit="isEdit"
      />
      <!-- <AgentInfo :cur-agent-id="curAgentId" :is-edit="isEdit" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="showAgentInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAgentList } from '@/api/agent'
import AgentInfo from './components/agent-info.vue'
import AddAgent from './components/add-agent.vue'
import Table from '@/components/Table'

export default {
  components: {
    // AgentInfo,
    Table
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      showAgentInfo: false,
      listLoading: true,
      formInline: {
        user: '',
        region: ''
      },
      tableColumns: [{
        type: 'index',
        label: '序号',
        width: '95px'
      }, {
        label: '手机号',
        prop: 'phone'
      }, {
        label: '代理类别',
        prop: 'delegateTypeName'
      }, {
        slot: 'shoppingBalance'
      }, {
        slot: 'cash'
      }, {
        slot: 'callBalance'
      }, {
        slot: 'operate'
      }],
      list: [],
      curAgentId: 0,
      isEdit: 0,
      dialogWidth: '',
      dialogTitle: '',
      currentComponent: AgentInfo
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentPageChange(currentPage) {
      this.fetchData()
    },
    hanlePageSizeChange(pageSize) {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getAgentList().then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log(123)
    },
    openDialog(num, userId) {
      switch (num) {
        case 0:
          this.curAgentId = userId
          this.isEdit = num
          this.dialogWidth = '480px'
          this.dialogTitle = '代理详情'
          this.currentComponent = AgentInfo
          break
        case 1:
          this.curAgentId = userId
          this.isEdit = num
          this.dialogWidth = '680px'
          this.dialogTitle = '编辑代理'
          this.currentComponent = AgentInfo
          break
        case 2:
          this.dialogWidth = '680'
          this.dialogTitle = '新增代理'
          this.currentComponent = AddAgent
          break
      }
      this.showAgentInfo = true
    }
  }
}
</script>

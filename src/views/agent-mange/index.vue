<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-form style="position: relative;" size="medium" :inline="true" :model="formInline" class="demo-form-inline" label-width="0">
          <el-form-item>
            <el-input v-model="formInline.searchText" style="width: 360px;" placeholder="请输入内容" class="input-with-select" clearable>
              <el-button slot="append" icon="el-icon-search" @click="filterSeach" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.delegateTypeId" style="width: 200px;" placeholder="筛选代理类别" clearable @change="filterSeach">
              <el-option v-for="item in agentTypeList" :key="item.delegateTypeId" :label="item.delegateTypeName" :value="item.delegateTypeId" />
            </el-select>
          </el-form-item>
          <el-form-item style="position: absolute;right: -10px;">
            <el-button type="primary" @click="openDialog(2)">添加代理</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table
        :table-data="list"
        :table-columns="tableColumns"
        :current-page="formInline.page_index"
        :page-size="formInline.page_number"
        :total-page="formInline.totalPage"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
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
        ref="agentInfo"
        :cur-agent-id="curAgentId"
        :is-edit="isEdit"
        :agent-type-list="agentTypeList"
        @closeDialog="closeDialog"
      />
      <!-- <AgentInfo :cur-agent-id="curAgentId" :is-edit="isEdit" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Bus from '@/utils/bus'
import { getAgentList, getAgentTypeList } from '@/api/agent'
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
        page_index: 1,
        page_number: 10,
        totalPage: 0,
        searchText: '',
        delegateTypeId: ''
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
      currentComponent: '',
      agentTypeList: []
    }
  },
  created() {
    this.fetchData()
    this.getAgentTypeList()
  },
  methods: {
    handleCurrentChange(pageIndex) {
      this.formInline.page_index = pageIndex
      this.fetchData()
    },
    handleSizeChange(pageNum) {
      this.formInline.page_index = 1
      this.formInline.page_number = pageNum
      this.fetchData()
    },
    getAgentTypeList() {
      getAgentTypeList().then(res => {
        this.agentTypeList = res.data
      })
    },
    fetchData() {
      this.listLoading = true
      getAgentList(this.formInline).then(res => {
        this.list = res.data.list
        this.formInline.totalPage = res.data.total
        this.listLoading = false
      })
    },
    filterSeach() {
      this.formInline.page_index = 1
      this.fetchData()
    },
    onSubmit() {
      console.log(123)
    },
    confirm() {
      switch (this.isEdit * 1) {
        case 0:
          this.showAgentInfo = false
          break
        case 1: case 2:
          this.$refs.agentInfo.editAgentInfo()
          break
      }
    },
    openDialog(num, userId) {
      this.isEdit = num
      switch (num) {
        case 0:
          this.curAgentId = userId
          this.dialogWidth = '480px'
          this.dialogTitle = '代理详情'
          this.currentComponent = AgentInfo
          break
        case 1:
          this.curAgentId = userId
          this.dialogWidth = '680px'
          this.dialogTitle = '编辑代理'
          this.currentComponent = AgentInfo
          break
        case 2:
          this.dialogWidth = '680px'
          this.dialogTitle = '新增代理'
          this.currentComponent = AddAgent
          break
      }
      this.showAgentInfo = true
    },
    closeDialog() {
      this.showAgentInfo = false
      this.fetchData()
    }
  }
}
</script>

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
            <el-button type="primary">添加代理</el-button>
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
          slot="operate"
          label="操作"
          align="center"
          width="200px"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="showAgentInfo=true">查看</el-button>
            <el-button type="warning" size="mini" @click="showAgentInfo=true">编辑</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-card>
    <el-dialog
      title="用户详情"
      :visible.sync="showAgentInfo"
      width="480px"
      center
    >
      <AgentInfo />
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="showAgentInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import AgentInfo from './components/agent-info.vue'
import Table from '@/components/Table'

export default {
  components: {
    AgentInfo,
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
        prop: 'author'
      }, {
        label: '代理类型',
        prop: 'author'
      }, {
        label: '粉丝数',
        prop: 'author'
      }, {
        label: '购物余额',
        prop: 'author'
      }, {
        label: '可提现金额',
        prop: 'author'
      }, {
        label: '话费',
        prop: 'author'
      }, {
        slot: 'operate'
      }],
      list: []
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
      getList().then(response => {
        this.list = response.data.items
        console.log(this.list)
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log(123)
    }
  }
}
</script>

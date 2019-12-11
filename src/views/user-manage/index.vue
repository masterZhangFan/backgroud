<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-form style="position: relative;" size="medium" :inline="true" :model="formInline" class="demo-form-inline" label-width="0">
          <el-form-item>
            <el-input v-model="formInline.searchText" style="width: 360px;" placeholder="请输入内容" class="input-with-select" clearable>
              <el-button slot="append" icon="el-icon-search" @click="filterSearch" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.memberLevel" style="width: 200px;" placeholder="会员等级" clearable @change="filterSearch">
              <el-option label="初级会员" value="1" />
              <el-option label="高级会员" value="2" />
            </el-select>
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
            <el-button type="primary" size="mini" @click="showUserInfo=true;curUserInfo=row">查看</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-card>
    <el-dialog
      title="用户详情"
      :visible.sync="showUserInfo"
      width="480px"
      center
    >
      <UserInfo :cur-user-info="curUserInfo" />
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="showUserInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/member'
import { dealLevel } from '@/filters/index'
import UserInfo from './components/user-info.vue'
import Table from '@/components/Table'

export default {
  components: {
    UserInfo,
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
    },
    dealLevel
  },
  data() {
    return {
      showUserInfo: false,
      listLoading: true,
      formInline: {
        page_index: 1,
        page_number: 10,
        totalPage: 0,
        searchText: '',
        memberLevel: ''
      },
      tableColumns: [{
        type: 'index',
        label: '序号',
        width: '95px'
      }, {
        label: '手机号',
        prop: 'phone'
      }, {
        // label: '会员级别',
        // prop: 'memberLevel'
        slot: 'memberLevel'
      }, {
        label: '粉丝数',
        prop: 'fansNumber'
      }, {
        // label: '购物余额',
        // prop: 'shoppingBalance'
        slot: 'shoppingBalance'
      }, {
        // label: '可提现金额',
        // prop: 'cash'
        slot: 'cash'
      }, {
        // label: '话费',
        // prop: 'callBalance'
        slot: 'callBalance'
      }, {
        slot: 'operate'
      }],
      list: [],
      curUserInfo: {}
    }
  },
  created() {
    this.fetchData()
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
    fetchData() {
      this.listLoading = true
      getList(this.formInline).then(res => {
        this.listLoading = false
        if (res.status * 1 === 0) {
          this.list = res.data.list
          this.formInline.totalPage = res.data.total
        }
      })
    },
    filterSearch() {
      this.formInline.page_index = 1
      this.fetchData()
    }
  }
}
</script>

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
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            <!-- {{ scope.row.title }} -->
            15928137520
          </template>
        </el-table-column>
        <el-table-column label="代理类别" align="center">
          <template slot-scope="scope">
            <span>初级会员</span>
          </template>
        </el-table-column>
        <el-table-column label="粉丝数" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="购物余额" align="center">
          <template slot-scope="scope">
            ￥ 500
          </template>
        </el-table-column>
        <el-table-column align="center" label="可提现金额" width="200">
          <template slot-scope="scope">
            ￥ 500
          </template>
        </el-table-column>
        <el-table-column align="center" label="话费" width="200">
          <template slot-scope="scope">
            ￥ 500
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showUserInfo=true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="用户详情"
      :visible.sync="showUserInfo"
      width="480px"
      center
    >
      <UserInfo />
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="showUserInfo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import UserInfo from './components/user-info.vue'

export default {
  components: {
    UserInfo
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
      showUserInfo: false,
      listLoading: true,
      formInline: {
        user: '',
        region: ''
      },
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log(123)
    }
  }
}
</script>

<template>
  <div class="user-info-warp edit-box">
    <div class="item-box">
      <span class="item-box-left">
        <i>选择用户：</i>
        <el-select v-model="agentInfo.userId" filterable size="small" class="w180" placeholder="请选择">
          <el-option
            v-for="item in memberNotAgentList"
            :key="item.userId"
            :label="item.nickname"
            :value="item.userId"
          />
        </el-select>
      </span>
      <span class="item-box-right">
        <i>代理类别：</i>
        <el-select v-model="agentInfo.delegateTypeId" size="small" class="w180" placeholder="请选择">
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
        <i>返现金额：</i>
        <el-input v-model="agentInfo.cashBackAmount" placeholder="1-30" size="small" class="w180" type="text" />
      </span>
      <span class="item-box-right">
        <i>状　　态：</i>
        <el-select v-model="status" size="small" class="w180" placeholder="请选择" @change="changeStatus">
          <el-option
            v-for="item in statusArr"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </div>
    <div class="item-box upload-img">
      <span class="item-box-left">
        <i>身份证反：</i>
        <UploadFile obj-key="idCardBackPic" class="w180" @handleSuccess="handleSuccess" />
      </span>
      <span class="item-box-right">
        <i>身份证正：</i>
        <UploadFile obj-key="idCardFrontPic" class="w180" @handleSuccess="handleSuccess" />
      </span>
    </div>
    <div class="item-box upload-img">
      <span class="item-box-left">
        <i>营业执照：</i>
        <UploadFile obj-key="businessLicensePic" class="w180" @handleSuccess="handleSuccess" />
      </span>
    </div>
  </div>
</template>

<script>
import { setAgentInfo } from '@/api/agent'
import { getMemberInfoNotIncludeDelegate } from '@/api/member'
import UploadImg from '@/components/Upload/UploadImg'
import UploadFile from '@/components/Upload/UploadFile'

export default {
  components: {
    UploadImg,
    UploadFile
  },
  props: {
    agentTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      memberNotAgentList: [],
      status: 1,
      statusArr: [{
        label: '启用',
        value: 1
      }, {
        label: '停用',
        value: 0
      }],
      agentInfo: {
        userId: '',
        delegateTypeId: '',
        cashBackAmount: '',
        delegateEnbale: true,
        idCardFrontPic: '',
        idCardBackPic: '',
        businessLicensePic: ''
      },
      userArr: [],
      imageUrl: ''
    }
  },
  created() {
    getMemberInfoNotIncludeDelegate().then(res => {
      this.memberNotAgentList = res.data
    })
  },
  mounted() {

  },
  methods: {
    changeStatus(status) {
      if (status) {
        this.agentInfo.delegateEnbale = true
      } else {
        this.agentInfo.delegateEnbale = false
      }
    },
    handlePictureCardPreview() {

    },
    handleRemove() {

    },
    handleSuccess(key, url) {
      this.agentInfo[key] = url
    },
    editAgentInfo() {
      this.agentInfo.cashBackAmount = this.agentInfo.cashBackAmount * 1
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
      &.upload-img{
        align-items: flex-start;
        .item-box-left,
        .item-box-right {
          align-items: baseline;
        }
      }
    }
  }
}
</style>


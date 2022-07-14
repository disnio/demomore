<template>
  <!-- <div>Hello world</div> -->
  <div style="margin:0 73.250px">
    <el-row>
      <el-col>
        <el-form :inline="true" :model="queryForm" style="text-align:left">
          <el-form-item>
            <el-input clearable v-model="queryForm.name" placeholder="供应商名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="openCreate">新建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="list" border stripe class="user-table" style="width:100%">
          <el-table-column label="序号" width="80">
            <template
              slot-scope="scope"
            >{{((queryForm.page -1) * queryForm.size) + scope.$index +1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="weChatNickName" label="微信"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="writerCount" label="员工"></el-table-column>
          <el-table-column prop="createDt " label="创建时间" min-width="130">
            <template slot-scope="{row}">{{dateTimeFilter(row.createDt)}}</template>
          </el-table-column>
          <el-table-column label="邀请链接" min-width="160">
            <template slot-scope="{row}">
              <el-link
                type="primary"
                v-clipboard:copy="row.joinLink"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
              >点击复制</el-link>
            </template>
          </el-table-column>
          <el-table-column label="二维码" min-width="40">
            <template slot-scope="{row}">
              <el-popover v-if="row.joinLink" placement="right" width="400" trigger="hover">
                <img :src="row.joinLink" style="width:200px" />
                <img slot="reference" :src="row.joinLink" style="width:20px" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="40">
            <template slot-scope="{row}">
              <el-switch
                v-model="row.status"
                @change="changeStatus(row, $event)"
                :disabled="row.changingStatus"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column min-width="120" label="操作">
            <template slot-scope="{row}">
              <el-button size="small" type="warning" @click="openEdit(row)">编辑</el-button>
              <el-button size="small" @click="goWriters(row.id)">员工管理</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="text-align:right"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="queryForm.page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="queryForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>

    <el-dialog :title="formTitleMap[formModel]" :visible.sync="showForm">
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        label-position="left"
        :rules="formRules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="是否需要一审">
          <el-switch v-model="form.needFirstAudit"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="formSaving" @click="postForm">保存</el-button>
          <el-button @click="showForm=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  Dialog,
  Row,
  Col,
  Form,
  Radio,
  Tooltip,
  Link,
  Popover,
  Switch,
  Pagination
} from 'element-ui'
import Vue from 'vue'
import server from '@/utils/request'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Radio)
Vue.use(Tooltip)
Vue.use(Link)
Vue.use(Popover)
Vue.use(Switch)
Vue.use(Pagination)

export default {
  data() {
    var checkName = (rule, value, callback) => {
      server({
        url: `suppliers`,
        method: 'get',
        params: {
          name: value,

          page: 1,
          size: 1
        }
      })
        .then(response => {
          var list = response.data.filter(x => x.id != this.form.id && x.name == value);
          var count = list.length
          if (count >= 1) {
            callback(new Error('供应商名称已存在'))
          } else {
            callback()
          }
        })
        .catch(() => {
          callback(new Error('验证重名失败, 请稍后再试'))
        })
    }
    return {
      form: {
        id: 0,
        name: '',
        phone: '',
        needFirstAudit: false
      },
      showForm: false,
      formModel: 'create',
      formTitleMap: {
        create: '创建',
        edit: '编辑'
      },
      formSaving: false,
      formRules: {
        name: [
          { required: true, message: '名称必填' },
          { min: 2, max: 50, message: '长度在2~50个字符之间' },
          { validator: checkName, trigger: 'blur', message: '供应商名称重复' }
        ],
        phone: [
          { required: true, message: '手机号必填' }
        ]
      },

      list: [],
      total: 0,
      queryForm: {
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    openCreate() {
      this.showForm = true
      this.formModel = 'create'
      this.resetForm()
    },
    openEdit(data) {
      this.showForm = true
      this.formModel = 'edit'
      this.resetForm()
      this.form.id = data.id
      this.form.name = data.name
      this.form.phone = data.phone
      this.form.status = data.status
      this.form.needFirstAudit = data.needFirstAudit
    },
    getList() {
      server({
        url: `suppliers`,
        method: 'get',
        params: {
          name: this.queryForm.name,

          page: this.queryForm.page,
          size: this.queryForm.size
        }
      }).then(response => {
        this.total = response.count
        this.list = response.data.map(x => {
          return {
            id: x.id,
            weChatNickName: x.wechats,
            name: x.name,
            phone: x.phone,
            writerCount: x.userCount,
            createDt: x.createDt,
            joinLink: x.invitationUrl || '',
            qrCode: x.invitationUrl || '',
            status: x.status == 0,
            changingStatus: false,
            needFirstAudit: x.isFirstVerify == true
          }
        })
      })
    },
    postForm() {
      this.$refs.form.validate(success => {
        if (success && !this.formSaving) {
          this.formSaving = true
          if (this.formModel == 'create') {
            server({
              url: 'suppliers',
              method: 'post',
              data: {
                name: this.form.name,
                phone: this.form.phone,
                isFirstVerify: this.form.needFirstAudit
              }
            })
              .then(response => {
                this.$message.success('添加成功')
                this.form.id = response.data
                this.formModel = 'edit'
                this.getList()
                this.formSaving = false
                this.showForm = false
              })
              .catch(() => {
                this.formSaving = false
                this.showForm = false
              })
          } else {
            server({
              url: `suppliers/${this.form.id}`,
              method: 'post',
              data: {
                id: this.form.id,
                name: this.form.name,
                phone: this.form.phone,
                isFirstVerify: this.form.needFirstAudit
              }
            })
              .then(response => {
                this.$message.success('修改成功')
                this.getList()
                this.formSaving = false
                this.showForm = false
              })
              .catch(() => {
                this.formSaving = false
                this.showForm = false
              })
          }
        }
      })
    },
    // TODO: 检查为什么 resetField 不能使用
    resetForm() {
      this.form.name = ''
      this.form.phone = ''
      this.form.needFirstAudit = false
    },
    onCopy() {
      this.$message.success('复制成功')
    },
    onCopyError() {
      this.$message.error('复制失败')
    },
    dateTimeFilter(value) {
      return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    goWriters(id) {
      this.$router.push(`/suppliers/${id}/writers`)
    },
    handlePageChange(page) {
      this.queryForm.page = page
      this.getList()
    },
    handleSizeChange(size) {},
    changeStatus(supplier, newValue) {
      if (!supplier.changingStatus) {
        supplier.changingStatus = true
        if (newValue) {
          server({
            url: `suppliers/${supplier.id}/enable`,
            method: 'post'
          })
            .then(response => {
              supplier.changingStatus = false
            })
            .catch(() => {
              supplier.status = !newValue
              supplier.changingStatus = false
            })
        } else {
          // TODO: 缺少: 启用供应商接口
          server({
            url: `suppliers/${supplier.id}/disable`,
            method: 'post'
          })
            .then(response => {
              supplier.changingStatus = false
            })
            .catch(() => {
              supplier.status = !newValue
              supplier.changingStatus = false
            })
        }
      }
    }
  },
  filters: {
    linkFilter(value) {
      value = value || ''
      if (value.length > 20) {
        return value.substring(0, 20) + '...'
      }
      return value
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style>
.el-form-item__content {
  margin-left: 0px !important;
}
</style>

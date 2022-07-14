<template>
  <div style="margin:0 73.250px">
    <el-row>
      <el-col>
        <el-form :inline="true" :model="queryForm" style="text-align:left">
          <el-form-item>
            <el-input clearable v-model="queryForm.name" placeholder="写手名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button
              type="primary"
              @click="
                linkFormGetList();
                linkForm.showLinkForm = true;
              "
            >关联员工</el-button>
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
            >{{ (queryForm.page - 1) * queryForm.size + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="weChatNickName" label="微信"></el-table-column>
          <el-table-column prop="createDt " label="创建时间" min-width="130">
            <template slot-scope="{ row }">{{ dateTimeFilter(row.createDt) }}</template>
          </el-table-column>
          <el-table-column prop="roleName" label="角色"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="40">
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.status"
                @change="changeStatus(row, $event)"
                :disabled="row.changingStatus || (row.changingStatus = false)"
              />
            </template>
          </el-table-column>
          <el-table-column min-width="120">
            <template slot-scope="{ row }">
              <el-button size="small" type="warning" @click="openEdit(row)">角色</el-button>
              <el-button size="small" :disabled="row.removing" @click="remove(row)">移除</el-button>
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
        />
      </el-col>
    </el-row>

    <el-dialog :title="formTitleMap[formModel]" :visible.sync="showForm">
      <el-form ref="form" :model="form" label-width="120px" label-position="left">
        <el-form-item label="角色">
          <el-select v-model="form.roleName">
            <el-option
              v-for="(item, index) in roleNamesOption"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postForm">保存</el-button>
          <el-button @click="showForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="关联写手" :visible.sync="linkForm.showLinkForm">
      <el-form
        :inline="true"
        :model="linkForm.queryForm"
        style="text-align:left"
        @submit.native.prevent="linkFormGetList"
      >
        <el-form-item>
          <el-input clearable v-model="linkForm.queryForm.name" placeholder="写手名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="linkFormQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="linkForm.list" border stripe class="user-table" style="width:100%">
        <el-table-column label="序号" width="80">
          <template
            slot-scope="scope"
          >{{ (linkForm.queryForm.page - 1) * linkForm.queryForm.size + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="微信">
          <template slot-scope="{ row }">{{ row.weChatNickName || "-" }}</template>
        </el-table-column>
        <el-table-column prop="createDt " label="创建时间" min-width="130">
          <template slot-scope="{ row }">{{ dateTimeFilter(row.createDt) }}</template>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商"></el-table-column>
        <el-table-column min-width="120">
          <template slot-scope="{ row }">
            <el-button size="small" type="warning" @click="linkFormLinkUser(row.id)">关联</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="text-align:right"
        @size-change="linkFormHandleSizeChange"
        @current-change="linkFormHandlePageChange"
        :current-page="linkForm.queryForm.page"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="linkForm.queryForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="linkForm.total"
      />
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
  Select,
  Option,
  Pagination
} from "element-ui";
import Vue from "vue";
import server from "@/utils/request";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(Radio);
Vue.use(Tooltip);
Vue.use(Link);
Vue.use(Popover);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);

const roleNames = ["写手", "供应商审核员", "供应商管理员"];

function Dto() {
  this.roleName = "写手";
}

export default {
  data() {
    return {
      supplierId: this.$route.params.supplierId,
      form: {
        id: null,
        roleName: "写手"
      },
      roleNamesOption: roleNames,
      showForm: false,
      formModel: "create",
      formTitleMap: {
        create: "创建",
        edit: "编辑"
      },

      list: [],
      total: 0,
      queryForm: {
        page: 1,
        size: 10
      },
      linkForm: {
        list: [],
        queryForm: {
          name: "",

          page: 1,
          size: 10
        },
        showLinkForm: false,
        total: 0
      }
    };
  },
  methods: {
    openCreate() {
      this.showForm = true;
      this.formModel = "create";
      this.resetForm();
    },
    openEdit(data) {
      this.showForm = true;
      this.formModel = "edit";
      this.resetForm();
      this.form.id = data.id;
      this.form.roleName = data.roleName;
    },
    getList() {
      server({
        url: `suppliers/${this.supplierId}/users`,
        params: {
          name: this.queryForm.name,

          page: this.queryForm.page,
          size: this.queryForm.size
        }
      }).then(response => {
        console.log(response);
        this.total = response.count;
        this.list = response.data.map(x => {
          return {
            id: x.id,
            weChatNickName: x.weChatNickName,
            createDt: undefined,
            roleName: x.roleName,
            status: x.statusName == "正常",

            removing: false
          };
        });
      });
    },
    postForm() {
      this.$refs.form.validate(success => {
        if (success) {
          // TODO: 缺少: 设置角色的接口
          var roleIds = {
            写手: 0,
            供应商审核员: 1,
            供应商管理员: 2
          };
          server({
            url: `suppliers/${this.supplierId}/users/${this.form.id}/role/${
              roleIds[this.form.roleName]
            }`,
            method: "post"
          }).then(response => {
            this.$message.success("操作成功");
            this.getList();
            this.showForm = false;
          });
        }
      });
    },
    resetForm() {
      this.form.id = null;
    },
    dateTimeFilter(value) {
      return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    handlePageChange(page) {
      this.queryForm.page = page;
      this.getList();
    },
    handleSizeChange(size) {
      this.queryForm.size = size;
      this.getList();
    },
    linkFormHandlePageChange(page) {
      console.log(page)
      this.linkForm.queryForm.page = page;
      this.linkFormGetList();
    },
    linkFormHandleSizeChange(size) {
      this.linkForm.queryForm.size = size;
      this.linkFormGetList();
    },
    linkFormLinkUser(id) {
      // TODO: 缺少接口: 将用户与供应商关联
      server({
        url: `User/BindSupplier`,
        method: "post",
        params: {
          supplierId: this.supplierId,
          userId: id
        }
      }).then(response => {
        this.linkForm.showLinkForm = false;
        this.getList();
      });
    },
    linkFormQuery(){
      this.linkForm.queryForm.page = 1
      this.linkFormGetList()
    },
    linkFormGetList() {
      // TODO: 缺少接口: 获取所有用户列表
      server({
        url: `user/get`,
        method: "post",
        data: {
          name: this.linkForm.queryForm.name,
          onlyWriter: true,

          page: this.linkForm.queryForm.page,
          size: this.linkForm.queryForm.size
        }
      }).then(response => {
        this.linkForm.total = response.count;
        this.linkForm.list = response.data.map(x => {
          return {
            id: x.id,
            weChatNickName: x.weChatNickName,
            createDt: new Date(x.createDtStamp * 1000),
            supplierName: x.supplierName
          };
        });
      });
    },
    changeStatus(row, newValue) {
      var id = row.id;

      row.changeStatus = true;
      if (newValue && !row.changingStatus) {
        // TODO: 缺少接口: 启用用户
        server({
          url: `suppliers/${this.supplierId}/users/${id}/enable`,
          method: "post"
        })
          .then(response => {
            this.getList();
            row.changeStatus = false;
          })
          .catch(() => {
            this.list.find(x => x.id == id).status = !newValue;
            row.changeStatus = false;
          });
      } else {
        // TODO: 缺少接口: 禁用用户
        server({
          url: `suppliers/${this.supplierId}/users/${id}/disable`,
          method: "post"
        })
          .then(response => {
            this.getList();
            row.changeStatus = false;
          })
          .catch(() => {
            this.list.find(x => x.id == id).status = !newValue;
            row.changeStatus = false;
          });
      }
    },
    remove(row) {
      if (!row.removing) {
        row.removing = true;
        server({
          url: `suppliers/${this.supplierId}/users/${row.id}/remove`,
          method: "post"
        })
          .then(() => {
            this.getList();
            row.removing = false;
          })
          .catch(() => {
            row.removing = false;
          });
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style>
.el-form-item__content {
  margin-left: 0px !important;
}
</style>

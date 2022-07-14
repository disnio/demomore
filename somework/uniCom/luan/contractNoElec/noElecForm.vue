<template>
  <el-dialog
    v-drag
    :close-on-click-modal="false"
    :title="dialogTitle"
    :visible.sync="addDialogVisible"
    :before-close="close"
    custom-class="w1000"
    @opened="loadData"
    append-to-body
  >
    <div
      :style="{
        paddingRight: '10px',
        height: dialogHeight + 'px',
      }"
    >
      <el-scrollbar>
        <div class="altdiv">
          <el-collapse v-model="activeNames">
            <el-collapse-item
              title="基本信息"
              name="1"
              style="margin-left:10px"
            >
              <el-form
                ref="goods"
                :model="goods"
                label-width="150px"
                style="width:94%"
              >
                <c-item :itemProps.sync="itemProps" :values.sync="goods">
                </c-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item
              title="法务系统必填字段"
              name="2"
              style="margin-left:10px"
            >
              <fa-wu
                :legalIn.sync="legal"
                :state="state"
                @update:legal="changeLegal"
              >
              </fa-wu>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-scrollbar>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button class="save-btn" v-if="!state" @click="save('save')"
            >保存</el-button
          >

          <el-button class="submit-btn" v-if="tj" @click="save('submit')"
            >提交</el-button
          >
          <el-button class="ok-btn" @click="adopt('0')" v-if="approval"
            >通 过</el-button
          >
          <el-button class="ok-btn" @click="adopt('1')" v-if="approval"
            >驳 回</el-button
          >
          <el-button class="ok-btn" @click="adopt('2')" v-if="statusType == '10'"
            >终止合同</el-button
          >
          <el-button class="cancel-btn" @click="close()">关闭</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog 
      v-drag 
      :close-on-click-modal="false"
      custom-class="w400"
      title="合同终止原因"
      :visible.sync="checkDialogVisible"
      append-to-body
      :before-close="closeDialg"
    >
      <el-form 
        ref="listQuerys"
        :model="listQuery"
        :inline="true"
        label-width="100px"
        :rules="terminationRules">
        <el-col>
          <el-row :span="24">
            <el-form-item label="终止时间" prop="stopTime">
              <el-date-picker
                v-model="listQuery.stopTime "
                format="yyyy-MM-dd"
                placeholder="请选择日期"
                @change="changeStopTime"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row :span="24">
            <el-form-item label="终止原因" prop="termination">
              <el-input
                placeholder="请填写终止原因.."
                type="textarea"
                rows="10"
                :maxlength="400"
                v-model="listQuery.termination"
                style="width:235px"
              >
              </el-input>
            </el-form-item>
          </el-row>
        </el-col>
      </el-form>
          
      <div
        slot="footer"
        class="dialog-footer btn_footer"
      >
        <el-button
          class="ok-btn"
          @click="submit"
        >提 交</el-button>
        <el-button
          class="cancel-btn"
          @click="closeDialg()"
        >取 消</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
/**
 * @file: noElecForm.vue
 * @method
 * @description: 非电力合同，新增编辑表单
 * @author: wsc
 * @date: 2020-11-09
 */

import { mapGetters } from 'vuex';
import { getUnitMap, initDialogHeight } from '@common/utils/index';
import { cItem } from '@common/components/uniCom/cItem';
import fetch from '@common/utils/fetch';
import dw from '@common/components/uniCom/down';
import fm from './form';
import FaWu from './fawu';
import { parseTime } from "@common/utils/index";
export default {
  name: 'NoElecForm',
  components: {
    'c-item': cItem,
    'fa-wu': FaWu,
  },
  mixins: [dw, fm],
  props: {
    rowData: Object,
    viewId: String,
    visible: Boolean,
    state: Boolean,
    editState: Boolean,
    action: Object,
    statusType:String
  },
  watch: {
    visible: {
      handler: function(n) {
        this.addDialogVisible = n;
      },
      immediate: true,
    },

    state: {
      immediate: true,
      handler: function(n, o) {
        this.itemProps.forEach((v) => {
          _.forEach(v, (k) => {
            if (
              _.has(k.item, 'prop') &&
              !_.includes(this.disabled, k.item.prop)
            ) {
              k.el.disabled = this.state;
            }
            if (k.types == 'doubleInput'){
              k.douInput.el.disabled = this.state;
            }
          });
        });
      },
    },
  },
  data() {
    return {
      activeNames: ['1'],
      unitMap: {},
      approval: false,
      checkDialogVisible:false,
      listQuery:{
        termination:"",
        stopTime:""
      },
      terminationRules:{
        stopTime:[
          {
            required: true,
            message: "请输入终止时间",
            trigger: "blur"
          }
        ],
        termination:[
          {
            required: true,
            message: "请输入终止原因",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    tj() {
      if ((this.row && this.rowData.status === '10') || this.state) {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters(['elements', 'allSubMenus', 'orgId', 'sysOrg']),
  },
  created() {
    this.unitMap = getUnitMap(this.allSubMenus, this.unitMap);

    // 获取弹窗高度
    this.dialogHeight = initDialogHeight();
    window.onresize = function temp() {
      this.dialogHeight = initDialogHeight(); //获取弹框高度(监控高度变化)
    };
  },
  methods: {
    closeDialg(){
      this.listQuery.termination = ""
      this.listQuery.stopTime = ""
      this.checkDialogVisible = false
    },
    changeStopTime(val) {
      this.listQuery.stopTime = parseTime(val, "{y}-{m}-{d}");
    },
    submit(){
      this.$refs.listQuerys.validate(valid =>{
        if(valid){
           fetch({
            url: '/api/contract/htContractNotElectricity/terminate',
            method: 'POST',
            data: {
              id: this.viewId,
              stopTime:this.listQuery.stopTime,
              contractEndReason:this.listQuery.termination
            },
          }).then(res =>{
            console.log('res',res);
            if(res.rel){
              this.closeDialg()
              this.close()
            }
          })
        }
      })
    },
    // 审批部分 #641 fengzp 2020-12-17
    initApproval(param) {
      // 审批页面
      if (param.type == 'approval') {
        this.approval = true;
      } else {
        this.approval = false;
      }
    },
    adopt(val) {
      let data = {
        id: this.viewId,
      };
      this.$emit('adoptInfo', val, data);
      if(val == "2"){
        this.checkDialogVisible = true
      }
      
    },
    // 审批部分 #641 fengzp 2020-12-17
    async loadData() {
      this.resetForm();

      if (this.editState) {
        try {
          const res = await fetch({
            url: '/api/contract/htContractNotElectricity/getOneContractInfo',
            method: 'get',
            params: {
              id: this.viewId,
            },
          });

          if (res) {
            this.goods = { ...res.htContractNotElectricity };
            this.legal = { ...res.legalContract };

            this.itemProps[1][0].options = [
              {
                label: this.goods.oppositeName,
                value: this.goods.oppositeCustomerId,
              },
            ];
            this.contractTypeChangeInit(res.htContractNotElectricity.contractTypeCode);
             this.itemProps.forEach((v) => {
              _.forEach(v, (k) => {
                if (
                  _.has(k.item, 'prop') &&
                  !_.includes(this.disabled, k.item.prop)
                ) {
                  k.el.disabled = this.state;
                }
                if (k.types == 'doubleInput'){
                  k.douInput.el.disabled = this.state;
                }
              });
            });
            if (res.htContractNotElectricity.contractTypeCode == 'value_added_services'){
              this.getAddServices(res.htContractNotElectricity.addedServicesName);
              this.itemProps[5][0].options = [
                {
                  label: this.goods.addedServicesName,
                  value: this.goods.addedServicesId,
                },
              ];
            }

            // this.getOpposite(res.htContractNotElectricity.oppositeName);
          } else {
            this.$message({
              message: rel.msg,
              type: 'warning',
            });
          }
        } catch (e) {
          this.$message({
            message: '获取数据出错',
            type: 'warning',
          });
        }
      }
    },

    changeLegal(legalObj) {
      this.legal = {
        ...legalObj,
      };
    },

    close() {
      this.addDialogVisible = false;
      this.$emit('visible', false);
      this.$emit('close');
    },

    reset(obj) {
      _.keys(obj).forEach((k) => {
        if (typeof obj[k] === 'string') {
          obj[k] = '';
        }

        if (typeof obj[k] === 'number') {
          obj[k] = 0;
        }
      });

      return obj;
    },
    resetForm() {
      this.goods = this.reset(this.goods);
      this.legal = this.reset(this.legal);
    },

    add(type) {
      fetch({
        url: '/api/contract/htContractNotElectricity/insertInfo',
        method: 'post',
        data: {
          htContractNotElectricity: {
            ...this.goods,
            orgId: this.orgId,
            status: type === 'submit' ? '3' : 11,
          },
          htContractLegal: {
            ...this.legal,
          },
        },
      })
        .then((res) => {
          if (res.rel) {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.close();
          } else {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
          }
        })
        .catch((e) => {
          this.$notify({
            title: '提示',
            message: e.message,
            type: 'warning',
            duration: 2000,
          });
        });
    },

    update(status) {
      fetch({
        url: '/api/contract/htContractNotElectricity/updateInfo',
        method: 'post',
        data: {
          htContractNotElectricity: {
            ...this.goods,
            // orgId:this.orgId,
            status: status,
          },
          htContractLegal: {
            ...this.legal,
          },
        },
      })
        .then((res) => {
          if (res.rel) {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'success',
              duration: 2000,
            });
            this.close();
          } else {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'warning',
              duration: 2000,
            });
          }
        })
        .catch((e) => {
          this.$notify({
            title: '提示',
            message: e.message,
            type: 'warning',
            duration: 2000,
          });
        });
    },

    save(type) {
      this.$refs['goods'].validate((valid) => {
        if (valid) {
          if (this.editState) {
            //  编辑的保存
            // 保存 11
            if (type === 'save') {
              this.update('11');
            } else {
              // submit 提交 3
              this.update('3');
            }
          } else {
            //  新增的保存
            this.add(type);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped></style>

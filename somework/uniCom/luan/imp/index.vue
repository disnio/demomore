<template>
  <div>
    <el-dialog
      v-drag
      :close-on-click-modal="false"
      width="90%"
      :title="steps[step].title"
      :visible.sync="visible"
      append-to-body
      :before-close="close"
      style="min-hieght:500px"
    >
      <div :style="{ paddingRight: '10px', height: '90%' }">
        <template v-if="step === 0">
          <el-form
            ref="goods"
            :model="goods"
            label-width="150px"
            style="width:94%; height:200px;"
          >
            <c-item :itemProps.sync="itemProps" :values.sync="goods"> </c-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button
              type="primary"
              @click="nextStep"
              class="imp-btn"
              :disabled="goods.enclosure == ''"
              >下一步</el-button
            > -->
            <el-button
              type="primary"
              @click="nextStep"
              class="imp-btn"
              >下一步</el-button
            >
          </div>
        </template>
        <template>
          <div>
            <slot></slot>
          </div>
        </template>
        <!-- <template v-if="step === 1">
        <div>
          <slot name="progress"></slot>
        </div>
      </template>
      <template v-if="step === 2">
        <div class="imp-box">
          <slot name="parsing "></slot>
        </div>
      </template> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @description: 导入及解析统一
 * @author: wsc
 * @date: 2021-02-24
 */
import emiter from 'element-ui/lib/mixins/emitter';
import { cItem } from '@common/components/uniCom/cItem';

import sortTc from '@common/components/uniCom/sortTc';
import htb from '@common/components/uniCom/mixins/htb';

export default {
  name: 'ImpBox',
  componentName: 'ImpBox',
  props: {
    visible: Boolean,
    tpls: Array,
    uploadCb: Function,
  },
  mixins: [emiter, htb],
  components: {
    'c-item': cItem,
    'sort-tc': sortTc,
  },
  watch: {
    // 模板类型
    tpls: {
      immediate: true,
      handler(n, o) {
        console.log('tpls', n);
        if (n !== o) {
          this.itemProps[0][0].options = n;
          if (_.isArray(n) && n.length > 0) {
            this.goods.tpl = n[0].value;
          }
        }
      },
    },
  },
  data() {
    return {
      step: 0,
      steps: [
        {
          title: '导入模板',
          index: 1,
        },
        {
          title: '数据解析结果',
          index: 2,
        },
        {
          title: '数据解析',
          index: 3,
        },
      ],
      goods: {
        enclosure: '',
        file: '',
        tpl: '0',
        id: '',
      },
      itemProps: [
        [
          {
            types: 'radio',
            item: {
              prop: 'tpl',
              label: '选择模板类型',
              'label-width': '180px',
              size: 'small',
              rules: [
                {
                  required: true,
                  message: '请选择模板类型',
                  trigger: 'blur',
                },
              ],
            },
            el: {
              disabled: false,
            },
            options: this.tpls,
          },
        ],
        [
          {
            types: 'upload',
            item: {
              prop: 'enclosure',
              label: '上传附件',
              'label-width': '180px',
              size: 'small',
              rules: [
                {
                  required: true,
                  message: '必须上传附件',
                  trigger: 'blur',
                },
              ],
            },
            el: {
              disabled: false,
              multiple: false,
              limitNumber: 1,
              event: {
                success: this.upSuccess,
                delete: this.upDelete,
              },
            },
          },
        ],
      ],
      tab: 'success',
    };
  },
  created() {
    // no
    this.$on('close:impview', v => {
      console.log('close imp', v);
      this.close();
    });
  },
  methods: {
    close() {
      this.step = 0;
      this.goods = {
        enclosure: '',
        file: '',
        tpl: '0',
      };
      this.$emit('close:imp');
      this.$emit('step', 0);
    },
    nextStep() {
      // 校验上传和模板类型
      this.$refs.goods.validate(valid => {
        if (valid) {
          this.step = 1;
          this.$emit('step', 1);
          console.log('set step', this.step);
        } else {
          console.log('表单请填写完整');
        }
      });
    },
    // 上传成功
    upSuccess(sd) {
      console.log('sd', sd);
      if (
        sd.res &&
        sd.res.batch !== '' &&
        !_.isUndefined(sd.res.batch) &&
        !_.isNull(sd.res.batch)
      ) {
        this.goods.enclosure = sd.res.batch;
        this.goods.file = sd.res.file;
        this.goods.id = sd.res.file.id;

        this.uploadCb(sd.res.batch, this.goods.tpl, this.goods.id);
      }
    },
    // 删除文件成功
    upDelete(files) {
      if (files.length === 0) {
        this.goods.enclosure = '';
      }
      console.log('delete success:', files);
    },
  },
};
</script>

<style scoped>
.imp-box {
  min-height: 300px;
}
</style>

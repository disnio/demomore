<template>
     <div class="tongyipc-box">
        <el-row>
            <el-col :span="20" :offset="2" class="shenhex-title">
                <div class="fl">审核任务</div>
                <el-button  class="fr" size="medium" round>返回</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22" :offset="1" class="shenhex-content">
                 <el-row>
                    <el-col :span="20" :offset="1" class="shenhex-sou">
                        <el-select v-model="value" filterable placeholder="请选择">
                            <el-option
                            v-for="item in childTaskAudits"
                            :key="item.key"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" class="shenhex-num">
                        <p >数量300</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="1">
                         <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="原句">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="改写">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="审核状态"
                            width="200">
                             <template slot-scope="scope">
                                <span :class=" scope.row.address === '审核通过!' ? 'b' : 'a'">{{ scope.row.address }}</span>
                            </template>
                        </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // 同义词详情
    import Vue from "vue";
    import {mapActions, mapGetters} from "vuex";
    import {Col, Row, Button} from 'element-ui';
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Button);
    export default {
        name: "Tongyix",
        props: ["jid"],
        data() {
            return {
                childTaskAudit:"全部",
                childTaskAudits:[{
                    key:"-1",
                    value:"全部"
                },{
                    key:"1",
                    value:"审核通过"
                },{
                    key:"2",
                    value:"审核未通过"
                },{
                    key:"3",
                    value:"-"
                }],
                das:{}
            }
        },
        mounted() {
            this.loadMore();
        },
        methods: {

            loadMore() {

                // taskType: 1: 句子对 2：同义词 4：评价
                this.getTaskDetail({
                    "taskId": this.jid,
                    "childTaskAudit": this.childTaskAudit=="全部"?"":this.childTaskAudi,
                    "taskType": 2
                }).then((res) => {
                    this.das= res.data;


                }, () => {

                });
            },
            ...mapActions(["getTaskDetail"])
        }
    }
</script>

<style scoped>
    .tongyipc-box {
        background:rgba(255,255,255,1);
        box-shadow:0px 10px 20px 0px rgba(54,107,213,0.1);
        border-radius:6px;
        padding: 0 20px 20px;
    }
</style>
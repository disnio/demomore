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
    import {
        Col,
        Row,
        Select,
        Option,
        OptionGroup,
        Button,
        ButtonGroup,
        Table,
        TableColumn,
        } from "element-ui";
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Table);
    Vue.use(TableColumn);
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
                value: '',
                das:{},
                tableData: [{
                    date: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体',
                    name: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体上有一种古朴的感觉。纸做装饰地板也',
                    address: '审核未通过!'
                }, {
                    date: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体',
                    name: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体上有一种古朴的感觉。纸做装饰地板也',
                    address: '审核通过!'
                }, {
                    date: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体',
                    name: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体上有一种古朴的感觉。纸做装饰地板也',
                    address: '-'
                }, {
                   date: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体',
                    name: '法国红酒还是很温馨的，床和床头柜都是实木的，既简单好看又环保，墙面也就简单的刷白了，贴了一些贴纸做装饰地板也是铺的木地板，整体上有一种古朴的感觉。纸做装饰地板也',
                    address: '审核通过!'
                }]

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

<style lang="scss">
    .el-table thead tr th {
        background: #F2F3F8 !important;
    }
    .shenhex-sou {
        .el-select {
            margin-top: 20px;
            .el-input__inner {
                border-radius: 30px !important;
            }
        }
    }
</style>
<style lang="scss" scoped>
 .tongyipc-box {
        width: 100%;
        .shenhex-title {
            height: 100px;
            line-height: 100px;
            text-align: left;
            font-size: 22px;
            color: rgba(75, 78, 95, 1);
            .el-button {
                font-size: 16px;
                margin-top: 34px;
                background: linear-gradient(0deg,#FF9B02,#FFC801);
                font-size: 16px;
                border: #FFC801;
                color: #fff !important;
            }
        }
        .shenhex-content {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 10px 20px 0px rgba(54, 107, 213, 0.1);
            border-radius: 6px;
            padding-bottom: 50px;
        }
        .shenhex-sou {
            height: 80px;
            text-align: left;
            .el-select {
                margin-top: 20px;
                .el-input__inner {
                    border-radius: 30px !important;
                }
            }
        }
        .shenhex-num {
            line-height: 80px;
            p {
                font-size:16px;
                color:rgba(75,78,95,1);
             }
        }
        .a {
            color: #FF9B02;
            font-weight: bold;
        }
        .b {
            color: #2DB652;
            font-weight: bold;
        }
    }
   </style>
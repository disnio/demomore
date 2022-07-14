<template>
    <el-row>
        <el-col :span="22" :offset="1">
            <div class="topbar">
                <el-select v-model="submitDt"
                           @change="searchMissions"
                           placeholder="相似度"
                           class="topbaroption fl">
                    <el-option
                            v-for="item in filterTime"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="taskStatus"
                           @change="searchMissions"
                           placeholder="全部"
                           class="topbaroption fl">
                    <el-option
                            v-for="(item, k) in filterStates"
                            :key="k"
                            :label="item"
                            :value="k">
                    </el-option>
                </el-select>
                <el-button size="medium" type="primary">搜索</el-button>

             
            </div>
        </el-col>
        <el-col :span="22" :offset="1">
            <el-table
                    :data="missions"
                    border
                    stripe
                    
                    style="width: 100%"
                    class="user-table"
                    >

                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="name" label="原句"></el-table-column>
                <el-table-column prop="type" label="子句"></el-table-column>
                <el-table-column prop="wayOfAccept" label="相似度" sortable width="90"></el-table-column>
                <el-table-column prop="taskStatus" label="标记结果" width="80"></el-table-column>
                <el-table-column prop="sentenceCount" sortable label="通顺度" width="90"></el-table-column>
                <!-- todo -->
                <el-table-column prop="sentenceCount" label="有效量" width="70"></el-table-column>
                <el-table-column prop="score" label="评分" width="50" align="center"></el-table-column>
                <el-table-column prop="submitDt" label="完成时间" sortable width="105">
                    <template slot-scope="scope">
                        <p>{{ scope.row.submitDt[0] }}</p>
                        <p>{{ scope.row.submitDt[1] }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="writerName" label="完成人" width="100"></el-table-column>
                 <el-table-column prop="submitDt" label="审核时间" sortable width="105">
                    <template slot-scope="scope">
                        <p>{{ scope.row.submitDt[0] }}</p>
                        <p>{{ scope.row.submitDt[1] }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="auditorName" label="审核人" width="100"></el-table-column>
               
            </el-table>
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                        @current-change="searchMissions"
                        :current-page.sync="page"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="missionCount">
                </el-pagination>
            </div>

        </el-col>
    </el-row>
</template>

<script>
    import Vue from "vue";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    import {
        Input,
        Autocomplete,
        Message,
        MessageBox,
        Table,
        TableColumn,
        Button,
        ButtonGroup,
        Dialog,
        Form,
        FormItem,
        Radio,
        RadioGroup,
        RadioButton,
        Checkbox,
        CheckboxButton,
        CheckboxGroup,
        Option,
        OptionGroup,
        Select,
        Switch,
        TimeSelect,
        TimePicker,
        DatePicker,
        Pagination,
        Row,
        Col,

    } from "element-ui";


    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Dialog);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Select);
    Vue.use(Switch);
    Vue.use(TimeSelect);
    Vue.use(TimePicker);
    Vue.use(DatePicker);
    Vue.use(Pagination);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Input);
    Vue.use(Autocomplete);


    export default {
        name: "UserList",
        data() {
            return {
                czwidth: document.body.scrollWidth > 1200 ? "285" : "100",
                //分页功能
                page: 1,
                //页数
                size: 10,
                // 排序按提交时间
                submitDt: '',
                // 时间排序取值
                filterTime: [{
                    value: '',
                    label: '按时间排序'
                }, {
                    value: 'asc',
                    label: '时间由少到多'
                }, {
                    value: 'desc',
                    label: '时间由多到少'
                }],

                taskStatus: "-1",
   
                disTId: ""
            };
        },
        computed: {
            submitStartTimeStamp() {
                if (_.isNil(this.submitTime) || this.submitTime.length===0) {
                    return ""
                } else {
                    return (this.submitTime[0]/1000).toFixed(0) || "";
                }

            },

            submitEndTimeStamp() {
                if (_.isNil(this.submitTime) || this.submitTime.length===0) {
                    return ""
                } else {
                    return (this.submitTime[1]/1000).toFixed(0) || "";
                }

            },

            filterStates() {
                return _.assign({
                    "-1": '全部'
                }, this.missionTaskStatusObj);
            },

            serParams() {
                return {
                    field: "submitDt",
                    order: this.submitDt,
                    submitStartTimeStamp: this.submitStartTimeStamp,
                    submitEndTimeStamp: this.submitEndTimeStamp,
                    taskStatus: parseInt(this.taskStatus, 10),
                    keyWord: _.trim(this.keyWord),
                    page: this.page,
                    size: 10
                }
            },

            ...mapGetters(["missions", "missionCount", "missionTaskStatusObj", "writers", "writersObj"]),
        },
        mounted() {
            this.GetTaskStatus();
            this.searchMissions();
            this.GetWriters().then(() => {
                this.writersCopy = _.assign({}, this.writers);
            });
        },
        methods: {
            querySearch(v, cb) {
                let arr = this.writersCopy;

                let pt = new RegExp(v, "ig");

                if (v) {
                    let rs = _.filter(arr, (writer) => {
                        return pt.test(writer.name.toLowerCase()) || pt.test(writer.namePy.toLowerCase())
                    });
                    cb(rs);
                }
            },

            handleSelect(item) {
                this.keyWord = item.value;
                this.searchMissions();
            },

            changeWriter(item) {
                // console.log(item, this.writerId, this.writers)
                // this.writerId = item.value;
            },

            filterWriter(v) {
                let pt = new RegExp(v, "ig");
                let arr = this.writersCopy;

                if (v) {
                    this.writerId = v;
                    let rs = _.filter(arr, (writer) => {
                        return pt.test(writer.name.toLowerCase()) || pt.test(writer.namePy.toLowerCase())
                    });

                    this.set_writers(rs);
                } else {
                    this.writerId = v;
                    this.set_writers(arr);
                }
            },
            searchMissions() {
                this.GetMissions(this.serParams)
            },
            // 获取详情
            getdetail(){

            },
            // 拒稿
            viewRefuse(row) {

                this.GetRefuseMsg(row.id).then((res) => {
                    this.refuseReason = {
                        msg: res,
                        name: row.name,
                        type: row.type,
                    };

                    this.dialogVisible = true;
                }).catch(err => {
                    this.dialogVisible = false;
                });

            },
            //
            closeRefuse() {
                this.refuseReason = {
                    msg: "",
                    name: "",
                    type: "",
                };
            },
        
            disWriter(row) {
                this.disWriterVisible = true;
                this.disTId = row.id;
            },

            // 分配其他写手
            okDisWriter() {

                this.DistributionWriter({tId: this.disTId, writerId: this.writerId}).then((res) => {
                    Message.success("分配成功");
                    this.disWriterVisible = false;
                    this.disTId = "";
                    this.writerId = "";
                    this.set_writers(this.writersCopy);
                    this.GetMissions(this.serParams)

                }).catch(err => {
                    this.disWriterVisible = false;
                    this.disTId = "";
                    this.writerId = "";

                    if(err.code==400){
                        Message.error(err.message)
                    }else{
                        Message.error("分配失败")
                    }

                });


            },

            cancelDisWriter() {
                this.disWriterVisible = false;
            },

            canDis(status) {
                if (status === "待分配" || status === "待接受" || status === "待评分") {
                    return true;
                }

                return false;
            },
            canClose(status) {
                if (status === "待分配" || status === "待接受" || status === "待提交" || status === "待审核" || status === "审核中") {
                    return true;
                }

                return false;
            },

            ...mapActions(["GetMissions", "GetRefuseMsg", "DistributionWriter", "GetTaskStatus", "CloseTask", "GetWriters"]),
            ...mapMutations(["set_writers"])
        }
    };
</script>
<style>
    .el-table td,
    .el-table th.is-leaf {
        border-bottom: 1px solid #ccc;
    }

    .el-table--border th {
        border-right: 1px solid #ccc;
    }

    .el-table--border td {
        border-right: 1px solid #ccc;
    }

    .el-table--border {
        border: 1px solid #ccc;
    }

    .block {
        text-align: right;
        margin: 30px 0;
    }

    .writer-form .el-form-item__content {
        margin-left: 20px !important;
    }
</style>

<style scoped>
    .dialog-footer {
        margin-top: 30px;
    }

    .user-table {
        width: 80%;
        margin: 0 auto;
    }

    .add_btn {
        margin: 0 0 30px 0;
    }

    .user_box {
        text-align: left;
    }

    .topbar {
        height: 50px;
        margin: 0 0 30px 0;
    }

    .topbaroption {
        width: 180px;
        margin-right: 20px;
    }

    .times {
        margin: 0 !important;
    }


    @media screen  and (max-width: 1200px) and (min-width: 970px) {
        .el-button--mini {
            margin: 0 0 3px 0;
            display: block;
        }

        .el-date-editor--datetimerange.el-input__inner {
            width: 355px !important;
        }

        .sousuo {
            width: 198px !important;
        }

        .topbaroption {
            width: 138px;
            margin-right: 12px;
        }
    }

    .ju_input {
        width: 100%;
        height: 150px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 5px;
        resize: none;
        padding: 8px;
        box-sizing: border-box;
        cursor: no-drop;
    }

    .p-text {
        margin-bottom: 12px;
    }

    .p-text span {
        display: inline-block;
        width: 70px;
        text-align: right;
    }

</style>

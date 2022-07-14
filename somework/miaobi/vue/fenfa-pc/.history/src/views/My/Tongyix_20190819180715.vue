<template>
    <div class="tongyipc-box">

    </div>
</template>

<script>
    // 同义词详情
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
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60df7316"],{"26f4":function(e,t,a){"use strict";var n=a("a85a"),s=a.n(n);s.a},"777d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shenhex-box"},[a("el-row",[a("el-col",{staticClass:"shenhex-title",attrs:{span:20,offset:2}},[a("div",{staticClass:"fl"},[e._v("审核任务")])])],1),a("el-row",[a("el-col",{staticClass:"shenhex-content",attrs:{span:22,offset:1}},[a("el-row",[a("el-col",{staticClass:"shenhex-sou",attrs:{span:20,offset:1}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.loadMore},model:{value:e.childTaskAudit,callback:function(t){e.childTaskAudit=t},expression:"childTaskAudit"}},e._l(e.childTaskAudits,function(e){return a("el-option",{key:e.key,attrs:{label:e.key,value:e.value}})}),1)],1),a("el-col",{staticClass:"shenhex-num",attrs:{span:2}},[a("p",[e._v("数量："+e._s(e.xcount))])])],1),a("el-row",[a("el-col",{attrs:{span:22,offset:1}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.das}},[a("el-table-column",{attrs:{prop:"mainSentence",label:"原句"}}),a("el-table-column",{attrs:{prop:"childSentence",label:"改写"}}),a("el-table-column",{attrs:{prop:"editDistanceSimilarityV",label:"相似度"}}),a("el-table-column",{attrs:{prop:"myTag",label:"判断结果"}}),a("el-table-column",{attrs:{prop:"auditorTag",label:"审核",width:"200"}})],1)],1)],1)],1)],1)],1)},s=[],l=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),c=(a("5466"),a("450d"),a("ecdf")),i=a.n(c),r=(a("38a0"),a("ad41")),o=a.n(r),u=(a("ae26"),a("845f")),d=a.n(u),f=(a("1951"),a("eedf")),p=a.n(f),h=(a("016f"),a("486c")),b=a.n(h),k=(a("6611"),a("e772")),y=a.n(k),m=(a("1f1a"),a("4e4b")),v=a.n(m),w=(a("7a0f"),a("0f6c")),O=a.n(w),g=(a("f4f9"),a("c2cc")),j=a.n(g),x=a("2b0e"),T=a("2f62");function D(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function S(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?D(a,!0).forEach(function(t){Object(l["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):D(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}x["default"].use(j.a),x["default"].use(O.a),x["default"].use(v.a),x["default"].use(y.a),x["default"].use(b.a),x["default"].use(p.a),x["default"].use(d.a),x["default"].use(o.a),x["default"].use(i.a);var A={name:"Shenhex",props:["jid"],data:function(){return{childTaskAudit:"",childTaskAudits:[{key:"全部",value:""},{key:"正确",value:"正确"},{key:"错误",value:"错误"},{key:"-",value:"-"}],das:[],xcount:0}},mounted:function(){this.loadMore()},methods:S({loadMore:function(){var e=this;this.getTaskDetail({taskId:this.jid,childTaskAudit:this.childTaskAudit}).then(function(t){e.xcount=t.count,e.das=_.map(t.data,function(e){return e.editDistanceSimilarityV=(100*e.editDistanceSimilarity).toFixed(0)+"%",e})},function(t){400===t.code&&e.$message.warning(t.message)})}},Object(T["b"])(["getTaskDetail"]))},P=A,C=(a("7a50"),a("26f4"),a("2877")),E=Object(C["a"])(P,n,s,!1,null,"33705c40",null);t["default"]=E.exports},"7a50":function(e,t,a){"use strict";var n=a("cc41"),s=a.n(n);s.a},a85a:function(e,t,a){},cc41:function(e,t,a){}}]);
//# sourceMappingURL=chunk-60df7316.729f1ac7.js.map
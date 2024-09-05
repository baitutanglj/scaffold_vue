(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1adbe81c"],{"358b":function(e,t,o){"use strict";var r=o("422f"),l=o.n(r);l.a},"422f":function(e,t,o){},"7b79":function(e,t,o){"use strict";var r=o("a9c9"),l=o.n(r);l.a},"8d7d":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("PredictCom1",{attrs:{url:"/sampling"}})],1)},l=[],i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"predictcom1"},[o("el-form",{ref:"form",staticClass:"demo-form",attrs:{"label-position":e.labelPosition,model:e.form,"status-icon":"",rules:e.rules,"label-width":"120px"}},[1==e.hackReset?o("iframe",{ref:"iframe",attrs:{src:e.src,id:"myiframe",width:"700px",height:"750px",frameborder:"”0”",border:"”0″",marginwidth:"”0″",marginheight:"”0″",scrolling:"no",prop:"demo"}}):e._e(),o("el-form-item",{attrs:{label:"scaffold_smi",prop:"scaffold_smi"}},[o("el-input",{attrs:{value:"form.scaffold_smi",placeholder:"Please enter the scaffold"},model:{value:e.form.scaffold_smi,callback:function(t){e.$set(e.form,"scaffold_smi",t)},expression:"form.scaffold_smi"}}),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.getSmiles()}}},[e._v("scaffold")])],1),o("el-form-item",{attrs:{"label-width":"200px",label:"Use your own model",prop:"ifOwnModel"}},[o("el-tooltip",{attrs:{placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[e._v("Whether to use your own model sampling")]),o("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-text":"Yes","inactive-text":"No"},on:{change:function(t){return e.changetype()}},model:{value:e.form.ifOwnModel,callback:function(t){e.$set(e.form,"ifOwnModel",t)},expression:"form.ifOwnModel"}})],1)],1),e.form.ifOwnModel?o("el-form-item",{attrs:{label:"Upload model",prop:"model"}},[1==e.hackReset?o("UploadCom",{attrs:{isData:!1,tipmsg:"Upload the pt file model for the sampling"},on:{func:e.getModel}}):e._e()],1):e._e(),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!e.form.ifOwnModel,expression:"!form.ifOwnModel"}],attrs:{label:"Other Models",prop:"model_rule"}},[o("el-tooltip",{attrs:{placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[e._v("Select the model provided by the system")]),o("el-select",{model:{value:e.form.selected_model,callback:function(t){e.$set(e.form,"selected_model",t)},expression:"form.selected_model"}},e._l(e.models,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),o("el-form-item",{attrs:{label:"decorator_type",prop:"decorator_type"}},[o("el-radio",{attrs:{disabled:!e.form.ifOwnModel,label:"multi"},model:{value:e.form.decorator_type,callback:function(t){e.$set(e.form,"decorator_type",t)},expression:"form.decorator_type"}},[e._v("multiple")]),o("el-radio",{attrs:{disabled:!e.form.ifOwnModel,label:"single"},model:{value:e.form.decorator_type,callback:function(t){e.$set(e.form,"decorator_type",t)},expression:"form.decorator_type"}},[e._v("Single")])],1),o("el-form-item",{attrs:{label:"batch_size",prop:"batch_size"}},[o("el-tooltip",{attrs:{placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[e._v("Batch size (beware GPU memory usage) "),o("br"),e._v(" Default: 128")]),o("el-input",{model:{value:e.form.batch_size,callback:function(t){e.$set(e.form,"batch_size",e._n(t))},expression:"form.batch_size"}})],1)],1),o("el-form-item",{attrs:{label:"num_randomized",prop:"num_randomized"}},[o("el-tooltip",{attrs:{placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[e._v("Number of randomized SMILES to use in every stage of the decoration process "),o("br"),e._v(" Default: 16")]),o("el-input",{model:{value:e.form.num_randomized,callback:function(t){e.$set(e.form,"num_randomized",e._n(t))},expression:"form.num_randomized"}})],1)],1),o("el-form-item",{attrs:{label:"num_decorations",prop:"num_decorations"}},[o("el-tooltip",{attrs:{placement:"top"}},[o("div",{attrs:{slot:"content"},slot:"content"},[e._v("Number of randomized SMILES to use in every stage of the decoration process "),o("br"),e._v(" Default: 16")]),o("el-input",{model:{value:e.form.num_decorations,callback:function(t){e.$set(e.form,"num_decorations",e._n(t))},expression:"form.num_decorations"}})],1)],1),o("el-form-item",{attrs:{label:"Email",prop:"email"}},[o("el-input",{attrs:{autocomplete:"True",placeholder:"Please enter your email address"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("form")}}},[e._v("submit")]),o("el-button",{on:{click:function(t){return e.resetForm("form")}}},[e._v("reset")])],1)],1),o("el-card",{directives:[{name:"show",rawName:"v-show",value:e.ifrun,expression:"ifrun"}],attrs:{shadow:"always"}},[o("h2",[e._v("The child process is "+e._s(e.pid))])])],1)},a=[],n=(o("a9e3"),o("8ba4"),o("0589")),s=o("30eb"),m={name:"PredictCom1",components:{UploadCom:s["a"]},data:function(){var e=function(e,t,o){if(!t)return o(new Error("Could not be empty"));setTimeout((function(){Number.isInteger(t)?o():o(new Error("Please enter a numeric value"))}),500)};return{src:"./static/demo.html",iframeWin:{},labelPosition:"left",ifrun:!1,pid:"",hackReset:!0,models:[{label:"ChEMBL_100epoch",value:"ChEMBL.model.100.pt"},{label:"DRD2_100epoch",value:"DRD2.model.100.pt"}],form:{scaffold_smi:"",ifOwnModel:!0,modelPath:"",selected_model:"ChEMBL.model.100.pt",decorator_type:"multi",batch_size:128,num_randomized:16,num_decorations:16,email:""},rules:{batch_size:[{validator:e,trigger:"blur"}],num_randomized:[{validator:e,trigger:"blur"}],num_decorations:[{validator:e,trigger:"blur"}],email:[{required:!0,message:"Please enter your email address",trigger:"blur"},{type:"email",message:"Please enter the correct email address",trigger:["blur","change"]}]}}},props:{url:String},methods:{getSmiles:function(){this.form.scaffold_smi=this.$refs.iframe.contentWindow.new_smiles,this.$refs.iframe.contentWindow.jsmeApplet.reset()},getData:function(e){this.form.dataPath=e},getModel:function(e){this.form.modelPath=e},getScaffold:function(e){this.scaffold="scaffold:{"+e+"}"},getDecoration:function(e){this.decoration="decoration:{"+e+"}"},changetype:function(){0==this.form.ifOwnModel&&(this.form.decorator_type="multi")},submitForm:function(e){var t=this,o=this.checkSubmit();this.$refs[e].validate((function(e){if(!e||!o)return t.$alert("Input information is incomplete or incorrect","Submit failed",{confirmButtonText:"confirm",type:"warning"}),!1;Object(n["a"])(t.url,t.form).then((function(e){t.pid=e.pid+3,t.ifrun=!0,t.$notify({title:"Sampling is running",message:"The child process is "+t.pid,type:"success"})})).catch((function(e){t.$alert(e,"Run failed",{confirmButtonText:"confirm"})}))}))},resetForm:function(e){var t=this;this.$refs[e].resetFields(),this.hackReset=!1,this.$nextTick((function(){t.hackReset=!0}))},checkSubmit:function(){return 1!=this.form.ifOwnModel||""!=this.form.modelPath}}},c=m,f=(o("358b"),o("2877")),d=Object(f["a"])(c,i,a,!1,null,"1db27481",null),u=d.exports,p={name:"PageTwo",components:{PredictCom1:u}},h=p,b=(o("7b79"),Object(f["a"])(h,r,l,!1,null,"642c9802",null));t["default"]=b.exports},a9c9:function(e,t,o){}}]);
//# sourceMappingURL=chunk-1adbe81c.0d66e48a.js.map
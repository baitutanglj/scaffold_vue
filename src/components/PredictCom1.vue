<template>
  <div class="predictcom1">
    <el-form :label-position="labelPosition" :model="form" status-icon :rules="rules" ref="form" label-width="120px" class="demo-form">
      <iframe :src="src" id='myiframe' ref="iframe" width=700px height=750px
              frameborder=”0” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling="no" prop="demo"
              v-if="hackReset == true"
      ></iframe>
      <!--smiles-->
      <el-form-item label="scaffold_smi" prop="scaffold_smi">
        <el-input v-model="form.scaffold_smi" value="form.scaffold_smi" placeholder="Please enter the scaffold"></el-input>&nbsp;
        <el-button type="primary"  @click="getSmiles()">scaffold</el-button>
      </el-form-item>
      <!-- Whether to use own model-->
      <el-form-item label-width="200px" label="Use your own model" prop="ifOwnModel">
        <el-tooltip placement="top">
          <div slot="content">Whether to use your own model sampling</div>
          <el-switch
              v-model="form.ifOwnModel"
              @change="changetype()"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Yes"
              inactive-text="No">
          </el-switch>
        </el-tooltip>
      </el-form-item>
      <!--choose model-->
      <el-form-item  label="Upload model" v-if="form.ifOwnModel" prop="model">
        <UploadCom :isData="false"
                   tipmsg="Upload the pt file model for the sampling"
                   @func="getModel"
                   v-if="hackReset == true"
        ></UploadCom>
      </el-form-item>
      <!--Using the existing model-->
      <el-form-item v-show="!form.ifOwnModel" label="Other Models" prop="model_rule">
        <el-tooltip placement="top">
          <div slot="content">Select the model provided by the system</div>
          <el-select v-model="form.selected_model" >
            <el-option
                v-for="item in models"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
      <!--decorator_type-->
      <el-form-item label="decorator_type" prop="decorator_type">
        <el-radio :disabled=!form.ifOwnModel v-model="form.decorator_type" label="multi">multiple</el-radio>
        <el-radio :disabled=!form.ifOwnModel v-model="form.decorator_type" label="single">Single</el-radio>
      </el-form-item>
      <!--batch_size-->
      <el-form-item label="batch_size" prop="batch_size">
        <el-tooltip placement="top">
          <div slot="content">Batch size (beware GPU memory usage)
            <br>
            Default: 128</div>
          <el-input v-model.number="form.batch_size"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--num_randomized-->
      <el-form-item label="num_randomized" prop="num_randomized">
        <el-tooltip placement="top">
          <div slot="content">Number of randomized SMILES to use in every stage of the decoration process
            <br>
            Default: 16</div>
          <el-input v-model.number="form.num_randomized"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--num_decorations-->
      <el-form-item label="num_decorations" prop="num_decorations">
        <el-tooltip placement="top">
          <div slot="content">Number of randomized SMILES to use in every stage of the decoration process
            <br>
            Default: 16</div>
          <el-input v-model.number="form.num_decorations"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--email-->
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" autocomplete="True" placeholder="Please enter your email address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">submit</el-button>
        <el-button @click="resetForm('form')">reset</el-button>
      </el-form-item>
    </el-form>
    <el-card shadow="always" v-show="ifrun">
      <h2>The child process is {{pid}}</h2>
    </el-card>
  </div>
</template>

<script>
import {getListen} from '@/api/Get'
import UploadCom from "@/components/UploadCom";
export default {
  name: "PredictCom1",
  components: {
    UploadCom,
  },
  data() {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Could not be empty'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      src: './static/demo.html',
      iframeWin: {},
      labelPosition:'left',
      ifrun:false,//ifrun==true,show pid
      pid: '',
      hackReset: true,
      models: [
        { label: 'ChEMBL_100epoch', value: 'ChEMBL.model.100.pt' },
        { label: 'DRD2_100epoch', value: 'DRD2.model.100.pt' }],
      form:{
        scaffold_smi:'',
        ifOwnModel:true,
        modelPath:'',
        selected_model: 'ChEMBL.model.100.pt',
        decorator_type:'multi',
        batch_size:128,
        num_randomized:16,
        num_decorations:16,
        email:''
      },
      rules:{
        batch_size:[
          { validator: check, trigger: 'blur' },
        ],
        num_randomized:[
          { validator: check, trigger: 'blur' }
        ],
        num_decorations:[
          { validator: check, trigger: 'blur' },
        ],
        email:[
          {required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ],

      }
    }
  },
  props: {
    url: String,
  },
  methods: {
    getSmiles() {
      this.form.scaffold_smi = this.$refs.iframe.contentWindow.new_smiles
      this.$refs.iframe.contentWindow.jsmeApplet.reset()
    },
    getData(data){
      this.form.dataPath=data
      // console.log('data:   '+this.form.dataPath);
    },
    getModel(data){
      this.form.modelPath=data
      // console.log('model:   '+this.form.modelPath);
    },
    getScaffold(data){
      this.scaffold='scaffold:{'+data+'}'
    },
    getDecoration(data){
      this.decoration='decoration:{'+data+'}'
    },
    changetype(){
      if(this.form.ifOwnModel==false){
        this.form.decorator_type = 'multi'
      }

    },
    submitForm(formName) {
      var checkS = this.checkSubmit()
      this.$refs[formName].validate((valid) => {
        if (valid && checkS) {
          // 发送请求
          getListen(this.url,this.form).then(res=>{
            // console.log(res);
            this.pid = res.pid+3
            this.ifrun = true
            this.$notify({
              title: 'Sampling is running',
              message: 'The child process is '+this.pid,
              type: 'success'
            });
          }).catch(err=>{
            // console.log(err);
            this.$alert(err, 'Run failed', {
              confirmButtonText: 'confirm',})
          })
        }else{
          this.$alert('Input information is incomplete or incorrect','Submit failed', {
            confirmButtonText: 'confirm',
            type: 'warning'})
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    checkSubmit() {
      if (this.form.ifOwnModel==true && this.form.modelPath==''){
        return false
      }else {
        return true
      }
    },

  },
  // updated () {
  //   console.log(this.form.decorator_type)
  // }
}

</script>

<style scoped>
.el-button{
  width:120px;
  height:40px;

}
.el-input{
  width:410px;
}
.el-card {
  width: 48%;
}
.contitle {
  font-size: 20px;
  text-shadow: 5px 5px 5px black, 0px 0px 2px #535C64, 2px 2px 3px #535C64;
  text-indent: 1em;
}
</style>

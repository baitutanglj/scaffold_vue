<template>
  <div class="trainCom1">
    <h1 class="headtitle">Data Processing</h1>
    <br>
    <el-form :label-position="labelPosition" :model="form" status-icon :rules="rules" ref="form" label-width="170px" class="demo-form">
      <!--choose datasets-->
      <el-form-item  label="Upload datasets" prop="dataPath">
        <UploadCom :isData="true"
                   tipmsg="Upload the gz file or smi file to provide the raw data set for the training"
                   @func="getData"
                   v-if="hackReset == true"
        ></UploadCom>
      </el-form-item>
      <!--data processing-->
      <!--max_cuts-->
      <el-form-item label="max_cuts" prop="max_cuts">
        <el-tooltip placement="top">
          <div slot="content">Maximum number of cuts to attempts for each molecule
            <br>
            Default: 4</div>
          <el-input-number v-model="form.max_cuts" controls-position="right"  :min="1" :max="20"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <!--slice_type-->
      <el-form-item label="slice_type" prop="slice_type">
        <el-radio v-model="form.slice_type" label="hr">Hussain-Rea</el-radio>
        <el-radio v-model="form.slice_type" label="recap">RECAP</el-radio>
      </el-form-item>
      <!--condition.json-->
      <!--scaffold-->
      <el-form-item label="filter condition" prop="condition">
        <h3 class="contitle">
          Scaffold
        </h3>
        <tableCom @func="getScaffold" v-if="hackReset == true" style="width: 60%"></tableCom>
      <!--Decoration-->
        <h3 class="contitle">
          Decoration
        </h3>
        <tableCom @func="getDecoration" v-if="hackReset == true" style="width: 60%"></tableCom>
      </el-form-item>
      <!--num_files-->
      <el-form-item label="num_files" prop="num_files">
        <el-tooltip placement="top">
          <div slot="content">Number of SMILES files to create (numbered from 000 ...)
            <br>
            Default: 1</div>
          <el-input v-model.number="form.num_files"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--decorator_type-->
      <el-form-item label="decorator_type" prop="decorator_type">
        <el-radio v-model="form.decorator_type" label="multi">multiple</el-radio>
        <el-radio v-model="form.decorator_type" label="single">single</el-radio>
      </el-form-item>
      <!--train-->
      <h1 class="headtitle">Training</h1>
      <br>
      <!--embedding_size-->
      <el-form-item label="embedding_size" prop="embedding_size">
        <el-tooltip placement="top">
          <div slot="content">Size of the embedding layer
            <br>
            Default: 256</div>
          <el-input v-model.number="form.embedding_size"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--max_sequence_length-->
      <el-form-item label="max_sequence_length" prop="max_sequence_length">
        <el-tooltip placement="top">
          <div slot="content">Maximum length of the sequences
            <br>
            Default: 256</div>
          <el-input v-model.number="form.max_sequence_length"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--dropout-->
      <el-form-item label="dropout" prop="dropout">
        <el-tooltip placement="top">
          <div slot="content">Amount of dropout between the GRU layers
            <br>
            Default: 0.2</div>
          <el-input-number v-model="form.dropout" controls-position="right" :step="0.1" :min="0.0" :max="1.0"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <!--epochs-->
      <el-form-item label="epochs" prop="epochs">
        <el-tooltip placement="top">
          <div slot="content">Number of epochs to train
            <br>
            Default: 100</div>
          <el-input v-model.number="form.epochs"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--save_every_n_epochs-->
      <el-form-item label="save_every_n_epochs" prop="save_every_n_epochs">
        <el-tooltip placement="top">
          <div slot="content">Save the model after n epochs
            <br>
            Default: 10</div>
          <el-input v-model.number="form.save_every_n_epochs"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--batch_size-->
      <el-form-item label="batch_size" prop="batch_size">
        <el-tooltip placement="top">
          <div slot="content">Number of molecules processed per batch
            <br>
            Default: 128</div>
          <el-input v-model.number="form.batch_size"></el-input>
        </el-tooltip>
      </el-form-item>
      <!--email-->
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Please enter your email address"></el-input>
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
import UploadCom from "@/components/UploadCom"
import TableCom from "@/components/TableCom";
export default {
  name: "TrainCom1",
  components: {
    UploadCom,
    TableCom
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
    var check_batchsize = (rule, value, callback) => {
      if (value>256) {
        return callback(new Error('Batch Size greater than 128 may cause CUDA out of memory'));
      }
      else {
        callback()
      }
    };

    return {
      labelPosition: 'left',
      pid:'',
      ifrun:false,//ifrun==true,show pid
      hackReset: true,
      scaffold:'"scaffold":{"num_rings":{"min":1}}',
      decoration:'"decoration":{"num_rings":{"min":1}}',
      form: {
        dataPath:'',
        max_cuts:4,
        slice_type:'hr',
        decorator_type:'multi',
        filterJson:'',
        num_files:50,
        embedding_size:256,
        max_sequence_length:256,
        dropout:0.2,
        epochs:100,
        save_every_n_epochs:10,
        batch_size:128,
        email:''
      },
      rules: {
        // modelPath:[
        //   { validator: checkFile, trigger: 'blur' }
        // ],
        num_files:[
          { validator: check, trigger: 'blur' }
        ],
        embedding_size:[
          { validator: check, trigger: 'blur' }
        ],
        max_sequence_length:[
          { validator: check, trigger: 'blur' }
        ],
        epochs:[
          { validator: check, trigger: 'blur' }
        ],
        save_every_n_epochs:[
          { validator: check, trigger: 'blur' }
        ],
        batch_size:[
          { validator: check, trigger: 'blur' },
          { validator: check_batchsize, trigger: 'blur' }
        ],
        email:[
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  props: {
    url: String,
  },
  methods: {
    getData(data){
      this.form.dataPath=data
      // console.log('data:   '+this.form.dataPath);
    },
    getModel(data){
      this.form.modelPath=data
      // console.log('model:   '+this.form.modelPath);
    },
    getScaffold(data){
      this.scaffold='"scaffold":{'+data+'}'
    },
    getDecoration(data){
      this.decoration='"decoration":{'+data+'}'
    },

    submitForm(formName) {
      var checkS = this.checkSubmit()
      this.form.filterJson = '{'+this.scaffold+','+this.decoration+'}'
      this.$refs[formName].validate((valid) => {
        if (valid && checkS) {
          // 发送请求
          // console.log(this.form);
          getListen(this.url,this.form).then(res=>{
            this.pid = res.pid+3
            this.ifrun = true
            this.$notify({
              title: 'Training is running',
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
      if(this.form.dataPath==''){
        return false;
      }else{
        return true
      }
    },
  },
  updated() {
    this.form.filterJson = '{'+this.scaffold+','+this.decoration+'}'
  }
}
</script>

<style scoped>
.el-button{
  width:120px;
  height:40px;
  font-size:15px

}
.el-input{
  width:410px;
}
.el-card {
  width: 48%;
}
.headtitle {
  font-size: 30px;
  text-shadow: 5px 5px 5px black, 0px 0px 2px #535C64, 2px 2px 3px #535C64;
}
.contitle {
  font-size: 20px;
  text-shadow: 5px 5px 5px black, 0px 0px 2px #535C64, 2px 2px 3px #535C64;
  text-indent: 1em;
}
.el-collapse {
  width: 50%
}
</style>

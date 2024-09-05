<template>
  <div class="uploadcom">
      <el-upload
          class="upload-demo"
          action="http://192.168.108.209:8082/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :accept="acceptType"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
        <el-tooltip placement="top">
          <div slot="content">{{ tipmsg }}</div>
          <el-button size="small" type="primary">Choose File</el-button>
        </el-tooltip>

        <span slot="tip" class="el-upload__tip" style="font-size:14px"> {{ msg }}</span>
      </el-upload>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "UploadCom",
  data(){
    return {
      fileList: [],
      filePath:'',
      msg:'Only gz files or smi files can be uploaded',
      acceptType:'.gz, .smi'
    }
  },
  props: {
    isData:Boolean,
    tipmsg:String
  },
  methods: {
    handleRemove() {
      // console.log(file, fileList);
    },
    handlePreview() {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$message.warning(`The current limit to choose a file, the chose ${files.length} file，a total of ${files.length + fileList.length} files`);
      // this.$confirm(`确定移除 ${ file.name }？`);
    },
    beforeRemove(file) {
      return this.$confirm(`Sure to remove${ file.name }?`);
    },
    handleSuccess(res){
      this.filePath = res.filePath
      // console.log(res.filePath);
      this.$message.success('Uploaded successfully');
      this.$emit('func',res.filePath)//传给父组件
      // if (this.isData){
      //   this.$store.commit('setDataPath',res.filePath)
      // }else{
      //   this.$store.commit('setModelPath',res.filePath)
      // }

    },
    handleError(){
      // console.log(err);
      this.$message.error('Upload failed');
    },
  },
  created(){
    if(!this.isData){
      this.msg = 'Only pt files can be uploaded'
      this.acceptType = '.pt'
    }
  },
  computed:{
    ...mapState(['dataPath','modelPath'])
  }
}
</script>

<style scoped>
.el-button{
  width:120px;
  height:40px;
  font-size:15px
}
.upload-demo {
  width:500px;
}
</style>

<template>
  <el-row class="home" :gutter="20">
    <el-col :span="15" style="margin-top: 20px">
      <!--shadow属性设置卡片阴影出现的时机-->
      <el-card shadow='hover'>
        <div class="user">
          <div class="userinfo">
            <p class="name">SMILES‐based deep generative
              scaffold decorator for de‐novo drug design</p>
            <br>
          </div>
        </div>
        <div class="login-info">
          <p>Josep Arús‐Pous, Atanas Patronov, Esben Jannik Bjerrum, Christian Tyrchan, Jean‐Louis Reymond,
            Hongming Chen and Ola Engkvist</p>
          <p>Article addresses：
            <el-link href="https://doi.org/10.1186/s13321-020-00441-8" target="_blank" style="font-size: 15px">
              https://doi.org/10.1186/s13321-020-00441-8</el-link>
          </p>
          <p>github addresses：
            <el-link href="https://github.com/undeadpixel/reinvent-scaffold-decorator" target="_blank" style="font-size: 15px">
              https://github.com/undeadpixel/reinvent-scaffold-decorator</el-link>
          </p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <div class="model">
          <img :src="modelImg" style="width:90%;margin: 0 auto"/>
        </div>
      </el-card>
    </el-col>
    <el-col>

    </el-col>
  </el-row>
</template>

<script>
    export default {
      data() {
        return {
          userImg: require('../../assets/images/chem.png'),
          modelImg: require('../../assets/images/model.jpg'),
            }
        },
        // methods: {
        //     getTableData() {
        //         this.$http.get('/home/getData').then(res => {
        //             res = res.data
        //             this.tableData = res.data.tableData
        //         })
        //     }


        // },
        //一进组件就会去请求后端接口 获取首页数据
        // created() {
        //     this.getTableData()
        // }

    }


</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/home';
</style>

<template>
  <div id="TableCom">
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">Add</el-button>
<!--    <el-button type="info" icon="el-icon-edit" size="mini" @click="editAll">Multiple Edit</el-button>-->
<!--    <el-button type="success" icon="el-icon-check" size="mini" @click="submit">Save All</el-button>-->
<!--    <el-button type="info" icon="el-icon-plus" size="mini" @click="addAll">Multiple Add</el-button>-->
<!--    <el-button type="danger" icon="el-icon-delete" size="mini" @click="delectAll">Multiple Delete</el-button>-->
    <el-table :data="tabledatas" border @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="condition">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-select v-model="scope.row.condition">
              <el-option
                  v-for="item in conOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
<!--            <el-input size="mini" placeholder="Please enter the contents" v-model="scope.row.condition"></el-input>-->
          </span>
          <span v-else>{{scope.row.condition}}</span>
        </template>
      </el-table-column>
      <el-table-column label="limit">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-select v-model="scope.row.limit">
              <el-option
                  v-for="item in limitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <!--            <el-input size="mini" placeholder="Please enter the contents" v-model="scope.row.condition"></el-input>-->
          </span>
          <span v-else>{{scope.row.limit}}</span>
        </template>
      </el-table-column>
      <el-table-column label="limit_num">
        <template slot-scope="scope">
          <span v-if="scope.row.show">
            <el-input size="mini" placeholder="Please enter the contents" v-model="scope.row.limit_num"></el-input>
          </span>
          <span v-else>{{scope.row.limit_num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="operation">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
                     @click="edit(scope.row,scope.$index)">{{scope.row.show?'Save':"Edit"}}</el-button>
          <el-button v-if="!scope.row.show" type="danger" icon="el-icon-delete" size="mini"
                     @click="delect(scope.$index)">Delete</el-button>
          <el-button v-else type="info" icon="el-icon-close" size="mini"
                     @click="handleCancle(scope.row,scope.$index)">Cancel</el-button>
<!--          <el-button type="info" icon="el-icon-document-copy" size="mini"-->
<!--                     @click="cope(scope.row,scope.$index)">Copy</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
name: "TableCom",
  data() {
    return {
      tabledatas: [],
      multipleSelection: [],
      defaultData:[],
      myjson:'',
      // typeOptions:[{value:'Scaffold',label:'Scaffold'},
      //             {value:'Decoration',label:'Decortor'}],
      conOptions:[{value:'num_rings',label:'num_rings'},
                  {value:'mol_weight',label:'mol_weight'},
                  {value:'hba',label:'hba'},
                  {value:'hbd',label:'hbd'},
                  {value:'hac',label:'hac'},
                  {value:'clogp',label:'clogp'},
                  {value:'rotatable_bonds',label:'rotatable_bonds'}],
      limitOptions:[{value:'min',label:'min'},
                    {value: 'max',label: 'max'}]
    }
  },
  created() {
    this.tabledatas = [
      {condition: 'num_rings', limit:"min", limit_num:1},
    ]
    this.tabledatas.map(i => {
      i.show = false
      return i
    })
    this.defaultData = JSON.parse(JSON.stringify(this.tabledatas))
  },
  updated(){
    // console.log(JSON.stringify(this.tabledatas));
  },
  methods: {
    edit(row, index) {
      row.show = row.show ? false : true
      var val = Object.values(JSON.parse(JSON.stringify(row)))
      if(val.indexOf('')!=-1){
        this.$alert('Please edit the full line', 'Incomplete Error', {
          confirmButtonText: 'confirm'})
        row.show = true
      }
      else {
        this.$set(this.tabledatas, index, row)
        this.$set(this.defaultData,index,JSON.parse(JSON.stringify(row)))
        // 修改后保存
        this.myjson = this.getjson(this.tabledatas)
        this.$emit('func',this.myjson)//传给父组件
      }


    },
    editAll() {
      this.tabledatas.map((i, index) => {
        i.show = true
        this.$set(this.tabledatas, index, i)
      })
    },
    //取消修改
    handleCancle (row,index) {
      //刚添加进来的
      if (!this.multipleSelection.id){
        this.tabledatas.splice(index, 1);
      }else {//取消的数据为修改已保存好的数据
        this.defaultData[index].show = false
        this.$set(this.tabledatas, index, JSON.parse(JSON.stringify(this.defaultData[index])))
      }
    },
    submit() {
      this.tabledatas.map((i, index) => {
        i.show = false
        this.$set(this.tabledatas, index, i)
      })
    },
    // 单个复制
    cope(val, index) {
      this.tabledatas.splice(index, 0,JSON.parse(JSON.stringify(val)))
    },
    // 单个删除
    delect(index) {
      this.tabledatas.splice(index, 1)
      // 修改后保存
      this.myjson = this.getjson(this.tabledatas)
      this.$emit('func',this.myjson)//传给父组件
    },
    //添加
    add() {
      for (let i of this.tabledatas) {
        if (i.show){
          i.show = !i.show
          this.$alert('Please edit the full line', 'Incomplete Error', {
            confirmButtonText: 'confirm'})
          return i.show = true
          // return this.$message.warning("请先保存当前编辑项");
        }
      }
      let j = { condition: '', limit:"min", limit_num:'', "show":true};
      this.tabledatas.push(j);
      this.multipleSelection = JSON.parse(JSON.stringify(j));
    },
    //批量新增
    addAll() {
      if (this.multipleSelection.length == 0) {
        let list = {
          condition: "",
          limit:"min",
          limit_num:'',
        }
        this.tabledatas.push(list)
      } else {
        this.multipleSelection.forEach((val, index)=> {
          this.tabledatas.splice(index, 0,JSON.parse(JSON.stringify(val)))
        });
      }
    },
    //批量删除
    delectAll() {
      for (let i = 0; i < this.tabledatas.length; i++) {
        const element = this.tabledatas[i];
        element.id = i
      }
      if (this.multipleSelection.length == 0) this.$message.error('Please select an option')
      this.multipleSelection.forEach(element => {
        this.tabledatas.forEach((e, i) => {
          if (element.id == e.id) {
            this.tabledatas.splice(i, 1)
          }
        });
      });
    },
    //选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getjson(datatable){
      var temp = ''
      for(var o in datatable){
        if(o == datatable.length-1){
          temp = temp +'"'+ datatable[o].condition+'"'+':{'+
              '"'+datatable[o].limit+'"'+':'+datatable[o].limit_num+'}'
        }else{
          temp = temp +'"'+ datatable[o].condition+'"'+':{'+
              '"'+datatable[o].limit+'"'+':'+datatable[o].limit_num+'}'+','
        }

      }
      return temp
    }
  },
}
</script>

<style scoped>

</style>
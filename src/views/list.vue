<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.enterpriseName
.toLowerCase().indexOf(search.toLowerCase())>-1?true:false)"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column
        label="企业名称"
        prop="enterpriseName">
      </el-table-column>
      <el-table-column
        label="组织结构代码"
        prop="organizationCode">
      </el-table-column>
      <el-table-column
        label="联系人"
        prop="ContactsName">
      </el-table-column><el-table-column
      label="电话"
      prop="ContactsTel">
    </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入企业名称搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>

<script lang="ts">
  import {Prop, Component, Vue, Model} from 'vue-property-decorator';

  @Component
  export default class list extends Vue {

    tableData= []

    search= ''

    handleEdit(index, row) {
      this.$http.post(`/api/pass.ashx`, {
        "enterpriseName": row.enterpriseName,
        "ContactsName": row.ContactsName,
        "ContactsTel": row.ContactsTel,
      }, {emulateJSON: true}).then((response => {
        this.tableData.splice(this.tableData.indexOf(row), 1)
      }), (response => {

      }));
    }
    handleDelete(index, row) {
      this.$http.post(`/api/delete.ashx`, {
          "enterpriseName": row.enterpriseName,
          "ContactsName": row.ContactsName,
          "ContactsTel": row.ContactsTel,
      }, {emulateJSON: true}).then((response => {
        this.tableData.splice(this.tableData.indexOf(row), 1)
      }), (response => {

      }));
    }
    mounted(){
      this.$http.get('/api/select.ashx'
      ).then((response => {
          this.tableData=response.body
      }), (response => {

      }));
    }
  }
</script>
<style scoped lang="stylus">

</style>

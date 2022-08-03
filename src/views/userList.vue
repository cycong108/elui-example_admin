<template>
  <div class="user_list_page">
    <el-container class="search_bar">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="用户名">
          <el-input v-model="formSearch.user_name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formSearch.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formSearch.sex" clearable filterable placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="保密" value="保密"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-table :data="tableData" style="width: 100%" border highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ props.row.born_date }}</span>
            </el-form-item>
            <el-form-item label="个人简介">
              <span>{{ props.row.describe }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="id"> </el-table-column>
      <el-table-column label="用户名" prop="user_name"> </el-table-column>
      <el-table-column label="姓名" prop="name"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-container>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-container>
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="500px">
      <el-form :model="selectedRow" label-width="100px">
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="selectedRow.user_name"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="selectedRow.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="selectedRow.sex" style="margin-left: 8px">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="16">
            <el-date-picker type="date" placeholder="选择日期" v-model="selectedRow.born_date" style="width: 100%"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="selectedRow.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除提示" :visible.sync="deleteDialogVisible" width="300px" center>
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formSearch: {},
      tableData: [],
      currentPage: 1,
      totalCount: 1,
      pageSize: 5,
      pageSizes: [5, 10, 50, 100],
      selectedRow: {},
      editDialogVisible: false,
      deleteDialogVisible: false,
    }
  },
  methods: {
    getData() {
      let { user_name, name, sex } = this.formSearch

      axios.get('/data/users.json').then((res) => {
        let arr = res.data
        if (!Array.isArray(arr)) return

        //筛选数据
        if (user_name !== undefined && user_name.length > 0) {
          arr = arr.filter((item) => item.user_name.indexOf(user_name) > -1)
        }
        if (name !== undefined && name.length > 0) {
          arr = arr.filter((item) => item.name.indexOf(name) > -1)
        }
        if (sex !== undefined && sex.length > 0) {
          arr = arr.filter((item) => item.sex === sex)
        }
        this.totalCount = arr.length

        //随机排序
        let length = arr.length
        if (length > 1) {
          for (let index = 0; index < length - 1; index++) {
            let randomIndex = Math.floor(Math.random() * (length - index)) + index
            ;[arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
          }
        }

        //取出前pageSize个元素
        let count = 0
        let pageCount = Math.floor(length / this.pageSize)
        if (this.currentPage > pageCount) {
          count = arr.length - this.pageSize * (this.currentPage - 1)
        } else {
          count = this.pageSize
        }
        this.tableData = arr.slice(0, count)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    handleEdit(index, row) {
      this.selectedRow = row
      this.editDialogVisible = true
    },
    handleDelete(index, row) {
      this.selectedRow = row
      this.deleteDialogVisible = true
    },
    updateData() {
      alert(`update row id : ${this.selectedRow.id} `)
      this.editDialogVisible = false
      this.getData()
    },
    deleteData() {
      alert(`delete row id : ${this.selectedRow.id} `)
      this.deleteDialogVisible = false
      this.getData()
    },
  },
  created: function () {
    this.getData()
  },
}
</script>

<style lang="less">
.demo-table-expand {
  padding-left: 20px;
}
</style>

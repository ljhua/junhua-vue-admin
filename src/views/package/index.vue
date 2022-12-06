<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.dicName" placeholder="名称" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
        @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table :data="list" style="width: 100%" row-key="id" border>
      <el-table-column label="套餐名称" width="250">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐状态">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人">
        <template slot-scope="{row}">
          <span>{{ row.createdByName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后更新人">
        <template slot-scope="{row}">
          <span>{{ row.modifiedByName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后更新时间">
        <template slot-scope="{row}">
          <span>{{ row.modifiedTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160">
        <template slot-scope="{row, $index}">
          <el-button size="mini" type="primary" @click="handleUpdate(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size"
      @pagination="getList" />

    <el-dialog :title="text[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="tmp">
        <el-form-item label="套餐名称">
          <el-input v-model="tmp.name" />
        </el-form-item>
        <el-form-item label="套餐状态">
          <el-input v-model="tmp.status" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPage } from "@/api/package";
import { create, update } from "@/api/package";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  components: { Pagination },
  data () {
    return {
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        parentId: 0
      },
      tmp: {
        id: undefined,
        name: '',
        status: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      text: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: []
    }
  },

  created () {
    this.getList()
  },

  methods: {
    getList () {
      getPage(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.totalRows
      })
    },
    handleDelete (row, index) {
      this.$notify({
        title: '成功',
        message: '删除onclick成功',
        type: 'success',
        duration: 2000
      })
    },
    handleCreate (row) {
      this.tmp = Object.assign({}, row) // copy obj
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate (row) {
      this.tmp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    resetTemp () {
      this.tmp = {
        // id: undefined,
        dicName: ''
      }
    },

    handleFilter () { },
    handleDownload () { },
    handleTopCreate () { },

    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.tmp)
          create(this.tmp).then(() => {
            this.list.unshift(this.tmp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.tmp)
          console.log(tempData)
          update(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.tmp.id)
            this.list.splice(index, 1, this.tmp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
};
</script>

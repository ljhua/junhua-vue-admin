<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.dicName" placeholder="名称" style="width: 200px;" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
        @click="handleCreate(null)">
        添加
      </el-button>
    </div>

    <el-table :data="list" style="width: 100%" row-key="id" border lazy :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column label="名称">
        <template slot-scope="{row}">
          <span>{{ row.dicName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码">
        <template slot-scope="{row}">
          <span>{{ row.dicCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span>{{ row.dicStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="{row}">
          <span>{{ row.comments }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="{row, $index}">
          <el-button v-if="row.parentId==0" size="mini" type="primary" @click="handleCreate(row)">新增</el-button>
          <el-button size="mini" type="primary" @click="handleUpdate(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size"
      @pagination="getList" />

    <el-dialog :title="text[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp">
        <el-form-item label="名称">
          <el-input v-model="temp.dicName" />
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="temp.dicCode" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="temp.sort" />
        </el-form-item>
        <el-form-item label="状态">
          <el-tooltip :content="'Switch value: ' + temp.dicStatus" placement="top">
            <el-switch v-model="temp.dicStatus" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
              inactive-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.comments" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createChildrenData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPage } from "@/api/dic";
import { getByPid } from "@/api/dic";
import { create, update } from "@/api/dic";
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
      temp: {
        id: undefined,
        dicName: '',
        dicCode: '',
        parentId: 0,
        sort: 0,
        dicStatus: 0,
        comments: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      text: {
        update: '编辑',
        create: '新建'
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
    async load (tree, treeNode, resolve) {
      const params = {
        pid: tree.id
      }
      const resp = await getByPid(params)
      resolve(resp.data)
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
      if (row != null) {
        this.temp = Object.assign({}, row) // copy obj
        const pid = this.temp.id;
        this.resetTemp()
        this.temp.parentId = pid
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate (row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    resetTemp () {
      this.temp = {
        // id: undefined,
        dicName: ''
      }
    },

    handleFilter () { },
    handleDownload () { },
    // handleCreate () { },

    createChildrenData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp)
          create(this.temp).then(() => {
            // this.list.unshift(this.temp)
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
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          update(tempData).then(() => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
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

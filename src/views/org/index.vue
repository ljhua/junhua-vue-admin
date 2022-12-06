<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.orgName" placeholder="名称" style="width: 200px;" class="filter-item"
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
      <el-table-column label="组织名称" width="250">
        <template slot-scope="{row}">
          <span>{{ row.orgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组织编码">
        <template slot-scope="{row}">
          <span>{{ row.orgCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="组织类型">
        <template slot-scope="{row}">
          <span>{{ row.orgTypeName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图标">
        <template slot-scope="{row}">
          <span>{{ row.orgIcon }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序">
        <template slot-scope="{row}">
          <span>{{ row.orgLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span>{{ row.orgStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="{row}">
          <span>{{ row.comments }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="280">
        <template slot-scope="{row, $index}">
          <el-button size="mini" type="primary" @click="handleCreate(row)">新增</el-button>
          <el-button size="mini" type="primary" @click="handleUpdate(row)">编辑</el-button>
          <el-button size="mini" type="primary">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size"
      @pagination="getList" />

    <el-dialog :title="text[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp">
        <el-form-item label="组织名称">
          <el-input v-model="temp.orgName" />
        </el-form-item>

        <el-form-item label="组织类型">
          <el-select v-model="temp.orgTypeName" @input="selectChangeParent" placeholder="请选择">
            <el-option v-for="(item, index) in options" :key="index" :label="item.dicName" :value="index">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图标">
          <el-input v-model="temp.orgIcon" />
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="temp.orgLevel" />
        </el-form-item>

        <el-form-item label="状态">
          <el-input v-model="temp.orgStatus" />
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="temp.comments" />
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
import { getPage } from "@/api/org";
import { getByPid } from "@/api/org";
import { getChildrenByDicCode } from "@/api/dic"
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  components: { Pagination },
  data () {
    return {
      options: [],
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        parentId: 0
      },
      temp: {
        id: undefined,
        parentId: 0,
        orgTypeCode: '',
        orgTypeName: '',
        orgName: '',
        orgCode: '',
        orgIcon: '',
        orgLevel: 0,
        orgStatus: '',
        province: '',
        city: '',
        area: '',
        street: '',
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
    this.getOrgTypeList()
  },

  methods: {
    getList () {
      getPage(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.totalRows
      })
    },
    getOrgTypeList () {
      const params = {
        dicCode: 'org_type'
      }
      getChildrenByDicCode(params).then((response) => {
        this.options = response.data
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

    handleFilter () {
      this.listQuery.current = 1
      this.listQuery.parentId = null
      this.getList()
    },
    handleDownload () { },
    handleTopCreate () { },

    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp)
          // saveDic(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.
          //     this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '创建成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },

    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          // updateDic(tempData).then(() => {
          //   const index = this.list.findIndex(v => v.id === this.temp.id)
          //   this.list.splice(index, 1, this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },

    selectChangeParent (index) {
      this.temp.orgTypeCode = this.options[index].dicCode
      this.temp.orgTypeName = this.options[index].dicName
    }
  }
};
</script>

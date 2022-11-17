<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.dicName" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>
    
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" >
        <template slot-scope="{row}">
          <span>{{ row.dicName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" >
        <template slot-scope="{row}">
          <span>{{ row.dicCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" >
        <template slot-scope="{row}">
          <span>{{ row.dicOrder }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" >
        <template slot-scope="{row}">
          <span>{{ row.dicStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" >
        <template slot-scope="{row}">
          <span>{{ row.comments }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="{row, $index}">
          <el-button v-if="row.parentId==0" size="mini" type="primary" @click="handleCreate">新增</el-button>
          <el-button size="mini" type="primary" @click="handleUpdate(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getPage } from "@/api/dic";
import { getDicByPid } from "@/api/dic";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        parentId: 0
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      getPage(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.totalRows
      })
    },
    async load(tree, treeNode, resolve) {
      const params = {
        pid: tree.id
      }
      const resp = await getDicByPid(params)
      resolve(resp.data)
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除onclick成功',
        type: 'success',
        duration: 2000
      })
    },
    handleCreate() {
      this.$notify({
        title: '成功',
        message: '添加onclick成功',
        type: 'success',
        duration: 2000
      })
    },
    handleUpdate(row) {
      this.$notify({
        title: '成功',
        message: '编辑onclick成功',
        type: 'success',
        duration: 2000
      })
    },

    handleFilter() {},
    handleDownload() {},
  }
};
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="'标题'" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        {{ '搜索' }}
      </el-button>
      <router-link :to="'/example/example-add/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          {{ '添加' }}
        </el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="字典名称">
        <template slot-scope="scope">
          {{ scope.row.dicName }}
        </template>
      </el-table-column>

      <el-table-column label="字典编码">
        <template slot-scope="scope">
          {{ scope.row.dicCode }}
        </template>
      </el-table-column>

      <el-table-column label="排序字段">
        <template slot-scope="scope">
          {{ scope.row.dicOrder }}
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.dicStatus }}
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">
          {{ scope.row.comments }}
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdTime }}
        </template>
      </el-table-column>

      <el-table-column label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.modifiedTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/example-edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getPage } from '@/api/dic'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPage(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
        this.total = response.data.totalRows
      })
    }
  },

  handleFilter() {
  },
  handleDownload() {
  }

}
</script>

<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="dicName" label="字典名称" />
      <el-table-column prop="dicCode" label="字典编码" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getPage } from "@/api/dic";
import { getChildrenList } from "@/api/dic";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
      },
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      getPage(this.listQuery).then((response) => {
        this.list = response.data.list;
        this.total = response.data.totalRows;
      });
    },
    async load(tree, treeNode, resolve) {
      let params = {
        dicId: tree.id,
      };
      let resp = await getChildrenList(params);
      console.log(resp);
      console.log(resp.data);
      resolve(resp.data);
    },
  },
};
</script>

<template>
  <div class="createPost-container">
    <el-form ref="postForm" :v-model="postForm" class="form-container">
      <el-form-item style="margin-bottom: 40px" label-width="100px" label="字典名称：">
        <el-input v-model="postForm.dicName" placeholder="请输入字典名称" />
      </el-form-item>

      <el-form-item style="margin-bottom: 40px" label-width="100px" label="字典编码：">
        <el-input v-model="postForm.dicCode" placeholder="请输入字典编码" />
      </el-form-item>

      <el-form-item style="margin-bottom: 40px" label-width="100px" label="排序：">
        <el-input v-model="postForm.dicOrder" placeholder="请输入排序权重" />
      </el-form-item>

      <el-form-item style="margin-bottom: 40px" label-width="100px" label="状态：">
        <el-tooltip>
          <el-switch v-model="postForm.dicStatus" active-value="1" inactive-value="0" />
        </el-tooltip>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px" label-width="100px" label="备注：">
        <el-input v-model="postForm.comments" placeholder="请输入备注" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

const defaultForm = {
  dicName: '',
  dicCode: '',
  dicOrder: 0,
  dicStatus: 1,
  comments: ''
}

export default {
  data() {
    return {
      postForm: Object.assign({}, defaultForm)
    }
  },

  methods: {
    onSubmit() {
      console.log(this.postForm)
      console.log(this.postForm.dicName)
      console.log(this.postForm.dicCode)
      console.log(this.postForm.dicOrder)
      console.log(this.postForm.dicStatus)
      console.log(this.postForm.comments)
      this.$router.push('/example/example-page')
    },

    onCancel() {
      this.$router.push('/example/example-page')
    }
  }
}
</script>

<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="dialog detail" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
  
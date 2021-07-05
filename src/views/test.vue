<template>
  <div class="test">
      <div><el-tag type="success">标签二</el-tag></div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      describtion: '333123232'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
/deep/ .el-form-item__label {
  color: #fff;
}
.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 80%;
}
</style>

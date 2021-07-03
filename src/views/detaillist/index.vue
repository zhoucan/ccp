<template>
 <div class="list">
   <div class="back">
        <el-button @click="goBack"  el-button icon="el-icon-arrow-left" circle></el-button>
   </div>

 </div>
</template>

<script>
export default {
  data () {
    return {
      key: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.back {
    padding: 20px;
}

</style>

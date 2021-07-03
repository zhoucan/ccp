<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#app{
  height: 100vh;
  background:url('./static/image/bg.png') no-repeat center center ,linear-gradient(154deg,#0779ff,#1fdfff);
  background-size: cover;

}

</style>

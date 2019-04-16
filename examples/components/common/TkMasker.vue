<!-- 遮罩层 -->

<template>
  <div id="tk-masker"></div>
</template>

<script>
  export default {
    name: "TkMasker"
  }
</script>

<style lang="scss" scoped>
  #tk-masker {
    position: fixed;
    z-index: 998;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .7);
  }

</style>
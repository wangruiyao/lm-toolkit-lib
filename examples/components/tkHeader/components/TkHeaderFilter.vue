<template>
  <div id="tk-header-filter">
    <i class="iconfont">&#xe695;</i>{{cityName}}
  </div>
</template>

<script>
  export default {
    name: "TkHeaderFilter",
    props: {
      cityName: String
    }
  }
</script>

<style lang="scss" scoped>
  #tk-header-filter {
    @include flex-row(center);
    height: $header-height;
    width: 50px;
  }
</style>
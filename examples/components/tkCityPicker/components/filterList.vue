<!-- 根据用户输入动态匹配城市组件 -->

<template>
  <div id="tk-city-picker-input-filter">
    <div class="item" v-for="item in list">
      {{item.city}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "filterList",
    props: {
      list: Array
    }
  }
</script>

<style lang="scss" scoped>
  #tk-city-picker-input-filter {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: $header-height;
    bottom: 0;
    background: #fff;
    .item {
      margin-left: 5px + $container-padding;
      @include flex-row();
      border-bottom: solid #f6f6f6 1px;
      height: 40px;
      font-size: 16px;
      color: #333;
    }
  }
</style>
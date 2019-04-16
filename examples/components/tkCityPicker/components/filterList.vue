<!-- 根据用户输入动态匹配城市组件 -->

<template>
  <div id="tk-city-picker-input-filter">
    <div v-show="list.length !== 0">
      <div class="item" v-for="item in list" :key="item.eparchy" @click="handleSelectCity(item)">
        {{item.city}}
      </div>
    </div>

    <div v-show="list.length === 0">没有找到相关城市</div>
  </div>
</template>

<script>
  export default {
    name: "filterList",
    props: {
      list: Array
    },
    data() {
      return {
        showList: true
      }
    },
    methods: {
      handleSelectCity(cityInfo) {
        this.$emit('selectCity', cityInfo)
      }
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
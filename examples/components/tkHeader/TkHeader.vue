<template>
  <div id="tk-header">
    <tk-header-back @clickBackBtn="clickBackBtn"></tk-header-back>
    <div class="tk-header-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import tkHeaderBack from './components/TkHeaderBack'
  export default {
    name: "TkHeader",
    components: {tkHeaderBack},
    methods: {
      clickBackBtn() {
        this.$emit('handleBackClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #tk-header {
    position: fixed;
    z-index: 999;
    background: $header-background;
    height: $header-height;
    width: 100%;
    border-bottom: solid $line-light 1px;
    padding: 0 5px;
    @include flex-row(space-between);
    .tk-header-container {
      padding: 8px 2px;
      width: 345px;
      height: 100%;
      @include flex-row(center);
    }
  }
</style>
<template>
  <div id="tk-search">
    <form  @submit.prevent action="#">
      <input type="search" v-model="searchInfo"
             @focus="handleInputfocus"
             @blur="handleInputBlur"
             @keypress="mobileSearch"
             @keyup.enter="pcSearch"
             :placeholder="placeHolder" />
      <span class="input-cancle">关闭</span>
    </form>
  </div>
</template>

<script>
  export default {
    name: "TkSearch",
    props: {
      'placeHolder': {
        typeof: String,
        default: `搜索`
      }
    },
    data() {
      return {
        searchInfo: ''
      }
    },
    methods: {
      mobileSearch(event) {
        if(event.keyCode === 13) {
        //  触发搜索
          this.search()
        }

      },
      pcSearch() {
        this.search()
      },
      search() {
        this.$emit('search', this.searchInfo)
      },
      handleInputfocus() {
        this.$emit('inputFocus')
      },
      handleInputBlur() {
        this.$emit('inputBlur')
      }
    },
    watch: {
      searchInfo(newVal) {
        this.$emit('watchInput', newVal)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #tk-search {
    position: relative;
    input {
      border: none;
      width: 100%;
      height: 100%;
    }
    height: 100%;
    border: solid $line-deep 1px;
    overflow: hidden;
    border-radius: 50px;
    width: 100%;
    padding: 0 10px;
    .input-cancle {
      position: absolute;
      right: 10px;
    }
  }
</style>
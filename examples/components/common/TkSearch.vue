<template>
  <div id="tk-search">
    <form  @submit.prevent action="#">
      <input @keypress="mobileSearch" @keyup.enter="pcSearch" type="search" v-model="searchInfo" :placeholder="placeHolder" />
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
  }
</style>
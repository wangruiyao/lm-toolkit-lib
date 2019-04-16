<template>
  <div id="tk-search">
    <form @submit.prevent action="#">
      <input type="search" v-model="searchInfo"
             @focus="handleInputfocus"
             @blur="handleInputBlur"
             @keypress="mobileSearch"
             @keyup.enter="pcSearch"
             :placeholder="placeHolder" />
      <i class="input-cancle iconfont"
         v-show="showCloseIcon && showCancleBtn"
         @click="handleCancleInput">&#xe7be;
      </i>
    </form>
  </div>
</template>

<script>
  export default {
    name: "TkSearch",
    props: {
      'placeHolder': {
        type: String,
        default: `搜索`
      },
      'showCloseIcon': {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        searchInfo: '',
        showCancleBtn: false
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
        this.showCancleBtn = true;
        this.$emit('inputFocus')
      },
      handleInputBlur() {
        if(this.searchInfo === '') {
          this.handleCancleInput()
        }
        this.$emit('inputBlur')
      },
      handleCancleInput() {
        this.showCancleBtn = false;
        this.searchInfo = ''
        this.$emit('inputCancle')
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
    background: #fff;
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
      margin-top: 2px;
      position: absolute;
      right: 10px;
      color: #999;
      font-size: 14px;
    }
  }
</style>
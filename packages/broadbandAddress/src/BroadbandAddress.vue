<template>
  <div id="broadband-address">
    <div v-show="false">
      <!-- 头部 -->
      <tk-header>
        <div class="header-search">
          <tk-search place-holder="地址关键字" @search="queryInfo"></tk-search>
        </div>
        <tk-header-filter></tk-header-filter>
      </tk-header>
      <!-- 列表 -->
      <tk-scroll ref="wrapper"
                 :listenScroll="true"
                 :pullup="true"
                 :data="dataInfo"
                 @scrollToEnd="scrollToEnd"
                 @setScroll="setScroll"
                 @beforeScroll = "beforeScroll"
                 @scroll="scroll">
        <list-item v-for="item in dataInfo" :key="item.id"></list-item>
      </tk-scroll>
    </div>
    <tk-city-picker></tk-city-picker>
  </div>
</template>

<script>
  import TkHeader from "../../../examples/components/tkHeader/TkHeader";
  import TkSearch from "../../../examples/components/common/TkSearch";
  import TkHeaderFilter from "../../../examples/components/tkHeader/components/TkHeaderFilter";
  import TkScroll from "../../../examples/components/tkScroll/TkScroll";
  import ListItem from "./pages/ListItem";
  import TkCityPicker from "../../../examples/components/tkCityPicker/TkCityPicker";
  export default {
    name: "BroadbandAddress",
    components: {TkCityPicker, ListItem, TkScroll, TkHeaderFilter, TkSearch, TkHeader},
    data() {
      return {
        dataInfo: [
          '测试',
          '测试',
          '测试',
          '测试',
          '测试'
        ]
      }
    },
    methods:{
      queryInfo(info) {alert(info)},
      scrollToEnd(scroll){
        this.scroll = scroll;
        console.log("下拉到最底下");
      },
      setScroll(scroll){
        this.scroll = scroll;
        console.log("scroll创建成功");
      },
      scroll(pos){
        console.log(pos);//监听滚动坐标
      },
      beforeScroll(){
        console.log('滚动之前');
      }
    }
  }
</script>

<style lang="scss" scoped>
  #broadband-address {
    .header-search {
      width: 295px;
    }

  }
</style>
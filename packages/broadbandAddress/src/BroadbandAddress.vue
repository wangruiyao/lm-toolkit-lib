<template>
  <div id="broadband-address">
    <div v-if="!globalState.showCityPicker">
      <!-- 头部 -->
      <tk-header>
        <!--<span @click="test">获取</span>-->
        <div class="header-search">
          <tk-search place-holder="地址关键字" @search="queryInfo"></tk-search>
        </div>
        <div @click="toggleCitypicker(true)">
          <tk-header-filter :city-name="globalState.nowCityInfo.city"></tk-header-filter>
        </div>

      </tk-header>
      <!-- 列表 -->
      <tk-scroll ref="wrapper"
                 :listenScroll="true"
                 :pullup="true"
                 :data="dataInfo"
                 @scrollToEnd="scrollToEnd"
                 @setScroll="setScroll"
                 @beforeScroll = "beforeScroll"
                 >
        <list-item v-for="item in dataInfo" :key="item.id"></list-item>
      </tk-scroll>
    </div>
    <!-- 城市选择控件 -->
    <tk-city-picker v-if="globalState.showCityPicker"
                    @handleselectCity="selectCity"
                    @handleBackClick="toggleCitypicker(false)">
    </tk-city-picker>
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
        globalState: {  // 当前组件状态属性
          nowCityInfo: {
            city: '济南',
            eparchy: '0531'
          },
          showCityPicker: false
        },

        dataInfo: []
      }
    },
    methods:{
      test() {
       this.dataInfo = [
         '测试',
         '测试',
         '测试',
         '测试',
         '测试',
         '测试',
         '测试',
         '测试',
         '测试'
       ]
      },
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
        // console.log(pos);//监听滚动坐标
      },
      beforeScroll(){
        console.log('滚动之前');
      },
      selectCity(cityInfo) {
        this.globalState.nowCityInfo = cityInfo
        this.toggleCitypicker(false)
      },
      toggleCitypicker(state) { // 是否显示时间控件
        this.globalState.showCityPicker = state
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
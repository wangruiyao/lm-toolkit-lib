<template>
  <div id="broadband-address">
    <div v-show="!globalState.showCityPicker">
      <!-- 头部 -->
      <tk-header>
        <!--<div @click="test">111</div>-->
        <div class="header-search">
          <tk-search place-holder="地址关键字" @search="queryInfo"></tk-search>
        </div>
        <div @click="toggleCitypicker(true)">
          <tk-header-filter :city-name="globalState.nowCityInfo.city"></tk-header-filter>
        </div>

      </tk-header>
      <!-- 列表 -->
      <tk-scroll ref="wrapper_broadband"
                 :pulldown="globalState.ispulldown"
                 :listenScroll="true"
                 :pullup="true"
                 :data="dataInfo"
                 :idx="1"
                 @scrollToEnd="scrollToEnd"
                 @setScroll="setScroll"
                 @pulldown="pulldown"
                 >
        <list-item v-for="(item, idx) in dataInfo"
                   :key="item.id"
                   :item-info="item"
                   :item-idx="idx"></list-item>
      </tk-scroll>
    </div>
    <transition name="fade">
    <!-- 城市选择 -->
      <tk-city-picker v-if="globalState.showCityPicker"
                    @handleselectCity="selectCity"
                    @handleBackClick="toggleCitypicker(false)">
    </tk-city-picker>
    </transition>
    <div class="blank_page_tip" v-show="globalState.isBlank">
      <i class="iconfont">&#xe61c;</i>
      <p>{{globalState.blankTips}}</p>
    </div>
  </div>
</template>

<script>
  import TkHeader from "../../../examples/components/tkHeader/TkHeader";
  import TkSearch from "../../../examples/components/common/TkSearch";
  import TkHeaderFilter from "../../../examples/components/tkHeader/components/TkHeaderFilter";
  import TkScroll from "../../../examples/components/tkScroll/TkScroll";
  import ListItem from "./pages/ListItem";
  import TkCityPicker from "../../../examples/components/tkCityPicker/TkCityPicker";

  import {addressSearch} from 'api/broadbandAddress/addressSearch.js'
  export default {
    name: "BroadbandAddress",
    components: {TkCityPicker, ListItem, TkScroll, TkHeaderFilter, TkSearch, TkHeader},
    data() {
      return {

        globalState: {  // 当前组件状态属性
          ispulldown: true,
          isBlank: true,
          blankTips:'请输入关键字查询相关标准地址',
          nowCityInfo: {
            city: '济南',
            eparchy: '0531'
          },
          showCityPicker: false
        },
        dataInfo: [],
        searchAddressParams: {
          addressKeyword: '',
          eparchy: '0531'
        }
      }
    },
    mounted() {},
    methods:{
      test() {
        // toast('11')

      },
      handleIndicator(type) {
        if (type) {
          indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
        } else {
          indicator.close();
        }
      },
      searchAddress() {
        this.globalState.isBlank = false;
        this.handleIndicator(true);
        // 山东省济南市历下区工业南路389号解放路与工业南路交叉口院内2号楼102
        addressSearch(this.searchAddressParams).then(data => {
          this.handleIndicator(false)
          if (data.msg === '0') {
            if (data.data.length === 0) {
              this.globalState.blankTips = '未查询到附近信息，换个关键词试试吧~';
              this.globalState.isBlank = true;
            }
            this.dataInfo = data.data
          } else {
            this.handleIndicator(false)
            toast(data.msg)
          }
        })
        .catch(data => {
          console.warn(data)
        })
      },
      queryInfo(info) {
        sessionStorage.setItem('addressKeyword', info);
        this.searchAddressParams.addressKeyword = info;
        this.searchAddress()
      },
      scrollToEnd(scroll){
        this.scroll = scroll;
        console.log("下拉到最底下");
      },
      setScroll(scroll){
        this.scroll = scroll;
      },
      selectCity(cityInfo) {
        this.globalState.nowCityInfo = cityInfo;
        this.searchAddressParams.eparchy = cityInfo.eparchy;
        this.toggleCitypicker(false)
      },
      toggleCitypicker(state) { // 是否显示时间控件
        if(state) {
          this.globalState.isBlank = false;
        } else {
          if (this.dataInfo.length === 0) {
            this.globalState.isBlank = true;
          }
        }
        this.globalState.showCityPicker = state
      },
      pulldown() {  // 下拉刷讯
        const _this = this
        this.searchAddress()
        setTimeout(() => {
          _this.$refs.wrapper_broadband.$emit('pullrefresh.finishLoad')
        },600)

      }
    }
  }
</script>

<style lang="scss" scoped>
  #broadband-address {
    .header-search {
      width: 295px;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .blank_page_tip {
      text-align: center;
      padding-top: 200px;
      width: 100%;
      line-height: 20px;
      top: $header-height;
      bottom: 0;
      position: fixed;
      z-index: 999;
      i {
        color: #999;
        font-size: 150px;
      }

    }
  }
</style>
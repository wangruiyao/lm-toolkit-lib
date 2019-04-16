<template>
  <div id="tk-city-picker">
    <tk-header @handleBackClick="handleBackClick">
      <tk-search place-holder="城市中文名或拼音"
                 :show-close-icon="true"
                 @watchInput="watchInputChance"
                 @inputFocus="inputFocus"
                 @inputBlur="inputBlur"
                 @inputCancle="inputCancle">

      </tk-search>
    </tk-header>
    <city-list v-if="globalState.showModule === 'cityList'" :list="cityList" @selectCity="selectCity"></city-list>
    <filter-list v-if="globalState.showModule === 'cityFilter'" :list="filterList" @selectCity="selectCity"></filter-list>
    <tk-masker v-show="globalState.showMasker"></tk-masker>
  </div>
</template>

<script>
  import cityList from 'core/city.js'
  import TkHeader from "../tkHeader/TkHeader";
  import TkSearch from '../common/TkSearch'
  import CityList from "./components/CityList";
  import FilterList from "./components/filterList";
  import TkMasker from "../common/TkMasker";
  export default {
    name: "TkCityPicker",
    components: {TkMasker, FilterList, CityList, TkHeader, TkSearch},
    data() {
      return {
        globalState: {
          showMasker: false,
          showModule: 'cityList'
        },
        searchCityName: '',
        cityList,
        filterList: []
      }
    },
    methods: {
      watchInputChance(newVal) {
        let list = [];
        this.cityList.map(item => {
          if (item.city.includes(newVal) && newVal !== '') {
            list.push(item)
          }
        });
        this.filterList = list
        this.globalState.showMasker = false
        if (newVal !== '') {
          this.globalState.showModule = 'cityFilter'
        }

      },
      selectCity(cityInfo) {
        this.globalState.showModule = 'cityList';
        this.$emit('handleselectCity', cityInfo)
      },
      inputFocus() {
        this.globalState.showMasker = true
      },
      inputBlur(){
        this.globalState.showMasker = false
        // this.globalState.showModule = 'cityList'
      },
      inputCancle() {
        this.globalState.showModule = 'cityList'
      },
      handleBackClick() { // 返回
        this.$emit('handleBackClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-cancle {
    width: 50px;
    text-align: center;
  }
</style>
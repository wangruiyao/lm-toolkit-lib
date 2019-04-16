<template>
  <div id="tk-city-picker">
    <tk-header>
      <tk-search place-holder="城市中文名或拼音"
                 @watchInput="watchInputChance"
                 @inputFocus="inputFocus"
                 @inputBlur="inputBlur">

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
    mounted() {
      console.log(this.cityList)
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
        this.globalState.showModule = 'cityFilter'
      },
      selectCity(eparchy) {
        this.globalState.showModule = 'cityList'
        alert(eparchy)
      },
      inputFocus() {
        this.globalState.showMasker = true
      },
      inputBlur(){
        this.globalState.showMasker = false
        // this.globalState.showModule = 'cityList'
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
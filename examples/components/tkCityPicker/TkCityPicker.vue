<template>
  <div id="tk-city-picker">
    <tk-header>
      <tk-search place-holder="城市中文名或拼音" @watchInput="watchInputChance"></tk-search>
    </tk-header>
    <city-list :list="cityList"></city-list>
    <filter-list :list="filterList"></filter-list>
  </div>
</template>

<script>
  import cityList from 'core/city.js'
  import TkHeader from "../tkHeader/TkHeader";
  import TkSearch from '../common/TkSearch'
  import CityList from "./components/CityList";
  import FilterList from "./components/filterList";
  export default {
    name: "TkCityPicker",
    components: {FilterList, CityList, TkHeader, TkSearch},
    data() {
      return {
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
        console.log(this.filterList)
        this.filterList = list
      }
    }
  }
</script>

<style scoped>

</style>
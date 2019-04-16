<template>
  <div id="tk-city-picker">
    <tk-header>
      <tk-search place-holder="城市中文名或拼音"></tk-search>
    </tk-header>
    <city-list></city-list>
  </div>
</template>

<script>
  import cityList from 'core/city.js'
  console.log(cityList)
  import TkHeader from "../tkHeader/TkHeader";
  import TkSearch from '../common/TkSearch'
  import CityList from "./components/CityList";
  export default {
    name: "TkCityPicker",
    components: {CityList, TkHeader, TkSearch},
    data() {
      return {
        cityList
      }
    }
  }
</script>

<style scoped>

</style>
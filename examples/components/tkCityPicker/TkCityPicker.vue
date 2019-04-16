<template>
  <div id="tk-city-picker">
    <tk-header>
      <tk-search place-holder="城市中文名或拼音"></tk-search>
    </tk-header>
  </div>
</template>

<script>
  import cityList from 'core/city.js'
  import TkHeader from "../tkHeader/TkHeader";
  import TkSearch from '../common/TkSearch'
  export default {
    name: "TkCityPicker",
    components: {TkHeader, TkSearch}
  }
</script>

<style scoped>

</style>
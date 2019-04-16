<template>
  <div id="tk-city-picker-list">
    <tk-scroll ref="wrapper"
               :listenScroll="true"
               :pullup="true"
               :data="cityList"
               >
      <div v-for="item in cityList">{{item.city}}</div>
    </tk-scroll>
  </div>
</template>

<script>
  import cityList from 'core/city.js'
  import TkScroll from "../../tkScroll/TkScroll";
  export default {
    name: "CityList",
    components: {TkScroll},
    data() {
      return {
        cityList
      }
    },
    mounted() {
      console.log(this.cityList)
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
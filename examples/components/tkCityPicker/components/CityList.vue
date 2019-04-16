<template>
  <div id="tk-city-picker-list">
    <tk-scroll ref="wrapper"
               :listenScroll="true"
               :pullup="true"
               :data="cityList"
               >
      <div class="city-list-item" v-for="(item, key) in cityList" :key="key">
        <div class="first-letter">{{key}}</div>
        <div class="city-name-item" v-for="i in item" @click="handleSelectCity(i)">{{i.city}}</div>
      </div>
    </tk-scroll>
  </div>
</template>

<script>
  import TkScroll from "../../tkScroll/TkScroll";
  import pinyin from 'js-pinyin'
  pinyin.setOptions({checkPolyphone: false, charCase: 0});
  export default {
    name: "CityList",
    components: {TkScroll},
    data() {
      return {
        cityList: this.list
      }
    },
    props: {
      list: Array
    },
    mounted() {
      this.sortByCityName()
    },
    methods: {
      sortByCityName() {
        // console.log(this.list)
        this.sortByFirstLetter();
        this.resetCityList();

      },
      sortByFirstLetter() { // 根据城市名称首字母排序
        this.cityList.sort((a, b)=>{
          if(pinyin.getFullChars(a.city).slice(0, 1) < pinyin.getFullChars(b.city).slice(0, 1)) {
            return -1
          } else if (pinyin.getFullChars(a.city).slice(0, 1) === pinyin.getFullChars(b.city).slice(0, 1)){
            return 0
          } else {
            return 1
          }
        })
      },
      resetCityList() {
        const citySortList = {};
        const firstLetterArray = [];
        // let flag = '';
        this.cityList.map((item, idx) => {
          const firstLetter = pinyin.getFullChars(item.city).slice(0, 1);
          if(!firstLetterArray.includes(firstLetter)) {
            firstLetterArray.push(firstLetter)
            citySortList[firstLetter] = []
          }
          citySortList[firstLetter].push(item)
        })
        this.cityList = citySortList
      },
      handleSelectCity(cityInfo) {
        this.$emit('selectCity', cityInfo)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #tk-scroll {
    background: #fff;
    top: $header-height;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 12px;
  }
  .city-list-item {
    .first-letter {
      margin: 10px 0 15px;
      color: #999;
    }
    .city-name-item {
      margin-left: 5px;
      @include flex-row()
      border-bottom: solid #f6f6f6 1px;
      height: 40px;
      font-size: 16px;
      color: #333;
    }
    /*background: #fff;*/

  }
</style>
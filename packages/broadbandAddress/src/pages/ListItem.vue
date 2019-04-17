<template>
  <div id="broadband-list-item">
    <div class="list-item-title" @click="toggleItemContainer(itemInfo)">
      {{itemInfo.address_name}}
    </div>
    <div class="list-item-container" v-show="toggleState">
      <ul class="list-item-container-table">
        <li class="list-column">
          <span>接入方式</span>
          <span>端口数</span>
          <span>局向编码</span>
          <span>局向名称</span>
        </li>
        <li>
          <span class="link">{{itemSource.access}}</span>
          <span>{{itemSource.type_name}}</span>
          <span>{{itemSource.exch_code}}</span>
          <span>{{itemSource.exch_name}}</span>
        </li>
      </ul>
      <div class="list-item-container-buttom">点击复制标准地址</div>
    </div>
  </div>
</template>

<script>
  import {addressResSer} from 'api/broadbandAddress/addressResSer.js'
  export default {
    name: "ListItem",
    props: {
      itemInfo: Object
    },
    data() {
      return {
        toggleState: false,
        itemSource: {
          type_name: "",
          exch_code: "",
          access: "",
          exch_name: ""
        },
        hasReqSource: false
      }
    },
    methods: {
      addressResSer(params) { // 标准地址资源查询
        addressResSer(params).then((params) => {
          if(params.msg === '0') {
            this.itemSource = params.data[0]
          } else {
            alert(params.msg)
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      toggleItemContainer(itemInfo) {
        const queryParams = {
          eparchy: itemInfo.eparchy,
          addressCode:itemInfo.address_code,
          exchCode: itemInfo.exch_code
        };
        console.log('params'+ JSON.stringify(queryParams))
        this.addressResSer(queryParams)
        if(!this.hasReqSource){
          this.hasReqSource = true
          console.log(itemInfo)
        }
        this.toggleState = !this.toggleState
      }
    }
  }
</script>

<style lang="scss" scoped>
  #broadband-list-item {
    background: #fff;
    margin-bottom: 12px;

    .list-item-title {
      color: #333;
      padding:0 10px;
      height: 40px;
      @include flex-row()
    }

    .list-item-container {
      border-top: solid $line-light 1px;
      .list-item-container-table {
        li {
          .link {
            color: $link;
            font-size: 14px;
          }
          @include flex-row(space-around);
          span {
            font-size: 12px;
            width: 22%;
            text-align: center;
          }
        }
        .list-column {
          font-size: 14px;
          height: 30px;
        }
      }
      .list-item-container-buttom {
        @include flex-row(center);
        color: #000;
        font-size: 16px;
        height: 30px;
        background: #e1e2fe;
        margin-top: 10px;
      }
    }
  }
</style>
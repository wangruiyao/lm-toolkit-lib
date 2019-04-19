<template>
  <div id="broadband-list-item">
    <div class="list-item-title" @click="toggleItemContainer(itemInfo)">
      <span :id="'inputidx_'+itemIdx">{{itemInfo.address_name}}</span>
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
      <!--<button ref="copy" data-clipboard-action="copy" :data-clipboard-target="'#inputidx_'+itemIdx" @click="copyLink">复制</button>-->
      <div class="list-item-container-buttom"
           ref="copy"
           data-clipboard-action="copy"
           :data-clipboard-target="'#inputidx_'+itemIdx"
           @click="copyLink">点击复制标准地址
      </div>
    </div>
  </div>
</template>

<script>
  import {addressResSer} from 'api/broadbandAddress/addressResSer.js'
  export default {
    name: "ListItem",
    props: {
      itemInfo: Object,
      itemIdx: Number
    },
    data() {
      return {
        copyBtn: null, //存储初始化复制按钮事件
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
    mounted() {
      // console.log(this.$refs.copy[this.itemIdx])
      // this.copyBtn = new clipboard(this.$refs.copy)
    },
    methods: {
      createCopyBtn() {
        this.copyBtn = new clipboard(this.$refs.copy)
      },
      addressResSer(params) { // 标准地址资源查询
        addressResSer(params).then((params) => {
          indicator.close();
          if(params.msg === '0') {
            this.itemSource = params.data[0]
          } else {
            toast(params.msg)
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      toggleItemContainer(itemInfo) {


        // console.log('params'+ JSON.stringify(queryParams))

        if(!this.hasReqSource){
          indicator.open();
          const queryParams = {
            eparchy: itemInfo.eparchy,
            addressCode:itemInfo.address_code,
            exchCode: itemInfo.exch_code
          };
          this.addressResSer(queryParams);
          this.createCopyBtn();
          this.hasReqSource = true
        }
        this.toggleState = !this.toggleState
      },



      copyLink() {
        /*这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有*/
        let _this = this;
        let clipboard = _this.copyBtn;
        clipboard.on('success', function() {
          toast('复制成功');
        });
        clipboard.on('error', function() {
          toast('复制失败，请手动选择复制！')

        });
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
      height: 60px;
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
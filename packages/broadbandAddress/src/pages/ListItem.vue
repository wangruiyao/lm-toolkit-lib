<template>
  <div id="broadband-list-item">
    <div class="list-item-title" @click="toggleItemContainer()">
      山东省济南市历下区解放路231号国华经典
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
          <span class="link">FTTH</span>
          <span>FTTH(可用onu宽带接口1个)</span>
          <span>01119235</span>
          <span>（H804）黄台 FTTH （ETON）</span>
        </li>
      </ul>
      <div class="list-item-container-buttom">点击复制标准地址</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    data() {
      return {
        toggleState: true
      }
    },
    methods: {
      toggleItemContainer() {
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
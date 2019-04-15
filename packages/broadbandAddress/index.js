// 导入组件，组件必须声明 name
import broadbandAddress from './src/BroadbandAddress'
import broadbandAddressRouter from './src/router'

// 为组件提供 install 安装方法，供按需引入
broadbandAddress.install = function (Vue) {
  Vue.component(broadbandAddress.name, broadbandAddress)
};
broadbandAddress.routerConfig = broadbandAddressRouter
// 默认导出组件
export default broadbandAddress

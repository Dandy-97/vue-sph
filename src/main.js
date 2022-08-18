import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入仓库
import store from "./store"

// 三级联动组件 --- 全局组件
import TypeNav from "@/components/TypeNav"
// 轮播组件 --- 全局组件
import Carousel from "@/components/Carousel";
// 分页组件 --- 全局组件
import Pangination from "@/components/Pangination";
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pangination.name, Pangination);

// Element-ui 组件的按需加载 挂在原型上
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入MockServe.js --- mock数据
import "@/mock/mockServe";

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api';


// 引入vue图片懒加载插件
// import VueLazyload from 'vue-lazyload'
// // 注册插件
// Vue.use(VueLazyload, {
//   // 懒加载默认的图片
//   loading: loadimage,
// })

Vue.config.productionTip = false

new Vue({
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

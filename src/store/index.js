import Vue from "vue";
import Vuex from "vuex";
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
// 需要使用插件一次
Vue.use(Vuex);

export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})

//state:仓库存储数据的地方
// const state = {}
// mutations:修改state的唯一手段
// const mutations = {};
// action:处理action,可以书写自己的业务逻辑，也可以处理异步
// const actions = {};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {};
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// })



import { reqSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    searchList: {},
};
const mutations = {
    SEARCHINFO(state, obj) {
        state.searchList = obj;
    }
};
const actions = {
    // 获取search模块
    async SearchInfo({ commit }, value = {}) {
        let res = await reqSearchInfo(value);
        // value形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        if (res.code === 200) {
            commit("SEARCHINFO", res.data)
        }
    }
};
// 项目当中getters主要的作用是：简化仓库中的数据
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}


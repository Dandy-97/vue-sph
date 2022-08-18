import { reqCategoryList, reqCatBannerList, reqFloorList } from "@/api";

// home模块的小仓库
const state = {
    // home仓库中存储三级联动菜单的数据
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor的数据
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, arr) {
        // console.log(arr);
        state.categoryList = arr;
    },
    GETBANNERLIST(state, arr) {
        state.bannerList = arr;
    },
    GETFLOORLIST(state, arr) {
        state.floorList = arr;
    },
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let res = await reqCategoryList();
        if (res.code === 200) {
            commit("CATEGORYLIST", res.data.splice(1))
        }
    },
    // categoryList(context) {
    //     reqCategoryList().then(res => {
    //         console.log(res);
    //         let arr = res.data
    //         console.log(arr);
    //         if (res.code === 200) {
    //             context.commit("CATEGORYLIST", arr.splice(1))
    //         }
    //     })
    // }
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let res = await reqCatBannerList()
        if (res.code === 200) {
            commit("GETBANNERLIST", res.data)
        }
    },
    // 获取首页floor的数据
    async getFloorList({ commit }) {
        let res = await reqFloorList()
        if (res.code === 200) {
            commit("GETFLOORLIST", res.data)
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}


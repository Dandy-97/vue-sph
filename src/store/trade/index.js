import { reqUserAddressInfo, reqOrderInfo } from "@/api";

const state = {
    address: [],
    orderInfo: {},
};
const mutations = {
    GETUSERADDRESSINFO(state, arr) {
        state.address = arr;
    },
    GETORDERINFO(state, obj) {
        state.orderInfo = obj;
    }
};
const actions = {
    // 获取用户地址信息
    async getUserAddressInfo({ commit }) {
        let res = await reqUserAddressInfo();
        if (res.code === 200) {
            commit('GETUSERADDRESSINFO', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //  获取商品清单
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo();
        if (res.code === 200) {
            commit('GETORDERINFO', res.data);
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};
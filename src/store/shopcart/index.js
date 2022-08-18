import { reqShopCartList, reqDeleteShopCart, reqCheckedShop } from "@/api";
// shopcart模块的小仓库
const state = {
    cartList: [],
};
const mutations = {
    GETSHOPCARTLIST(state, arr) {
        state.cartList = arr
    }
};
const actions = {
    // 获取购物车列表数据
    async getShopCartList({ commit }) {
        let res = await reqShopCartList();
        if (res.code === 200) {
            commit("GETSHOPCARTLIST", res.data)
        }
    },
    // 删除购物车某个数据
    async deleteShopCart({ commit }, skuId) {
        let res = await reqDeleteShopCart(skuId)
        if (res.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('err'));
        }
    },
    // 购物车切换商品选中状态
    async updataChecked({ commit }, { skuId, isChecked }) {
        let res = await reqCheckedShop(skuId, isChecked);
        if (res.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('err'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取购物车中全部的产品（是一个数组)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch('deleteShopCart', item.skuId) : '';
            console.log(promise);
            // 将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
        // 只要全部的 p1 | p2... 都成功，返回结果即为成功
        // 如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll);
    },
    // 修改全部产品选中状态
    updateAllCartIsChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch('updataChecked', { skuId: item.skuId, isChecked });
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll)
    },
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}

import { reqGoodsInfo, reqAddOrUpdateShopCar } from "@/api";
// 封装游客身份模块uuid-->生成一个随机字符串（不能在变了）
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodInfoList: {},
  // 游客临时身份
  uuid_token : getUUID(),
};
const mutations = {
  GOODINFO(state, obj) {
    state.goodInfoList = obj;
  },
};
const actions = {
  // 获取产品信息的action
  async GoodInfo({ commit }, value) {
    let res = await reqGoodsInfo(value);
    if (res.code === 200) {
      commit("GOODINFO", res.data);
    }
  },
  // 将产品添加到购物车中
  async AddorRemoveshopcar({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的解构
    // 发请求：前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    // 不需要在三连环（仓库存储数据了）
    // 往意：async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let res = await reqAddOrUpdateShopCar(skuId, skuNum);
    // console.log(res);
    // 代表服务器加入购物车成功
    if (res.code === 200) {
      return "ok";
    } else {
      // 代表加入购车失败
      return Promise.reject(new Error("err"));
    }
  },
};
// 简化数据
const getters = {
  categoryView(state) {
    //比如：state.goodInfoList初始状态空对象，空对象的categoryView属性值undefined
    //当前计算出的 categoryView 属性值至少是一个空对象，假的报错不会有了
    return state.goodInfoList.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfoList.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfoList.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};

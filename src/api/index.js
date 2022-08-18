// 当前这个模块: API进行统一管理
import requests from "./request";

import MockRequest from "./MockRequest";
import request from "./request";

// 三级联动接口
/* /api/product/getBaseCategoryList  get 无参数 */
// 发请求: axios发请求返回的结果是promise对象
// export const reqCategoryList = () => {
//     return requests({ url: '/product/getBaseCategoryList', method: 'get' });
// }
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" });
// mocks数据接口调用
// 获取banner（Home首页轮播图接口）
export const reqCatBannerList = () => MockRequest.get("/banner");
// floor数据接口调用
export const reqFloorList = () => MockRequest.get("/floor");

// 获取search搜索模块数据    参数：需要带参数  当前这个接口(获取搜索模块的数据)，给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchInfo = (data) => requests({ url: "/list", method: "post", data });

// 获取detail商品详情数据 携带params参数
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });

// 添加到购物车 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 购物车获取列表 /api/cart/cartList
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: "get" });

// 购物车删除商品  /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteShopCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

// 购物车切换商品选中状态 /api/cart/checkCart/{skuId}/{isChecked} get
export const reqCheckedShop = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

// 获取注册验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

// 注册用户 /api/user/passport/register  post 参数类型
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })

// 用户登录 /api/user/passport/login post 参数类型
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })

// 获取用户信息 /api/user/passport/auth/getUserInfo 【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });

// 退出登录 /api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' });

// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList  get            
export const reqUserAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

// 获取商品清单   /api/order/auth/trade  get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });

// 以下接口没有使用vuex派发，在组件直接调用 （在入口文件有相应配置）
// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}  post 参数
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPatStasus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

// 获取我的订单列表  /api/order/auth/{page}/{limit}   get
export const reqMyorderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: "get" });

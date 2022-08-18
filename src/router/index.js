import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入store
import store from "@/store";

Vue.use(VueRouter);

import routes from "./routes";

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originRePush = VueRouter.prototype.replace;
// 重写push | replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传统那些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originRePush.call(this, location, resolve, reject);
  } else {
    originRePush.call(this, location, () => { }, () => { })
  }
};

const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的这个y=0，代表的滚动条在最上方
    return { y: 0 }
  }
});

// 全局守卫: 前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to, from, next) => {
  // 用户登录了，才会有token,未登录一定没有token
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  // 用户已经登录了
  if (token) {
    // 用户已经登录了还想去login[不能去，停留在首页]
    if (to.path === '/login') {
      next('/');
    } else {
      // 已登录，去的不是login 而是【home|search|detail|shopcart】
      // 判断当前用户存不存在
      if (name) {
        next();
      } else {
        try {
          // 没有用户信息，派发action让仓库存储用户信息在跳转
          await store.dispatch('getUserInfo');
          // 放行
          next();
        } catch (error) {
          // token失效了获取不到用户信息,重新登录
          // 清除token
          await store.dispatch('userLogout');
          next('/login')
        }
      }
    }
  } else {
    // 未登录：不能去交易相关trade、不能去支付相关【pay | paysuccess】、不能去个人中心
    // 未登录去上面这些路由 ---> 登录   if (to.path === '/trade') {}
    if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
      // 把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + to.path)
    } else {
      next();
    }
  }
})

export default router

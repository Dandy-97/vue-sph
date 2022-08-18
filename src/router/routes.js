// 引入一级路由组件
// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Shopcart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// 引入二级路由组件
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";
// 路由配置信息
/*  
*  --- 路由懒加载 --- 例：() => import("@/pages/Center")
* 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
* 如果我们能把不同路由对应的组件分割成不同的代码块，
* 然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
export default [
  {
    path: "/center",
    name: "center",
    component: () => import("@/pages/Center"),
    // 路由元信息(底部footer显示与隐藏)
    meta: { show: true },
    children: [
      { path: "myorder", name: "myorder", component: () => import("@/pages/Center/MyOrder"), meta: { show: true } },
      { path: "grouporder", name: "grouporder", component: () => import("@/pages/Center/GroupOrder"), meta: { show: true } },
      // 重定向
      { path: "/center", redirect: "/center/myorder" },
    ]
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: () => import("@/pages/PaySuccess"),
    // 路由元信息(底部footer显示与隐藏)
    meta: { show: true },
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/pages/Pay"),
    // 路由元信息(底部footer显示与隐藏)
    meta: { show: true },
    // 路由独享守卫
    beforeEnter(to, from, next) {
      if (from.path === '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    name: "trade",
    component: () => import("@/pages/Trade"),
    // 路由元信息(底部footer显示与隐藏)
    meta: { show: true },
    // 路由独享守卫
    beforeEnter(to, from, next) {
      if (from.path === '/shopcart') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/pages/ShopCart"),
    // 路由元信息(底部footer显示与隐藏)
    meta: { show: true },
  },
  {
    path: "/addCartSuccess",
    name: "addCartSuccess",
    component: () => import("@/pages/AddCartSuccess"),
    // 路由元信息(底部footer显示与隐藏)
    meta: { show: true },
  },
  {
    path: "/detail/:skuid?",
    name: "detail",
    component: Detail,
    // 路由元信息
    meta: { show: true },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home"),
    // 路由元信息
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: () => import('@/pages/Search'),
    meta: { show: true },
    // 路由组件能不能传递props数据？
    // 第一种：布尔值写法：params
    // props: true,
    // 第二种：对象写法（额外的给路由组件传递一些props）
    // props: { a: 1, b: 2 }
    // 第三种：函数写法
    // props: ($route) => {
    //   return { keyword: $route.params.keyword, k: $route.query.k };
    // }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { show: false },
  },
  // 重定向,在项目跑起来的时候，访问/，立马让它定向到首页
  {
    path: "*",
    redirect: "/home",
  },
];

<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登陆、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Index.vue";
import Footer from "./components/Footer/Index.vue";
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action获取商品分类的三级列表的数据(TypeNav通知Vuex发请求，获取数据，存储于仓库当中)
    // 在APP根组件下，只需请求一次，性能优化
    this.$store.dispatch("categoryList")
  },
};
</script>

<style lang="less" scoped>
</style>


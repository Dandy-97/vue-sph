<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in getFloorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入其余组件
import TypeNav from "@/components/TypeNav/index.vue";
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from 'vuex';
export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      getFloorList: (state) => {
        return state.home.floorList;
      }
    })
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('getFloorList');
    // 派发action 获取用户信息在首页展示
    this.$store.dispatch('getUserInfo');
  },
};
</script>

<style lang="less" scoped>
</style>
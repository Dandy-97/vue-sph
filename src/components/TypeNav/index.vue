<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <div class="sort" v-show="show">
                    <!-- 一级分类 -->
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(listA, index) in categoryList" :key="listA.categoryId"
                            :class="{ cur: currentIndex === index }">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName="listA.categoryName" :data-category1Id="listA.categoryId"
                                    style="cursor:pointer">{{
                                            listA.categoryName
                                    }}</a>
                            </h3>
                            <!-- 二三级分类 -->
                            <div class="item-list clearfix" v-show="currentIndex === index">
                                <div class="subitem" v-for="listB in listA.categoryChild" :key="listB.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="listB.categoryName"
                                                :data-category2Id="listB.categoryId" style="cursor:pointer">{{
                                                        listB.categoryName
                                                }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="listC in listB.categoryChild" :key="listC.categoryId">
                                                <a :data-categoryName="listC.categoryName"
                                                    :data-category3Id="listC.categoryId" style="cursor:pointer">{{
                                                            listC.categoryName
                                                    }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入方式：是把lodash全部功能函数引入
// import _ from 'lodash';
// 最好的引入方式：按需加载(此处引入的是节流)
import { throttle } from "lodash";

export default {
    name: 'TypeNav',
    data() {
        return {
            // nav背景色默认索引属性(索引值设定不能为已存在索引可以为负数)
            currentIndex: null,
            // 三级联动的显示隐藏(用于路由跳转)
            show: true,
        }
    },
    computed: {
        // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        // 注入一个参数state，其实即为大仓库中的数据
        ...mapState({
            categoryList: (state) => {
                return state.home.categoryList;
            }
        }),
        // 简写
        // ...mapState({
        //     categoryList: state => state.home.categoryList;
        // })
        /* 不使用map映射方法 */
        // categoryList() {
        //     return this.$store.state.home.categoryList
        // }
    },
    // 组件挂载完毕：可以向服务器发请求
    mounted() {
        // 通知Vuex发请求，获取数据，存储于仓库当中
        // this.$store.dispatch('categoryList');
        // 默认不在home页面，当前的三级联动菜单是隐藏的(类似兜底)
        if (this.$route.name != 'home') {
            this.show = false
        }
    },
    methods: {
        // 鼠标移入修改响应式数据currentIndex属性
        // lodash插件操作节流
        changeIndex: throttle(function (index) {
            //正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
            //非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            //就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。
            this.currentIndex = index;
        }, 50),
        // 鼠标移出
        leaveIndex() {
            this.currentIndex = null;
            // 判断不是home路由组件的时候才会执行
            if (this.$route.name != 'home') {
                this.show = false
            }
        },
        // 点击nav菜单a标签进行跳转
        goSearch(event) {
            // 最好的解决方案：编程式导航+事件委派
            // 存在一些问题：事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
            // 点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
            // 存在另外一个问题：即使你能确定点击的是ā标签，如何区分是一级、二级、三级分类的标签
            // 第一个问题：把子节点当中a标签加上自定义属性data-categoryName,其余的子节点是没有的
            let noed = event.target;
            // 获取到当前出发这个事件的节点【h3、a、dt、d1】,需要带有data-categoryName这样节点【一定是a标签】
            // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
            // 把categoryname属性解构出来(注：浏览器会将属性变成小写)
            let { categoryname, category1id, category2id, category3id } = noed.dataset;
            // console.log(noed.dataset);
            // 判断当前一定是a标签才会进入
            if (categoryname) {
                //整理路由跳转的参数对象
                let location = { name: 'search' };
                // console.log(location);
                let query = { categoryName: categoryname };
                // console.log(query);
                if (category1id) {
                    query.category1Id = category1id;
                    console.log(query.category1Id);
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                // console.log(location, query);
                //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
                // console.log(this.$route);
                if (this.$route.params) {
                    location.params = this.$route.params
                }
                //整理完参数
                location.query = query;
                // console.log(query);
                // console.log(location.query);
                //路由跳转
                this.$router.push(location);
                // console.log(location);
            }
        },
        // search页当鼠标移入的时候，让商品分类列表进行展示
        enterShow() {
            if (this.$route.name != 'home') {
                this.show = true;
            }
        }
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background: #D9D9D9;
                }

                // .item:hover {
                //     background: #D9D9D9;
                // }
            }
        }
    }
}
</style>
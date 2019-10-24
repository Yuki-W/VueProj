<template>
  <div>
    <!-- 轮播图区 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中使用 v-for循环的话，一定要使用 :key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格到六宫格的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <!-- 将 a链接 改造成 router-link实现路由链接 -->
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: [] // 保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      this.$http
        .get("api/getlunbo")
        .then(result => {
          // 指定成功的回调函数
          // console.log(result.body)
          if (result.body.status === 0) {
            // 如果成功
            this.lunbotuList = result.body.message;
          } else {
            // 如果失败
            Toast("加载轮播图失败");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  // scss 语法
  //   .mint-swipe-item {
  //     &:nth-child(1) {
  //       background-color: red;
  //     }
  //     &:nth-child(2) {
  //       background-color: green;
  //     }
  //     &:nth-child(3) {
  //       background-color: blue;
  //     }
  //   }
}
.mint-swipe-item:nth-child(1) {
  background-color: blue;
}
.mint-swipe-item:nth-child(2) {
  background-color: gold;
}
.mint-swipe-item:nth-child(3) {
  background-color: pink;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}

.mui-grid-view.mui-grid-9{
    background-color: white;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
.mui-grid-view.mui-grid-9 img{
    width: 60px;
    height: 60px;
}
.mui-media-body{
    font-size: 12px
}
</style>
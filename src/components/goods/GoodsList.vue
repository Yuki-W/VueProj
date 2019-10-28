<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/'+item.id"
      tag="div"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在网页中，有两种跳转方式：
        方式1：使用 a标签 的形式叫做 标签跳转
        方式2：使用 window.location.href 的形式，叫做 编程式导航
     -->
    <div
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      @click="goDatail(item.id)"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    // data 是往自己组件内部，挂载一些私有数据的
    return {
      pageindex: 1, //分页的页数
      goodslist: [] //存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            // 数据拼接
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageindex++;
      this.getGoodsList();
    },
    goDatail(id){
        // 使用JS的形式进行路由导航
        // 注意:区分 this.$route 和 this.$router 两个对象
        // 其中：this.$route 是路由参数对象，所有路由中的参数 params、query都属于它
        // 其中：this.$router 是一个路由导航对象，用它 可以方便地 使用 JS代码，实现路由的前进、后退、跳转到新的URL地址
        
        // 最简单的方式1
        // this.$router.push("/home/goodsinfo/"+id)

        // 2.命名的路由
        this.$router.push({ name: 'goodsinfo', params: { id }})
    }
    
  }
};
</script>

<style lang="" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
}
.goods-list .goods-item {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  margin: 4px 0;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 293px;
}
.goods-list img {
  width: 100%;
}
.goods-item .title {
  font-size: 14px;
}
.goods-item .info {
  background-color: #eee;
}
.goods-item .info p {
  margin: 0;
  padding: 5px;
}
.goods-item .info .now {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.goods-item .info .old {
  text-decoration: line-through;
  font-size: 12px;
  margin-left: 10px;
}
.goods-item .sell {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
</style>
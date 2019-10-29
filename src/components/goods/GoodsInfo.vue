<template>
  <div class="goodsinfo-list">
    <!-- 添加到购物车（小球半场动画） -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox class="goodsinfo-numbox" @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

            <!-- 分析:如何实现加入购物车的时候，拿到选择的数量
                1.经过分析，发现：按钮属于 goodsinfo页面，数字 属于 numberbox组件
                2.由于涉及到父子组件嵌套，所以无法直接在 goodsinfo 页面中获取到 选中的商品数量值
                3.怎么解决：
                    涉及到 子组件向父组件传值（事件调用机制）
                4.事件调用本质：父向子传递方法，子调用这个方法，同时把 数据当作参数 传递给这个方法
            -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入数字选择框组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的 id 挂载到data，方便后期调用
      lunbotu: [], //轮播图数据
      goodsinfo: {}, //获取到的商品信息
      ballFlag: false, //控制小球隐藏和显示的标识符
      selectedCount: 1 //保存用户选中的商品数量，默认认为用户买1个
    };
  },
  created() {
    this.getLunbotu();
    this.getgoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加img属性，因为轮播图组件中，只认识item.img,不认识item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getgoodsInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 1.分析动画不准确的本质原因：我们把 小球最后位移到的位置，已经局限在了某一分辨率下的滚动条未滚动的情况下
      // 2.只要分辨率 和 测试的时候不一样，或者滚动条有一定的滚动距离后，问题则出现
      // 3.因此，经过分析，得出结论：不能把位置 横纵坐标直接 写死，而是应该根据不同的情况动态计算坐标值
      // 4.解决思路： 先得到 徽标的横纵坐标，在得到 小球的 横纵坐标，然后 让 y值和X值求差，得出目标位移的横纵距离
      // 5.如何获取徽标和小球的位置？？？ domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件时，把选中的值保存在 data上
      this.selectedCount = count;
      console.log("父组件拿到的数量值：" + this.selectedCount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="" scoped>
.goodsinfo-list {
  background-color: #eee;
  overflow: hidden;
}
.now_price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 10px 0;
}
.goodsinfo-numbox {
  display: inline-block;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 360px;
  left: 148px;
}
</style>
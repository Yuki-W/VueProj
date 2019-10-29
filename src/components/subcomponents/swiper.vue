<template>
    <div>
        <mt-swipe :auto="4000">
      <!-- 在组件中使用 v-for循环的话，一定要使用 :key -->
      <!-- 将来，谁使用此轮播图组件，谁为我们传递 lunbotuList -->
      <!-- 此时，lunbotuList 应该是 父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt :class="{'full':isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
    </div>
 

    <!-- 分析：轮播图 -->
    <!-- 1.首页中的图片，宽高都使用了 100% 的宽度
         2.商品详情页面中，轮播图的图片，如果也使用100%的话，页面不美观
         3.商品详情页面中的轮播图，期望 高度是100%，但是宽度为 自适应
         4.经过分析，得到问题原因：首页中的轮播图 和详情中的轮播图。分歧点在 宽度到底是100%还是自适应
         5.解决办法：定义一个属性，让 使用轮播图的 调用者手动指定 是否为100%的宽度
     -->
</template>

<script>
export default {
    // props组件传值
    props:['lunbotuList','isfull']
}
</script>

<style lang="" scoped>
.mint-swipe {
  height: 200px;

  /*  scss 语法
     .mint-swipe-item {
       &:nth-child(1) {
         background-color: red;
       }
       &:nth-child(2) {
         background-color: green;
       }
       &:nth-child(3) {
         background-color: blue;
       }
     } */
}
.mint-swipe-item{
    text-align: center
}
.mint-swipe-item img {
  /* width: 100%; */
  height: 100%;
}
/* 宽高是否自适应 */
.full{  
    width: 100%;
}
</style>
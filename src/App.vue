<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="Vue项目"></mt-header>

    <!-- 中间 路由router-view 区域 -->
    <!-- 4.3 放置路由内容 -->
    <transition>
		<router-view></router-view>
	</transition>

    <!-- 底部 tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item router-link-active" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;

// 解决组件切换动画时，顶部Header移动问题
  overflow: hidden;
}

// 设置动画
.v-enter{
	opacity: 0;
	transform: translateX(100%)
}
// 解决页面从左侧离开，右侧进入问题
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;// 解决动画从底部往上移动问题
}
.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
</style>

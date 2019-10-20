// 入口文件
import Vue from 'vue'
// 3.1 导入路由包
import VueRouter from 'vue-router'
// 3.2 安装路由
Vue.use(VueRouter)


// 5.1 导入 vue-resource
import VueResource from 'vue-resource'
// 5.2 安装 vue-resource
Vue.use(VueResource)

// 2.导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 1.按需导入 Mint-UI 中的组件
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


// 3.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入 App 组件
import app from './App.vue'

let vm = new Vue({
    el:'#app',
    render:c => c(app),  // 将组件渲染到页面

    // 3.4 挂载路由对象到 VM 实例上
    router:router   
});
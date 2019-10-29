// 入口文件
import Vue from 'vue'
// 3.1 导入路由包
import VueRouter from 'vue-router'
// 3.2 安装路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{ // this.$store.state.***
        car:[]  //将购物车中的商品数据，用一个数组存储起来。
                // 在 car 数组中，存储一些商品的对象，我们可以暂时将这个商品对象，设计成这样：
                // { id:商品的id, count:要购买的数量, price:商品的单价, selected:false }
    },
    mutations:{ // this.$store.commit('方法的名称','按需传递唯一的参数')

    },
    getters:{   // this.$store.getters.***

    }
})


// 5.1 导入 vue-resource
import VueResource from 'vue-resource'
// 5.2 安装 vue-resource
Vue.use(VueResource)

// 导入格式化时间的插件 【执行cnpm i moment -s 命令】
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
   return moment(dataStr).format(pattern);
})

// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据格式组织形式 application/x-www-form-urlencodede
Vue.http.options.emulateJSON = true;

// 2.导入 MUI 的Style样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/css/golbal.css'

// 1.按需导入 Mint-UI 中的组件
// import { Header,Swipe, SwipeItem, Button } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// // 导入 Laza load ，图片懒加载
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装 图片预览插件  执行 cnpm i vue-preview -S
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 3.3 导入自己的 router.js 路由模块
import router from './router.js'

// 导入 App 组件
import app from './App.vue'

let vm = new Vue({
    el:'#app',
    render:c => c(app),  // 将组件渲染到页面

    // 3.4 挂载路由对象到 VM 实例上
    router,
    store   //挂载 store 状态管理对象  
});
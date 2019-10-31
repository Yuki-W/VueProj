// 入口文件
import Vue from 'vue'
// 3.1 导入路由包
import VueRouter from 'vue-router'
// 3.2 安装路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会调用 main.js,在刚调用时，先从本地存储中，把购物车数据读出来放到store中
let car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
    state:{ // this.$store.state.***
        car:car  //将购物车中的商品数据，用一个数组存储起来。
                // 在 car 数组中，存储一些商品的对象，我们可以暂时将这个商品对象，设计成这样：
                // { id:商品的id, count:要购买的数量, price:商品的单价, selected:false }
    },
    mutations:{ // this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCar(state,goodsinfo){
            // 点击加入购物车，把商品信息保存到store 中的 car上
            // 分析：
            // 1.如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2.如果没有，则直接把  商品数据 push 到 car中

            // 假设 在购物车中，没有找到对应的商品
            let flag = false;
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            // 如果最终循环完毕，得到的 flag 还是 false,则把商品数据直接 push 到购物车中
            if( !flag ){
                state.car.push(goodsinfo);
            }

            // 当 更新 car 之后，把 car 数组存储到 本地的localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodsinfo) {
            // 修改购物车中商品数量值
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }
            })
            // 当修改完商品数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeFormCar(state,id){
            // 根据id，从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            });
            // 当删除完毕后，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsSelected(state,info){
            // 更新最新的 购物车列表 开关状态
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            })
            // 把最新的所有购物车商品状态，保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters:{   // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state){
            let c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state){
            let obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.count;
            })
            return obj;
        },
        getGoodsSelected(state){
            let obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.selected;
            })
            return obj;
        },
        getGoodsCountAndAmount(state){
            let obj = {
                count : 0,  //勾选的数量
                amount : 0  //勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected){
                    obj.count += item.count;
                    obj.amount += item.price * item.count
                }
            })
            return obj;
        }
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
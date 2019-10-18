// 入口文件
import Vue from 'vue'

// 2.导入 MUI 的样式
import './lib/mui/css/mui.min.css'

// 1.按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);

// 导入 App 组件
import app from './App.vue'

let vm = new Vue({
    el:'#app',
    render:c => c(app)  // 将组件渲染到页面
});
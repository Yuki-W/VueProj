import VueRouter from 'vue-router'

// 4.1 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    // 路由重定向，默认打开首页
    { path:'/',redirect:'/home'},
    // 4.2 配置路由链接
    { path:'/home',component:HomeContainer},
    { path:'/member',component:MemberContainer},
    { path:'/shopcar',component:SearchContainer},
    { path:'/search',component:ShopcarContainer},
    { path:'/home/newslist',component:NewsList},
    { path:'/home/newInfo/:id',component:NewsInfo}
  ],
  linkActiveClass:'mui-active'  // 覆盖默认的路由高亮的类，默认的类叫 router-link-active
})

// 把路由对象暴露出去
export default router
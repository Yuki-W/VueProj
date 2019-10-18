# 这是一个动手写的Vue项目

## 时间：2019年10月18日 10：11

## 用（传统方式）命令行把修改后的代码上传到码云？
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
    + 在制作 购物车 小图标时，操作会相对多一些：
    + 先把 扩展图标的 css 样式，拷贝到 项目中
    + 拷贝 扩展字体库 ttf 文件，到项目中
    + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link
1. 将 <a>链接全部替换为 router-link

## 设置路由高亮
1. 在路由对象中，使用linkActiveClass属性，将 router-link-active 类替换为指定高亮的类

## 点击 tabbar 中的路由链接，展示对应的路由组件
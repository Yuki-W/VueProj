<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h1 class="title">{{ newsinfos.title }}</h1>

        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{ newsinfos.add_time | dataFormat }}</span>
            <span>点击:{{ newsinfos.click }}次</span>
        </p>
        <hr>

        <!-- 内容区域 -->
        <div class="content" v-html="newsinfos.content"></div>

        <!-- 评论子组件区 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

// 1.导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data() {
        return {
            id:this.$route.params.id,    //将URL地址中传递过来的ID值，挂载到data上，方便以后调用
            newsinfos:{}
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {  // 获取新闻资讯详情
        getNewsInfo() {
            this.$http.get('api/getnew/' + this.id).then((result) => {
                if(result.body.status === 0){   //获取成功
                    this.newsinfos = result.body.message[0]
                }else{  //获取失败
                    Toast('获取新闻资讯详情失败')
                }
            }).catch((err) => {
                console.log('获取新闻资讯详情发生错误信息，已忽略');
            });
        }
    },
    components:{
        //用来注册子组件的节点
        'comment-box' : comment
    }
}
</script>

<style lang="" scoped>
.newsinfo-container{
    padding: 0 4px;
}
.newsinfo-container .title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red
}
.subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #226aff;
}
</style>
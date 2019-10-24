<template>
    <div class="newsinfo-container">
        <h1 class="title">新闻标题</h1>
        <p class="subtitle">
            <span>发表时间:</span>
            <span>点击:0次</span>
        </p>
        <hr>
        <div class="content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:this.$route.params.id    //将URL地址中传递过来的ID值，挂载到data上，方便以后调用
        }
    },
}
</script>

<style lang="" scoped>
/* .newsinfo-container{

} */
</style>
<template>
    <div id="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dateformet}}</span>
            <span>点击{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>
        <hr>
        <!-- 评论区 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    created(){
        this.getNewsinfo()
    },
    methods:{
        getNewsinfo(){
            this.$http.get('getnew/'+ this.id).then(result=>{
                this.newsinfo = result.body.message[0]               
            })
        }
    }
}
</script>

<style lang="less">
#newsinfo-container {
    padding: 0 5px;
    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>

<template>
    <div id="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入你要评论的内容(最多120字)" maxlength="120" v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="com-list">
            <div class="com-item" v-for="(item,index) in comments" :key="index">
                <div class="com-title">
                    第{{index +1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time | dateformet}}
                </div>
                <div class="com-body">
                    {{item.content =='undefined' ? 'em.....':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui' ;
export default {
    data(){
        return {
            pageindex:1,    
            comments:[],
            content:''      
        }
    },
    created(){
        this.getcomments()
    },
    methods:{
        getcomments(){
            this.$http.get('getcomments/'+this.id + '?pageindex=' + this.pageindex).then(result=> {
                this.comments = this.comments.concat(result.body.message)
            })
        },
        getmore(){
            this.pageindex++;
            this.getcomments()
        },
        postComment(){
            if(this.content.trim().length == 0 ){
                return Toast('内容不能为空')
            };
            this.$http.post('postcomment/' + this.id , {content:this.content}).then(res =>{
                Toast(res.body.message);
            })
            this.comments.unshift({
                user_name:'匿名用户',
                add_time:Date.now(),
                content:this.content
            })
            this.content = ''
        }
    },
    props:['id']
}
</script>

<style lang="less" scoped>
#comment-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .com-list {
        margin: 5px 0;
        .com-item {
            font-size: 13px;
        }
        .com-title {
            line-height: 30px;
            background-color: #ccc;
        }
        .com-body {
            line-height: 35px;
            text-indent: 2em;
        }
    }
}
</style>

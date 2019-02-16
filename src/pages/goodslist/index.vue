<template>
    <div class="goods_list">
        <div class="good_item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" >
            <h1 class="title"> {{item.title}} </h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ {{item.sell_price}} </span>
                    <span class="old">¥ {{item.market_price}} </span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>还剩 {{item.stock_quantity}} 件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex:1,
            goodslist:[]
        }
    },
    created(){
        this.getGoodslist()
    },
    methods:{
        getGoodslist(){
            this.$http.get('getgoods?pageindex=' + this.pageindex).then(res =>{
                this.goodslist = this.goodslist.concat(res.body.message)
            })
        },
        getmore(){
            this.pageindex++;
            this.getGoodslist()
        },
        goDetail(id){
            this.$router.push('/home/goodsinfo' + id)
        }
    }
}
</script>

<style lang="less" scoped>
.goods_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;
    .good_item {
        width: 49%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        border: 1px solid #ccc;
        margin-bottom: 5px;
        box-shadow: 0 0 5px #999;
        min-height: 250px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background-color: #eee;
            p {
                padding: 5px;
            }
            .price {
                .now {
                    color: red;
                    font-weight: 700;
                    font-size: 16px;
                }
                .old {
                    font-size: 10px;
                    text-decoration: line-through;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>

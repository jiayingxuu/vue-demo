<template>
  <div class="goodsinfo_container">
    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFall" ref="ball"></div>
    </transition>
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :banner="banner"></swiper>
        </div>
      </div>
    </div>
    <!--购买区域  -->
    <div class="mui-card">
      <div class="mui-card-header title">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
            销售价:
            <span class="now_price">{{goodsinfo.sell_price}}</span>
          </p>
          <div class="numbox">
            <span>购买数量:</span>
            <input type="button" value="-" @click="buyCount>=2 && buyCount--">
            <input type="number" v-model="buyCount" @change="getbigestCount">
            <input
              type="button"
              value="+"
              @click="buyCount<=goodsinfo.stock_quantity && buyCount++"
            >
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addShopcar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner goodstext">
          <p>商品库号: {{goodsinfo.goods_no}}</p>
          <p>库存情况: {{goodsinfo.stock_quantity}} 件</p>
          <p>上架时间: {{goodsinfo.add_time | dateformet}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getComment(id)" >商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      banner: [],
      goodsinfo: {},
      buyCount: 1,
      ballFall:false
    };
  },
  created() {
    this.getGoodsimg();
    this.getGoodsinfo();
  },
  methods: {
    getGoodsimg() {
      this.$http.get("getthumimages/" + this.id).then(res => {
        this.banner = res.body.message;
      });
    },
    getGoodsinfo() {
      this.$http.get("goods/getinfo/" + this.id).then(res => {
        this.goodsinfo = res.body.message[0];
      });
    },
    getbigestCount() {
      if (this.buyCount > this.goodsinfo.stock_quantity) {
        this.buyCount = this.goodsinfo.stock_quantity;
      }
    },
    getDesc(id){
        this.$router.push('/home/goodsdesc' + id)
    },
    getComment(id){
        this.$router.push('/home/goodscomment' + id)
    },
    addShopcar(){
      this.ballFall = !this.ballFall 
      this.$store.commit('addToCar',{
        id:this.id,
        count:this.buyCount
      })
    },
    beforeEnter(el){
      el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
      // el.offsetWidth;

      const ballPostion = this.$refs.ball.getBoundingClientRect();
      
      const badgePostion = document.getElementById('badge').getBoundingClientRect();

      const distX = badgePostion.left - ballPostion.left;
      const distY = badgePostion.top - ballPostion.top;

      el.style.transform = `translate(${distX}px,${distY}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done()
    },
    afterEnter(){
      this.ballFall = !this.ballFall
    }
  }
};
</script>

<style lang="less" scoped>
.goodsinfo_container {
  background-color: #eee;
  overflow: hidden;
  .numbox {
    display: flex;
    height: 50px;
    align-items: center;
    input {
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
      text-align: center;

      &[type="number"] {
        border-left: 0;
        border-right: 0;
        font-size: 12px;
        color: gray;
      }
    }
  }
}
.title {
  color: #1e96d6;
}
.now_price {
  font-size: 16px;
  font-weight: 700;
  color: red;
}
.mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
.goodstext {
  p {
    font-size: 14px;
    line-height: 20px;
  }
}
.ball {
  z-index: 99;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 392px;
  left: 120px;
}
</style>

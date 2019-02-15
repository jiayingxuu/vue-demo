<template>
  <div>
    <!-- 导航 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
          v-for="item in photoCategoary" :key="item.id"
            :class="['mui-control-item' ,item.id == 0 ? 'mui-active' : '']"
            @click="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片展示 -->
    <ul class="photolist">
        <router-link v-for="item in getImages" :key="item.id" tag="li" :to="'/home/photoinfo'+item.id">
            <img v-lazy="item.img_url">
            <div class="info">
                <h1 class="title"> {{item.title}} </h1>
                <div class="body"> {{item.zhaiyao}} </div>
            </div>
        </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "@/libs/mui/js/mui.js";

export default {
  data() {
    return {
      photoCategoary: [],
      getImages:[]
    };
  },
  created() {
    this.getPhotoCate();
    this.getPhotoList(0)
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotoCate() {
      this.$http.get("getimgcategory").then(result => {
        this.photoCategoary = result.body.message
        this.photoCategoary.unshift({ title:'全部', id:0 })
      });  
    },
    getPhotoList(listId){
        this.$http.get('getimages/' + listId).then(result => {
            this.getImages = result.body.message
        })
    }
  }
};
</script>

<style lang="less" scoped>
.photolist {
    padding: 0 5px;
    li {
        position: relative;
        background-color: #ccc;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        img {
            width: 100%;
        }
        .info {
            position: absolute;
            bottom: 0;
            background: rgba(0,0,0,.4);
            color: #fff;
            max-height: 65px;
            .title{
                font-size: 14px;
                margin: 5px 0;
                font-weight: 700;
            }
            .body {
                font-size: 12px;
                line-height: 15px;
            }
        }
    }
}

img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>

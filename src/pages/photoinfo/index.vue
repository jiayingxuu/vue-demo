<template>
  <div class="photoinfo-container">
    <h3>{{getphotoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{getphotoinfo.add_time | dateformet}}</span>
      <span>点击 {{getphotoinfo.click}} 次</span>
    </p>
    <hr>

    <!-- 缩略图 -->
    <div class="photo_list">
      <img
        class="preview-img"
        v-for="(item,index) in list"
        :key="item.src"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
      >
    </div>

    <!-- 图片内容 -->
    <div class="content" v-html="getphotoinfo.content"></div>
    <!-- 评论 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      getphotoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoinfo(), this.getList();
  },
  methods: {
    getPhotoinfo() {
      this.$http.get("getimageInfo/" + this.id).then(res => {
        this.getphotoinfo = res.body.message[0];
      });
    },
    getList() {
      this.$http.get("getthumimages/" + this.id).then(res => {
        res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
        });
        this.list = res.body.message;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.photoinfo-container {
    padding: 0 5px;
    h3 {
        font-size: 14px;
        text-align: center;
        margin: 10px 0;
    }
    .subtitle {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
    .photo_list {
        img {
            margin: 5px;
            box-shadow: 0 0 9px #999;
        }
    }
}
</style>

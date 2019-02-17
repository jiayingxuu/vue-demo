<template>
  <div class="goodsdesc_container">
    <h1>{{content.title}}</h1>
    <hr>
    <div class="text" v-html="content.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {}
    };
  },
  created() {
    this.getcontent();
  },
  methods: {
    getcontent() {
      this.$http.get("goods/getdesc/" + this.$route.params.id).then(res => {
        this.content = res.body.message[0];
      });
    }
  }
};
</script>

<style lang="less">
.goodsdesc_container {
  padding: 5px;
  h1 {
    font-size: 16px;
    font-weight: 700px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .text {
      font-size: 13px;
      line-height: 18px;
    img {
      width: 100%;
    }
  }
}
</style>

<template>
  <div id="newlist">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newsinfo' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间: {{item.add_time | dateformet}}</span>
              <span>点击{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newlist: []
    };
  },
  created() {
    this.getNewlist();
  },
  methods: {
    getNewlist() {
      this.$http.get("getnewslist").then(result => {
        this.newlist = result.body.message;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
      margin: 5px 0;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>


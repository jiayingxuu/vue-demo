<template>
  <div class="shopcar-containe">
    <div class="goods_list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img src="../../assets/logo.png" alt>
            <div class="info">
              <h1>标题</h1>
              <div class="numbox">
                <span class="price">¥0</span>
                <div class="num">
                  <input type="button" value="-">
                  <input type="number">
                  <input type="button" value="+">
                </div>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.goods_list {
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 60px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .numbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        input {
          float: left;
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
  }
}
</style>


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import vueResource from 'vue-resource'
Vue.use(vueResource)

// 图片预览插件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

//设置vue-resource根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/'

import moment from 'moment'
//定义全局过滤器
Vue.filter('dateformet',function(datastr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(datastr).format(pattern)
})

//导入mui
import './libs/mui/css/mui.css'
import './libs/mui/css/icons-extra.css'

//初始化样式
import './styles/common.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

//全局注册评论组件
import comment from './components/comment.vue'
Vue.component('comment',comment)

//全局注册轮播图组件
import swiper from './components/swiper.vue'
Vue.component('swiper',swiper)

/* eslint-disable no-new */

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

let car  = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
  state:{
    car,
  },
  mutations:{
    addToCar(state,goodinfo){
      let index = state.car.findIndex(item => item.id ==goodinfo.id)
      if(index ==-1){
        state.car.push(goodinfo)
      }else{
        state.car[index].count +=parseInt(goodinfo.count)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    totalcount(state){
      let sum = 0;
      state.car.forEach(item => {
        sum +=item.count;
      });
      return sum
    }
  }
})



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

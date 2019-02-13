// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import vueResource from 'vue-resource'
Vue.use(vueResource)

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

//全局注册组件
import comment from './components/comment.vue'
Vue.component('comment',comment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

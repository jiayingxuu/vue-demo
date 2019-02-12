import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import searchComponent from '../pages/search'
import shopcarComponent from '../pages/shopcar'

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {path:'/',redirect:'/home'},
    {path:'/home',component:homeComponent},
    {path:'/member',component:memberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent},

  ],
  linkActiveClass:'mui-active'
})

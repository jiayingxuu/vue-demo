import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import searchComponent from '../pages/search'
import shopcarComponent from '../pages/shopcar'
import newlistComponent from "../pages/newlist"
import mewsinfoComponent from "../pages/newsinfo"
import photolistComponent from "../pages/photolist"
import photoinfoComponent from "../pages/photoinfo"

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
    {path:'/home/newlist',component:newlistComponent},
    {path:'/home/newsinfo:id',component:mewsinfoComponent},
    {path:'/home/photolist',component:photolistComponent},
    {path:'/home/photoinfo:id',component:photoinfoComponent}
  ],
  linkActiveClass:'mui-active'
})

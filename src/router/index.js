import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld1 from '@/components/HelloWorld1'
import HelloWorld2 from '@/components/HelloWorld2'
import Flip from '@/components/Flip'
import ClickTrack from '@/components/ClickTrack'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cssTest',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cavansTest',
      name: 'HelloWorld1',
      component: HelloWorld1
    },
    {
      path: '/cavansTest2',
      name: 'HelloWorld2',
      component: HelloWorld2
    },
    {
      path: '/flipTest',
      name: 'FlipTest',
      component: Flip
    },
    {
      path: '/ClickTrack',
      name: 'ClickTrack',
      component: ClickTrack
    }
  ]
})

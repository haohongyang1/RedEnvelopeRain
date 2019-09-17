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
      path: '/cssTest', // 使用Css3
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cavansTest', // 使用canvas
      name: 'HelloWorld1',
      component: HelloWorld1
    },
    {
      path: '/cavansTest2', // 使用canvas测试一个红包掉落
      name: 'HelloWorld2',
      component: HelloWorld2
    },
    {
      path: '/flipTest', // 翻转特效组件
      name: 'FlipTest',
      component: Flip
    },
    {
      path: '/ClickTrack', // 模拟追踪原点特效
      name: 'ClickTrack',
      component: ClickTrack
    }
  ]
})

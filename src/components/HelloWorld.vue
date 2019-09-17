<template>
  <div class="red-package-contain">
    <!-- @webkitAnimationIteration='iterationEvent(item, $event)' -->
    <img src="@/assets/hongbao.png" :class="getClass()" :style="getStyle()" v-for="item in count" :key="item"  @click="repackClick">
    <flip ref="flipEffect"></flip>
  </div>
</template>

<script>
import flip from './Flip'
// 速度、红包数量、密度

const repackWarConfig = {
  count: 10, // 掉落红包数量
  speed: 1, // y轴位移
  maxSize: 30, // 最大尺寸
  minSize: 100, // 最小尺寸
}
export default {
  props: {
    count: {
      type: Number,
      default: 10 // 掉落红包数量
    },
    minSize: {
      type: Number,
      default: 30
    },
    maxSize: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      bDisplay: false
    }
  },
  components: {
    flip
  },
  methods: {
    repackClick() {
      this.bDisplay = true
      this.$refs.flipEffect.animationSwitching('running')
      setTimeout(() => {
        this.bDisplay = false
      }, 2000)
    },
    getClass () {
      return `hb-item hbsd-${Math.floor(Math.random() * 50 + 30)}`
    },
    getStyle () {
      return `width:${Math.random() * (this.maxSize - this.minSize) + this.minSize}px;left:${Math.random() * 70+ 10}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.red-package-contain{
  .hb-item{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    cursor: pointer;
  }
  /////////////////////////////////
  @keyframes startHB {
    0% {
      transform: translateY(-300px);
      -ms-transform:translateY(-300px);
      -webkit-transform:translateY(-300px);
    }
    100% {
      transform: translateY(100vh);
      -ms-transform:translateY(100vh);
      -webkit-transform:translateY(100vh);
    }
  }
  // 横向变化
  // @keyframes chandou{
  //     0%{margin-left:-120px}
  //     50%{margin-left:0px}
  //     100%{margin-left:120px}
  // }

  $total: 100;
  $transitionVal: 20;
  @for $i from 1 through $total {
    // 倾斜
    // .hbsd-#{$i}{
    //     animation: startHB #{$i/$transitionVal}s linear infinite,chandou #{$i/20}s infinite linear alternate both;
    //     -ms-animation:startHB #{$i/$transitionVal}s linear infinite,chandou #{$i/20}s infinite linear alternate both;
    //     -webkit-animation:startHB #{$i/$transitionVal}s linear infinite,chandou #{$i/20}s infinite linear alternate both;
    //   }
    // 垂直
    .hbsd-#{$i}{
        animation: startHB #{$i/$transitionVal}s linear infinite;
        -ms-animation:startHB #{$i/$transitionVal}s linear infinite;
        -webkit-animation:startHB #{$i/$transitionVal}s linear infinite;
      }
  }
  /////////////////////////////////
}
  
</style>

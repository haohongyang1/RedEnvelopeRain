<template>
  <div class="red-package-contain">
    <img id="source" @load="imgloaded" src="../assets/hongbao.png" style="display:none">
    <canvas id="canvas" :width="innerWidth" :height="innerHeight" @click="listenClick"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      innerWidth: 1000,
      innerHeight: 600,
      offsetTop: 0,
      offsetLeft: 0,
      aRedEnvelope: [], // 存储需要掉落的图片信息
      context: '' // 定义canvas上下文对象
    }
  },
  mounted () {
  },
  methods: {
    initCanvas (oItemFrame) {
      const canvas = document.getElementById('canvas')
      this.offsetTop = canvas.offsetTop
      this.offsetLeft = canvas.offsetLeft
      // 浏览器是否支持canvas
      if (canvas.getContext) {
        this.context = canvas.getContext('2d')
        this.drawImage()
        this.moveCoins()
      }
    },
    listenClick(e) {
      // 点击位置
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      this.aRedEnvelope.forEach((coin, index) => {
        // 判断点击位置是否在该金币范围内
        if (this.isIntersect(pos, coin)) {
          this.repackClick()
        }
      })
    },
    repackClick() {
      console.log('点击红包canvas' + this.numClick)
    },
    // 判断点击位置  是否处于某个coin之中
    isIntersect(point, coin) {
      const distanceX = point.x - (coin.x + this.offsetLeft);
      const distanceY = point.y - (coin.y + this.offsetTop);
      const withinX = distanceX > 0 && distanceX < coin.width;
      const withinY = distanceY > 0 && distanceY < coin.height;
      return withinX && withinY;
    },
    drawImage() {
      this.aRedEnvelope.forEach((oItemFrame, index) => {
        const newFrame = {
          x: oItemFrame.x,
          // 运动的关键  每次只有y不一样
          y: oItemFrame.y + oItemFrame.speed,
          width: oItemFrame.width,
          height: oItemFrame.height,
          img: oItemFrame.img,
          speed: oItemFrame.speed
        };
        this.aRedEnvelope.splice(index, 1, newFrame);
        // 绘制一帧动画,参数：绘制到上下文的元素，左上角的x，左上角的y，宽度，高度，
        this.context.drawImage(
          oItemFrame.img,
          oItemFrame.x,
          oItemFrame.y,
          oItemFrame.width,
          oItemFrame.height
        )
      })
    },
    imgloaded () {
      let img = document.getElementById('source')
      this.aRedEnvelope = [
          {
            x: 100, // 初始位置
            y: 10, // 运动的关键是在每一帧都改变y
            width: 50, // 初始化宽度
            height: 70, // 初始化高度
            img: img, // 绑定img
            speed: 3 // 掉落速度
          }
      ]      
      this.initCanvas(this.aRedEnvelope[0])      
    },
    moveCoins () {
      this.context.clearRect(0, 0, this.innerWidth, this.innerHeight);
      this.drawImage()
      // 要求浏览器在下次重绘之前调用制定的毁掉函数，下一次重绘之前更新动画帧的函数
      window.requestAnimationFrame(this.moveCoins);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

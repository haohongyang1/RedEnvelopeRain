<template>
  <div class="red-package-contain">
    <img id="source" width="20" height="30" style="display:none" src="../assets/hongbao.png">
    <canvas id="canvas" :width="innerWidth" :height="innerHeight" @click="listenClick"></canvas>
    <div v-show="bDisplay" class="suspension-layer">
      <flip ref="flipEffect"></flip>
    </div>
  </div>
</template>

<script>
import flip from './Flip'
const Coin = {
  x: 'x轴位置',
  y: 'y轴位置', // 运动的关键是在每一帧都改变y
  width: '红包宽度',
  height: '红包高度',
  img: '前面缓存好的金币图片',
  speed: '金币的下落速度',
  minSize: 30,
  maxSize: 100,
}

export default {
  data () {
    return {
      bDisplay: false,
      ctx: '',
      imgArr: ['../assets/hongbao.png'],
      runCountdownTimer: '',
      addCoinsTimer: '',
      moveCoinAnimation: '',
      coinObjs: [],
      preloaded: false,
      coinArr: [],
      innerWidth: 1000,
      innerHeight: 800,
      minSize: 30,
      maxSize: 100,
      offsetTop: 0,
      offsetLeft: 0,
      numClick: 0
    }
  },
  components: {
    flip
  },
  mounted () {
    const img = document.getElementById('source')
    this.coinArr = [
        {
          x: 100,
          y: 10, // 运动的关键是在每一帧都改变y
          width: 50,
          height: 70,
          img: img,
          speed: 7
        },
        {
          x: 100,
          y: 10, // 运动的关键是在每一帧都改变y
          width: 50,
          height: 70,
          img: img,
          speed: 6
        },
        {
          x: 100,
          y: 10, // 运动的关键是在每一帧都改变y
          width: 50,
          height: 70,
          img: img,
          speed: 5
        }
    ]

    this.initCanvas()
    this.start()
  },
  methods: {
    // 缓存几种金币图片为DOM元素，避免canvas绘制时还需要异步读取图片
    loadImgs(arr) {
      return new Promise(resolve => {
        let count = 0;
        // 循环图片数组，每张图片都生成一个新的图片对象
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          // 创建图片对象
          const image = new Image();
          // 成功的异步回调
          image.onload = () => {
            count++;
            arr.splice(i, 1, {
              // 加载完的图片对象都缓存在这里了，canvas可以直接绘制
              img: image
              // 这里可以直接生成并缓存离屏canvas，用于优化性能，但本次不用，只是举个例子
              // offScreenCanvas: this.createOffScreenCanvas(image)
            });
            // 这里说明 整个图片数组arr里面的图片全都加载好了
            if (count == len) {
              this.preloaded = true;
              resolve();
            }
          };
          image.src = arr[i].img;
        }
      })
    },
    initCanvas() {
      const canvas = document.getElementById("canvas");
      this.offsetTop = canvas.offsetTop
      this.offsetLeft = canvas.offsetLeft
      if (canvas.getContext) {
        this.ctx = canvas.getContext("2d");
        // 初始化时同步进行图片预加载
        this.loadImgs(this.imgArr);
      }
    },
    drawCoins() {
      // 遍历这个金币对象数组
      this.coinArr.forEach((coin, index) => {
        const newCoin = {
          x: coin.x,
          // 运动的关键  每次只有y不一样
          y: coin.y + coin.speed,
          width: coin.width,
          height: coin.height,
          img: coin.img,
          speed: coin.speed
        };
        // debugger
        // 绘制某个金币对象时，也同时生成一个新的金币对象，替换掉原来的它，唯一的区别就是它的y变了，下一帧绘制这个金币时，就运动了一点点距离
        this.coinArr.splice(index, 1, newCoin);
        this.ctx.drawImage(
          coin.img,
          coin.x,
          coin.y,
          coin.width,
          coin.height
        );
      });
    },
    moveCoins() {
      // 清空canvas
      this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
      // 绘制新的一帧动画
      this.drawCoins();
      // 不断执行绘制，形成动画，requestAnimationFrame:要求浏览器在下次重绘之前调用指定的回调函数更新动画
      this.moveCoinAnimation = window.requestAnimationFrame(this.moveCoins);
    },
    calculatePos(num) {
      return num
    },
    pushCoins() {
      // 每次随机生成1~3个金币
      // const random = this.randomRound(3, 6);
      const random = 3;
      let arr = [];
      for (let i = 0; i < random; i++) {
        // 创建新的金币对象
        let itemWidth = Math.random() * (this.maxSize - this.minSize) + this.minSize
        const newCoin = {
          x: Math.random(
            this.calculatePos(10),
            this.innerWidth - this.calculatePos(300)
          ) * 1000, // 横向随机  金币不要贴近边边
          y: 0 - this.calculatePos(Math.random() * 150), // -150内高度 随机
          width: itemWidth, // 100宽  大小浮动15
          height: itemWidth * 1.4,
          img: this.coinArr[i].img, // 随机取一个金币图片对象，这几个图片对象在页面初始化时就已经缓存好了
          speed: this.coinArr[i].speed // 下落速度 随机
        };
        arr.push(newCoin);
      }
      // 每次都插入一批新金币对象arr到运动的金币数组this.coinArr
      this.coinArr = [...this.coinArr, ...arr];
      // 间隔多久生成一批金币
      this.addCoinsTimer = setTimeout(() => {
        this.pushCoins();
      }, 1000);
    },
    start() {
      this.pushCoins(); // 不断增加金币
      this.moveCoins(); // 金币开始运动
      // 开始10秒倒计时
      this.runCountdownTimer = setInterval(() => {
      //...倒计时10s后，做一些停止动画的工作
      }, 1000);
    },

    // 判断点击位置  是否处于某个coin之中
    isIntersect(point, coin) {
      const distanceX = point.x - (coin.x+this.offsetLeft);
      const distanceY = point.y - (coin.y+this.offsetTop);
      const withinX = distanceX > 0 && distanceX < coin.width;
      const withinY = distanceY > 0 && distanceY < coin.height;
      return withinX && withinY;
    },
    repackClick() {
      this.numClick++ 
      this.bDisplay = true
      this.$refs.flipEffect.animationSwitching('running')
      setTimeout(() => {
        this.bDisplay = false
      }, 2000)

      console.log('点击红包canvas' + this.numClick)
    },
    listenClick(e) {
      // 点击位置
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      this.coinArr.forEach((coin, index) => {
        // 判断点击位置是否在该金币范围内
        if (this.isIntersect(pos, coin)) {
          this.repackClick()
        }
      })
    },
    drawBubble() {
      this.bubbleArr.forEach((ele, index) => {
        if (ele.opacity > 0) {
          // 透明度渐变
          this.ctxBubble.globalAlpha = ele.opacity;
          this.ctxBubble.drawImage(
            this.bubbleImage,
            ele.x,
            ele.y,
            this.calculatePos(60),
            this.calculatePos(60)
          );
          // 更新：每次画完就减少0.02透明度，同时位置移动
          const newEle = {
            x: ele.x + this.calculatePos(1),
            y: ele.y - this.calculatePos(2),
            opacity: ele.opacity - 0.02
          };
          this.bubbleArr.splice(index, 1, newEle);
        }
      });
    },
    keepDrawBubble() {
      this.ctxBubble.clearRect(0, 0, this.innerWidth, this.innerHeight);
      // 把opacity为0的全部清除
      this.bubbleArr.forEach((ele, index) => {
        if (ele.opacity < 0) {
          this.bubbleArr.splice(index, 1);
        }
      });
      this.drawBubble();
      this.bubbleAnimation = window.requestAnimationFrame(this.keepDrawBubble);
    }
}
}

</script>

<style scoped>
.suspension-layer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 2000;
}
</style>

<template>
  <div id="container" class="flip-container">
    <div id="box" class="flip-box" onselectstart='return false' :draggable="false">
      <!-- 把该元素宽高固定，避免导致重绘 -->
      <span id="back" class="flip-item flip-item-back">
        <img id="source" src="../assets/repackBack.jpg" />
      </span>
      <span id="front" class="flip-item flip-item-front">
        <img id="source" src="../assets/repackFront.jpg" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      box: null,
      back: null,
      front: null,
      container: null,
      dollarTextStyle: 'hidden',
      sTitleText: '',
      sMountText: ''
    }
  },
  mounted() {
    this.container = document.getElementById('container')
    this.box = document.getElementById('box')
    this.back = document.getElementById('back')
    this.front = document.getElementById('front')
    this.front.addEventListener('animationiteration', (e) => {
      this.animationSwitching('paused')
    }, false)
    // 子组件进入后先把 动画停掉，隐藏
    this.animationSwitching('paused')
  },
  methods: {
		// 控制翻转红包特效的展示和隐藏、暂停和继续
    animationSwitching(type) {
      this.container.style =
        type === 'paused' ? 'visibility: hidden;' : 'visibility: visible;'
      this.box.style.webkitAnimationPlayState = type
      this.back.style.webkitAnimationPlayState = type
      this.front.style.webkitAnimationPlayState = type
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 2000;
  transform: translate3d(0, 0, 0);
  background:rgba(0,0,0,0.65);
  height: 100%;
  .flip-box {
    position: relative;
    top: 30%;
    overflow: hidden;
    animation: rotate infinite 2s linear; // box从左边飞到右边特效2s
    .flip-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 333px;
      height: 339px;
      transition: all 0.5s ease-in-out;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .flip-item-front {
      user-select:none;
      animation: front infinite 2s ease-in-out;
    }

    .flip-item-back {
      user-select:none;
      animation: back infinite 2s ease-in-out;
    }
  }
}

@keyframes front {
  0% {
    transform: rotateY(0deg);
    z-index: 1002;
  }

  30% {
    z-index: 1001;
    transform: rotateY(180deg);
  }

  70% {
    z-index: 1001;
    transform: rotateY(180deg);
  }

  80% {
    transform: rotateY(0deg);
    z-index: 1002;
  }

  100% {
    transform: rotateY(0deg);
    z-index: 1002;
  }
}

@keyframes back {
  0% {
    transform: rotateY(180deg);
    z-index: 1001;
  }

  30% {
    z-index: 1002;
    transform: rotateY(0deg);
  }

  70% {
    z-index: 1002;
    transform: rotateY(0deg);
  }

  80% {
    transform: rotateY(180deg);
    z-index: 1001;
  }

  100% {
    transform: rotateY(180deg);
    z-index: 1001;
  }
}

@keyframes rotate {
// 由于 animationiteration event 会在第1帧来执行，这里设置opacity来解决最后闪过第一帧的问题
  0% {
    left: 40%;
    width: 333px;
    height: 339px;
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 0deg);
    opacity: 0;
  }

  15% {
    left: 40%;
    width: 333px;
    height: 339px;
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 0deg);
    opacity: 1;
  }

  80% {
    left: 40%;
    width: 333px;
    height: 339px;
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 0deg);
    opacity: 1;
  }

  85% {
    left: 70%;
    width: 150px;
    height: 200px;
    transform: rotate3d(0, 0, 1, 360deg);
    opacity: 1;
  }

  90% {
    left: 100%;
    width: 50px;
    height: 100px;
    transform: rotate3d(0, 0, 1, 360deg);
    opacity: 1;
  }

  100% {
    left: 100%;
    width: 50px;
    height: 100px;
    transform: rotate3d(0, 0, 1, 360deg);
    opacity: 1;
  }
}
</style>
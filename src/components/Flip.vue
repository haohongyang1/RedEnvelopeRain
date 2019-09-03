<template>
  <div class="flip">
    <div class="flip-box">
      <span target="_blank" class="flip-item flip-item-front">
        <img id="source" @click="flipImage" src="../assets/repackFront.jpg">
      </span>

      <span target="_blank" class="flip-item flip-item-back">
        <img id="source" @click="flipImage" src="../assets/repackBack.jpg">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    flipImage() {

    }
  }
}
</script>

<style scoped>
.flip {
	position: relative;
	transform:translate3d(0,0,0);
	height: 100%;
}
.flip-box {
	position:relative;
	left: 40%;
	top: 30%;
	width:300px;
	height:450px;
	overflow:hidden;
}
.flip-item {
	position:absolute;
	left:0;
	top:0;
	width:100%;
	height:100%;
	transition:all .5s ease-in-out;
	transform-style:preserve-3d;
	backface-visibility:hidden;
	border:1px solid #ddd;
	box-sizing:border-box;
}
.flip-item img {
	width:100%;
	height:100%;
	display:block;
}
.flip-item-text {
	position:absolute;
	bottom:8px;
	left:0;
	width:100%;
	text-align:center;
	color:#fff;
}
.flip-item-front {
	transform:rotateY(0deg);
	z-index:2;
	animation: front infinite 1.5s ease-in-out;
}
.flip-item-back {
	transform:rotateY(180deg);
	z-index:1;
	animation: back infinite 1.5s ease-in-out;
}
/* .flip-box:hover .flip-item-front {
	z-index:1;
	transform:rotateY(180deg);
}
.flip-box:hover .flip-item-back {
	z-index:2;
	transform:rotateY(0deg);
} */
.flip-box {
	transform:translate3d(0,0,0);
	animation:rotate infinite 2s linear;
}
@keyframes front {
	0% {
		transform:rotateY(0deg);
		z-index:2;
	}
	30% {
		z-index:1;
		transform:rotateY(180deg);
	}
	80% {
		z-index:1;
		transform:rotateY(180deg);
	}	
	100% {
		transform:rotateY(0deg);
		z-index:2;
	}
}
@keyframes back {
	0% {
		transform:rotateY(180deg);
		z-index:1;
	}
	30% {
		z-index:2;
		transform:rotateY(0deg);
	}
	80% {
		z-index:2;
		transform:rotateY(0deg);
	}
	100% {
		transform:rotateY(180deg);
		z-index:1;
	}
}
@keyframes rotate {
	0% {
		left: 40%;
		width:300px;
		height:450px;
		transform-origin:center;
		transform:rotate3d(0,0,1,0deg);
	}
	80% {
		left: 40%;
		width:300px;
		height:450px;
		transform-origin:center;
		transform:rotate3d(0,0,1,0deg);
	}
	90% {
		left: 70%;
		width:150px;
		height:200px;
		transform:rotate3d(0,0,1,360deg);
	}
	100% {
		left: 80%;
		width:50px;
		height:100px;
		transform:rotate3d(0,0,1,360deg);
	}
}

</style>

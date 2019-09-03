<template>
  <div id="trackBlock" class="track-block track-block-old" :class="{'track-block-new':flag}">
  </div>
</template>

<script>
export default {
  data () {
    return {
			flag: false
    }
  },
  mounted () {
		let trackBlock = document.getElementById('trackBlock')
		let frames = this.findKeyframesRule()
		console.log(frames.cssRules)
		console.log(frames.ownerRule)
		// debugger
		// console.log(frames.deleteRule('100%'))
		// console.log(frames.appendRule(`100% {
		// 			left: 10px;
		// 			top: 100px;
		// 		}`))
		window.addEventListener('click', function (e) {
			const pos = {
				x: e.clientX,
				y: e.clientY
			}
			frames.deleteRule('100%')
			frames.appendRule(`100% {
					left: ${pos.x}px;
					top: ${pos.y}px;
				}`)
				// debugger
			// let newStartX = trackBlock.getBoundingClientRect().left
			// let newStartY = trackBlock.getBoundingClientRect().top
			// trackBlock.style.innerHtml = 
			// `@keyframes clickTrackNew {
			// 	0% {
			// 		left: ${newStartX};
			// 		top: ${newStartY};
			// 	}
			// 	100% {
			// 		left: ${pos.x};
			// 		top: ${pos.y};
			// 	}
			// }`
			// this.flag = true
		})
  },
  methods: {
		findKeyframesRule(){
			let docuStyList = document.styleSheets
			for (let styleIndex = 0; styleIndex < docuStyList.length; styleIndex++) {
				let styleItem = docuStyList[styleIndex].cssRules
				for (let cssIndex = 0; cssIndex < styleItem.length; cssIndex++) {
					let cssItem = styleItem[cssIndex]
					if (cssItem.type === 7) {
						return cssItem
					}
				}
			}
		}
	}
}
</script>

<style scoped>
.track-block {
	position: absolute;
	left: 0;
	top: 0;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: red;
}
.track-block-old{
	animation: clickTrack infinite 5s;
}
.track-block-new{
	animation: clickTrackNew infinite 5s;
}
@keyframes clickTrack {
	0% {
		left: 50%;
		top: 0;
	}
	100% {
		left: 50%;
		top: 95%;
	}
}

</style>

<template>
	<div class="mvi-rich-image" @mousewheel="scaleImageByWheel" @touchstart="scaleImageByTouch(0, $event)" @touchmove="scaleImageByTouch(1, $event)" @touchend="scaleImageByTouch(2, $event)" @mousedown="judgeClose(0, $event)" @mouseup="judgeClose(1, $event)" @click="closePreview">
		<Image ref="img" fit="response" @mousedown="imageMouseDown" :style="imgStyle" width="100%" height="100%" :src="src" :load-icon="loadIcon" :error-icon="errorIcon"></Image>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import Dap from 'dap-util'
import { Image } from '../image'
export default {
	name: 'm-rich-image',
	data() {
		return {
			//是否双指触摸
			isDoubleTouch: false,
			//双指触点距离
			touchDistance: 0,
			//缩放比例
			scale: 1,
			//水平偏移值
			translateX: 0,
			//垂直偏移值
			translateY: 0,
			//鼠标在图片上按下时的横坐标
			startX: 0,
			//鼠标在图片上按下时的纵坐标
			startY: 0,
			//图片是否可以移动
			canMove: false,
			//鼠标按下坐标点
			downPoint: null,
			//鼠标松开坐标点
			upPoint: null,
			//触摸松开时是否触发了双指操作
			isTriggerDouble: false,
			//双指松开设置的延时器
			timer: null,
			//旋转值
			rotate: 0
		}
	},
	props: {
		//图片地址
		src: {
			type: String,
			default: ''
		},
		//加载图标
		loadIcon: {
			type: [String, Object],
			default: null
		},
		//失败图标
		errorIcon: {
			type: [String, Object],
			default: null
		},
		//最大缩放值
		maxScale: {
			type: Number,
			default: 3
		},
		//最小缩放值
		minScale: {
			type: Number,
			default: 0.3
		}
	},
	emits: ['close-preview', 'disable-swiper-touch', 'enable-swiper-touch'],
	components: {
		Image
	},
	computed: {
		//图片样式
		imgStyle() {
			return {
				transform: `scale(${this.scale}) translate(${this.translateX}px,${this.translateY}px) rotate(${this.rotate}deg)`
			}
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		Dap.event.on(document.documentElement, `mousemove.richImage_${this.uid}`, this.imageMouseMove)
		Dap.event.on(document.documentElement, `mouseup.richImage_${this.uid}`, this.imageMouseUp)
	},
	methods: {
		//左旋转图片
		leftRotate() {
			this.translateX = 0
			this.translateY = 0
			this.scale = 1
			this.rotate -= 90
		},
		//右旋转图片
		rightRotate() {
			this.translateX = 0
			this.translateY = 0
			this.scale = 1
			this.rotate += 90
		},
		//放大图片
		scalePlus() {
			if (this.scale < this.maxScale) {
				this.translateX = 0
				this.translateY = 0
				this.scale = Dap.number.add(this.scale, 0.1)
			}
		},
		//缩小图片
		scaleMinus() {
			if (this.scale > this.minScale) {
				this.translateX = 0
				this.translateY = 0
				this.scale = Dap.number.subtract(this.scale, 0.1)
			}
		},
		//滚轮缩放图片
		scaleImageByWheel(event) {
			if (event.cancelable) {
				event.preventDefault()
			}
			//正值放大，负值缩小
			let deltaY = event.wheelDeltaY || -event.deltaY
			//放大图片
			if (deltaY > 0) {
				this.scalePlus()
			}
			//缩小图片
			else {
				this.scaleMinus()
			}
		},
		//双指缩放图片
		scaleImageByTouch(type, event) {
			//触摸开始
			if (type == 0) {
				this.isTriggerDouble = false
				if (event.touches.length == 2) {
					this.disableSwiperTouch()
					this.isDoubleTouch = true
					this.canMove = false //单指会在双指之前触发，所以再次改为false
					this.touchDistance = this.getDistance(event.touches[0], event.touches[1])
				} else {
					this.isDoubleTouch = false
					//大于1可以平移
					if (this.scale > 1) {
						this.disableSwiperTouch()
						this.startX = event.targetTouches[0].pageX
						this.startY = event.targetTouches[0].pageY
						this.canMove = true
					}
				}
			}
			//触摸移动
			else if (type == 1) {
				if (event.touches.length == 2 && this.isDoubleTouch) {
					if (event.cancelable) {
						event.preventDefault()
					}
					let distance = this.getDistance(event.touches[0], event.touches[1])
					//缩小
					if (distance < this.touchDistance) {
						if (this.scale > this.minScale) {
							this.translateX = 0
							this.translateY = 0
							this.scale = Dap.number.add(this.scale, Dap.number.divide(Dap.number.subtract(distance, this.touchDistance), this.$el.offsetWidth))
						}
					}
					//放大
					else {
						if (this.scale < this.maxScale) {
							this.translateX = 0
							this.translateY = 0
							this.scale = Dap.number.add(this.scale, Dap.number.divide(Dap.number.subtract(distance, this.touchDistance), this.$el.offsetWidth))
						}
					}
					this.touchDistance = distance
				} else {
					if (event.cancelable) {
						event.preventDefault()
					}
					let endX = event.targetTouches[0].pageX
					let endY = event.targetTouches[0].pageY
					if (this.canMove) {
						this.imageTranslate(endX, endY)
					}
				}
			}
			//触摸结束
			else if (type == 2) {
				//双指松开
				if (this.isDoubleTouch) {
					//如果是缩小了，那么恢复正常大小
					if (this.scale < 1) {
						this.doTransition(() => {
							this.scale = 1
						})
					}
					this.isTriggerDouble = true
					this.isDoubleTouch = false
					this.enableSwiperTouch()
				}
				//单指松开
				else {
					if (this.canMove && !this.isTriggerDouble) {
						this.imageTranslateEnd()
					}
				}
			}
		},
		//获取两点间距离
		getDistance(p1, p2) {
			let x = p2.pageX - p1.pageX
			let y = p2.pageY - p1.pageY
			return Math.sqrt(x * x + y * y)
		},
		//重置
		reset() {
			this.scale = 1
			this.translateX = 0
			this.translateY = 0
			this.rotate = 0
			this.enableSwiperTouch()
		},
		//判断是否执行关闭操作
		judgeClose(index, event) {
			if (index == 0) {
				this.downPoint = {
					x: event.pageX,
					y: event.pageY
				}
			} else if (index == 1) {
				this.upPoint = {
					x: event.pageX,
					y: event.pageY
				}
			}
		},
		//关闭遮罩层
		closePreview() {
			//关闭
			if (this.downPoint && this.upPoint && this.downPoint.x == this.upPoint.x && this.downPoint.y == this.upPoint.y) {
				this.$emit('close-preview')
			}
		},
		//图片上鼠标按下
		imageMouseDown(event) {
			if (this.scale <= 1) {
				return
			}
			this.disableSwiperTouch()
			this.startX = event.pageX
			this.startY = event.pageY
			this.canMove = true
		},
		//图片上鼠标移动
		imageMouseMove(event) {
			if (event.cancelable) {
				event.preventDefault()
			}
			let endX = event.pageX
			let endY = event.pageY
			if (this.canMove) {
				this.imageTranslate(endX, endY)
			}
		},
		//图片上鼠标松开
		imageMouseUp(event) {
			if (this.canMove) {
				this.imageTranslateEnd()
			}
		},
		//动画偏移
		doTransition(callback) {
			this.$refs.img.$el.style.transition = 'transform 300ms'
			this.$refs.img.$el.style.webkitTransition = 'transform 300ms'
			this.$refs.img.$el.offsetWidth
			callback()
			setTimeout(() => {
				this.$refs.img.$el.style.transition = ''
				this.$refs.img.$el.style.webkitTransition = ''
				this.$refs.img.$el.offsetWidth
			}, 300)
		},
		//图片平移函数
		imageTranslate(endX, endY) {
			let moveX = Dap.number.divide(endX - this.startX, 2)
			let moveY = Dap.number.divide(endY - this.startY, 2)
			const placement = Dap.element.getElementBounding(this.$refs.img.$el)
			if (moveX > 0 && placement.left >= 0) {
				return
			}
			if (moveX < 0 && placement.right >= 0) {
				return
			}
			if (moveY > 0 && placement.top >= 0) {
				return
			}
			if (moveY < 0 && placement.bottom >= 0) {
				return
			}
			this.translateX = this.translateX + moveX
			this.translateY = this.translateY + moveY
			this.startX = endX
			this.startY = endY
		},
		//图片平移结束函数
		imageTranslateEnd() {
			const placement = Dap.element.getElementBounding(this.$refs.img.$el)
			if (placement.left > 0) {
				this.doTransition(() => {
					this.translateX = this.translateX - placement.left
				})
			}
			if (placement.top > 0) {
				this.doTransition(() => {
					this.translateY = this.translateY - placement.top
				})
			}
			if (placement.right > 0) {
				this.doTransition(() => {
					this.translateX = this.translateX + placement.right
				})
			}
			if (placement.bottom > 0) {
				this.doTransition(() => {
					this.translateY = this.translateY + placement.bottom
				})
			}
			this.canMove = false
			this.enableSwiperTouch()
		},
		//禁用轮播图触摸滑动
		disableSwiperTouch() {
			clearTimeout(this.timer)
			this.$emit('disable-swiper-touch')
		},
		//启用轮播图触摸滑动
		enableSwiperTouch() {
			this.timer = setTimeout(() => {
				this.$emit('enable-swiper-touch')
			}, 100)
		}
	},
	beforeUnmount() {
		Dap.event.off(document.documentElement, `mousemove.richImage_${this.uid} mouseup.richImage_${this.uid}`)
	}
}
</script>

<style lang="less" scoped>
.mvi-rich-image {
	display: block;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}
</style>

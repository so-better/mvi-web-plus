<template>
	<canvas class="mvi-sign" @mousedown="canvasMouseDown" @touchstart="canvasTouchStart" @touchmove="canvasTouchMove" @touchend="canvasTouchEnd" @mouseleave="canvasMouseLeave" @mouseenter="canvasMouseEnter" />
</template>

<script>
import Dap from 'dap-util'
import { getCurrentInstance } from 'vue'
export default {
	name: 'm-sign',
	props: {
		//签名颜色
		color: {
			type: String,
			default: '#505050'
		},
		//背景色
		background: {
			type: String,
			default: '#fff'
		},
		//字体粗细 px值
		width: {
			type: Number,
			default: 0.05
		}
	},
	data() {
		return {
			//是否正在签名
			drawing: false,
			//鼠标是否在canvas中
			inCanvas: false
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		this.init()
	},
	watch: {
		//背景色改变，则清除一次画布
		background() {
			this.clear()
		}
	},
	methods: {
		//初始化
		init() {
			this.$el.setAttribute('width', Dap.element.getCssStyle(this.$el, 'width'))
			this.$el.setAttribute('height', Dap.element.getCssStyle(this.$el, 'height'))
			this.clear()
			//添加鼠标移动事件
			Dap.event.on(document.documentElement, `mousemove.sign_${this.uid}`, this.canvasMouseMove)
			//添加鼠标松开事件
			Dap.event.on(document.documentElement, `mouseup.sign_${this.uid}`, this.canvasMouseUp)
		},
		//鼠标按下
		canvasMouseDown(e) {
			this.drawing = true
			this.inCanvas = true
			const ctx = this.$el.getContext('2d')
			const rect = Dap.element.getElementBounding(this.$el)
			ctx.beginPath()
			ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top)
		},
		//鼠标移动
		canvasMouseMove(e) {
			if (this.drawing && this.inCanvas) {
				const ctx = this.$el.getContext('2d')
				const rect = Dap.element.getElementBounding(this.$el)
				ctx.lineTo(e.pageX - rect.left, e.pageY - rect.top)
				ctx.strokeStyle = this.color
				ctx.lineWidth = Dap.element.rem2px(this.width)
				ctx.stroke()
			}
		},
		//鼠标松开
		canvasMouseUp(e) {
			this.drawing = false
			const ctx = this.$el.getContext('2d')
			ctx.closePath()
		},
		//鼠标进入canvas区域
		canvasMouseEnter(e) {
			if (this.drawing) {
				this.inCanvas = true
				const ctx = this.$el.getContext('2d')
				const rect = Dap.element.getElementBounding(this.$el)
				ctx.beginPath()
				ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top)
			}
		},
		//鼠标离开canvas区域
		canvasMouseLeave(e) {
			if (this.drawing) {
				const ctx = this.$el.getContext('2d')
				ctx.closePath()
				this.inCanvas = false
			}
		},
		//触摸按下
		canvasTouchStart(e) {
			const ctx = this.$el.getContext('2d')
			const rect = Dap.element.getElementBounding(this.$el)
			ctx.beginPath()
			ctx.moveTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top)
		},
		//触摸移动
		canvasTouchMove(e) {
			if (e.cancelable) {
				e.preventDefault()
			}
			const ctx = this.$el.getContext('2d')
			const rect = Dap.element.getElementBounding(this.$el)
			ctx.lineTo(e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top)
			ctx.strokeStyle = this.color
			ctx.lineWidth = Dap.element.rem2px(this.width)
			ctx.stroke()
		},
		//触摸结束
		canvasTouchEnd(e) {
			const ctx = this.$el.getContext('2d')
			ctx.closePath()
		},
		//api：清除画布
		clear() {
			const ctx = this.$el.getContext('2d')
			ctx.beginPath()
			ctx.clearRect(0, 0, this.$el.width, this.$el.height)
			ctx.rect(0, 0, this.$el.width, this.$el.height)
			ctx.fillStyle = this.background
			ctx.fill()
			ctx.closePath()
		},
		//api：获取图片文件
		getImage() {
			const url = this.$el.toDataURL('image/png')
			return url
		}
	},
	beforeUnmount() {
		//移除添加在documentElement上的鼠标事件
		Dap.event.off(document.documentElement, `mousemove.sign_${this.uid} mouseup.sign_${this.uid}`)
	}
}
</script>

<style lang="less" scoped>
.mvi-sign {
	display: block;
	width: 100%;
	height: 100%;
	user-select: none;

	&:hover {
		cursor: pointer;
	}
}
</style>

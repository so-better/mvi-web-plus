<template>
	<div class="mvi-swipe-cell" @touchstart="cellTouchStart" @touchmove="cellTouchMove" @touchend="cellTouchEnd" :style="cellStyle" :disabled="disabled || null" @mousedown="cellMouseDown">
		<div v-show="leftShow" ref="left" class="mvi-swipe-cell-left">
			<slot name="left"></slot>
		</div>
		<div ref="center" class="mvi-swipe-cell-center" @click="clickCenter">
			<slot></slot>
		</div>
		<div v-show="rightShow" ref="right" class="mvi-swipe-cell-right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
export default {
	name: 'm-swipe-cell',
	data() {
		return {
			startX: 0,
			startX2: 0,
			//transform偏移值
			transformX: 0,
			//左侧是否显示
			leftShow: false,
			//右侧是否显示
			rightShow: false,
			amounts: 0,
			//是否按下鼠标
			mouseDown: false,
			//是否拖动
			isDrag: false
		}
	},
	props: {
		//是否禁用滑动
		disabled: {
			type: Boolean,
			default: false
		},
		//默认点击center部分关闭展开的左右内容
		centerClose: {
			type: Boolean,
			default: true
		}
	},
	emits: ['open', 'close'],
	watch: {
		disabled() {
			this.close(true)
		}
	},
	computed: {
		cellStyle() {
			return {
				transform: `translateX(${this.transformX}px)`
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
		Dap.event.on(document.documentElement, `mousemove.swipeCell_${this.uid}`, this.cellMouseMove)
		Dap.event.on(document.documentElement, `mouseup.swipeCell_${this.uid}`, this.cellMouseUp)
	},
	methods: {
		//触摸开始
		cellTouchStart(event) {
			if (this.disabled) {
				return
			}
			this.startX = event.touches[0].pageX
			this.startX2 = this.startX
			this.amounts = 0
		},
		//触摸移动
		cellTouchMove(event) {
			if (this.disabled) {
				return
			}
			let endX = event.touches[0].pageX
			//每次移动的偏移值
			let moveX = endX - this.startX
			//总偏移值
			let moveX2 = endX - this.startX2
			this.startX = endX
			if (Math.abs(moveX2) <= Dap.element.rem2px(1)) {
				return
			}
			if (event.cancelable) {
				event.preventDefault()
			}
			//右滑，展示左侧内容
			if (moveX2 > 0) {
				if (this.leftShow && this.transformX == this.$refs.left.offsetWidth) {
					return
				}
				this.leftShow = true
				this.$nextTick(() => {
					if (this.transformX >= this.$refs.left.offsetWidth) {
						this.amounts += 8
						this.transformX += moveX / this.amounts
					} else {
						this.transformX += moveX
					}
				})
			}
			//左滑，展示右侧内容
			else if (moveX2 < 0) {
				if (this.rightShow && this.transformX == -this.$refs.right.offsetWidth) {
					return
				}
				this.rightShow = true
				this.$nextTick(() => {
					if (this.transformX <= -this.$refs.right.offsetWidth) {
						this.amounts += 8
						this.transformX += moveX / this.amounts
					} else {
						this.transformX += moveX
					}
				})
			}
		},
		//触摸结束
		cellTouchEnd(event) {
			if (this.disabled) {
				return
			}
			let moveX = event.changedTouches[0].pageX - this.startX2
			if (moveX == 0) {
				return
			}
			//右滑，展示左侧内容
			if (moveX > 0) {
				if (this.transformX > 0) {
					this.open('left')
				} else {
					this.close()
				}
			}
			//左滑，展示右侧内容
			else {
				if (this.transformX < 0) {
					this.open('right')
				} else {
					this.close()
				}
			}
		},
		//鼠标按下
		cellMouseDown(event) {
			if (this.disabled) {
				return
			}
			this.startX = event.pageX
			this.startX2 = this.startX
			this.amounts = 0
			this.mouseDown = true
		},
		//鼠标移动
		cellMouseMove(event) {
			if (this.disabled) {
				return
			}
			if (!this.mouseDown) {
				return
			}
			this.isDrag = true
			let endX = event.pageX
			//每次移动的偏移值
			let moveX = endX - this.startX
			//总偏移值
			let moveX2 = endX - this.startX2
			this.startX = endX
			if (Math.abs(moveX2) <= Dap.element.rem2px(1)) {
				return
			}
			if (event.cancelable) {
				event.preventDefault()
			}
			//右滑，展示左侧内容
			if (moveX2 > 0) {
				if (this.leftShow && this.transformX == this.$refs.left.offsetWidth) {
					return
				}
				this.leftShow = true
				this.$nextTick(() => {
					if (this.transformX >= this.$refs.left.offsetWidth) {
						this.amounts += 3
						this.transformX += moveX / this.amounts
					} else {
						this.transformX += moveX
					}
				})
			}
			//左滑，展示右侧内容
			else if (moveX2 < 0) {
				if (this.rightShow && this.transformX == -this.$refs.right.offsetWidth) {
					return
				}
				this.rightShow = true
				this.$nextTick(() => {
					if (this.transformX <= -this.$refs.right.offsetWidth) {
						this.amounts += 3
						this.transformX += moveX / this.amounts
					} else {
						this.transformX += moveX
					}
				})
			}
		},
		//鼠标松开
		cellMouseUp(event) {
			if (this.disabled) {
				return
			}
			if (!this.mouseDown) {
				return
			}
			this.mouseDown = false
			let moveX = event.pageX - this.startX2
			if (moveX == 0) {
				return
			}
			//右滑，展示左侧内容
			if (moveX > 0) {
				if (this.transformX > 0) {
					this.open('left')
				} else {
					this.close()
				}
			}
			//左滑，展示右侧内容
			else {
				if (this.transformX < 0) {
					this.open('right')
				} else {
					this.close()
				}
			}
			setTimeout(() => {
				this.isDrag = false
			}, 10)
		},
		//设置tranform的方法
		setTransform(transformX) {
			return new Promise((resolve, reject) => {
				this.$el.style.transition = 'transform 300ms'
				this.$el.style.webkitTransition = 'transform 300ms'
				setTimeout(() => {
					this.transformX = transformX
					setTimeout(() => {
						this.$el.style.transition = ''
						this.$el.style.webkitTransition = ''
						resolve()
					}, 300)
				}, 0)
			})
		},
		//打开方法
		open(placement) {
			if (this.disabled) {
				return
			}
			if (placement == 'left') {
				if (!this.leftShow) {
					this.leftShow = true
				}
				this.$nextTick(() => {
					this.setTransform(this.$refs.left.offsetWidth).then(() => {
						this.$emit('open', placement)
					})
				})
			} else if (placement == 'right') {
				if (!this.rightShow) {
					this.rightShow = true
				}
				this.$nextTick(() => {
					this.setTransform(-this.$refs.right.offsetWidth).then(() => {
						this.$emit('open', placement)
					})
				})
			}
		},
		//关闭方法
		close(flag) {
			if (!flag) {
				if (this.disabled) {
					return
				}
			}
			let placement = 'left'
			if (this.transformX == 0) {
				return
			}
			if (this.transformX >= 0) {
				placement = 'left'
			} else {
				placement = 'right'
			}
			this.setTransform(0).then(() => {
				this.leftShow = false
				this.rightShow = false
				this.$emit('close', placement)
			})
		},
		//点击center部分
		clickCenter() {
			if (this.disabled) {
				return
			}
			if (this.isDrag) {
				return
			}
			if (this.centerClose) {
				this.close()
			}
		}
	},
	beforeUnmount() {
		Dap.event.off(document.documentElement, `mousemove.swipeCell_${this.uid} mouseup.swipeCell_${this.uid}`)
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-swipe-cell {
	position: relative;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;

	.mvi-swipe-cell-left,
	.mvi-swipe-cell-right {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		height: 100%;
		top: 0;
	}

	.mvi-swipe-cell-left {
		right: 100%;
	}

	.mvi-swipe-cell-right {
		left: 100%;
	}

	.mvi-swipe-cell-center {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
}
</style>

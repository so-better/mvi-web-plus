<template>
	<div :class="['mvi-swiper-container', vertical ? 'vertical' : '']" :style="containerStyle">
		<div v-if="fade" class="mvi-swiper-fade">
			<slot></slot>
		</div>
		<div v-else class="mvi-swiper-wrapper" ref="wrapper" :style="wrapperStyle" @touchstart="swiperTouchStart" @touchmove="swiperTouchMove" @touchend="swiperTouchEnd" @mousedown="swiperMouseDown">
			<slot></slot>
		</div>
		<slot name="indicators" :active="indicatorsIndex" :total="indicatorsTotal" v-if="$slots.indicators"></slot>
		<div v-else-if="showIndicators" class="mvi-swiper-indicators">
			<template v-for="(item, index) in children">
				<div :class="['mvi-swiper-indicator', isIndicatorActive(index) ? 'active' : '']" :style="indicatorStyle(index)" :key="'indicator-' + index" v-if="indicatorShow(index)" @click="slideTo(fade ? index : loop ? index - 1 : index)"></div>
			</template>
		</div>
		<div class="mvi-swiper-control" v-if="showControl" :style="controlStyle(0)" @click="slidePrev">
			<Icon type="angle-left" />
		</div>
		<div class="mvi-swiper-control" v-if="showControl" :style="controlStyle(1)" @click="slideNext">
			<Icon type="angle-right" />
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-swiper',
	provide() {
		return {
			swiper: this
		}
	},
	emits: ['before-change', 'change'],
	data() {
		return {
			//组件元素
			elm: null,
			//强制更新slideSize的参数
			sizeCounts: 0,
			//slide子元素数组
			children: [],
			//每次更新的触摸点坐标
			start: 0,
			//初始的触摸点坐标
			initStart: 0,
			//平移值
			transform: 0,
			//计时器
			timer: null,
			//每次触摸的总位移量
			totalMove: 0,
			//非fade模式下记录被被激活的序列
			oldIndex: -1,
			//滑动系数
			amounts: 0,
			//是否鼠标按下
			mouseDown: false,
			//fade模式下被激活的序列
			fadeActiveIndex: 0,
			//fade模式下是否使用动画渐变
			useOpacity: true,
			//非fade模式下，是否正在使用api来改变轮播
			apiDoSlide: false
		}
	},
	props: {
		//是否自动轮播
		autoplay: {
			type: Boolean,
			default: false
		},
		//切换速度
		speed: {
			type: Number,
			default: 500
		},
		//自动轮播的时间间隔
		interval: {
			type: Number,
			default: 5000
		},
		//初始轮播索引
		initialSlide: {
			type: Number,
			default: 0
		},
		//轮播宽度
		width: {
			type: String,
			default: null
		},
		//轮播高度
		height: {
			type: String,
			default: null
		},
		//是否循环
		loop: {
			type: Boolean,
			default: false
		},
		//是否显示指示器
		showIndicators: {
			type: Boolean,
			default: false
		},
		//指示器激活时的颜色
		activeColor: {
			type: String,
			default: null
		},
		//指示器未激活的颜色
		inactiveColor: {
			type: String,
			default: null
		},
		//是否为纵向轮播
		vertical: {
			type: Boolean,
			default: false
		},
		//是否可以通过手势滑动
		touchable: {
			type: Boolean,
			default: true
		},
		//是否显示上一张下一张控制器
		showControl: {
			type: Boolean,
			default: false
		},
		//是否使用渐变效果
		fade: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		//指示器样式
		indicatorStyle() {
			return index => {
				let style = {}
				if (this.isIndicatorActive(index)) {
					if (this.activeColor) {
						style.backgroundColor = this.activeColor
					}
				} else {
					if (this.inactiveColor) {
						style.backgroundColor = this.inactiveColor
					}
				}
				return style
			}
		},
		//slide父容器层(非fade)
		wrapperStyle() {
			let style = {}
			if (this.vertical) {
				style.height = 'calc(100% * ' + this.children.length + ')'
				style.transform = 'translateY(' + this.transform + 'px)'
				style.webkitTransform = 'translateY(' + this.transform + 'px)'
			} else {
				style.width = 'calc(100% * ' + this.children.length + ')'
				style.transform = 'translateX(' + this.transform + 'px)'
				style.webkitTransform = 'translateX(' + this.transform + 'px)'
			}
			return style
		},
		//swiper容器层
		containerStyle() {
			let style = {}
			if (this.width) {
				style.width = this.width
			}
			if (this.height) {
				style.height = this.height
			}
			return style
		},
		//slide宽度或者高度(非fade)
		slideSize() {
			//单纯的为了刷新slideSize更新
			const sizeCounts = this.sizeCounts
			let width = 0
			if (this.vertical) {
				//垂直
				if (this.height) {
					//设置了height变量
					if (this.height.includes('rem')) {
						width = Dap.element.rem2px(parseFloat(this.height))
					} else if (this.height.includes('px')) {
						width = parseFloat(this.height)
					} else if (this.elm) {
						width = parseFloat(Dap.element.getCssStyle(this.elm, 'height'))
					}
				} else if (this.elm) {
					width = parseFloat(Dap.element.getCssStyle(this.elm, 'height'))
				}
			} else {
				//水平
				if (this.width) {
					//设置了width变量
					if (this.width.includes('rem')) {
						width = Dap.element.rem2px(parseFloat(this.width))
					} else if (this.width.includes('px')) {
						width = parseFloat(this.width)
					} else if (this.elm) {
						width = parseFloat(Dap.element.getCssStyle(this.elm, 'width'))
					}
				} else if (this.elm) {
					width = parseFloat(Dap.element.getCssStyle(this.elm, 'width'))
				}
			}
			return Number(width.toFixed(2))
		},
		//激活的轮播序列(非fade，数值从0开始，循环模式下包含复制的)
		activeIndex() {
			let index = 0
			if (this.totalMove <= 0) {
				index = this.mathNext(Math.abs(Dap.number.divide(this.transform, this.slideSize)))
			} else {
				index = this.mathPrev(Math.abs(Dap.number.divide(this.transform, this.slideSize)))
			}
			if (index > this.children.length - 1) {
				index = this.children.length - 1
			} else if (index < 0) {
				index = 0
			}
			return index
		},
		//激活的分页器索引(区分slide和fade，数值是从0开始)
		indicatorsIndex() {
			let index = 0
			if (this.fade) {
				index = this.fadeActiveIndex
			} else {
				if (this.loop) {
					if (this.activeIndex == this.children.length - 1) {
						index = 0
					} else if (this.activeIndex == 0) {
						index = this.children.length - 3
					} else {
						index = this.activeIndex - 1
					}
				} else {
					index = this.activeIndex
				}
			}
			return index
		},
		//初始化默认索引(非fade)
		cmpInitalSlide() {
			if (this.loop) {
				if (this.initialSlide < this.children.length - 2) {
					return this.initialSlide + 1
				} else {
					return 1
				}
			} else {
				return this.initialSlide
			}
		},
		//控制器样式
		controlStyle() {
			return index => {
				let style = {}
				//上一张
				if (index == 0) {
					style.left = '0'
					style.right = 'auto'
				}
				//下一张
				else {
					style.left = 'auto'
					style.right = '0'
				}
				return style
			}
		},
		//是否显示具体的每个指示器(区分slide和fade)
		indicatorShow() {
			return index => {
				if (this.fade) {
					return true
				}
				return this.loop ? index != 0 && index != this.children.length - 1 : true
			}
		},
		//分页器总数
		indicatorsTotal() {
			if (this.fade) {
				return this.children.length
			}
			if (this.loop) {
				return this.children.length - 2 > 0 ? this.children.length - 2 : 0
			}
			return this.children.length
		},
		//判断分页器是否激活
		isIndicatorActive() {
			return index => {
				if (this.fade) {
					return this.indicatorsIndex == index
				}
				if (this.loop) {
					return this.indicatorsIndex + 1 == index
				}
				return this.indicatorsIndex == index
			}
		}
	},
	components: {
		Icon
	},
	watch: {
		autoplay() {
			this.setAutoplay()
		},
		initialSlide(newValue) {
			if (this.fade) {
				this.useOpacity = false
				this.fadeActiveIndex = newValue
			} else {
				this.setDefaultSlide()
			}
		}
	},
	created() {
		//fade模式下设置初始化的索引
		if (this.fade) {
			this.fadeActiveIndex = this.initialSlide
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		this.elm = this.$el
		if (this.children.length == 0) {
			return
		}
		if (this.fade) {
			this.setAutoplay()
		} else {
			//处理循环
			if (this.loop && this.children.length > 0) {
				let copy_first = this.children[0].$el.cloneNode(true)
				let copy_last = this.children[this.children.length - 1].$el.cloneNode(true)
				this.$refs.wrapper.append(copy_first)
				this.$refs.wrapper.prepend(copy_last)
				this.children.unshift({
					$el: copy_last
				})
				this.children.push({
					$el: copy_first
				})
			}
			this.setDefaultSlide()
			Dap.event.on(document.documentElement, `mousemove.swiper_${this.uid}`, this.swiperMouseMove)
			Dap.event.on(document.documentElement, `mouseup.swiper_${this.uid}`, this.swiperMouseUp)
		}
		Dap.event.on(window, `resize.swiper_${this.uid}`, this.resizeChange)
	},
	methods: {
		//窗口大小变化时更新swiper
		resizeChange() {
			this.sizeCounts++
			this.transform = -Dap.number.mutiply(this.activeIndex, this.slideSize)
		},
		//设置计时器自动播放
		setAutoplay() {
			if (this.children.length == 0) {
				return
			}
			if (this.autoplay && !this.timer && this.interval > this.speed) {
				this.timer = setInterval(() => {
					this.slideNext()
				}, this.interval)
			} else {
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}
			}
		},
		//触摸开始(非fade)
		swiperTouchStart(event) {
			if (this.children.length == 0) {
				return
			}
			if (!this.touchable) {
				return
			}
			if (this.apiDoSlide) {
				return
			}
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
			this.amounts = 0
			this.totalMove = 0
			if (this.vertical) {
				this.start = event.targetTouches[0].pageY
			} else {
				this.start = event.targetTouches[0].pageX
			}
			this.initStart = this.start
			this.removeTransition()
		},
		//触摸移动(非fade)
		swiperTouchMove(event) {
			if (this.children.length == 0) {
				return
			}
			if (!this.touchable) {
				return
			}
			if (event.cancelable) {
				event.preventDefault()
			}
			let end = 0
			if (this.vertical) {
				end = event.targetTouches[0].pageY
			} else {
				end = event.targetTouches[0].pageX
			}
			let move = end - this.start
			//此次触摸总偏移值
			this.totalMove = end - this.initStart
			//向右滑动或者向下滑动
			if (this.totalMove > 0) {
				if (this.transform >= 0) {
					this.amounts++
					this.transform = Dap.number.add(this.transform, Dap.number.divide(move, this.amounts))
					this.start = end
					return
				}
			}
			//向左滑动或者向上滑动
			else {
				if (this.transform <= -Dap.number.mutiply(this.children.length - 1, this.slideSize)) {
					this.amounts++
					this.transform = Dap.number.add(this.transform, Dap.number.divide(move, this.amounts))
					this.start = end
					return
				}
			}
			this.start = end
			this.transform = Dap.number.add(this.transform, move)
		},
		//触摸结束(非fade)
		swiperTouchEnd(event) {
			if (this.children.length == 0) {
				return
			}
			if (!this.touchable) {
				return
			}
			this.addTransition().then(() => {
				this.transform = -Dap.number.mutiply(this.activeIndex, this.slideSize)
				setTimeout(() => {
					this.slideDone()
				}, this.speed)
			})
		},
		//鼠标按下(非fade)
		swiperMouseDown(event) {
			if (this.children.length == 0) {
				return
			}
			if (!this.touchable) {
				return
			}
			if (this.apiDoSlide) {
				return
			}
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
			this.mouseDown = true
			this.amounts = 0
			this.totalMove = 0
			if (this.vertical) {
				this.start = event.pageY
			} else {
				this.start = event.pageX
			}
			this.initStart = this.start
			this.removeTransition()
		},
		//鼠标移动(非fade)
		swiperMouseMove(event) {
			if (this.children.length == 0) {
				return
			}
			if (!this.touchable) {
				return
			}
			if (!this.mouseDown) {
				return
			}
			if (event.cancelable) {
				event.preventDefault()
			}
			let end = 0
			if (this.vertical) {
				end = event.pageY
			} else {
				end = event.pageX
			}
			let move = end - this.start
			//此次触摸总偏移值
			this.totalMove = end - this.initStart
			//向右滑动或者向下滑动
			if (this.totalMove > 0) {
				if (this.transform >= 0) {
					this.amounts++
					this.transform = Dap.number.add(this.transform, Dap.number.divide(move, this.amounts))
					this.start = end
					return
				}
			}
			//向左滑动或者向上滑动
			else {
				if (this.transform <= -Dap.number.mutiply(this.children.length - 1, this.slideSize)) {
					this.amounts++
					this.transform = Dap.number.add(this.transform, Dap.number.divide(move, this.amounts))
					this.start = end
					return
				}
			}
			this.start = end
			this.transform = Dap.number.add(this.transform, move)
		},
		//鼠标松开(非fade)
		swiperMouseUp(event) {
			if (this.children.length == 0) {
				return
			}
			if (!this.touchable) {
				return
			}
			if (!this.mouseDown) {
				return
			}
			this.mouseDown = false
			this.addTransition().then(() => {
				this.transform = -Dap.number.mutiply(this.activeIndex, this.slideSize)
				setTimeout(() => {
					this.slideDone()
				}, this.speed)
			})
		},
		//设置默认索引(非fade)
		setDefaultSlide() {
			if (this.children.length == 0) {
				return
			}
			if (!this.fade) {
				if (!this.$refs.wrapper) {
					return
				}
				this.removeTransition().then(() => {
					this.transform = -Dap.number.mutiply(this.cmpInitalSlide, this.slideSize)
					this.$nextTick(() => {
						setTimeout(() => {
							if (!this.$refs.wrapper) {
								return
							}
							this.addTransition().then(() => {
								this.oldIndex = this.initialSlide
								this.setAutoplay()
							})
						}, 50)
					})
				})
			}
		},
		//添加动画效果(非fade)
		addTransition() {
			return new Promise((resolve, reject) => {
				this.$refs.wrapper.style.transition = 'transform ' + this.speed + 'ms'
				this.$refs.wrapper.style.webkitTransition = 'transform ' + this.speed + 'ms'
				setTimeout(() => {
					resolve()
				}, 10)
			})
		},
		//移除动画效果(非fade)
		removeTransition() {
			return new Promise((resolve, reject) => {
				this.$refs.wrapper.style.transition = ''
				this.$refs.wrapper.style.webkitTransition = ''
				setTimeout(() => {
					resolve()
				}, 10)
			})
		},
		//滑动后处理(非fade)
		slideDone() {
			return new Promise((resolve, reject) => {
				if (this.loop) {
					//循环模式下如果滑动到最后一张，则跳到第二张
					if (this.transform == -Dap.number.mutiply(this.children.length - 1, this.slideSize)) {
						this.removeTransition().then(() => {
							this.transform = -this.slideSize
							this.$nextTick(() => {
								setTimeout(() => {
									this.addTransition().then(() => {
										if (this.indicatorsIndex != this.oldIndex) {
											this.oldIndex = this.indicatorsIndex
											this.$emit('change', this.indicatorsIndex)
										}
										this.setAutoplay()
										resolve()
									})
								}, 50)
							})
						})
					}
					//循环模式下如果滑动到第一张，则跳到倒数第二张
					else if (this.transform == 0) {
						this.removeTransition().then(() => {
							this.transform = -Dap.number.mutiply(this.children.length - 2, this.slideSize)
							this.$nextTick(() => {
								setTimeout(() => {
									this.addTransition().then(() => {
										if (this.indicatorsIndex != this.oldIndex) {
											this.oldIndex = this.indicatorsIndex
											this.$emit('change', this.indicatorsIndex)
										}
										this.setAutoplay()
										resolve()
									})
								}, 50)
							})
						})
					} else {
						if (this.indicatorsIndex != this.oldIndex) {
							this.oldIndex = this.indicatorsIndex
							this.$emit('change', this.indicatorsIndex)
						}
						this.setAutoplay()
						resolve()
					}
				} else {
					if (this.indicatorsIndex != this.oldIndex) {
						this.oldIndex = this.indicatorsIndex
						this.$emit('change', this.indicatorsIndex)
					}
					this.setAutoplay()
					resolve()
				}
			})
		},
		//+1取整(非fade)
		mathNext(number) {
			const num = Math.floor(number) //取整
			const floor = Dap.number.subtract(number, num) //取小数部分
			if (floor >= 0.25) {
				return num + 1
			} else {
				return num
			}
		},
		//-1取整(非fade)
		mathPrev(number) {
			const num = Math.floor(number) //取整
			const floor = Dap.number.subtract(number, num) //取小数
			if (floor <= 0.75) {
				return num
			} else {
				return num + 1
			}
		},
		//api：跳转指定的slide(区分slide和fade)
		slideTo(index) {
			return new Promise((resolve, reject) => {
				if (this.children.length == 0) {
					resolve()
					return
				}
				if (this.fade) {
					if (index > this.children.length - 1) {
						index = this.children.length - 1
					} else if (index < 0) {
						index = 0
					}
					if (this.fadeActiveIndex != index) {
						this.$emit('before-change', this.fadeActiveIndex)
						this.fadeActiveIndex = index
						if (this.timer) {
							clearInterval(this.timer)
							this.timer = null
						}
						setTimeout(() => {
							this.$emit('change', this.fadeActiveIndex)
							this.setAutoplay()
							resolve()
						}, this.speed)
					} else {
						resolve()
					}
				} else {
					//上N张
					if (this.oldIndex > index) {
						if (this.transform >= 0) {
							resolve()
							return
						}
						this.apiDoSlide = true
						this.$emit('before-change', this.oldIndex)
						if (this.timer) {
							clearInterval(this.timer)
							this.timer = null
						}
						this.addTransition().then(() => {
							this.transform = Dap.number.add(this.transform, Dap.number.mutiply(this.oldIndex - index, this.slideSize))
							setTimeout(() => {
								this.slideDone().then(() => {
									this.apiDoSlide = false
									resolve()
								})
							}, this.speed)
						})
					} else {
						//下N张
						if (this.transform <= -Dap.number.mutiply(this.children.length - 1, this.slideSize)) {
							resolve()
							return
						}
						this.apiDoSlide = true
						this.$emit('before-change', this.oldIndex)
						if (this.timer) {
							clearInterval(this.timer)
							this.timer = null
						}
						this.addTransition().then(() => {
							this.transform = Dap.number.subtract(this.transform, Dap.number.mutiply(index - this.oldIndex, this.slideSize))
							setTimeout(() => {
								this.slideDone().then(() => {
									this.apiDoSlide = false
									resolve()
								})
							}, this.speed)
						})
					}
				}
			})
		},
		//api：跳转到下一个轮播(区分slide和fade)
		slideNext() {
			return new Promise((resolve, reject) => {
				if (this.children.length == 0) {
					resolve()
					return
				}
				if (this.fade) {
					if (this.loop) {
						this.$emit('before-change', this.fadeActiveIndex)
						//最后一个
						if (this.fadeActiveIndex == this.children.length - 1) {
							this.fadeActiveIndex = 0 //变为第一个
						} else {
							this.fadeActiveIndex++
						}
						if (this.timer) {
							clearInterval(this.timer)
							this.timer = null
						}
						setTimeout(() => {
							this.$emit('change', this.fadeActiveIndex)
							this.setAutoplay()
							resolve()
						}, this.speed)
					} else {
						//不是最后一个
						if (this.fadeActiveIndex != this.children.length - 1) {
							this.$emit('before-change', this.fadeActiveIndex)
							this.fadeActiveIndex++
							if (this.timer) {
								clearInterval(this.timer)
								this.timer = null
							}
							setTimeout(() => {
								this.$emit('change', this.fadeActiveIndex)
								this.setAutoplay()
								resolve()
							}, this.speed)
						} else {
							resolve()
						}
					}
				} else {
					if (this.transform <= -Dap.number.mutiply(this.children.length - 1, this.slideSize)) {
						resolve()
						return
					}
					this.apiDoSlide = true
					this.$emit('before-change', this.oldIndex)
					if (this.timer) {
						clearInterval(this.timer)
						this.timer = null
					}
					this.addTransition().then(() => {
						this.transform = Dap.number.subtract(this.transform, this.slideSize)
						setTimeout(() => {
							this.slideDone().then(() => {
								this.apiDoSlide = false
								resolve()
							})
						}, this.speed)
					})
				}
			})
		},
		//api：跳转到上一个轮播(区分slide和fade)
		slidePrev() {
			return new Promise((resolve, reject) => {
				if (this.children.length == 0) {
					resolve()
					return
				}
				if (this.fade) {
					if (this.loop) {
						this.$emit('before-change', this.fadeActiveIndex)
						//第一个
						if (this.fadeActiveIndex == 0) {
							this.fadeActiveIndex = this.children.length - 1 //变为最后一个
						} else {
							this.fadeActiveIndex--
						}
						if (this.timer) {
							clearInterval(this.timer)
							this.timer = null
						}
						setTimeout(() => {
							this.$emit('change', this.fadeActiveIndex)
							this.setAutoplay()
							resolve()
						}, this.speed)
					} else {
						//不是第一个
						if (this.fadeActiveIndex != 0) {
							this.$emit('before-change', this.fadeActiveIndex)
							this.fadeActiveIndex--
							if (this.timer) {
								clearInterval(this.timer)
								this.timer = null
							}
							setTimeout(() => {
								this.$emit('change', this.fadeActiveIndex)
								this.setAutoplay()
								resolve()
							}, this.speed)
						} else {
							resolve()
						}
					}
				} else {
					if (this.transform >= 0) {
						resolve()
						return
					}
					this.apiDoSlide = true
					this.$emit('before-change', this.oldIndex)
					if (this.timer) {
						clearInterval(this.timer)
						this.timer = null
					}
					this.addTransition().then(() => {
						this.transform = Dap.number.add(this.transform, this.slideSize)
						setTimeout(() => {
							this.slideDone().then(() => {
								this.apiDoSlide = false
								resolve()
							})
						}, this.speed)
					})
				}
			})
		}
	},
	beforeUnmount() {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
		//非fade模式下
		if (!this.fade) {
			Dap.event.off(document.documentElement, `mousemove.swiper_${this.uid} mouseup.swiper_${this.uid}`)
		}
		Dap.event.off(window, `resize.swiper_${this.uid}`)
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-swiper-container {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	overflow: hidden;

	.mvi-swiper-fade {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.mvi-swiper-wrapper {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		width: auto;
	}

	.mvi-swiper-indicators {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		position: absolute;
		left: 50%;
		top: auto;
		bottom: @mp-xs;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		z-index: 20;

		.mvi-swiper-indicator {
			display: block;
			width: 0.15rem;
			height: 0.15rem;
			border-radius: @radius-circle;
			background-color: @bg-color-dark;
			margin-right: @mp-xs;
			cursor: pointer;

			&:last-child {
				margin-right: 0;
			}

			&.active {
				background-color: @info-normal;
			}
		}
	}

	&.vertical {
		.mvi-swiper-wrapper {
			width: 100%;
			height: auto;
			flex-direction: column;
			-ms-flex-direction: column;
			-webkit-flex-direction: column;
		}
	}

	.mvi-swiper-control {
		position: absolute;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		border-radius: 0;
		z-index: 20;
		width: 0.8rem;
		height: 0.8rem;
		color: #fff;
		background-color: rgba(10, 20, 30, 0.5);
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		cursor: pointer;

		&:active::before {
			.mvi-active();
		}
	}
}
</style>

<template>
	<teleport to="body">
		<transition :name="animation || 'mvi-layer'" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @leave="leave" @before-leave="beforeLeave" @after-leave="afterLeave">
			<div v-if="firstShow" v-show="layerShow" ref="layer" class="mvi-layer" :style="layerStyle">
				<div :class="wrapperClass" :style="wrapperStyle">
					<Triangle v-if="showTriangle" ref="triangle" class="mvi-layer-triangle" :placement="trianglePlacement" :background="background" :border-color="border && borderColor ? borderColor : background" size="0.14rem"></Triangle>
					<slot></slot>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Triangle } from '../triangle'
export default {
	name: 'm-layer',
	data() {
		return {
			layerShow: false,
			firstShow: false,
			realPlacement: 'bottom'
		}
	},
	emits: ['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'],
	props: {
		//是否显示悬浮层
		modelValue: {
			type: Boolean,
			default: false
		},
		//悬浮层触发元素
		relate: {
			type: String,
			default: null
		},
		//悬浮层相对于触发元素的位置
		placement: {
			type: String,
			default: 'bottom',
			validator(value) {
				return ['top', 'left', 'right', 'bottom', 'top-start', 'top-end', 'left-start', 'left-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end'].includes(value)
			}
		},
		//悬浮层主体距离触发元素的距离
		offset: {
			type: String,
			default: '0.2rem'
		},
		//悬浮层的z-index
		zIndex: {
			type: Number,
			default: null
		},
		//悬浮层的宽度
		width: {
			type: String,
			default: null
		},
		//悬浮层显示与隐藏动画时长
		timeout: {
			type: Number,
			default: 200
		},
		//点击触发元素和悬浮层以外的元素是否关闭悬浮层
		closable: {
			type: Boolean,
			default: false
		},
		//是否显示三角
		showTriangle: {
			type: Boolean,
			default: false
		},
		//自定义动画
		animation: {
			type: String,
			default: null
		},
		//是否显示阴影
		shadow: {
			type: Boolean,
			default: true
		},
		//是否显示边框
		border: {
			type: Boolean,
			default: false
		},
		//边框颜色
		borderColor: {
			type: String,
			default: '#eee'
		},
		//背景色
		background: {
			type: String,
			default: '#fff'
		}
	},
	components: {
		Triangle
	},
	watch: {
		placement() {
			this.update()
		},
		modelValue(newValue) {
			if (newValue) {
				if (!this.firstShow) {
					this.firstShow = true
				}
			}
			this.layerShow = newValue
		}
	},
	computed: {
		//浮层dom
		$$el() {
			return this.$refs.layer
		},
		//三角形位置
		trianglePlacement() {
			if (this.realPlacement == 'bottom-start' || this.realPlacement == 'bottom' || this.realPlacement == 'bottom-end') {
				return 'top'
			} else if (this.realPlacement == 'top-start' || this.realPlacement == 'top' || this.realPlacement == 'top-end') {
				return 'bottom'
			} else if (this.realPlacement == 'left-start' || this.realPlacement == 'left' || this.realPlacement == 'left-end') {
				return 'right'
			} else if (this.realPlacement == 'right-start' || this.realPlacement == 'right' || this.realPlacement == 'right-end') {
				return 'left'
			}
		},
		//主体元素样式类
		wrapperClass() {
			let cls = ['mvi-layer-wrapper']
			if (this.shadow) {
				cls.push('shadow')
			}
			if (this.border) {
				cls.push('border')
			}
			return cls
		},
		//主体元素额外样式
		wrapperStyle() {
			let style = {}
			if (this.border && this.borderColor) {
				style.borderColor = this.borderColor
			}
			if (this.background) {
				style.background = this.background
			}
			if (this.width) {
				style.width = this.width
			}
			return style
		},
		//浮层样式
		layerStyle() {
			let style = {}
			if (Dap.number.isNumber(this.zIndex)) {
				style.zIndex = this.zIndex
			}
			if (this.timeout) {
				style.transition = 'transform ' + this.timeout + 'ms,opacity ' + this.timeout + 'ms'
				style.webkitTransition = 'transform ' + this.timeout + 'ms,opacity ' + this.timeout + 'ms'
			}
			if (!this.showTriangle) {
				style.padding = 0
				if (this.realPlacement == 'bottom-start' || this.realPlacement == 'bottom' || this.realPlacement == 'bottom-end') {
					style.paddingTop = this.offset
				} else if (this.realPlacement == 'top-start' || this.realPlacement == 'top' || this.realPlacement == 'top-end') {
					style.paddingBottom = this.offset
				} else if (this.realPlacement == 'left-start' || this.realPlacement == 'left' || this.realPlacement == 'left-end') {
					style.paddingRight = this.offset
				} else if (this.realPlacement == 'right-start' || this.realPlacement == 'right' || this.realPlacement == 'right-end') {
					style.paddingLeft = this.offset
				}
			}
			return style
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		//初始化时是否显示
		if (this.modelValue) {
			if (!this.firstShow) {
				this.firstShow = true
			}
			this.layerShow = this.modelValue
		}
		//监听滚动
		this.handleScroll()
		//监听窗口变化
		Dap.event.on(window, `resize.layer_${this.uid}`, this.update)
		//监听窗口点击
		Dap.event.on(window, `click.layer_${this.uid}`, event => {
			if (this.layerShow && this.firstShow && this.closable) {
				if (Dap.element.isContains(this.$refs.layer, event.target) || Dap.element.isContains(this.getRelateEl(), event.target)) {
					return
				}
				this.$emit('update:modelValue', false)
			}
		})
	},
	methods: {
		//api：更新浮层位置
		update() {
			if (this.layerShow && this.firstShow) {
				this.autoAdjust()
				this.reset()
				this.$nextTick(() => {
					this.resetTriangle()
				})
			}
		},
		//监听滚动隐藏浮层
		handleScroll() {
			const handleScroll = el => {
				Dap.event.on(el, `scroll.layer_${this.uid}`, () => {
					this.$emit('update:modelValue', false)
				})
				if (el.parentNode) {
					handleScroll(el.parentNode)
				}
			}
			const relate = this.getRelateEl()
			if (relate.parentNode) {
				handleScroll(relate.parentNode)
			}
		},
		//移除上述滚动事件的监听
		removeScroll() {
			const removeScroll = el => {
				Dap.event.off(el, `scroll.layer_${this.uid}`)
				if (el.parentNode) {
					removeScroll(el.parentNode)
				}
			}
			const relate = this.getRelateEl()
			if (relate.parentNode) {
				removeScroll(relate.parentNode)
			}
		},
		//获取绑定的元素
		getRelateEl() {
			if (this.relate) {
				return document.body.querySelector(this.relate)
			}
			return null
		},
		//悬浮层显示位置智能化
		autoAdjust() {
			//获取绑定元素位置
			let $relate = this.getRelateEl()
			let point = Dap.element.getElementBounding($relate)
			this.realPlacement = this.placement
			if (this.placement == 'bottom') {
				//底部距离不够
				if (point.bottom < this.$refs.layer.offsetHeight) {
					//顶部距离够
					if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//左侧距离够
					else if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//右侧距离够
					else if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
				}
				//底部距离够
				else {
					if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'bottom-start'
					}
					if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'bottom-end'
					}
				}
			} else if (this.placement == 'bottom-start') {
				//底部距离不够
				if (point.bottom < this.$refs.layer.offsetHeight) {
					//顶部距离够
					if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top-start'
						if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
							this.realPlacement = 'top'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//左侧距离够
					else if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//右侧距离够
					else if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
				}
				//底部距离够
				else {
					if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
						this.realPlacement = 'bottom'
					}
					if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'bottom-end'
					}
				}
			} else if (this.placement == 'bottom-end') {
				//底部距离不够
				if (point.bottom < this.$refs.layer.offsetHeight) {
					//顶部距离够
					if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top-end'
						if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
							this.realPlacement = 'top'
						}
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
					}
					//左侧距离够
					else if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//右侧距离够
					else if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
				}
				//底部距离够
				else {
					if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
						this.realPlacement = 'bottom'
					}
					if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'bottom-start'
					}
				}
			} else if (this.placement == 'top') {
				//顶部距离不够
				if (point.top < this.$refs.layer.offsetHeight) {
					//底部距离够
					if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
					//左侧距离够
					else if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//右侧距离够
					else if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
				}
				//顶部距离够
				else {
					if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'top-start'
					}
					if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'top-end'
					}
				}
			} else if (this.placement == 'top-start') {
				//顶部距离不够
				if (point.top < this.$refs.layer.offsetHeight) {
					//底部距离够
					if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom-start'
						if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
							this.realPlacement = 'bottom'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
					//左侧距离够
					else if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//右侧距离够
					else if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
				}
				//顶部距离够
				else {
					if (point.right + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
						this.realPlacement = 'top'
					}
					if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'top-end'
					}
				}
			} else if (this.placement == 'top-end') {
				//顶部距离不够
				if (point.top < this.$refs.layer.offsetHeight) {
					//底部距离够
					if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom-end'
						if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
							this.realPlacement = 'bottom'
						}
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
					}
					//左侧距离够
					else if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//右侧距离够
					else if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
				}
				//顶部距离够
				else {
					if (point.left + $relate.offsetWidth < this.$refs.layer.offsetWidth) {
						this.realPlacement = 'top'
					}
					if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
						this.realPlacement = 'top-start'
					}
				}
			} else if (this.placement == 'left') {
				//左侧距离不够
				if (point.left < this.$refs.layer.offsetWidth) {
					//右侧距离够
					if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
					//顶部距离够
					else if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//底部距离够
					else if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
				}
				//左侧距离够
				else {
					if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'left-start'
					}
					if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'left-end'
					}
				}
			} else if (this.placement == 'left-start') {
				//左侧距离不够
				if (point.left < this.$refs.layer.offsetWidth) {
					//右侧距离够
					if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right-start'
						if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
							this.realPlacement = 'right'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-end'
						}
					}
					//顶部距离够
					else if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//底部距离够
					else if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
				}
				//左侧距离够
				else {
					if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
						this.realPlacement = 'left'
					}
					if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'left-end'
					}
				}
			} else if (this.placement == 'left-end') {
				//左侧距离不够
				if (point.left < this.$refs.layer.offsetWidth) {
					//右侧距离够
					if (point.right > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'right-end'
						if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
							this.realPlacement = 'right'
						}
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'right-start'
						}
					}
					//顶部距离够
					else if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//底部距离够
					else if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
				}
				//左侧距离够
				else {
					if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
						this.realPlacement = 'left'
					}
					if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'left-start'
					}
				}
			} else if (this.placement == 'right') {
				//右侧距离不够
				if (point.right < this.$refs.layer.offsetWidth) {
					//左侧距离够
					if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left'
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//顶部距离够
					else if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//底部距离够
					else if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
				}
				//右侧距离够
				else {
					if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'right-start'
					}
					if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'right-end'
					}
				}
			} else if (this.placement == 'right-start') {
				//右侧距离不够
				if (point.right < this.$refs.layer.offsetWidth) {
					//左侧距离足够
					if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left-start'
						if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
							this.realPlacement = 'left'
						}
						if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-end'
						}
					}
					//顶部距离够
					else if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//底部距离够
					else if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
				}
				//右侧距离够
				else {
					if (point.bottom + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
						this.realPlacement = 'right'
					}
					if (point.bottom + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'right-end'
					}
				}
			} else if (this.placement == 'right-end') {
				//右侧距离不够
				if (point.right < this.$refs.layer.offsetWidth) {
					//左侧距离足够
					if (point.left > this.$refs.layer.offsetWidth) {
						this.realPlacement = 'left-end'
						if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
							this.realPlacement = 'left'
						}
						if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
							this.realPlacement = 'left-start'
						}
					}
					//顶部距离够
					else if (point.top > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'top'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'top-end'
						}
					}
					//底部距离够
					else if (point.bottom > this.$refs.layer.offsetHeight) {
						this.realPlacement = 'bottom'
						if (point.left + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-start'
						}
						if (point.right + $relate.offsetWidth / 2 < this.$refs.layer.offsetWidth / 2) {
							this.realPlacement = 'bottom-end'
						}
					}
				}
				//右侧距离够
				else {
					if (point.top + $relate.offsetHeight < this.$refs.layer.offsetHeight) {
						this.realPlacement = 'right'
					}
					if (point.top + $relate.offsetHeight / 2 < this.$refs.layer.offsetHeight / 2) {
						this.realPlacement = 'right-start'
					}
				}
			}
		},
		//重置位置
		reset() {
			if (!Dap.element.isElement(this.$refs.layer)) {
				return
			}
			//存在三角形的情况下设置offset
			if (this.showTriangle) {
				this.$refs.layer.style.padding = 0
				if (this.realPlacement == 'bottom-start' || this.realPlacement == 'bottom' || this.realPlacement == 'bottom-end') {
					this.$refs.layer.style.paddingTop = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`
				} else if (this.realPlacement == 'top-start' || this.realPlacement == 'top' || this.realPlacement == 'top-end') {
					this.$refs.layer.style.paddingBottom = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetHeight}px)`
				} else if (this.realPlacement == 'left-start' || this.realPlacement == 'left' || this.realPlacement == 'left-end') {
					this.$refs.layer.style.paddingRight = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`
				} else if (this.realPlacement == 'right-start' || this.realPlacement == 'right' || this.realPlacement == 'right-end') {
					this.$refs.layer.style.paddingLeft = `calc(${this.offset} + ${this.$refs.triangle.$el.offsetWidth}px)`
				}
			}
			//关联元素
			const $relate = this.getRelateEl()
			//关联元素的位置信息
			const rect = Dap.element.getElementBounding($relate)
			//在底部
			if (this.realPlacement == 'bottom' || this.realPlacement == 'bottom-start' || this.realPlacement == 'bottom-end') {
				this.$refs.layer.style.top = rect.top + $relate.offsetHeight + 'px'
				this.$refs.layer.style.bottom = 'auto'
				if (this.realPlacement == 'bottom') {
					this.$refs.layer.style.left = rect.left + $relate.offsetWidth / 2 - this.$refs.layer.offsetWidth / 2 + 'px'
					this.$refs.layer.style.right = 'auto'
				} else if (this.realPlacement == 'bottom-start') {
					this.$refs.layer.style.left = rect.left + 'px'
					this.$refs.layer.style.right = 'auto'
				} else if (this.realPlacement == 'bottom-end') {
					this.$refs.layer.style.left = 'auto'
					this.$refs.layer.style.right = rect.right + 'px'
				}
			}
			//在顶部
			else if (this.realPlacement == 'top' || this.realPlacement == 'top-start' || this.realPlacement == 'top-end') {
				this.$refs.layer.style.top = 'auto'
				this.$refs.layer.style.bottom = rect.bottom + $relate.offsetHeight + 'px'
				if (this.realPlacement == 'top') {
					this.$refs.layer.style.left = rect.left + $relate.offsetWidth / 2 - this.$refs.layer.offsetWidth / 2 + 'px'
					this.$refs.layer.style.right = 'auto'
				} else if (this.realPlacement == 'top-start') {
					this.$refs.layer.style.left = rect.left + 'px'
					this.$refs.layer.style.right = 'auto'
				} else if (this.realPlacement == 'top-end') {
					this.$refs.layer.style.left = 'auto'
					this.$refs.layer.style.right = rect.right + 'px'
				}
			}
			//在左侧
			else if (this.realPlacement == 'left' || this.realPlacement == 'left-start' || this.realPlacement == 'left-end') {
				this.$refs.layer.style.left = 'auto'
				this.$refs.layer.style.right = rect.right + $relate.offsetWidth + 'px'
				if (this.realPlacement == 'left') {
					this.$refs.layer.style.top = rect.top + $relate.offsetHeight / 2 - this.$refs.layer.offsetHeight / 2 + 'px'
					this.$refs.layer.style.bottom = 'auto'
				} else if (this.realPlacement == 'left-start') {
					this.$refs.layer.style.top = rect.top + 'px'
					this.$refs.layer.style.bottom = 'auto'
				} else if (this.realPlacement == 'left-end') {
					this.$refs.layer.style.top = 'auto'
					this.$refs.layer.style.bottom = rect.bottom + 'px'
				}
			}
			//在右侧
			else if (this.realPlacement == 'right' || this.realPlacement == 'right-start' || this.realPlacement == 'right-end') {
				this.$refs.layer.style.left = rect.left + $relate.offsetWidth + 'px'
				this.$refs.layer.style.right = 'auto'
				if (this.realPlacement == 'right') {
					this.$refs.layer.style.top = rect.top + $relate.offsetHeight / 2 - this.$refs.layer.offsetHeight / 2 + 'px'
					this.$refs.layer.style.bottom = 'auto'
				} else if (this.realPlacement == 'right-start') {
					this.$refs.layer.style.top = rect.top + 'px'
					this.$refs.layer.style.bottom = 'auto'
				} else if (this.realPlacement == 'right-end') {
					this.$refs.layer.style.top = 'auto'
					this.$refs.layer.style.bottom = rect.bottom + 'px'
				}
			}
		},
		//重置三角位置
		resetTriangle() {
			if (!this.showTriangle || (this.$refs.triangle && !this.$refs.triangle.$el)) {
				return
			}
			const relateWidth = this.getRelateEl().offsetWidth
			const elWidth = this.$refs.layer.offsetWidth
			const relateHeight = this.getRelateEl().offsetHeight
			const elHeight = this.$refs.layer.offsetHeight
			const triWidth = this.$refs.triangle.$el.offsetWidth
			const triHeight = this.$refs.triangle.$el.offsetHeight
			if (this.realPlacement == 'bottom-start') {
				this.$refs.triangle.$el.style.top = 'auto'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.bottom = '100%'
				this.$refs.triangle.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
			} else if (this.realPlacement == 'bottom') {
				this.$refs.triangle.$el.style.top = 'auto'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.bottom = '100%'
				this.$refs.triangle.$el.style.left = elWidth / 2 - triWidth / 2 + 'px'
			} else if (this.realPlacement == 'bottom-end') {
				this.$refs.triangle.$el.style.top = 'auto'
				this.$refs.triangle.$el.style.left = 'auto'
				this.$refs.triangle.$el.style.bottom = '100%'
				this.$refs.triangle.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
			} else if (this.realPlacement == 'top-start') {
				this.$refs.triangle.$el.style.top = '100%'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.bottom = 'auto'
				this.$refs.triangle.$el.style.left = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
			} else if (this.realPlacement == 'top') {
				this.$refs.triangle.$el.style.top = '100%'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.bottom = 'auto'
				this.$refs.triangle.$el.style.left = elWidth / 2 - triWidth / 2 + 'px'
			} else if (this.realPlacement == 'top-end') {
				this.$refs.triangle.$el.style.top = '100%'
				this.$refs.triangle.$el.style.left = 'auto'
				this.$refs.triangle.$el.style.bottom = 'auto'
				this.$refs.triangle.$el.style.right = (relateWidth > elWidth ? elWidth : relateWidth) / 2 - triWidth / 2 + 'px'
			} else if (this.realPlacement == 'left-start') {
				this.$refs.triangle.$el.style.left = '100%'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
				this.$refs.triangle.$el.style.bottom = 'auto'
			} else if (this.realPlacement == 'left') {
				this.$refs.triangle.$el.style.left = '100%'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.top = elHeight / 2 - triHeight / 2 + 'px'
				this.$refs.triangle.$el.style.bottom = 'auto'
			} else if (this.realPlacement == 'left-end') {
				this.$refs.triangle.$el.style.left = '100%'
				this.$refs.triangle.$el.style.right = 'auto'
				this.$refs.triangle.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
				this.$refs.triangle.$el.style.top = 'auto'
			} else if (this.realPlacement == 'right-start') {
				this.$refs.triangle.$el.style.right = '100%'
				this.$refs.triangle.$el.style.left = 'auto'
				this.$refs.triangle.$el.style.top = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
				this.$refs.triangle.$el.style.bottom = 'auto'
			} else if (this.realPlacement == 'right') {
				this.$refs.triangle.$el.style.right = '100%'
				this.$refs.triangle.$el.style.left = 'auto'
				this.$refs.triangle.$el.style.top = elHeight / 2 - triHeight / 2 + 'px'
				this.$refs.triangle.$el.style.bottom = 'auto'
			} else if (this.realPlacement == 'right-end') {
				this.$refs.triangle.$el.style.right = '100%'
				this.$refs.triangle.$el.style.left = 'auto'
				this.$refs.triangle.$el.style.bottom = (relateHeight > elHeight ? elHeight : relateHeight) / 2 - triHeight / 2 + 'px'
				this.$refs.triangle.$el.style.top = 'auto'
			}
		},
		//悬浮层显示前
		beforeEnter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-layer-beforeEnter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-layer-beforeEnter-trigger', true)

			this.$emit('show', el)
			if (typeof this.layerComponentWatch == 'function') {
				this.layerComponentWatch.apply(this, ['show', el])
			}
		},
		//悬浮层显示时
		enter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-layer-enter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-layer-enter-trigger', true)

			this.$nextTick(() => {
				this.update()
				this.$emit('showing', el)
				if (typeof this.layerComponentWatch == 'function') {
					this.layerComponentWatch.apply(this, ['showing', el])
				}
			})
		},
		//悬浮层显示后
		afterEnter(el) {
			this.$emit('shown', el)
			if (typeof this.layerComponentWatch == 'function') {
				this.layerComponentWatch.apply(this, ['shown', el])
			}
		},
		//悬浮层隐藏前
		beforeLeave(el) {
			//清除标记
			Dap.data.remove(el, 'mvi-layer-beforeEnter-trigger')
			Dap.data.remove(el, 'mvi-layer-enter-trigger')

			this.$emit('hide', el)
			if (typeof this.layerComponentWatch == 'function') {
				this.layerComponentWatch.apply(this, ['hide', el])
			}
		},
		//悬浮层隐藏时
		leave(el) {
			this.$emit('hidding', el)
			if (typeof this.layerComponentWatch == 'function') {
				this.layerComponentWatch.apply(this, ['hidding', el])
			}
		},
		//悬浮层隐藏后
		afterLeave(el) {
			this.$emit('hidden', el)
			if (typeof this.layerComponentWatch == 'function') {
				this.layerComponentWatch.apply(this, ['hidden', el])
			}
		}
	},
	beforeUnmount() {
		//卸载滚动监听事件
		this.removeScroll()
		Dap.event.off(window, `resize.layer_${this.uid} click.layer_${this.uid}`)
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-layer {
	position: fixed;
	z-index: 400;

	.mvi-layer-wrapper {
		display: block;
		position: relative;
		width: 100%;
		border-radius: @radius-default;

		&.shadow {
			box-shadow: @boxshadow;
		}

		&.border {
			border: 1px solid #eee;
		}

		.mvi-layer-triangle {
			position: absolute;
		}
	}
}

.mvi-layer-enter-from,
.mvi-layer-leave-to {
	opacity: 0;
	transform: translateY(0.6rem);
}
</style>

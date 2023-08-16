<template>
	<div class="mvi-tabs">
		<!-- 选项卡头部 -->
		<div ref="headers" :class="['mvi-tabs-header', type == 'card' ? 'card' : '', type == 'default' && border ? 'border' : '']" :style="headersStyle">
			<!-- 选项卡滑动条 -->
			<div v-if="type == 'default'" class="mvi-tabs-slider" :style="sliderStyle"></div>
			<!-- 选项卡头部卡片 -->
			<div :class="headerClass(item, index)" v-for="(item, index) in children" @click="clickHeader(item, index)" :style="headerStyle(item, index)" :disabled="item.disabled || null">
				<Icon v-if="item.placement == 'left' && (parseIcon(item.icon).type || parseIcon(item.icon).url)" :class="['mvi-tab-icon', item.title ? 'left' : '']" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
				<span class="mvi-tab-header-text" v-html="item.title" v-if="item.title"></span>
				<Icon v-if="item.placement == 'right' && (parseIcon(item.icon).type || parseIcon(item.icon).url)" :class="['mvi-tab-icon', item.title ? 'right' : '']" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
			</div>
		</div>
		<div class="mvi-tabs-content" ref="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-tabs',
	data() {
		return {
			//子tab实例数组
			children: [],
			//滑动条距离左边的距离
			slideLeft: 0,
			//滑动条宽度
			slideWidth: 0,
			//与active值一样，但区别在于active变化后节点更新后才会变化此值
			current: 0
		}
	},
	provide() {
		return {
			tabs: this
		}
	},
	emits: ['update:modelValue', 'change'],
	props: {
		//tabs类型
		type: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default', 'card'].includes(value)
			}
		},
		//激活的tab序列
		modelValue: {
			type: Number,
			default: 0
		},
		//tab切换动画
		animation: {
			type: String,
			default: 'none',
			validator(value) {
				return ['none', 'slide', 'fade'].includes(value)
			}
		},
		//当animation为slide或者fade时的动画时长
		timeout: {
			type: Number,
			default: 200
		},
		//当标题过长时是否省略，标题栏最大长度只有1/n，n表示标题栏个数
		ellipsis: {
			type: Boolean,
			default: true
		},
		//type="default"下是否显示选项卡头部下边框
		border: {
			type: Boolean,
			default: false
		},
		//type="default"下布局方式
		flex: {
			type: String,
			default: 'space-between'
		},
		//type="default"下每个选项卡头部距离左侧的距离
		offset: {
			type: String,
			default: '0'
		}
	},
	computed: {
		sliderStyle() {
			let style = {}
			if (this.animation == 'slide' || this.animation == 'fade') {
				style.transition = 'left ' + this.timeout + 'ms,width ' + this.timeout + 'ms'
				style.webkitTransition = 'left ' + this.timeout + 'ms,width ' + this.timeout + 'ms'
			}
			style.width = this.slideWidth + 'px'
			style.left = this.slideLeft + 'px'
			return style
		},
		headersStyle() {
			let style = {}
			if (this.flex && this.type == 'default') {
				style.justifyContent = this.flex
			}
			return style
		},
		headerClass() {
			return (item, index) => {
				let cls = ['mvi-tab-header']
				if (this.modelValue == index) {
					cls.push('active')
				}
				if (this.ellipsis) {
					cls.push('ellipsis')
				}
				return cls
			}
		},
		headerStyle() {
			return (item, index) => {
				let style = {}
				if (this.offset && index != 0 && this.type == 'default') {
					style.marginLeft = this.offset
				}
				style.maxWidth = `calc(100% / ${this.children.length})`
				return style
			}
		},
		parseIcon() {
			return param => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(param)) {
					if (typeof param.spin == 'boolean') {
						icon.spin = param.spin
					}
					if (typeof param.type == 'string') {
						icon.type = param.type
					}
					if (typeof param.url == 'string') {
						icon.url = param.url
					}
					if (typeof param.color == 'string') {
						icon.color = param.color
					}
					if (typeof param.size == 'string') {
						icon.size = param.size
					}
				} else if (typeof param == 'string') {
					icon.type = param
				}
				return icon
			}
		}
	},
	components: {
		Icon
	},
	created() {
		this.current = this.modelValue
	},
	watch: {
		modelValue(newValue, oldValue) {
			this.to(newValue, oldValue)
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.setSlider()
		})
		this.setHeight()
		Dap.event.on(window, `resize.tabs_${this.uid}`, this.setHeight)
	},
	methods: {
		//点击头部的标题
		clickHeader(item, index) {
			if (item.disabled) {
				return
			}
			if (this.modelValue == index) {
				return
			}
			this.$emit('update:modelValue', index)
			this.$emit('change', index)
		},
		//激活指定的tab
		to(newValue, oldValue) {
			for (let i = 0; i < this.children.length; i++) {
				this.children[i].show = false
				if (newValue < oldValue) {
					this.children[i].back = true
				} else {
					this.children[i].back = false
				}
			}
			this.children[newValue].show = true
			if (!this.children[newValue].firstShow) {
				this.children[newValue].firstShow = true
			}
			this.$nextTick(() => {
				this.current = newValue
				this.setHeight()
				this.setSlider()
			})
		},
		//api：设置面板高度
		setHeight() {
			if (this.children[this.current] && this.$refs.content) {
				this.$refs.content.style.height = this.children[this.current].$el.offsetHeight + 'px'
			}
		},
		//api：设置滑动条
		setSlider() {
			if (this.type == 'card') {
				return
			}
			this.slideWidth = parseFloat(Dap.element.getCssStyle(this.$refs.headers.querySelector('.mvi-tab-header.active'), 'width'))
			this.slideLeft = Dap.element.getElementPoint(this.$refs.headers.querySelector('.mvi-tab-header.active'), this.$refs.headers).left
		}
	},
	beforeUnmount() {
		Dap.event.off(window, `resize.tabs_${this.uid}`)
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-tabs {
	display: block;
	width: 100%;
	background-color: #fff;

	.mvi-tabs-header {
		display: flex;
		display: -webkit-flex;
		position: relative;
		justify-content: space-between;
		align-items: stretch;
		padding: 0 @mp-sm;

		.mvi-tabs-slider {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 1rem;
			height: 0.04rem;
			transition: left 400ms, width 400ms;
			border-radius: @radius-default;
			background-color: @error-normal;
			z-index: 20;
		}

		.mvi-tab-header {
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			position: relative;
			align-items: center;
			line-height: 1.5;
			padding: @mp-xs @mp-sm;
			color: @font-color-default;
			font-size: @font-size-default;
			cursor: pointer;
			user-select: none;

			&.ellipsis {
				.mvi-tab-header-text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			&[disabled] {
				opacity: 0.6;
			}

			&.active {
				color: @error-normal;
			}

			.mvi-tab-icon {
				font-size: 0.8em;

				&.left {
					margin-right: @mp-xs;
				}

				&.right {
					margin-left: @mp-xs;
				}
			}
		}

		&.border {
			border-bottom: 1px solid @border-color;
		}

		&.card {
			border: 0.02rem solid @error-normal;
			border-radius: @radius-default;
			padding: 0;

			.mvi-tab-header {
				flex: 1;
				justify-content: center;
				border-right: 0.02rem solid @error-normal;

				&:last-child {
					border-right: none;
				}

				&.active {
					background-color: @error-normal;
					color: #fff;
				}
			}
		}
	}

	.mvi-tabs-content {
		position: relative;
		overflow: hidden;
	}
}
</style>

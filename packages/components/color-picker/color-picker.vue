<template>
	<div class="mvi-color-picker">
		<!-- 饱和度和明度 -->
		<div class="mvi-color-picker-panel" ref="panel" :style="panelStyle" @click="clickPanelSetColor">
			<div class="mvi-color-picker-panel-slider" ref="slider"></div>
		</div>
		<!-- 色相 -->
		<Slider v-model="hsv[0]" :min="0" :max="360" stroke-width="0.3rem" square track-color="linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)" color="transparent" @change="setValue">
			<template #button>
				<div class="mvi-color-picker-slider"></div>
			</template>
		</Slider>
		<!-- 透明度 -->
		<div v-if="showAlpha" class="mvi-color-picker-alpha">
			<Slider v-model="opacity" :min="0" :max="1" stroke-width="0.3rem" square :track-color="alphaTrackColor" color="transparent" @change="setValue">
				<template #button>
					<div class="mvi-color-picker-slider"></div>
				</template>
			</Slider>
		</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Drag } from '../drag'
import { Prop } from '../prop'
import { Slider } from '../slider'
export default {
	name: 'm-color-picker',
	data() {
		return {
			//色相、饱和度和明度
			hsv: [0, 0, 0],
			//透明度
			opacity: 1,
			//是否拖动或者点击引起的值变化
			updateByDrag: false,
			//是否在拖动
			dragging: false,
			//面板高度对象
			heightObj: null,
			//面板拖拽对象
			dragObj: null
		}
	},
	emits: ['update:modelValue', 'change'],
	components: {
		Slider
	},
	props: {
		//颜色值
		modelValue: {
			type: String,
			default: '#ff0000'
		},
		//是否显示透明度滑动条
		showAlpha: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		//饱和度和明度面板背景色
		panelStyle() {
			const rgbValue = Dap.color.hsv2rgb([this.hsv[0], 100, 100])
			return {
				background: `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`
			}
		},
		//透明度进度条滑轨颜色
		alphaTrackColor() {
			const rgbValue = Dap.color.hsv2rgb(this.hsv)
			return `linear-gradient(to right, transparent 0%, rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}) 100%)`
		}
	},
	watch: {
		//颜色值变化更新选取器滑块位置
		modelValue() {
			this.initHSV()
			this.setSliderPlacement()
		}
	},
	created() {
		this.initHSV()
	},
	mounted() {
		this.setPanelHeight()
		this.setPanelDrag()
		this.setSliderPlacement()
	},
	methods: {
		//初始化
		initHSV() {
			if (this.updateByDrag) {
				return
			}
			//如果值为16进制的
			if (this.modelValue && Dap.common.matchingText(this.modelValue, 'hex')) {
				const rgbValue = Dap.color.hex2rgb(this.modelValue)
				this.hsv = Dap.color.rgb2hsv(rgbValue)
				this.opacity = 1
			}
			//为rgb格式的
			else {
				try {
					let first = this.modelValue.indexOf('(')
					let last = this.modelValue.lastIndexOf(')')
					let str = this.modelValue.substring(first + 1, last)
					let arry = str.split(',')
					if (arry.length < 3) {
						throw new Error('Color values are not RGB (RGBA) format and hexadecimal format')
					}
					const rgbValue = [Number(arry[0]), Number(arry[1]), Number(arry[2])]
					this.hsv = Dap.color.rgb2hsv(rgbValue)
					this.opacity = arry.length == 4 ? Number(arry[3]) : 1
				} catch (e) {
					throw new Error('Color values are not RGB (RGBA) format and hexadecimal format')
				}
			}
		},
		//设置面板高度
		setPanelHeight() {
			if (this.heightObj) {
				return
			}
			this.heightObj = new Prop(this.$refs.panel, 0.7)
			this.heightObj.init()
		},
		//设置面板拖拽
		setPanelDrag() {
			if (this.dragObj) {
				return
			}
			this.dragObj = new Drag(this.$refs.slider, {
				container: this.$refs.panel,
				mode: 'on',
				draggableX: true,
				draggableY: true,
				cursor: false,
				beforeDrag: () => {
					this.updateByDrag = true
					this.dragging = true
				},
				drag: () => {
					const placement = Dap.element.getElementPoint(this.$refs.slider, this.$refs.panel)
					this.hsv[1] = ((placement.left + this.$refs.slider.offsetWidth / 2) / this.$refs.panel.offsetWidth) * 100
					this.hsv[2] = (1 - (placement.top + this.$refs.slider.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100
					this.setValue()
				},
				dragged: () => {
					this.updateByDrag = false
					this.$nextTick(() => {
						setTimeout(() => {
							this.dragging = false
						}, 10)
					})
				}
			})
			this.dragObj.init()
		},
		//设置面板上的拖拽点位置
		setSliderPlacement() {
			this.$refs.slider.style.left = (this.hsv[1] / 100) * this.$refs.panel.offsetWidth - this.$refs.slider.offsetWidth / 2 + 'px'
			this.$refs.slider.style.top = (1 - this.hsv[2] / 100) * this.$refs.panel.offsetHeight - this.$refs.slider.offsetHeight / 2 + 'px'
		},
		//更新选取的颜色值
		setValue() {
			const rgbValue = Dap.color.hsv2rgb(this.hsv)
			if (this.opacity == 1) {
				const val = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`
				this.$emit('update:modelValue', val)
				this.$emit('change', val)
			} else {
				const val = `rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]},${this.opacity.toFixed(2)})`
				this.$emit('update:modelValue', val)
				this.$emit('change', val)
			}
		},
		//点击明度和饱和度面板直接设置颜色
		clickPanelSetColor(e) {
			if (this.dragging) {
				return
			}
			this.updateByDrag = true
			this.$refs.slider.style.left = e.offsetX - this.$refs.slider.offsetWidth / 2 + 'px'
			this.$refs.slider.style.top = e.offsetY - this.$refs.slider.offsetHeight / 2 + 'px'
			const placement = Dap.element.getElementPoint(this.$refs.slider, this.$refs.panel)
			this.hsv[1] = ((placement.left + this.$refs.slider.offsetWidth / 2) / this.$refs.panel.offsetWidth) * 100
			this.hsv[2] = (1 - (placement.top + this.$refs.slider.offsetHeight / 2) / this.$refs.panel.offsetHeight) * 100
			this.setValue()
		}
	},
	beforeUnmount() {
		if (this.dragObj) {
			this.dragObj.destroy()
		}
		if (this.heightObj) {
			this.heightObj.destroy()
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-color-picker {
	display: block;
	width: 100%;
	height: auto;
	background-color: #fff;
	padding: @mp-md;

	.mvi-color-picker-panel {
		display: block;
		width: 100%;
		position: relative;

		// 饱和度 一条从左往右，由纯白到透明的径向渐变
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to right, white, transparent);
		}

		// 明度 一条从下往上，由纯黑到透明的径向渐变
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to top, black, transparent);
		}

		.mvi-color-picker-panel-slider {
			display: block;
			position: absolute;
			width: 0.4rem;
			height: 0.4rem;
			background-color: transparent;
			border: 1px solid @border-color;
			top: -0.2rem;
			left: calc(~'100% - 0.2rem');
			border-radius: 100%;
			z-index: 20;
			background-color: #fff;
			opacity: 0.5;
			cursor: pointer;
		}
	}

	.mvi-color-picker-slider {
		width: 0.4rem;
		height: 0.4rem;
		background-color: #fff;
		border: 1px solid @border-color;
		left: -0.2rem;
		top: 0;
		opacity: 0.5;
		cursor: pointer;
	}

	.mvi-color-picker-alpha {
		display: block;
		position: relative;
		width: 100%;
		background-color: #fff;
		background-image: linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5), linear-gradient(45deg, #c5c5c5 25%, transparent 0, transparent 75%, #c5c5c5 0, #c5c5c5);
		background-size: 0.2rem 0.2rem;
		background-position: 0 0, 0.1rem 0.1rem;
	}

	:deep(.mvi-slider) {
		margin-top: @mp-sm;
	}
}
</style>

<template>
	<div class="mvi-page">
		<div v-if="firstText || parseIcon(firstIcon).type || parseIcon(firstIcon).url" :disabled="modelValue == 1 || null" @click="pageFirst" class="mvi-page-first" :class="{ active: active && modelValue != 1 }" :style="firstStyle">
			<Icon :class="{ 'margin-right': !!firstText }" v-if="parseIcon(firstIcon).type || parseIcon(firstIcon).url" :type="parseIcon(firstIcon).type" :url="parseIcon(firstIcon).url" :spin="parseIcon(firstIcon).spin" :size="parseIcon(firstIcon).size" :color="parseIcon(firstIcon).color" />
			<span v-if="firstText" v-text="firstText"></span>
		</div>
		<div v-if="prevText || parseIcon(prevIcon).type || parseIcon(prevIcon).url" :disabled="modelValue == 1 || null" @click="pagePrev" class="mvi-page-prev" :class="{ active: active && modelValue != 1 }" :style="firstStyle">
			<Icon :class="{ 'margin-right': !!prevText }" v-if="parseIcon(prevIcon).type || parseIcon(prevIcon).url" :type="parseIcon(prevIcon).type" :url="parseIcon(prevIcon).url" :size="parseIcon(prevIcon).size" :spin="parseIcon(prevIcon).spin" :color="parseIcon(prevIcon).color" />
			<span v-if="prevText" v-text="prevText"></span>
		</div>
		<div class="mvi-page-numbers">
			<div class="mvi-page-numbers-simple" v-if="simple">{{ modelValue }} / {{ total }}</div>
			<div class="mvi-page-numbers-items" v-else>
				<!--total不超过overNumber -->
				<template v-for="item in total">
					<div v-if="total <= overNumber" class="mvi-page-numbers-item" :class="{ 'number-active': modelValue == item, active: active && modelValue != item }" v-text="item" @click="toPage(item)" :style="pageStyle(item)"></div>
				</template>
				<!-- total超过overNumber -->
				<div v-if="total > overNumber && modelValue > (overNumber - 1) / 2 + 1" class="mvi-page-numbers-item" :class="{ active: active }" @click="toPage(modelValue - (overNumber - 1))" :style="{ color: color || '' }">...</div>
				<template v-for="item in arr">
					<div v-if="total > overNumber" class="mvi-page-numbers-item" :class="{ 'number-active': modelValue == item, active: active && modelValue != item }" v-text="item" @click="toPage(item)" :style="pageStyle(item)"></div>
				</template>
				<div v-if="total > overNumber && modelValue < total - (overNumber - 1) / 2" class="mvi-page-numbers-item" :class="{ active: active }" @click="toPage(modelValue + (overNumber - 1))" :style="{ color: color || '' }">...</div>
			</div>
		</div>
		<div v-if="nextText || parseIcon(nextIcon).type || parseIcon(nextIcon).url" :disabled="modelValue == total || null" @click="pageNext" class="mvi-page-next" :class="{ active: active && modelValue != total }" :style="lastStyle">
			<span v-if="nextText" v-text="nextText"></span>
			<Icon :class="nextText ? 'margin-left' : ''" v-if="parseIcon(nextIcon).type || parseIcon(nextIcon).url" :type="parseIcon(nextIcon).type" :url="parseIcon(nextIcon).url" :size="parseIcon(nextIcon).size" :spin="parseIcon(nextIcon).spin" :color="parseIcon(nextIcon).color" />
		</div>
		<div v-if="lastText || parseIcon(lastIcon).type || parseIcon(lastIcon).url" :disabled="modelValue == total || null" @click="pageLast" class="mvi-page-last" :class="{ active: active && modelValue != total }" :style="lastStyle">
			<span v-if="lastText" v-text="lastText"></span>
			<Icon :class="{ 'margin-left': !!lastText }" v-if="parseIcon(lastIcon).type || parseIcon(lastIcon).url" :type="parseIcon(lastIcon).type" :url="parseIcon(lastIcon).url" :size="parseIcon(lastIcon).size" :spin="parseIcon(lastIcon).spin" :color="parseIcon(lastIcon).color" />
		</div>
	</div>
</template>

<script>
import Dap from 'dap-util'
import { Icon } from '../icon'
export default {
	name: 'm-page',
	data() {
		return {
			el: null
		}
	},
	emits: ['update:modelValue', 'change'],
	props: {
		//当前页
		modelValue: {
			type: Number,
			default: 1
		},
		//总页数
		total: {
			type: Number,
			default: 1
		},
		//显示的页码数
		overNumber: {
			type: Number,
			default: 3,
			validator(value) {
				return value % 2 != 0
			}
		},
		//上一页显示文字
		prevText: {
			type: String,
			default: null
		},
		//下一页显示文字
		nextText: {
			type: String,
			default: null
		},
		//上一页显示的图标
		prevIcon: {
			type: [String, Object],
			default: 'angle-left'
		},
		//下一页显示的图标
		nextIcon: {
			type: [String, Object],
			default: 'angle-right'
		},
		//简单模式
		simple: {
			type: Boolean,
			default: false
		},
		//首页显示的文字
		firstText: {
			type: String,
			default: null
		},
		//尾页显示的文字
		lastText: {
			type: String,
			default: null
		},
		//首页显示的图标
		firstIcon: {
			type: [Object, String],
			default: 'angle-double-left'
		},
		//尾页显示的图标
		lastIcon: {
			type: [Object, String],
			default: 'angle-double-right'
		},
		//自定义字体颜色及选中的背景色
		color: {
			type: String,
			default: null
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		pageStyle() {
			return item => {
				let style = {}
				if (this.modelValue == item) {
					if (this.el) {
						style.color = Dap.element.getCssStyle(this.el, 'background-color')
					}
					style.backgroundColor = this.color || ''
				} else {
					style.color = this.color || ''
				}
				return style
			}
		},
		arr() {
			let arr = []
			if (this.modelValue <= (this.overNumber - 1) / 2 + 1) {
				for (let i = 0; i < this.overNumber; i++) {
					arr.push(i + 1)
				}
			} else if (this.modelValue <= this.total - (this.overNumber - 1) / 2) {
				for (let i = 0; i < (this.overNumber - 1) / 2; i++) {
					arr.push(this.modelValue - ((this.overNumber - 1) / 2 - i))
				}
				arr.push(this.modelValue)
				for (let i = 0; i < (this.overNumber - 1) / 2; i++) {
					arr.push(this.modelValue + (i + 1))
				}
			} else {
				for (let i = 0; i < this.overNumber; i++) {
					arr.push(this.total - (this.overNumber - 1 - i))
				}
			}
			return arr
		},
		parseIcon() {
			return params => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(params)) {
					if (typeof params.spin == 'boolean') {
						icon.spin = params.spin
					}
					if (typeof params.type == 'string') {
						icon.type = params.type
					}
					if (typeof params.url == 'string') {
						icon.url = params.url
					}
					if (typeof params.color == 'string') {
						icon.color = params.color
					}
					if (typeof params.size == 'string') {
						icon.size = params.size
					}
				} else if (typeof params == 'string') {
					icon.type = params
				}
				return icon
			}
		},
		firstStyle() {
			let style = {}
			if (this.modelValue > 1 && this.color) {
				style.color = this.color
			}
			return style
		},
		lastStyle() {
			let style = {}
			if (this.modelValue < this.total && this.color) {
				style.color = this.color
			}
			return style
		}
	},
	components: {
		Icon
	},
	mounted() {
		this.el = this.$el
	},
	methods: {
		//上一页
		pagePrev() {
			if (this.modelValue == 1) {
				return
			}
			let page = this.modelValue - 1
			this.$emit('update:modelValue', page)
			this.$emit('change', page)
		},
		//下一页
		pageNext() {
			if (this.modelValue == this.total) {
				return
			}
			let page = this.modelValue + 1
			this.$emit('update:modelValue', page)
			this.$emit('change', page)
		},
		//首页
		pageFirst() {
			if (this.modelValue == 1) {
				return
			}
			this.$emit('update:modelValue', 1)
			this.$emit('change', 1)
		},
		//尾页
		pageLast() {
			if (this.modelValue == this.total) {
				return
			}
			this.$emit('update:modelValue', this.total)
			this.$emit('change', this.total)
		},
		//指定页
		toPage(page) {
			if (this.modelValue == page) {
				return
			}
			if (page >= this.total) {
				page = this.total
			}
			if (page <= 1) {
				page = 1
			}
			this.$emit('update:modelValue', page)
			this.$emit('change', page)
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-page {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	width: fit-content;
	height: @small-height;
	border: 1px solid @border-color;
	font-size: @font-size-default;
	border-radius: @radius-default;
	overflow: hidden;

	.mvi-page-first {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;
		padding: 0 @mp-md;
		border-right: 1px solid @border-color;
		color: @info-normal;
		white-space: nowrap;
		cursor: pointer;

		&.active:active::before {
			.mvi-active();
		}

		&[disabled] {
			color: @font-color-mute;
		}

		.mvi-icon.margin-right {
			margin-right: @mp-xs;
		}
	}

	.mvi-page-last {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;
		padding: 0 @mp-md;
		border-left: 1px solid @border-color;
		color: @info-normal;
		white-space: nowrap;
		cursor: pointer;

		&.active:active::before {
			.mvi-active();
		}

		&[disabled] {
			color: @font-color-mute;
		}

		.mvi-icon.margin-left {
			margin-left: @mp-xs;
		}
	}

	.mvi-page-prev {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;
		padding: 0 @mp-md;
		border-right: 1px solid @border-color;
		color: @info-normal;
		white-space: nowrap;
		cursor: pointer;

		&.active:active::before {
			.mvi-active();
		}

		&[disabled] {
			color: @font-color-mute;
		}

		.mvi-icon.margin-right {
			margin-right: @mp-xs;
		}
	}

	.mvi-page-next {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;
		padding: 0 @mp-md;
		border-left: 1px solid @border-color;
		color: @info-normal;
		white-space: nowrap;
		cursor: pointer;

		&.active:active::before {
			.mvi-active();
		}

		&[disabled] {
			color: @font-color-mute;
		}

		.mvi-icon.margin-left {
			margin-left: @mp-xs;
		}
	}

	.mvi-page-numbers {
		display: block;
		height: 100%;

		.mvi-page-numbers-simple {
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			color: @font-color-sub;
			vertical-align: middle;
			padding: 0 @mp-lg;
			white-space: nowrap;
		}

		.mvi-page-numbers-items {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
			position: relative;

			.mvi-page-numbers-item {
				width: @small-height;
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				position: relative;
				height: 100%;
				border-right: 1px solid @border-color;
				color: @info-normal;
				white-space: nowrap;
				cursor: pointer;

				&:last-child {
					border-right: none;
				}

				&.active:active::before {
					.mvi-active();
				}

				&.number-active {
					background-color: @info-normal;
					color: #fff;
				}
			}
		}
	}
}
</style>

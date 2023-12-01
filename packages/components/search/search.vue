<template>
	<div class="mvi-search" :disabled="disabled || null">
		<div v-if="label" class="mvi-search-label" v-text="label"></div>
		<div :class="['mvi-search-input-container', round ? 'round' : '']">
			<div v-if="parseIcon(leftIcon).type || parseIcon(leftIcon).url" class="mvi-search-left-icon" @click="leftClick">
				<Icon :type="parseIcon(leftIcon).type" :url="parseIcon(leftIcon).url" :spin="parseIcon(leftIcon).spin" :size="parseIcon(leftIcon).size" :color="parseIcon(leftIcon).color" />
			</div>
			<input ref="input" :class="['mvi-search-input', parseIcon(leftIcon).type || parseIcon(leftIcon).url ? 'left-none-radius' : '', parseIcon(rightIcon).type || parseIcon(rightIcon).url || (clearable && showClear) ? 'right-none-radius' : '']" :type="cmpType" @keypress.enter="doSearch" autocomplete="off" :placeholder="placeholder" :maxlength="maxlength" :autofocus="autofocus" :disabled="disabled" :readonly="readonly" :inputmode="cmpInputMode" v-model="realValue" @input="searchInput" @focus="inputFocus" @blur="inputBlur" @keydown="keydown" @keyup="keyup" :style="inputStyle" />
			<div v-if="clearable" class="mvi-search-clear" @click="clearInput" v-show="showClear">
				<Icon type="times-o" />
			</div>
			<div v-if="parseIcon(rightIcon).type || parseIcon(rightIcon).url" class="mvi-search-right-icon" @click="rightClick">
				<Icon :type="parseIcon(rightIcon).type" :url="parseIcon(rightIcon).url" :spin="parseIcon(rightIcon).spin" :size="parseIcon(rightIcon).size" :color="parseIcon(rightIcon).color" />
			</div>
		</div>
		<div v-if="showCancel" v-text="cancelText" class="mvi-search-cancel" @click="doCancel"></div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-search',
	emits: ['update:modelValue', 'search', 'cancel', 'left-click', 'right-click', 'focus', 'blur', 'input', 'clear', 'keydown', 'keyup'],
	data() {
		return {
			focus: false
		}
	},
	props: {
		//输入框的值
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//输入框类型
		type: {
			type: String,
			default: 'text',
			validator(value) {
				return ['text', 'password', 'number', 'tel', 'textarea'].includes(value)
			}
		},
		//输入框占位符
		placeholder: {
			type: String,
			default: ''
		},
		//搜索框左侧文本
		label: {
			type: String,
			default: null
		},
		//搜索框是否圆形
		round: {
			type: Boolean,
			default: false
		},
		//输入的最大长度
		maxlength: {
			type: Number,
			default: -1
		},
		//是否自动聚焦
		autofocus: {
			type: Boolean,
			default: false
		},
		//是否在输入框右侧显示取消按钮
		showCancel: {
			type: Boolean,
			default: false
		},
		//取消按钮文字
		cancelText: {
			type: String,
			default: '取消'
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否只读
		readonly: {
			type: Boolean,
			default: false
		},
		//输入框内容对齐方式
		align: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'center', 'right'].includes(value)
			}
		},
		//左侧图标
		leftIcon: {
			type: [String, Object],
			default: null
		},
		//右侧图标
		rightIcon: {
			type: [String, Object],
			default: null
		},
		//使用清除图标
		clearable: {
			type: Boolean,
			default: false
		},
		//输入框调起移动端键盘类型
		inputMode: {
			type: [String, Boolean],
			default: false,
			validator(value) {
				return [false, 'none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(value)
			}
		}
	},
	computed: {
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
		},
		showClear() {
			if (this.disabled || this.readonly) {
				return false
			}
			if (this.focus) {
				if (this.realValue === '') {
					return false
				}
				return true
			}
			return false
		},
		cmpType() {
			if (this.type == 'number') {
				return 'text'
			} else {
				return this.type
			}
		},
		cmpInputMode() {
			let mode = false
			if (typeof this.inputMode == 'string') {
				mode = this.inputMode
			}
			return mode
		},
		inputStyle() {
			let style = {}
			if (this.align) {
				style.textAlign = this.align
			}
			if (this.parseIcon(this.leftIcon).type || this.parseIcon(this.leftIcon).url) {
				style.paddingLeft = 0
			}
			if ((this.clearable && this.showClear) || this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url) {
				style.paddingRight = 0
			}
			return style
		},
		realValue: {
			set(value) {
				if (this.modelValue !== value) {
					this.$emit('update:modelValue', value)
				}
			},
			get() {
				let value = this.modelValue === null ? '' : this.modelValue.toString()
				//数字类型会过滤非数字字符
				if (this.type == 'number') {
					value = value.replace(/\D/g, '')
				}
				//如果设置了maxlength，则进行字符串截取
				if (this.maxlength > 0 && value.length > this.maxlength) {
					value = value.substr(0, this.maxlength)
				}
				if (this.modelValue !== value) {
					this.$emit('update:modelValue', value)
				}
				return value
			}
		}
	},
	components: {
		Icon
	},
	methods: {
		//输入框键盘按下
		keydown(e) {
			if (this.disabled) {
				return
			}
			this.$emit('keydown', e, this.realValue)
		},
		//输入框键盘松开
		keyup(e) {
			if (this.disabled) {
				return
			}
			this.$emit('keyup', e, this.realValue)
		},
		//输入框获取焦点
		inputFocus() {
			if (this.disabled) {
				return
			}
			this.focus = true
			this.$emit('focus', this.realValue)
		},
		//输入框失去焦点
		inputBlur() {
			if (this.disabled) {
				return
			}
			setTimeout(() => {
				this.focus = false
				this.$emit('blur', this.realValue)
			}, 200)
		},
		//输入监听
		searchInput() {
			if (this.disabled) {
				return
			}
			this.$emit('input', this.realValue)
		},
		//搜索
		doSearch() {
			if (this.disabled) {
				return
			}
			this.$emit('search', this.realValue)
		},
		//取消
		doCancel() {
			if (this.disabled) {
				return
			}
			this.$emit('cancel', this.realValue)
		},
		//左侧图标点击
		leftClick() {
			if (this.disabled) {
				return
			}
			this.$emit('left-click', this.realValue)
		},
		//右侧图标点击
		rightClick() {
			if (this.disabled) {
				return
			}
			this.$emit('right-click', this.realValue)
		},
		//清除输入框
		clearInput() {
			if (this.disabled) {
				return
			}
			if (!this.clearable) {
				return
			}
			setTimeout(() => {
				this.realValue = ''
				this.$refs.input.focus()
				this.$emit('clear', this.realValue)
			}, 210)
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-search {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	position: relative;
	padding: @mp-sm;
	background-color: #fff;
	color: @font-color-default;
	font-size: @font-size-default;

	&[disabled] {
		opacity: 0.6;

		.mvi-search-cancel {
			&:hover {
				opacity: 0.8;
			}
		}
	}

	.mvi-search-label {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		padding-right: @mp-sm;
		height: 0.68rem;
		white-space: nowrap;
	}

	.mvi-search-input-container {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		position: relative;
		width: 100%;
		flex: 1;
		height: 0.68rem;
		border-radius: @radius-default;
		background-color: @bg-color-default;
		color: @font-color-default;

		&.round {
			border-radius: @radius-round;
		}

		.mvi-search-left-icon,
		.mvi-search-right-icon {
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			height: 0.68rem;
			width: 0.68rem;
		}

		.mvi-search-clear {
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			height: 0.68rem;
			width: 0.68rem;
			opacity: 0.5;

			&:hover {
				cursor: pointer;
			}
		}

		.mvi-search-input {
			display: block;
			width: 100%;
			flex: 1;
			height: 100%;
			border: none;
			border-radius: inherit;
			padding: 0 @mp-md;
			line-height: 1.5;
			color: inherit;
			background-color: inherit;
			font-family: @font-family;
			background-image: none;
			margin: 0;
			font-size: @font-size-default;

			&::-webkit-input-placeholder,
			&::placeholder {
				color: inherit;
				opacity: 0.5;
				vertical-align: middle;
				font-family: inherit;
				font-size: inherit;
			}

			&.left-none-radius {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}

			&.right-none-radius {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}

	.mvi-search-cancel {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		padding-left: @mp-sm;
		height: 0.68rem;
		white-space: nowrap;
		cursor: pointer;
		user-select: none;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}
}
</style>

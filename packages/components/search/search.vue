<template>
	<div class="mvi-search" :disabled="disabled || null">
		<div v-if="label" :class="['mvi-search-label', labelClass || '']" v-text="label"></div>
		<div :class="['mvi-search-input-container', round ? 'mvi-search-input-round' : '']" :style="{ backgroundColor: background || '', color: color || '' }">
			<div v-if="leftIconType || leftIconUrl" class="mvi-search-left-icon" @click="leftClick">
				<Icon :type="leftIconType" :url="leftIconUrl" :spin="leftIconSpin" :size="leftIconSize" :color="leftIconColor" />
			</div>
			<input ref="input" class="mvi-search-input" :type="computedType" @keypress.enter="doSearch" autocomplete="off" :placeholder="placeholder" :maxlength="maxlength" :autofocus="autofocus" :disabled="disabled || null" :readonly="readonly || null" :inputmode="computedInputMode" v-model="realValue" @input="searchInput" @focus="getFocus" @blur="getBlur" :style="inputStyle" />
			<div v-if="clearable" class="mvi-search-clear" @click="clearInput" v-show="showClear">
				<Icon type="times-o" />
			</div>
			<div v-if="rightIconType || rightIconUrl" class="mvi-search-right-icon" @click="rightClick">
				<Icon :type="rightIconType" :url="rightIconUrl" :spin="rightIconSpin" :size="rightIconSize" :color="rightIconColor" />
			</div>
		</div>
		<div v-if="showCancel" v-text="cancelText" :class="['mvi-search-cancel', cancelClass || '']" @click="doCancel"></div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-search',
	emits: ['update:modelValue', 'search', 'cancel', 'left-click', 'right-click', 'focus', 'blur', 'input', 'clear'],
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
			default: 'text'
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
		//左侧文本额外样式
		labelClass: {
			type: String,
			default: null
		},
		//搜索框是否圆形
		round: {
			type: Boolean,
			default: false
		},
		//输入框区域背景色
		background: {
			type: String,
			default: null
		},
		//输入框区域字体色
		color: {
			type: String,
			default: null
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
		//取消按钮额外样式
		cancelClass: {
			type: String,
			default: null
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
				return [false, 'none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']
			}
		}
	},
	computed: {
		showClear() {
			if (this.disabled || this.readonly) {
				return false
			}
			if (this.focus) {
				if (this.realValue === '') {
					return false
				} else {
					return true
				}
			} else {
				return false
			}
		},
		leftIconType() {
			let type = null
			if (Dap.common.isObject(this.leftIcon)) {
				if (typeof this.leftIcon.type == 'string') {
					type = this.leftIcon.type
				}
			} else if (typeof this.leftIcon == 'string') {
				type = this.leftIcon
			}
			return type
		},
		leftIconUrl() {
			let url = null
			if (Dap.common.isObject(this.leftIcon)) {
				if (typeof this.leftIcon.url == 'string') {
					url = this.leftIcon.url
				}
			}
			return url
		},
		leftIconSpin() {
			let spin = false
			if (Dap.common.isObject(this.leftIcon)) {
				if (typeof this.leftIcon.spin == 'boolean') {
					spin = this.leftIcon.spin
				}
			}
			return spin
		},
		leftIconSize() {
			let size = null
			if (Dap.common.isObject(this.leftIcon)) {
				if (typeof this.leftIcon.size == 'string') {
					size = this.leftIcon.size
				}
			}
			return size
		},
		leftIconColor() {
			let color = null
			if (Dap.common.isObject(this.leftIcon)) {
				if (typeof this.leftIcon.color == 'string') {
					color = this.leftIcon.color
				}
			}
			return color
		},
		rightIconType() {
			let type = null
			if (Dap.common.isObject(this.rightIcon)) {
				if (typeof this.rightIcon.type == 'string') {
					type = this.rightIcon.type
				}
			} else if (typeof this.rightIcon == 'string') {
				type = this.rightIcon
			}
			return type
		},
		rightIconUrl() {
			let url = null
			if (Dap.common.isObject(this.rightIcon)) {
				if (typeof this.rightIcon.url == 'string') {
					url = this.rightIcon.url
				}
			}
			return url
		},
		rightIconSpin() {
			let spin = false
			if (Dap.common.isObject(this.rightIcon)) {
				if (typeof this.rightIcon.spin == 'boolean') {
					spin = this.rightIcon.spin
				}
			}
			return spin
		},
		rightIconSize() {
			let size = null
			if (Dap.common.isObject(this.rightIcon)) {
				if (typeof this.rightIcon.size == 'string') {
					size = this.rightIcon.size
				}
			}
			return size
		},
		rightIconColor() {
			let color = null
			if (Dap.common.isObject(this.rightIcon)) {
				if (typeof this.rightIcon.color == 'string') {
					color = this.rightIcon.color
				}
			}
			return color
		},
		computedType() {
			if (this.type == 'number') {
				return 'text'
			} else {
				return this.type
			}
		},
		computedInputMode() {
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
			if (this.leftIconType || this.leftIconUrl) {
				style.paddingLeft = 0
			}
			if (this.showClear && this.clearable) {
				style.paddingRight = 0
			} else if (this.rightIconType || this.rightIconUrl) {
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
		//输入框获取焦点
		getFocus() {
			if (this.disabled) {
				return
			}
			this.$emit('focus', this.realValue)
			setTimeout(() => {
				this.focus = true
			}, 200)
		},
		//输入框失去焦点
		getBlur() {
			if (this.disabled) {
				return
			}
			this.$emit('blur', this.realValue)
			setTimeout(() => {
				this.focus = false
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
			this.realValue = ''
			this.$refs.input.focus()
			this.$emit('clear', '')
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
}

.mvi-search[disabled] {
	opacity: 0.6;
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
}

.mvi-search-input-round {
	border-radius: @radius-round;
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

	&:hover {
		cursor: pointer;
	}

	& > .mvi-icon {
		opacity: 0.5;
	}
}
</style>

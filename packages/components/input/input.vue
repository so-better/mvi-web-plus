<template>
	<div :disabled="disabled || null" :class="inputClass" :data-type="type">
		<!-- 左侧图标 -->
		<div @click="leftClick" class="mvi-input-left" v-if="showLeft">
			<slot name="left" v-if="$slots.left"></slot>
			<Icon v-else :type="parseIcon(left).type" :url="parseIcon(left).url" :spin="parseIcon(left).spin" :size="parseIcon(left).size" :color="parseIcon(left).color" />
		</div>
		<!-- 左侧文本 -->
		<div class="mvi-input-label" v-if="label" :style="labelStyle"><span v-text="label"></span></div>
		<!-- 文本域 -->
		<textarea v-if="type == 'textarea'" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" :readonly="readonly" :autofocus="autofocus" class="mvi-textarea" v-model="realValue" @input="input" ref="textarea" :rows="rowsFilter" :name="name" :style="inputStyle" @focus="inputFocus" @blur="inputBlur" autocomplete="off" @keydown="keydown" @keyup="keyup"></textarea>
		<!-- 输入框 -->
		<input v-else :type="cmpType" :inputmode="inputMode" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" :readonly="readonly" :autofocus="autofocus" class="mvi-input" v-model="realValue" @input="input" ref="input" :name="name" :style="inputStyle" @focus="inputFocus" @blur="inputBlur" autocomplete="off" @keydown="keydown" @keyup="keyup" />
		<!-- 清除图标 -->
		<div @click="doClear" class="mvi-input-clear" v-if="clearable" v-show="showClear">
			<Icon type="times-o" />
		</div>
		<!-- 右侧图标 -->
		<div @click="rightClick" class="mvi-input-right" v-if="showRight">
			<slot name="right" v-if="$slots.right"></slot>
			<Icon v-else :type="parseIcon(right).type" :url="parseIcon(right).url" :spin="parseIcon(right).spin" :size="parseIcon(right).size" :color="parseIcon(right).color" />
		</div>
		<!-- 显示文字长度限制 -->
		<div v-if="showWordLimit && maxlength > 0" class="mvi-input-words">{{ realValue.length }}/{{ maxlength }}</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-input',
	data() {
		return {
			//输入框或者文本域是否获取焦点
			focus: false
		}
	},
	emits: ['update:modelValue', 'left-click', 'right-click', 'focus', 'blur', 'input', 'clear', 'keydown', 'keyup'],
	props: {
		//输入框的值
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//占位符
		placeholder: {
			type: String,
			default: ''
		},
		//输入框左侧文本
		label: {
			type: String,
			default: null
		},
		//左侧文本宽度
		labelWidth: {
			type: String,
			default: null
		},
		//左侧文本对齐方式
		labelAlign: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'center', 'right'].includes(value)
			}
		},
		//文本与输入框的间距
		labelOffset: {
			type: String,
			default: null
		},
		//输入框类型
		type: {
			type: String,
			default: 'text',
			validator(value) {
				return ['text', 'password', 'number', 'tel', 'textarea'].includes(value)
			}
		},
		//原生name属性
		name: {
			type: String,
			default: null
		},
		//最大字数限制
		maxlength: {
			type: Number,
			default: -1
		},
		//输入框尺寸
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['medium', 'large'].includes(value)
			}
		},
		//是否显示下边框
		border: {
			type: Boolean,
			default: false
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
		//是否显示表单必填星号
		required: {
			type: Boolean,
			default: false
		},
		//是否启用清除图标
		clearable: {
			type: Boolean,
			default: false
		},
		//是否自动聚焦
		autofocus: {
			type: Boolean,
			default: false
		},
		//是否显示字数统计，需要设置maxlength属性
		showWordLimit: {
			type: Boolean,
			default: false
		},
		//文本左侧图标
		left: {
			type: [String, Object],
			default: null
		},
		//右侧图标
		right: {
			type: [String, Object],
			default: null
		},
		//type=textarea时的行数
		rows: {
			type: Number,
			default: 1
		},
		//自动调整高度
		autosize: {
			type: [Boolean, Object],
			default: false,
			validator(value) {
				if (Dap.common.isObject(value)) {
					if (Dap.number.isNumber(value.minRows) && Dap.number.isNumber(value.maxRows)) {
						if (value.minRows > value.maxRows) {
							return false
						}
					}
				}
				return true
			}
		},
		//文本对齐方式
		align: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'center', 'right'].includes(value)
			}
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
		inputClass() {
			let cls = ['mvi-input-container', this.size]
			if (this.border) {
				cls.push('border')
			}
			if (this.showWordLimit && this.maxlength > 0) {
				cls.push('words')
			}
			if (this.required) {
				cls.push('required')
			}
			return cls
		},
		showClear() {
			if (this.disabled || this.readonly) {
				return false
			}
			if (this.realValue && this.focus) {
				return true
			}
			return false
		},
		//图标转换
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
		//输入框的值
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
		},
		//输入框的type值
		cmpType() {
			if (this.type == 'number') {
				return 'text'
			}
			return this.type
		},
		//文本域的rows
		rowsFilter() {
			let rows = this.rows
			if (Dap.common.isObject(this.autosize)) {
				if (Dap.number.isNumber(this.autosize.minRows)) {
					if (this.rows < this.autosize.minRows) {
						rows = this.autosize.minRows
					}
				}
				if (Dap.number.isNumber(this.autosize.maxRows)) {
					if (this.rows > this.autosize.maxRows) {
						rows = this.autosize.maxRows
					}
				}
			}
			return rows
		},
		//label的样式
		labelStyle() {
			let style = {}
			if (this.labelWidth) {
				style.width = this.labelWidth
			}
			if (this.labelAlign) {
				if (this.labelAlign == 'left') {
					style.justifyContent = 'flex-start'
				} else if (this.labelAlign == 'right') {
					style.justifyContent = 'flex-end'
				} else {
					style.justifyContent = this.labelAlign
				}
			}
			if (this.labelOffset) {
				style.marginRight = this.labelOffset
			}
			return style
		},
		//输入框样式
		inputStyle() {
			return {
				textAlign: this.align ? this.align : ''
			}
		},
		//显示左侧图标
		showLeft() {
			return this.$slots.left || this.parseIcon(this.left).type || this.parseIcon(this.left).url
		},
		//显示右侧图标
		showRight() {
			return this.$slots.right || this.parseIcon(this.right).type || this.parseIcon(this.right).url
		}
	},
	components: {
		Icon
	},
	mounted() {
		if (this.$refs.textarea) {
			this.setMaxMinHeight()
			if (this.autosize == true || Dap.common.isObject(this.autosize)) {
				this.autosizeSet()
			}
		}
	},
	watch: {
		realValue() {
			if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
				this.autosizeSet()
			}
		},
		rows() {
			if (this.$refs.textarea) {
				this.setMaxMinHeight()
			}
		},
		autosize() {
			if (this.$refs.textarea) {
				this.setMaxMinHeight()
			}
		},
		showClear(newValue) {
			this.$nextTick(() => {
				if (this.$refs.textarea && (this.autosize == true || Dap.common.isObject(this.autosize))) {
					this.autosizeSet()
				}
			})
		}
	},
	methods: {
		//高度自适应设置
		autosizeSet() {
			this.$refs.textarea.style.height = 'auto'
			this.$refs.textarea.scrollTop = 0
			this.$refs.textarea.style.height = Dap.element.getScrollHeight(this.$refs.textarea) + 'px'
		},
		//行数转为高度
		rows2Height(rows) {
			let lineHeight = Math.floor(parseFloat(Dap.element.getCssStyle(this.$refs.textarea, 'line-height')))
			return rows * lineHeight
		},
		//设置最大高度和最小高度
		setMaxMinHeight() {
			if (Dap.common.isObject(this.autosize)) {
				if (Dap.number.isNumber(this.autosize.maxRows)) {
					let maxHeight = this.rows2Height(this.autosize.maxRows)
					this.$refs.textarea.style.maxHeight = maxHeight + 'px'
				}
				if (Dap.number.isNumber(this.autosize.minRows)) {
					let minHeight = this.rows2Height(this.autosize.minRows)
					this.$refs.textarea.style.minHeight = minHeight + 'px'
				}
			} else {
				this.$refs.textarea.style.maxHeight = ''
				this.$refs.textarea.style.minHeight = ''
			}
		},
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
			}, 100)
		},
		//输入框监听
		input() {
			if (this.disabled) {
				return
			}
			this.$emit('input', this.realValue)
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
		doClear() {
			if (this.disabled) {
				return
			}
			if (!this.clearable) {
				return
			}
			setTimeout(() => {
				this.realValue = ''
				let el = this.$refs.input || this.$refs.textarea
				el.focus()
				this.$emit('clear', this.realValue)
			}, 110)
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

//输入框组件容器
.mvi-input-container {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	background-color: #fff;
	color: @font-color-default;
	margin: 0;
	vertical-align: middle;
	width: 100%;
	padding: @mp-sm @mp-md;

	&.border::after {
		display: block;
		content: '';
		position: absolute;
		left: @mp-sm;
		bottom: 0;
		width: calc(~'100% - @{mp-sm}');
		height: 0;
		border-bottom: 1px solid @border-color;
		box-sizing: content-box;
	}

	&.required::before {
		position: absolute;
		left: @mp-xs;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		content: '*';
		font-family: '宋体', 'SimSun';
		color: @error-normal;
	}

	&[disabled] {
		opacity: 0.6;
	}

	.mvi-input-label {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		position: relative;
		width: 2rem;
		margin-right: @mp-sm;
		vertical-align: middle;

		span {
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

	.mvi-input-left {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		height: 100%;
		margin-right: @mp-sm;
	}

	.mvi-input-right {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		height: 100%;
		margin-left: @mp-sm;
	}

	.mvi-input-clear {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		opacity: 0.5;
		padding: 0;
		vertical-align: middle;
		cursor: pointer;
		height: 100%;
		margin-left: @mp-sm;
	}

	&[data-type='textarea'] {
		align-items: flex-start;
	}

	.mvi-input {
		appearance: none;
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		border-radius: 0;
		color: inherit;
		background-color: inherit;
		flex: 1;
		font-family: @font-family;
		background-image: none;
		font-size: inherit;
		margin: 0;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: inherit;
			font-family: inherit;
			font-size: inherit;
			opacity: 0.5;
			vertical-align: middle;
		}

		&[disabled] {
			background-color: inherit;
			color: inherit;
			opacity: 1;
		}
	}

	.mvi-textarea {
		appearance: none;
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		border-radius: 0;
		color: inherit;
		background-color: inherit;
		margin: 0;
		width: 100%;
		flex: 1;
		font-family: @font-family;
		background-image: none;
		margin: 0;
		height: auto;
		resize: none;
		font-size: inherit;

		&::-webkit-input-placeholder,
		&::placeholder {
			color: inherit;
			opacity: 0.5;
			font-family: inherit;
			font-size: inherit;
			vertical-align: middle;
		}
	}

	&.words {
		padding-bottom: @mp-lg+ @mp-xs;

		.mvi-input-words {
			position: absolute;
			bottom: @mp-xs;
			right: @mp-sm;
			width: 100%;
			line-height: 1;
			text-align: right;
			color: inherit;
			opacity: 0.5;
			font-size: @font-size-small;
		}
	}

	&.medium {
		font-size: @font-size-default;

		.mvi-input,
		.mvi-input-left,
		.mvi-input-right,
		.mvi-input-clear,
		.mvi-input-label {
			height: 0.48rem;
		}

		.mvi-textarea {
			line-height: 0.48rem;
		}
	}

	&.large {
		font-size: @font-size-h6;

		.mvi-input,
		.mvi-input-left,
		.mvi-input-right,
		.mvi-input-clear,
		.mvi-input-label {
			height: 0.6rem;
		}

		.mvi-textarea {
			line-height: 0.6rem;
		}
	}
}
</style>

<template>
	<Modal ref="modal" v-model="show" @hide="modalHide" @hidding="modalHidding" @hidden="modalHidden" :width="cmpWidth" :z-index="cmpZIndex" :radius="cmpRadius" :use-padding="cmpUsePadding" :animation="cmpAnimation" @show="modalShow" @showing="modalShowing" @shown="modalShown" :timeout="cmpTimeout" :overlay-color="cmpOverlayColor" :mount-el="cmpMountEl" __ignorePadding>
		<template v-if="cmpTitle || (cmpIos && cmpMessage)" #title>
			<div v-html="cmpTitle" v-if="cmpTitle" class="mvi-dialog-title"></div>
			<div v-if="cmpMessage && cmpIos" v-html="cmpMessage" class="mvi-dialog-ios-content"></div>
		</template>
		<template #default v-if="contentShow">
			<div v-if="!cmpIos && cmpMessage" v-html="cmpMessage" class="mvi-dialog-content"></div>
			<div v-if="type == 'prompt'" class="mvi-dialog-input" :class="{ 'mvi-dialog-input-mt': !cmpIos && cmpMessage }">
				<input ref="input" :type="cmpInput.type == 'number' ? 'text' : cmpInput.type" :placeholder="cmpInput.placeholder" :maxlength="cmpInput.maxlength" :class="inputClass" :style="inputStyle" v-model.trim="value" @input="inputFun" @focus="inputFocus" @blur="inputBlur" :inputmode="inputMode" />
				<Icon v-if="cmpInput.clearable" ref="icon" v-show="showClear" type="times-o" class="mvi-dialog-times" @click="doClear" />
			</div>
		</template>
		<template #footer>
			<div class="mvi-dialog-footer">
				<div v-if="type != 'alert'" class="mvi-dialog-cancel" v-text="cmpBtnText[1]" @click="cancelFun" :style="{ color: cmpBtnColor[1] || '' }"></div>
				<div class="mvi-dialog-ok" v-text="type == 'alert' ? cmpBtnText : cmpBtnText[0]" @click="okFun" :style="{ color: type == 'alert' ? cmpBtnColor || '' : cmpBtnColor[0] || '' }"></div>
			</div>
		</template>
	</Modal>
</template>

<script>
import { Dap } from '../dap'
import { Modal } from '../modal'
import { Icon } from '../icon'
export default {
	name: 'm-dialog',
	data() {
		return {
			//点击的是否是确定按钮
			ok: false,
			//对话框是否打开，默认为true，即挂载就显示
			show: true,
			//输入框是否已经获得了焦点
			focus: false,
			//输入框的值
			value: ''
		}
	},
	props: {
		//弹窗类型
		type: {
			type: String,
			default: null
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//描述
		message: {
			default: ''
		},
		//宽度
		width: {
			type: String,
			default: null
		},
		//遮罩z-index
		zIndex: {
			type: Number,
			default: null
		},
		//动画
		animation: {
			type: String,
			default: null
		},
		//圆角
		radius: {
			type: String,
			default: null
		},
		//遮罩层颜色
		overlayColor: {
			type: String,
			default: null
		},
		//是否点击遮罩可关闭
		closable: {
			type: Boolean,
			default: null
		},
		//输入框配置
		input: {
			type: Object,
			default: null
		},
		//滚动条考虑
		usePadding: {
			type: Boolean,
			default: null
		},
		//按钮文本
		btnText: {
			type: [String, Array],
			default: null
		},
		//按钮颜色
		btnColor: {
			type: [String, Array],
			default: null
		},
		//是否ios风格
		ios: {
			type: Boolean,
			default: null
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//动画时长
		timeout: {
			type: Number,
			default: null
		},
		//弹窗移除方法
		__remove: {
			type: Function,
			default: function () {
				return function () {}
			}
		}
	},
	computed: {
		$$el() {
			return this.$refs.modal.$$el
		},
		//显示的标题
		cmpTitle() {
			if (typeof this.title == 'string') {
				return this.title
			}
			return '提示'
		},
		//显示的信息
		cmpMessage() {
			if (typeof this.message == 'string') {
				return this.message
			}
			if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			}
			return String(this.message)
		},
		//按钮文本
		cmpBtnText() {
			let bt = null
			if (this.type == 'alert') {
				if (typeof this.btnText == 'string') {
					bt = this.btnText
				} else {
					bt = '确定'
				}
			} else {
				bt = []
				if (this.btnText instanceof Array) {
					if (typeof this.btnText[0] == 'string') {
						bt[0] = this.btnText[0]
					} else {
						bt[0] = '确定'
					}
					if (typeof this.btnText[1] == 'string') {
						bt[1] = this.btnText[1]
					} else {
						bt[1] = '取消'
					}
				} else {
					bt = ['确定', '取消']
				}
			}
			return bt
		},
		//按钮文本颜色
		cmpBtnColor() {
			let bt = null
			if (this.type == 'alert') {
				if (typeof this.btnColor == 'string') {
					bt = this.btnColor
				} else {
					bt = null
				}
			} else {
				bt = []
				if (this.btnColor instanceof Array) {
					if (typeof this.btnColor[0] == 'string') {
						bt[0] = this.btnColor[0]
					} else {
						bt[0] = null
					}
					if (typeof this.btnColor[1] == 'string') {
						bt[1] = this.btnColor[1]
					} else {
						bt[1] = null
					}
				} else {
					bt = [null, null]
				}
			}
			return bt
		},
		//宽度
		cmpWidth() {
			if (typeof this.width == 'string' && this.width) {
				return this.width
			}
			return '5.6rem'
		},
		//输入框配置
		cmpInput() {
			let input = {
				placeholder: '',
				type: 'text',
				autofocus: true,
				maxlength: -1,
				clearable: true,
				mode: false,
				align: 'left',
				value: ''
			}
			if (Dap.common.isObject(this.input)) {
				if (typeof this.input.placeholder == 'string') {
					input.placeholder = this.input.placeholder
				}
				if (typeof this.input.type == 'string' && this.input.type) {
					input.type = this.input.type
				}
				if (typeof this.input.autofocus == 'boolean') {
					input.autofocus = this.input.autofocus
				}
				if (Dap.number.isNumber(this.input.maxlength)) {
					input.maxlength = this.input.maxlength
				}
				if (typeof this.input.clearable == 'boolean') {
					input.clearable = this.input.clearable
				}
				if (typeof this.input.mode == 'string') {
					input.mode = this.input.mode
				}
				if (typeof this.input.align == 'string') {
					input.align = this.input.align
				}
				if (typeof this.input.value == 'string' || Dap.number.isNumber(this.input.value)) {
					input.value = this.input.value.toString()
				}
			}
			return input
		},
		//层级
		cmpZIndex() {
			if (Dap.number.isNumber(this.zIndex)) {
				return this.zIndex
			}
			return 1000
		},
		//是否考虑滚动条影响
		cmpUsePadding() {
			if (typeof this.usePadding == 'boolean') {
				return this.usePadding
			}
			return false
		},
		//动画效果
		cmpAnimation() {
			if (typeof this.animation == 'string' && this.animation) {
				return this.animation
			}
			return 'narrow'
		},
		//圆角
		cmpRadius() {
			if (typeof this.radius == 'string' && this.radius) {
				return this.radius
			}
			return '0.2rem'
		},
		//遮罩层颜色
		cmpOverlayColor() {
			if (typeof this.overlayColor == 'string' && this.overlayColor) {
				return this.overlayColor
			}
			if (this.cmpIos) {
				return 'rgba(0,10,20,.3)'
			}
			return null
		},
		//是否ios样式
		cmpIos() {
			if (typeof this.ios == 'boolean') {
				return this.ios
			}
			return false
		},
		//挂载元素
		cmpMountEl() {
			if (typeof this.mountEl == 'string' && this.mountEl) {
				return this.mountEl
			}
			return 'body'
		},
		//点击背景是否可关闭
		cmpClosable() {
			if (typeof this.closable == 'boolean') {
				return this.closable
			} else {
				return false
			}
		},
		//动画时长
		cmpTimeout() {
			if (Dap.number.isNumber(this.timeout)) {
				return this.timeout
			}
			return 200
		},
		//内容是否显示
		contentShow() {
			if (this.type == 'alert' || this.type == 'confirm') {
				if (this.cmpMessage && !this.cmpIos) {
					return true
				}
				return false
			}
			return true
		},
		//是否显示输入框内的清除框
		showClear() {
			return this.focus && this.value
		},
		//输入框class
		inputClass() {
			let cls = []
			if (this.showClear && this.cmpInput.clearable) {
				cls.push('mvi-dialog-input-padding')
			}
			return cls
		},
		//输入模式
		inputMode() {
			let mode = false
			if ([false, 'none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(this.cmpInput.mode)) {
				mode = this.cmpInput.mode
			}
			return mode
		},
		//输入框样式
		inputStyle() {
			let style = {}
			if (['left', 'right', 'center'].includes(this.cmpInput.align)) {
				style.textAlign = this.cmpInput.align
			}
			return style
		}
	},
	components: {
		Icon,
		Modal
	},
	created() {
		//输入框存在时设置默认值
		if (this.type == 'prompt') {
			this.setDefaultValue()
		}
	},
	mounted() {
		Dap.event.on(this.$$el, 'click.dialog', this.overlayClick)
	},
	methods: {
		//点击遮罩层关闭
		overlayClick(event) {
			if (!this.cmpClosable) {
				return
			}
			if (event.target != event.currentTarget) {
				return
			}
			this.show = false
			this.ok = false
		},
		//设置输入框默认值
		setDefaultValue() {
			let value = this.cmpInput.value
			if (this.cmpInput.type == 'number') {
				value = value.replace(/\D/g, '')
			}
			if (this.cmpInput.maxlength > 0 && value.length > this.cmpInput.maxlength) {
				value = value.substring(0, this.cmpInput.maxlength)
			}
			this.value = value
		},
		//获取焦点
		inputFocus() {
			this.focus = true
		},
		//失去焦点
		inputBlur() {
			setTimeout(() => {
				this.focus = false
			}, 200)
		},
		//输入监听
		inputFun() {
			let value = this.value
			if (this.cmpInput.type == 'number') {
				value = value.replace(/\D/g, '')
			}
			if (this.cmpInput.maxlength > 0 && value.length > this.cmpInput.maxlength) {
				value = value.substr(0, this.cmpInput.maxlength)
			}
			this.value = value
		},
		//清除输入框的值
		doClear() {
			if (!this.cmpInput.clearable) {
				return
			}
			setTimeout(() => {
				this.value = ''
				this.$refs.input.focus()
			}, 210)
		},
		//确定
		okFun() {
			this.show = false
			this.ok = true
		},
		//取消
		cancelFun() {
			this.show = false
			this.ok = false
		},
		//模态框隐藏前
		modalHide(el) {
			if (typeof this.dialogComponentWatch == 'function') {
				this.dialogComponentWatch.apply(this, ['hide', this.type, el])
			}
		},
		//模态框隐藏时
		modalHidding(el) {
			if (typeof this.dialogComponentWatch == 'function') {
				this.dialogComponentWatch.apply(this, ['hidding', this.type, el])
			}
		},
		//模态框隐藏后
		modalHidden(el) {
			if (typeof this.dialogComponentWatch == 'function') {
				this.dialogComponentWatch.apply(this, ['hidden', this.type, el])
			}
			if (this.type == 'alert') {
				this.__remove()
			} else if (this.type == 'confirm') {
				this.__remove(this.ok)
			} else if (this.type == 'prompt') {
				this.__remove(this.ok, this.value)
			}
		},
		//模态框显示前
		modalShow(el) {
			if (typeof this.dialogComponentWatch == 'function') {
				this.dialogComponentWatch.apply(this, ['show', this.type, el])
			}
		},
		//模态框显示时
		modalShowing(el) {
			if (typeof this.dialogComponentWatch == 'function') {
				this.dialogComponentWatch.apply(this, ['showing', this.type, el])
			}
		},
		//模态框显示后
		modalShown(el) {
			//输入框获取焦点
			if (this.type == 'prompt' && this.cmpInput.autofocus && this.$refs.input) {
				this.$refs.input.focus()
			}
			if (typeof this.dialogComponentWatch == 'function') {
				this.dialogComponentWatch.apply(this, ['shown', this.type, el])
			}
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-dialog-title {
	display: block;
	width: 100%;
	text-align: center;
	font-size: @font-size-h6;
	color: @font-color-default;
	font-weight: bold;
	line-height: 1.5;
}

.mvi-dialog-content {
	text-align: center;
	color: @font-color-default;
	line-height: 1.5;
	font-size: @font-size-default;
}

.mvi-dialog-footer {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: @medium-height;
}

.mvi-dialog-ios-content {
	display: block;
	width: 100%;
	font-size: @font-size-small;
	font-weight: normal;
	text-align: center;
	color: @font-color-default;
	line-height: 1.5;
	margin-top: @mp-sm;
}

.mvi-dialog-input {
	display: block;
	width: 100%;
	position: relative;

	&.mvi-dialog-input-mt {
		margin-top: @mp-md;
	}
}

.mvi-dialog-input > input {
	display: block;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	width: 90%;
	height: @small-height;
	line-height: 1.5;
	border-radius: @radius-default;
	border: 1px solid @border-color;
	color: @font-color-default;
	font-size: @font-size-default;
	padding: 0 @mp-sm 0 @mp-sm;
	background-color: #fff;
	margin-left: 5%;

	&::placeholder,
	&::-webkit-input-placeholder {
		opacity: 0.5;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		vertical-align: middle;
	}

	&.mvi-dialog-input-padding {
		padding-right: @mp-sm * 3;
	}
}

.mvi-dialog-times {
	position: absolute;
	top: 50%;
	right: ~'calc(5% + @{mp-sm})';
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	color: @font-color-mute;
	cursor: pointer;
}

.mvi-dialog-ok {
	position: relative;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	font-size: @font-size-h6;
	color: @primary-normal;
	flex: 1;
	cursor: pointer;
	font-weight: bold;
	user-select: none;
}

.mvi-dialog-cancel {
	position: relative;
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	font-size: @font-size-h6;
	width: 50%;
	border-right: 1px solid @border-color;
	color: @primary-normal;
	cursor: pointer;
	user-select: none;
}

.mvi-dialog-ok:active::before,
.mvi-dialog-cancel:active::before {
	.mvi-active();
}
</style>

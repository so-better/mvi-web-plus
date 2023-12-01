<template>
	<Modal ref="modal" v-model="show" :show-times="cmpShowTimes" @hide="modalHide" @hidding="modalHidding" @hidden="modalHidden" :width="cmpWidth" :z-index="cmpZIndex" :radius="cmpRadius" :use-padding="cmpUsePadding" :animation="cmpAnimation" @show="modalShow" @showing="modalShowing" @shown="modalShown" :timeout="cmpTimeout" :overlay-color="cmpOverlayColor" :mount-el="cmpMountEl" :center="cmpCenter">
		<template v-if="cmpTitle" #title>
			<div v-html="cmpTitle" class="mvi-dialog-title"></div>
		</template>
		<template #default v-if="contentShow">
			<div v-if="cmpMessage" v-html="cmpMessage" :class="['mvi-dialog-content', center ? 'center' : '']"></div>
			<div v-if="type == 'Prompt'" class="mvi-dialog-input">
				<input ref="input" :type="cmpInput.type == 'number' ? 'text' : cmpInput.type" :placeholder="cmpInput.placeholder" :maxlength="cmpInput.maxlength" :class="inputClass" :style="inputStyle" v-model.trim="value" @input="inputFun" @focus="inputFocus" @blur="inputBlur" @keyup.enter="okFun" />
				<Icon v-if="cmpInput.clearable" ref="icon" v-show="showClear" type="times-o" class="mvi-dialog-times" @click="doClear" />
			</div>
			<div :class="['mvi-dialog-footer', center ? 'center' : '']">
				<Button v-if="type != 'Alert'" :type="cmpBtns.cancel.type" :color="cmpBtns.cancel.color" :sub-color="cmpBtns.cancel.subColor" :plain="cmpBtns.cancel.plain" class="mvi-dialog-cancel" @click="cancelFun" :size="cmpBtns.cancel.size" :round="cmpBtns.cancel.round" :square="cmpBtns.cancel.square" :loading="cmpBtns.cancel.loading" :load-text="cmpBtns.cancel.loadText" :load-icon="cmpBtns.cancel.loadIcon" :disabled="cmpBtns.cancel.disabled">{{ cmpBtns.cancel.text }}</Button>
				<Button :type="cmpBtns.ok.type" :color="cmpBtns.ok.color" :sub-color="cmpBtns.ok.subColor" :plain="cmpBtns.ok.plain" @click="okFun" :size="cmpBtns.ok.size" :round="cmpBtns.ok.round" :square="cmpBtns.ok.square" :loading="cmpBtns.ok.loading" :load-text="cmpBtns.ok.loadText" :load-icon="cmpBtns.ok.loadIcon" :disabled="cmpBtns.ok.disabled">{{ cmpBtns.ok.text }}</Button>
			</div>
		</template>
	</Modal>
</template>

<script>
import { Dap } from '../dap'
import { Modal } from '../modal'
import { Icon } from '../icon'
import { Button } from '../button'
export default {
	name: 'm-dialog-pc',
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
		//遮罩层z-index
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
		//是否居中
		center: {
			type: Boolean,
			default: false
		},
		//滚动条考虑
		usePadding: {
			type: Boolean,
			default: null
		},
		//按钮配置
		btns: {
			type: Object,
			default: null
		},
		//关闭按钮是否显示
		showTimes: {
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
		//是否显示关闭图标
		cmpShowTimes() {
			if (typeof this.showTimes == 'boolean') {
				return this.showTimes
			}
			return true
		},
		//标题
		cmpTitle() {
			if (typeof this.title == 'string') {
				return this.title
			}
			return '提示'
		},
		//信息内容
		cmpMessage() {
			if (typeof this.message == 'string') {
				return this.message
			}
			if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			}
			return String(this.message)
		},
		//按钮配置
		cmpBtns() {
			let btns = {
				ok: {
					type: 'primary',
					color: null,
					subColor: null,
					plain: false,
					text: '确定',
					size: 'medium',
					round: false,
					square: false,
					disabled: false,
					loading: false,
					loadText: 'loading...',
					loadIcon: {
						type: 'load-e',
						spin: true
					}
				},
				cancel: {
					type: 'default',
					color: null,
					subColor: null,
					plain: false,
					text: '取消',
					size: 'medium',
					round: false,
					square: false,
					disabled: false,
					loading: false,
					loadText: 'loading...',
					loadIcon: {
						type: 'load-e',
						spin: true
					}
				}
			}
			if (Dap.common.isObject(this.btns)) {
				if (Dap.common.isObject(this.btns.ok)) {
					if (typeof this.btns.ok.type == 'string') {
						btns.ok.type = this.btns.ok.type
					}
					if (typeof this.btns.ok.color == 'string') {
						btns.ok.color = this.btns.ok.color
					}
					if (typeof this.btns.ok.subColor == 'string') {
						btns.ok.subColor = this.btns.ok.subColor
					}
					if (typeof this.btns.ok.plain == 'boolean') {
						btns.ok.plain = this.btns.ok.plain
					}
					if (typeof this.btns.ok.text == 'string') {
						btns.ok.text = this.btns.ok.text
					}
					if (typeof this.btns.ok.size == 'string') {
						btns.ok.size = this.btns.ok.size
					}
					if (typeof this.btns.ok.round == 'boolean') {
						btns.ok.round = this.btns.ok.round
					}
					if (typeof this.btns.ok.square == 'boolean') {
						btns.ok.square = this.btns.ok.square
					}
					if (typeof this.btns.ok.disabled == 'boolean') {
						btns.ok.disabled = this.btns.ok.disabled
					}
					if (typeof this.btns.ok.loading == 'boolean') {
						btns.ok.loading = this.btns.ok.loading
					}
					if (typeof this.btns.ok.loadText == 'string') {
						btns.ok.loadText = this.btns.ok.loadText
					}
					if (typeof this.btns.ok.loadIcon == 'string' || Dap.common.isObject(this.btns.ok.loadIcon)) {
						btns.ok.loadIcon = this.btns.ok.loadIcon
					}
				}
				if (Dap.common.isObject(this.btns.cancel)) {
					if (typeof this.btns.cancel.type == 'string') {
						btns.cancel.type = this.btns.cancel.type
					}
					if (typeof this.btns.cancel.color == 'string') {
						btns.cancel.color = this.btns.cancel.color
					}
					if (typeof this.btns.cancel.subColor == 'string') {
						btns.cancel.subColor = this.btns.cancel.subColor
					}
					if (typeof this.btns.cancel.plain == 'boolean') {
						btns.cancel.plain = this.btns.cancel.plain
					}
					if (typeof this.btns.cancel.text == 'string') {
						btns.cancel.text = this.btns.cancel.text
					}
					if (typeof this.btns.cancel.size == 'string') {
						btns.cancel.size = this.btns.cancel.size
					}
					if (typeof this.btns.cancel.round == 'boolean') {
						btns.cancel.round = this.btns.cancel.round
					}
					if (typeof this.btns.cancel.square == 'boolean') {
						btns.cancel.square = this.btns.cancel.square
					}
					if (typeof this.btns.cancel.disabled == 'boolean') {
						btns.cancel.disabled = this.btns.cancel.disabled
					}
					if (typeof this.btns.cancel.loading == 'boolean') {
						btns.cancel.loading = this.btns.cancel.loading
					}
					if (typeof this.btns.cancel.loadText == 'string') {
						btns.cancel.loadText = this.btns.cancel.loadText
					}
					if (typeof this.btns.cancel.loadIcon == 'string' || Dap.common.isObject(this.btns.cancel.loadIcon)) {
						btns.cancel.loadIcon = this.btns.cancel.loadIcon
					}
				}
			}
			return btns
		},
		//宽度
		cmpWidth() {
			if (typeof this.width == 'string' && this.width) {
				return this.width
			}
			return '7.2rem'
		},
		//输入框配置
		cmpInput() {
			let input = {
				placeholder: '',
				type: 'text',
				autofocus: true,
				maxlength: -1,
				clearable: false,
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
		//动画
		cmpAnimation() {
			if (typeof this.animation == 'string' && this.animation) {
				return this.animation
			}
			return 'translate-top'
		},
		//圆角
		cmpRadius() {
			if (typeof this.radius == 'string' && this.radius) {
				return this.radius
			}
			return '0.12rem'
		},
		//遮罩层颜色
		cmpOverlayColor() {
			if (typeof this.overlayColor == 'string' && this.overlayColor) {
				return this.overlayColor
			}
			return null
		},
		//点击背景是否可关闭
		cmpClosable() {
			if (typeof this.closable == 'boolean') {
				return this.closable
			}
			return false
		},
		//内容是否居中
		cmpCenter() {
			if (typeof this.center == 'boolean') {
				return this.center
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
		//动画时长
		cmpTimeout() {
			if (Dap.number.isNumber(this.timeout)) {
				return this.timeout
			}
			return 200
		},
		//信息内容是否显示
		contentShow() {
			if (this.type == 'Alert' || this.type == 'Confirm') {
				if (this.cmpMessage) {
					return true
				}
				return false
			}
			return true
		},
		//显示清除图标
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
		Modal,
		Button
	},
	created() {
		//输入框存在时设置默认值
		if (this.type == 'Prompt') {
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
				value = value.substring(0, this.cmpInput.maxlength)
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
			if (this.type == 'Alert') {
				this.__remove()
			} else if (this.type == 'Confirm') {
				this.__remove(this.ok)
			} else if (this.type == 'Prompt') {
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
			if (this.type == 'Prompt' && this.cmpInput.autofocus && this.$refs.input) {
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
	font-size: @font-size-h6;
	color: @font-color-default;
	font-weight: bold;
	line-height: 1.5;
}

.mvi-dialog-content {
	color: @font-color-default;
	line-height: 1.5;
	font-size: @font-size-default;
	padding: @mp-md 0;

	&.center {
		text-align: center;
	}
}

.mvi-dialog-input {
	display: block;
	width: 100%;
	position: relative;

	input {
		display: block;
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		width: 100%;
		height: @medium-height;
		line-height: 1.5;
		border-radius: @radius-default;
		border: 1px solid @border-color;
		color: @font-color-default;
		font-size: @font-size-default;
		background-color: #fff;
		padding: 0 @mp-sm;

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
}
.mvi-dialog-times {
	position: absolute;
	top: 50%;
	right: @mp-sm;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	color: @font-color-mute;
	cursor: pointer;
}

.mvi-dialog-footer {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 @mp-sm;
	margin-top: @mp-lg;

	.mvi-dialog-cancel {
		margin-right: @mp-md;
	}

	&.center {
		justify-content: center;
	}
}
</style>

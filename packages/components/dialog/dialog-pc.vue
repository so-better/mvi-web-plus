<template>
	<Modal ref="modalRef" v-model="show" :show-times="cmpShowTimes" @hide="modalHide" @hidding="modalHidding" @hidden="modalHidden" :width="cmpWidth" :z-index="cmpZIndex" :radius="cmpRadius" :use-padding="cmpUsePadding" :animation="cmpAnimation" @show="modalShow" @showing="modalShowing" @shown="modalShown" :timeout="cmpTimeout" :overlay-color="cmpOverlayColor" :mount-el="cmpMountEl" :center="cmpCenter">
		<template v-if="cmpTitle" #title>
			<div v-html="cmpTitle" class="mvi-dialog-title"></div>
		</template>
		<template #default v-if="contentShow">
			<div v-if="cmpMessage" v-html="cmpMessage" class="mvi-dialog-content" :class="{ center: center }"></div>
			<div v-if="type == 'Prompt'" class="mvi-dialog-input">
				<input ref="inputRef" :type="cmpInput.type == 'number' ? 'text' : cmpInput.type" :placeholder="cmpInput.placeholder" :maxlength="cmpInput.maxlength" :class="inputClass" :style="inputStyle" v-model.trim="value" @input="inputFun" @focus="inputFocus" @blur="inputBlur" @keyup.enter="okFun" :inputMode="inputMode" />
				<Icon v-if="cmpInput.clearable" v-show="showClear" type="times-o" class="mvi-dialog-times" @click="doClear" />
			</div>
			<div class="mvi-dialog-footer" :class="{ center: center }">
				<Button v-if="type != 'Alert'" :type="cmpBtns.cancel.type" :plain="cmpBtns.cancel.plain" class="mvi-dialog-cancel" @click="cancelFun" :size="cmpBtns.cancel.size" :round="cmpBtns.cancel.round" :square="cmpBtns.cancel.square" :loading="cmpBtns.cancel.loading" :load-text="cmpBtns.cancel.loadText" :load-icon="cmpBtns.cancel.loadIcon" :disabled="cmpBtns.cancel.disabled">{{ cmpBtns.cancel.text }}</Button>
				<Button :type="cmpBtns.ok.type" :plain="cmpBtns.ok.plain" @click="okFun" :size="cmpBtns.ok.size" :round="cmpBtns.ok.round" :square="cmpBtns.ok.square" :loading="cmpBtns.ok.loading" :load-text="cmpBtns.ok.loadText" :load-icon="cmpBtns.ok.loadIcon" :disabled="cmpBtns.ok.disabled">{{ cmpBtns.ok.text }}</Button>
			</div>
		</template>
	</Modal>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Modal } from '../modal'
import { Icon } from '../icon'
import { Button } from '../button'
import { DialogInputType, DialogPcBtnsType, DialogPcProps } from './props'
import { DefineComponent, computed, getCurrentInstance, onMounted, ref } from 'vue'

defineOptions({
	name: 'm-dialog-pc'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(DialogPcProps)

//点击的是否是确定按钮
const ok = ref<boolean>(false)
//对话框是否打开，默认为true，即挂载就显示
const show = ref<boolean>(true)
//输入框是否已经获得了焦点
const focus = ref<boolean>(false)
//输入框的值
const value = ref<string>('')

const modalRef = ref<DefineComponent | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const $$el = computed<HTMLElement>(() => {
	return modalRef.value!.$$el
})
//是否显示关闭图标
const cmpShowTimes = computed<boolean>(() => {
	if (typeof props.showTimes == 'boolean') {
		return props.showTimes
	}
	return true
})
//显示的标题
const cmpTitle = computed<string>(() => {
	if (typeof props.title == 'string') {
		return props.title
	}
	return '提示'
})
//显示的信息
const cmpMessage = computed<string>(() => {
	if (typeof props.message == 'string') {
		return props.message
	}
	if (Dap.common.isObject(props.message)) {
		return JSON.stringify(props.message)
	}
	return String(props.message)
})
//按钮配置
const cmpBtns = computed<DialogPcBtnsType>(() => {
	let btns: DialogPcBtnsType = {
		ok: {
			type: 'primary',
			plain: false,
			size: 'medium',
			text: '确定',
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
			plain: false,
			size: 'medium',
			text: '取消',
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
	if (Dap.common.isObject(props.btns)) {
		if (Dap.common.isObject(props.btns.ok)) {
			if (typeof props.btns.ok.type == 'string') {
				btns.ok.type = props.btns.ok.type
			}
			if (typeof props.btns.ok.plain == 'boolean') {
				btns.ok.plain = props.btns.ok.plain
			}
			if (typeof props.btns.ok.text == 'string') {
				btns.ok.text = props.btns.ok.text
			}
			if (typeof props.btns.ok.size == 'string') {
				btns.ok.size = props.btns.ok.size
			}
			if (typeof props.btns.ok.round == 'boolean') {
				btns.ok.round = props.btns.ok.round
			}
			if (typeof props.btns.ok.square == 'boolean') {
				btns.ok.square = props.btns.ok.square
			}
			if (typeof props.btns.ok.disabled == 'boolean') {
				btns.ok.disabled = props.btns.ok.disabled
			}
			if (typeof props.btns.ok.loading == 'boolean') {
				btns.ok.loading = props.btns.ok.loading
			}
			if (typeof props.btns.ok.loadText == 'string') {
				btns.ok.loadText = props.btns.ok.loadText
			}
			if (typeof props.btns.ok.loadIcon == 'string' || Dap.common.isObject(props.btns.ok.loadIcon)) {
				btns.ok.loadIcon = props.btns.ok.loadIcon
			}
		}
		if (Dap.common.isObject(props.btns.cancel)) {
			if (typeof props.btns.cancel.type == 'string') {
				btns.cancel.type = props.btns.cancel.type
			}
			if (typeof props.btns.cancel.plain == 'boolean') {
				btns.cancel.plain = props.btns.cancel.plain
			}
			if (typeof props.btns.cancel.text == 'string') {
				btns.cancel.text = props.btns.cancel.text
			}
			if (typeof props.btns.cancel.size == 'string') {
				btns.cancel.size = props.btns.cancel.size
			}
			if (typeof props.btns.cancel.round == 'boolean') {
				btns.cancel.round = props.btns.cancel.round
			}
			if (typeof props.btns.cancel.square == 'boolean') {
				btns.cancel.square = props.btns.cancel.square
			}
			if (typeof props.btns.cancel.disabled == 'boolean') {
				btns.cancel.disabled = props.btns.cancel.disabled
			}
			if (typeof props.btns.cancel.loading == 'boolean') {
				btns.cancel.loading = props.btns.cancel.loading
			}
			if (typeof props.btns.cancel.loadText == 'string') {
				btns.cancel.loadText = props.btns.cancel.loadText
			}
			if (typeof props.btns.cancel.loadIcon == 'string' || Dap.common.isObject(props.btns.cancel.loadIcon)) {
				btns.cancel.loadIcon = props.btns.cancel.loadIcon
			}
		}
	}
	return btns
})
//宽度
const cmpWidth = computed<string>(() => {
	if (typeof props.width == 'string' && props.width) {
		return props.width
	}
	return '7.2rem'
})
//输入框配置
const cmpInput = computed<DialogInputType>(() => {
	let input: DialogInputType = {
		placeholder: '',
		type: 'text',
		autofocus: true,
		maxlength: -1,
		clearable: true,
		mode: 'text',
		align: 'left',
		value: ''
	}
	if (Dap.common.isObject(props.input)) {
		if (typeof props.input.placeholder == 'string') {
			input.placeholder = props.input.placeholder
		}
		if (typeof props.input.type == 'string' && props.input.type) {
			input.type = props.input.type
		}
		if (typeof props.input.autofocus == 'boolean') {
			input.autofocus = props.input.autofocus
		}
		if (Dap.number.isNumber(props.input.maxlength)) {
			input.maxlength = props.input.maxlength
		}
		if (typeof props.input.clearable == 'boolean') {
			input.clearable = props.input.clearable
		}
		if (typeof props.input.mode == 'string') {
			input.mode = props.input.mode
		}
		if (typeof props.input.align == 'string') {
			input.align = props.input.align
		}
		if (typeof props.input.value == 'string' || Dap.number.isNumber(props.input.value)) {
			input.value = props.input.value!.toString()
		}
	}
	return input
})
//层级
const cmpZIndex = computed<number>(() => {
	if (Dap.number.isNumber(props.zIndex)) {
		return props.zIndex
	}
	return 1000
})
//是否考虑滚动条影响
const cmpUsePadding = computed<boolean>(() => {
	if (typeof props.usePadding == 'boolean') {
		return props.usePadding
	}
	return false
})
//动画效果
const cmpAnimation = computed<string>(() => {
	if (typeof props.animation == 'string' && props.animation) {
		return props.animation
	}
	return 'translate-top'
})
//圆角
const cmpRadius = computed<string>(() => {
	if (typeof props.radius == 'string' && props.radius) {
		return props.radius
	}
	return '0.12rem'
})
//遮罩层颜色
const cmpOverlayColor = computed<string>(() => {
	if (typeof props.overlayColor == 'string' && props.overlayColor) {
		return props.overlayColor
	}
	return ''
})
//点击背景是否可关闭
const cmpClosable = computed<boolean>(() => {
	if (typeof props.closable == 'boolean') {
		return props.closable
	} else {
		return false
	}
})
//内容是否居中
const cmpCenter = computed<boolean>(() => {
	if (typeof props.center == 'boolean') {
		return props.center
	}
	return false
})
//挂载元素
const cmpMountEl = computed<string>(() => {
	if (typeof props.mountEl == 'string' && props.mountEl) {
		return props.mountEl
	}
	return 'body'
})
//动画时长
const cmpTimeout = computed<number>(() => {
	if (Dap.number.isNumber(props.timeout)) {
		return props.timeout
	}
	return 200
})
//内容是否显示
const contentShow = computed<boolean>(() => {
	if (props.type == 'Alert' || props.type == 'Confirm') {
		if (cmpMessage.value) {
			return true
		}
		return false
	}
	return true
})
//是否显示输入框内的清除图标
const showClear = computed<boolean>(() => {
	return !!(focus.value && value.value)
})
//输入框class
const inputClass = computed<string[]>(() => {
	let cls: string[] = []
	if (showClear.value && cmpInput.value.clearable) {
		cls.push('mvi-dialog-input-padding')
	}
	return cls
})
//输入模式
const inputMode = computed<DialogInputType['mode']>(() => {
	let mode: DialogInputType['mode'] = 'text'
	if (['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(cmpInput.value.mode!)) {
		mode = cmpInput.value.mode!
	}
	return mode
})
//输入框样式
const inputStyle = computed<any>(() => {
	let style: any = {}
	if (['left', 'right', 'center'].includes(cmpInput.value.align!)) {
		style.textAlign = cmpInput.value.align
	}
	return style
})

//点击遮罩层关闭
const overlayClick = (event: Event) => {
	if (!cmpClosable.value) {
		return
	}
	if (event.target != event.currentTarget) {
		return
	}
	show.value = false
	ok.value = false
}
//设置输入框默认值
const setDefaultValue = () => {
	let _value = cmpInput.value.value!
	if (cmpInput.value.type == 'number') {
		_value = _value.replace(/\D/g, '')
	}
	if (cmpInput.value.maxlength! > 0 && _value.length > cmpInput.value.maxlength!) {
		_value = _value.substring(0, cmpInput.value.maxlength)
	}
	value.value = _value
}
//获取焦点
const inputFocus = () => {
	focus.value = true
}
//失去焦点
const inputBlur = () => {
	setTimeout(() => {
		focus.value = false
	}, 200)
}
//输入监听
const inputFun = () => {
	let _value = value.value
	if (cmpInput.value.type == 'number') {
		_value = _value.replace(/\D/g, '')
	}
	if (cmpInput.value.maxlength! > 0 && _value.length > cmpInput.value.maxlength!) {
		_value = _value.substring(0, cmpInput.value.maxlength)
	}
	value.value = _value
}
//清除输入框的值
const doClear = () => {
	if (!cmpInput.value.clearable) {
		return
	}
	setTimeout(() => {
		value.value = ''
		inputRef.value!.focus()
	}, 210)
}
//确定
const okFun = () => {
	show.value = false
	ok.value = true
}
//取消
const cancelFun = () => {
	show.value = false
	ok.value = false
}
//模态框隐藏前
const modalHide = (el: Element) => {
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['hide', props.type, el])
	}
}
//模态框隐藏时
const modalHidding = (el: Element) => {
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['hidding', props.type, el])
	}
}
//模态框隐藏后
const modalHidden = (el: Element) => {
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['hidden', props.type, el])
	}
	if (props.type == 'Alert') {
		props.__remove()
	} else if (props.type == 'Confirm') {
		props.__remove(ok.value)
	} else if (props.type == 'Prompt') {
		props.__remove(ok.value, value.value)
	}
}
//模态框显示前
const modalShow = (el: Element) => {
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['show', props.type, el])
	}
}
//模态框显示时
const modalShowing = (el: Element) => {
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['showing', props.type, el])
	}
}
//模态框显示后
const modalShown = (el: Element) => {
	//输入框获取焦点
	if (props.type == 'Prompt' && cmpInput.value.autofocus && inputRef.value) {
		inputRef.value.focus()
	}
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['shown', props.type, el])
	}
}

//输入框存在时设置默认值
if (props.type == 'Prompt') {
	setDefaultValue()
}
onMounted(() => {
	Dap.event.on($$el.value, 'click.dialog', overlayClick)
})

defineExpose({
	$$el
})
</script>

<style scoped src="./dialog-pc.less"></style>

<script setup name="m-dialog" lang="ts">
import Dap from 'dap-util'
import { Modal } from '../modal'
import { Icon } from '../icon'
import { DialogInputType, DialogProps } from './props'
import { DefineComponent, computed, getCurrentInstance, onMounted, ref } from 'vue'

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(DialogProps)

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
//按钮文本
const cmpBtnText = computed<string | string[]>(() => {
	let bt: string | string[] = ''
	if (props.type == 'alert') {
		if (typeof props.btnText == 'string') {
			bt = props.btnText
		} else {
			bt = '确定'
		}
	} else {
		bt = []
		if (props.btnText instanceof Array) {
			if (typeof props.btnText[0] == 'string') {
				bt[0] = props.btnText[0]
			} else {
				bt[0] = '确定'
			}
			if (typeof props.btnText[1] == 'string') {
				bt[1] = props.btnText[1]
			} else {
				bt[1] = '取消'
			}
		} else {
			bt = ['确定', '取消']
		}
	}
	return bt
})
//按钮文本颜色
const cmpBtnColor = computed<string | string[]>(() => {
	let bt: string | string[] = ''
	if (props.type == 'alert') {
		if (typeof props.btnColor == 'string') {
			bt = props.btnColor
		} else {
			bt = ''
		}
	} else {
		bt = []
		if (props.btnColor instanceof Array) {
			if (typeof props.btnColor[0] == 'string') {
				bt[0] = props.btnColor[0]
			} else {
				bt[0] = ''
			}
			if (typeof props.btnColor[1] == 'string') {
				bt[1] = props.btnColor[1]
			} else {
				bt[1] = ''
			}
		} else {
			bt = ['', '']
		}
	}
	return bt
})
//宽度
const cmpWidth = computed<string>(() => {
	if (typeof props.width == 'string' && props.width) {
		return props.width
	}
	return '5.6rem'
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
	return 'narrow'
})
//圆角
const cmpRadius = computed<string>(() => {
	if (typeof props.radius == 'string' && props.radius) {
		return props.radius
	}
	return '0.2rem'
})
//是否ios样式
const cmpIos = computed<boolean>(() => {
	if (typeof props.ios == 'boolean') {
		return props.ios
	}
	return false
})
//遮罩层颜色
const cmpOverlayColor = computed<string>(() => {
	if (typeof props.overlayColor == 'string' && props.overlayColor) {
		return props.overlayColor
	}
	if (cmpIos.value) {
		return 'rgba(0,10,20,.3)'
	}
	return ''
})
//挂载元素
const cmpMountEl = computed<string>(() => {
	if (typeof props.mountEl == 'string' && props.mountEl) {
		return props.mountEl
	}
	return 'body'
})
//点击背景是否可关闭
const cmpClosable = computed<boolean>(() => {
	if (typeof props.closable == 'boolean') {
		return props.closable
	} else {
		return false
	}
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
	if (props.type == 'alert' || props.type == 'confirm') {
		if (cmpMessage.value && !cmpIos.value) {
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
	if (props.type == 'alert') {
		props.__remove()
	} else if (props.type == 'confirm') {
		props.__remove(ok.value)
	} else if (props.type == 'prompt') {
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
	if (props.type == 'prompt' && cmpInput.value.autofocus && inputRef.value) {
		inputRef.value.focus()
	}
	if (typeof instance.appContext.config.globalProperties.dialogComponentWatch == 'function') {
		instance.appContext.config.globalProperties.dialogComponentWatch.apply(instance.proxy, ['shown', props.type, el])
	}
}

//输入框存在时设置默认值
if (props.type == 'prompt') {
	setDefaultValue()
}

onMounted(() => {
	Dap.event.on($$el.value, 'click.dialog', overlayClick)
})

defineExpose({
	$$el
})
</script>

<template>
	<Modal ref="modalRef" v-model="show" @hide="modalHide" @hidding="modalHidding" @hidden="modalHidden" :width="cmpWidth" :z-index="cmpZIndex" :radius="cmpRadius" :use-padding="cmpUsePadding" :animation="cmpAnimation" @show="modalShow" @showing="modalShowing" @shown="modalShown" :timeout="cmpTimeout" :overlay-color="cmpOverlayColor" :mount-el="cmpMountEl" __ignorePadding>
		<template v-if="cmpTitle || (cmpIos && cmpMessage)" #title>
			<div v-html="cmpTitle" v-if="cmpTitle" class="mvi-dialog-title"></div>
			<div v-if="cmpMessage && cmpIos" v-html="cmpMessage" class="mvi-dialog-ios-content"></div>
		</template>
		<template #default v-if="contentShow">
			<div v-if="!cmpIos && cmpMessage" v-html="cmpMessage" class="mvi-dialog-content"></div>
			<div v-if="type == 'prompt'" class="mvi-dialog-input" :class="{ 'mvi-dialog-input-mt': !cmpIos && cmpMessage }">
				<input ref="inputRef" :type="cmpInput.type == 'number' ? 'text' : cmpInput.type" :placeholder="cmpInput.placeholder" :maxlength="cmpInput.maxlength" :class="inputClass" :style="inputStyle" v-model.trim="value" @input="inputFun" @focus="inputFocus" @blur="inputBlur" :inputmode="inputMode" />
				<Icon v-if="cmpInput.clearable" v-show="showClear" type="times-o" class="mvi-dialog-times" @click="doClear" />
			</div>
		</template>
		<template #footer>
			<div class="mvi-dialog-footer">
				<div v-if="type != 'alert'" class="mvi-dialog-cancel" v-text="cmpBtnText[1]" @click="cancelFun" :style="{ color: cmpBtnColor[1] || '' }"></div>
				<div class="mvi-dialog-ok" v-text="type == 'alert' ? cmpBtnText : cmpBtnText[0]" @click="okFun" :style="{ color: type == 'alert' ? <string>cmpBtnColor || '' : cmpBtnColor[0] || '' }"></div>
			</div>
		</template>
	</Modal>
</template>

<style scoped src="./dialog.less"></style>

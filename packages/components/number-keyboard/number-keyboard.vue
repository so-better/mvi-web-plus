<template>
	<Overlay ref="overlayRef" v-model="cmpShow" @show="overlayShow" @hide="overlayHide" :z-index="zIndex" :color="overlayColor" :closable="closable" :timeout="timeout" :mount-el="mountEl" :use-padding="usePadding">
		<transition name="mvi-keyboard" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave" @leave="leave" @enter="enter">
			<div ref="keyboardRef" class="mvi-number-keyboard" v-if="firstShow" v-show="keyboardShow" :style="boardStyle" v-bind="$attrs">
				<div v-if="!border && (title || $slots.title)" class="mvi-number-keyboard-title">
					<slot v-if="$slots.title"></slot>
					<span v-else>{{ title }}</span>
				</div>
				<div :class="['mvi-number-keyboard-wrapper', border ? '' : 'border']">
					<div class="mvi-number-keyboard-left">
						<template v-for="(item, index) in cpmNumbers">
							<div class="mvi-number-keyboard-left-number" :class="leftNumberClass(item, index)">
								<div @click="numberClick(item)" class="mvi-number-keyboard-left-number-el" :class="{ active: active }">{{ item }}</div>
							</div>
						</template>
					</div>
					<div class="mvi-number-keyboard-right" v-if="showComplete || showDelete">
						<div class="mvi-number-keyboard-delete" :class="{ border: border }" v-if="showDelete">
							<div :disabled="deleteDisabeld || null" class="mvi-number-keyboard-delete-el" :class="{ active: active && !deleteDisabeld }" @click="deleteClick">
								<slot name="delete" v-if="$slots.delete"></slot>
								<span v-text="deleteText" v-else></span>
							</div>
						</div>
						<div class="mvi-number-keyboard-complete" :class="{ border: border }" v-if="showComplete">
							<div :disabled="promiseEmpty ? null : completeDisabled || null" class="mvi-number-keyboard-complete-el" :class="{ active: active && !(promiseEmpty ? false : completeDisabled) }" @click="completeClick">
								<slot name="complete" v-if="$slots.complete"></slot>
								<span v-text="completeText"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</Overlay>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Overlay } from '../overlay'
import { NumberKeyboardProps } from './props'
import { DefineComponent, computed, getCurrentInstance, ref } from 'vue'

//不继承属性
defineOptions({
	inheritAttrs: false,
	name: 'm-number-keyboard'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(NumberKeyboardProps)

//事件
const emits = defineEmits(['update:modelValue', 'update:show', 'input', 'delete', 'complete', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'])

//第一次显示进行渲染
const firstShow = ref<boolean>(false)
//键盘是否显示
const keyboardShow = ref<boolean>(false)
//键盘按键
const numbers = ref<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '.', '0'])
//每次打开时的键盘布局缓存
const oldNumbers = ref<string[]>([])

const overlayRef = ref<DefineComponent | null>(null)
const keyboardRef = ref<HTMLElement | null>(null)

const $$el = computed<HTMLElement>(() => {
	return overlayRef.value!.$$el
})
const cmpShow = computed<boolean>({
	set(value) {
		emits('update:show', value)
	},
	get() {
		return props.show
	}
})
const cmpValue = computed<string>({
	set(value) {
		emits('update:modelValue', value)
	},
	get() {
		if (Dap.number.isNumber(props.modelValue)) {
			return (<number>props.modelValue).toString()
		}
		return <string>props.modelValue
	}
})
const boardStyle = computed<any>(() => {
	return {
		transition: 'all ' + props.timeout + 'ms',
		zIndex: props.zIndex + 10
	}
})
const deleteDisabeld = computed<boolean>(() => {
	if (props.modelValue === '') {
		return true
	}
	return false
})
const completeDisabled = computed<boolean>(() => {
	if (props.modelValue === '') {
		return true
	}
	return false
})
const cpmNumbers = computed<string[]>(() => {
	let _numbers = numbers.value.filter(item => {
		return showKeyBoard.value(item)
	})
	if (props.random) {
		if (props.show) {
			let arr: string[] = []
			let length = _numbers.length
			for (let i = 0; i < length; i++) {
				arr.push(getRandomNumber(arr))
			}
			oldNumbers.value = [...arr]
			return arr
		}
		return oldNumbers.value
	}
	return _numbers
})
const leftNumberClass = computed<(item: string, index: number) => string[]>(() => {
	return (_item: string, index: number) => {
		let cls: string[] = []
		//最后一个数值键盘宽度不一致
		if (index == cpmNumbers.value.length - 1) {
			if (props.showX || props.showDecimal) {
				cls.push('half')
			} else {
				cls.push('full')
			}
		}
		if (props.border) {
			cls.push('border')
		}
		return cls
	}
})
const showKeyBoard = computed<(item: string) => boolean>(() => {
	return (item: string) => {
		if (item == 'X') {
			return props.showX
		}
		if (item == '.') {
			return props.showDecimal && !props.showX
		}
		return true
	}
})

//获取一个随机键盘值
const getRandomNumber = (arr: string[]): string => {
	let _numbers = numbers.value.filter(item => {
		return showKeyBoard.value(item)
	})
	let index = Math.floor(Math.random() * _numbers.length)
	if (arr.includes(_numbers[index])) {
		return getRandomNumber(arr)
	}
	return _numbers[index]
}
//遮罩层显示前
const overlayShow = () => {
	if (!firstShow.value) {
		firstShow.value = true
	}
	keyboardShow.value = true
}
//遮罩层隐藏前
const overlayHide = () => {
	keyboardShow.value = false
}
//数字点击
const numberClick = (item: string) => {
	if (cmpValue.value.length >= props.maxlength && props.maxlength > 0) {
		return
	}
	cmpValue.value += item
	emits('input', item)
}
//删除点击
const deleteClick = () => {
	if (deleteDisabeld.value) {
		return
	}
	let value = Dap.string.delete(cmpValue.value, cmpValue.value.length - 1, 1)
	cmpValue.value = value
	emits('delete', value)
}
//完成点击
const completeClick = () => {
	if (completeDisabled.value && !props.promiseEmpty) {
		return
	}
	if (props.calibration) {
		cmpValue.value = parseFloat(cmpValue.value) + '' || ''
	}
	emits('complete', cmpValue.value)
	cmpShow.value = false
}
//弹出层显示前
const beforeEnter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(el, 'mvi-keyboard-beforeEnter-trigger')) {
		return
	}
	Dap.data.set(el, 'mvi-keyboard-beforeEnter-trigger', true)
	emits('show', el)
	if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == 'function') {
		instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ['show', el])
	}
}
//弹出层显示时
const enter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(el, 'mvi-keyboard-enter-trigger')) {
		return
	}
	Dap.data.set(el, 'mvi-keyboard-enter-trigger', true)
	emits('showing', el)
	if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == 'function') {
		instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ['showing', el])
	}
}
//弹出层显示后
const afterEnter = (el: Element) => {
	emits('shown', el)
	if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == 'function') {
		instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ['shown', el])
	}
}
//弹出层隐藏前
const beforeLeave = (el: Element) => {
	//清除标记
	Dap.data.remove(el, 'mvi-keyboard-beforeEnter-trigger')
	Dap.data.remove(el, 'mvi-keyboard-enter-trigger')

	emits('hide', el)
	if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == 'function') {
		instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ['hide', el])
	}
}
//弹出层隐藏时
const leave = (el: Element) => {
	emits('hidding', el)
	if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == 'function') {
		instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ['hidding', el])
	}
}
//弹出层隐藏后
const afterLeave = (el: Element) => {
	emits('hidden', el)
	if (typeof instance.appContext.config.globalProperties.keyboardComponentWatch == 'function') {
		instance.appContext.config.globalProperties.keyboardComponentWatch.apply(instance.proxy, ['hidden', el])
	}
}

defineExpose({
	$$el
})
</script>
<style scoped src="./number-keyboard.less"></style>

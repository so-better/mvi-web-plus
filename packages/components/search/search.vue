<template>
	<div class="mvi-search" :disabled="disabled || null">
		<div v-if="label" class="mvi-search-label" v-text="label"></div>
		<div class="mvi-search-input-container" :class="{ round: round }">
			<div v-if="parseIcon(leftIcon).type || parseIcon(leftIcon).url" class="mvi-search-left-icon" @click="leftClick">
				<Icon :type="parseIcon(leftIcon).type" :url="parseIcon(leftIcon).url" :spin="parseIcon(leftIcon).spin" :size="parseIcon(leftIcon).size" :color="parseIcon(leftIcon).color" />
			</div>
			<input ref="inputRef" class="mvi-search-input" :class="{ 'left-none-radius': parseIcon(leftIcon).type || parseIcon(leftIcon).url, 'right-none-radius': parseIcon(rightIcon).type || parseIcon(rightIcon).url || (clearable && showClear) }" :type="cmpType" @keypress.enter="doSearch" autocomplete="off" :placeholder="placeholder" :maxlength="maxlength" :autofocus="autofocus" :disabled="disabled" :readonly="readonly" :inputmode="inputMode" v-model="realValue" @input="searchInput" @focus="inputFocus" @blur="inputBlur" @keydown="keydown" @keyup="keyup" :style="inputStyle" />
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
<script setup lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import { SearchProps } from './props'
import { computed, ref } from 'vue'
import { IconPropsType } from '../icon/props'

defineOptions({
	name: 'm-search'
})

//属性
const props = defineProps(SearchProps)

//事件
const emits = defineEmits(['update:modelValue', 'search', 'cancel', 'left-click', 'right-click', 'focus', 'blur', 'input', 'clear', 'keydown', 'keyup'])

const focus = ref<boolean>(false)
const inputRef = ref<HTMLElement | null>(null)

const realValue = computed<string>({
	set(value) {
		if (props.modelValue !== value) {
			emits('update:modelValue', value)
		}
	},
	get() {
		let value = props.modelValue === null ? '' : props.modelValue.toString()
		//数字类型会过滤非数字字符
		if (props.type == 'number') {
			value = value.replace(/\D/g, '')
		}
		//如果设置了maxlength，则进行字符串截取
		if (props.maxlength > 0 && value.length > props.maxlength) {
			value = value.substring(0, props.maxlength)
		}
		if (props.modelValue !== value) {
			emits('update:modelValue', value)
		}
		return value
	}
})
const parseIcon = computed<(params: string | IconPropsType) => IconPropsType>(() => {
	return (params: string | IconPropsType) => {
		let icon: IconPropsType = {
			spin: false,
			type: '',
			url: '',
			color: '',
			size: ''
		}
		if (Dap.common.isObject(params)) {
			if (typeof (<IconPropsType>params).spin == 'boolean') {
				icon.spin = (<IconPropsType>params).spin
			}
			if (typeof (<IconPropsType>params).type == 'string') {
				icon.type = (<IconPropsType>params).type
			}
			if (typeof (<IconPropsType>params).url == 'string') {
				icon.url = (<IconPropsType>params).url
			}
			if (typeof (<IconPropsType>params).color == 'string') {
				icon.color = (<IconPropsType>params).color
			}
			if (typeof (<IconPropsType>params).size == 'string') {
				icon.size = (<IconPropsType>params).size
			}
		} else if (typeof params == 'string') {
			icon.type = params
		}
		return icon
	}
})
const showClear = computed<boolean>(() => {
	if (props.disabled || props.readonly) {
		return false
	}
	if (focus.value) {
		if (realValue.value === '') {
			return false
		}
		return true
	}
	return false
})
const cmpType = computed<string>(() => {
	if (props.type == 'number') {
		return 'text'
	}
	return props.type
})
const inputStyle = computed<any>(() => {
	let style: any = {}
	if (props.align) {
		style.textAlign = props.align
	}
	if (parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url) {
		style.paddingLeft = 0
	}
	if ((props.clearable && showClear.value) || parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url) {
		style.paddingRight = 0
	}
	return style
})

//输入框键盘按下
const keydown = (e: KeyboardEvent) => {
	if (props.disabled) {
		return
	}
	emits('keydown', e, realValue.value)
}
//输入框键盘松开
const keyup = (e: KeyboardEvent) => {
	if (props.disabled) {
		return
	}
	emits('keyup', e, realValue.value)
}
//输入框获取焦点
const inputFocus = () => {
	if (props.disabled) {
		return
	}
	focus.value = true
	emits('focus', realValue.value)
}
//输入框失去焦点
const inputBlur = () => {
	if (props.disabled) {
		return
	}
	setTimeout(() => {
		focus.value = false
		emits('blur', realValue.value)
	}, 200)
}
//输入监听
const searchInput = () => {
	if (props.disabled) {
		return
	}
	emits('input', realValue.value)
}
//搜索
const doSearch = () => {
	if (props.disabled) {
		return
	}
	emits('search', realValue.value)
}
//取消
const doCancel = () => {
	if (props.disabled) {
		return
	}
	emits('cancel', realValue.value)
}
//左侧图标点击
const leftClick = () => {
	if (props.disabled) {
		return
	}
	emits('left-click', realValue.value)
}
//右侧图标点击
const rightClick = () => {
	if (props.disabled) {
		return
	}
	emits('right-click', realValue.value)
}
//清除输入框
const clearInput = () => {
	if (props.disabled) {
		return
	}
	if (!props.clearable) {
		return
	}
	setTimeout(() => {
		realValue.value = ''
		inputRef.value!.focus()
		emits('clear', realValue.value)
	}, 210)
}
</script>
<style scoped src="./search.less"></style>

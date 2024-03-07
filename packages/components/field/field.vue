<script setup name="m-field" lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import { FieldAutosizeType, FieldProps } from './props'
import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import { IconPropsType } from '../icon/props'

//属性
const props = defineProps(FieldProps)

//事件
const emits = defineEmits(['update:modelValue', 'prepend-click', 'prefix-click', 'append-click', 'suffix-click', 'focus', 'blur', 'input', 'clear', 'keydown', 'keyup'])

const focus = ref<boolean>(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
//图标转换
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
//输入框的值
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
//是否显示清除图标
const showClear = computed<boolean>(() => {
	if (props.disabled || props.readonly) {
		return false
	}
	if (realValue.value && focus.value) {
		return true
	}
	return false
})
//是否显示prefix
const showPrefix = computed<boolean>(() => {
	if (props.type == 'textarea') {
		return false
	}
	return !!(parseIcon.value(props.prefix).type || parseIcon.value(props.prefix).url || useSlots().prefix)
})
//显示suffix
const showSuffix = computed<boolean>(() => {
	if (props.type == 'textarea') {
		return false
	}
	return !!(parseIcon.value(props.suffix).type || parseIcon.value(props.suffix).url || useSlots().suffix)
})
//是否显示prepend
const showPrepend = computed<boolean>(() => {
	if (props.type == 'textarea') {
		return false
	}
	return !!(parseIcon.value(props.prepend).type || parseIcon.value(props.prepend).url || useSlots().prepend)
})
//是否显示append
const showAppend = computed<boolean>(() => {
	if (props.type == 'textarea') {
		return false
	}
	return !!(parseIcon.value(props.append).type || parseIcon.value(props.append).url || useSlots().append)
})
//清除图标样式
const clearStyle = computed<any>(() => {
	return {
		borderRadius: showSuffix.value ? 0 : '',
		paddingRight: showSuffix.value ? 0 : ''
	}
})
//输入框样式
const inputStyle = computed<any>(() => {
	return {
		paddingLeft: showPrefix.value ? 0 : '',
		paddingRight: showSuffix.value || (showClear.value && props.clearable) ? 0 : '',
		textAlign: props.align ? props.align : ''
	}
})
//输入框父容器样式
const fieldBodyStyle = computed<any>(() => {
	let style: any = {}
	if (focus.value && props.activeColor) {
		style.borderColor = props.activeColor
		const rgb = Dap.color.hex2rgb(props.activeColor)
		style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
	}
	return style
})
//输入框父容器样式类
const fieldBodyClass = computed<string[]>(() => {
	let cls: string[] = []
	if (showPrepend.value) {
		cls.push('left-none-radius')
	}
	if (showAppend.value) {
		cls.push('right-none-radius')
	}
	if (!props.activeColor && props.activeType && focus.value) {
		cls.push(props.activeType)
	}
	return cls
})
//输入框组件样式类
const fieldClass = computed<string[]>(() => {
	let cls: string[] = [props.size]
	if (props.type == 'textarea') {
		return cls
	}
	if (props.round) {
		cls.push('round')
	} else if (props.square) {
		cls.push('square')
	}
	return cls
})
//输入框的类型
const cmpType = computed<'text' | 'password' | 'tel' | 'textarea'>(() => {
	if (props.type == 'number') {
		return 'text'
	}
	return props.type
})
//文本域的rows
const rowsFilter = computed<number>(() => {
	let rows = props.rows
	if (Dap.common.isObject(props.autosize)) {
		if (Dap.number.isNumber((<FieldAutosizeType>props.autosize).minRows)) {
			if (props.rows < (<FieldAutosizeType>props.autosize).minRows!) {
				rows = (<FieldAutosizeType>props.autosize).minRows!
			}
		}
		if (Dap.number.isNumber((<FieldAutosizeType>props.autosize).maxRows)) {
			if (props.rows > (<FieldAutosizeType>props.autosize).maxRows!) {
				rows = (<FieldAutosizeType>props.autosize).maxRows!
			}
		}
	}
	return rows
})

//高度自适应设置
const autosizeSet = () => {
	textareaRef.value!.style.overflow = 'hidden'
	textareaRef.value!.style.height = 'auto'
	textareaRef.value!.scrollTop = 0
	textareaRef.value!.style.height = Dap.element.getScrollHeight(textareaRef.value!) + 'px'
}
//行数转为高度
const rows2Height = (rows: number): number => {
	let lineHeight = Math.floor(parseFloat(Dap.element.getCssStyle(textareaRef.value, 'line-height')))
	return rows * lineHeight
}
//设置最大高度和最小高度
const setMaxMinHeight = () => {
	if (Dap.common.isObject(props.autosize)) {
		if (Dap.number.isNumber((<FieldAutosizeType>props.autosize).maxRows)) {
			let maxHeight = rows2Height((<FieldAutosizeType>props.autosize).maxRows!) + parseFloat(Dap.element.getCssStyle(textareaRef.value, 'padding-top')) + parseFloat(Dap.element.getCssStyle(textareaRef.value, 'padding-bottom'))
			textareaRef.value!.style.maxHeight = maxHeight + 'px'
		}
		if (Dap.number.isNumber((<FieldAutosizeType>props.autosize).minRows)) {
			let minHeight = rows2Height((<FieldAutosizeType>props.autosize).minRows!) + parseFloat(Dap.element.getCssStyle(textareaRef.value, 'padding-top')) + parseFloat(Dap.element.getCssStyle(textareaRef.value, 'padding-bottom'))
			textareaRef.value!.style.minHeight = minHeight + 'px'
		}
	} else {
		textareaRef.value!.style.maxHeight = ''
		textareaRef.value!.style.minHeight = ''
	}
}
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
//输入框实时输入
const input = () => {
	if (props.disabled) {
		return
	}
	emits('input', realValue.value)
}
//点击前置
const prependClick = () => {
	if (props.disabled) {
		return
	}
	emits('prepend-click', realValue.value)
}
//点击前缀
const prefixClick = () => {
	if (props.disabled) {
		return
	}
	emits('prefix-click', realValue.value)
}
//点击后置
const appendClick = () => {
	if (props.disabled) {
		return
	}
	emits('append-click', realValue.value)
}
//点击后缀
const suffixClick = () => {
	if (props.disabled) {
		return
	}
	emits('suffix-click', realValue.value)
}
//清除
const doClear = () => {
	if (props.disabled) {
		return
	}
	if (!props.clearable) {
		return
	}
	setTimeout(() => {
		realValue.value = ''
		let el = inputRef.value || textareaRef.value
		el!.focus()
		emits('clear', realValue.value)
	}, 210)
}

watch(
	() => realValue.value,
	() => {
		nextTick(() => {
			if (textareaRef.value && (props.autosize === true || Dap.common.isObject(props.autosize))) {
				autosizeSet()
			}
		})
	}
)

watch(
	() => [props.rows, props.autosize],
	() => {
		nextTick(() => {
			if (textareaRef.value) {
				setMaxMinHeight()
			}
		})
	}
)

onMounted(() => {
	if (textareaRef.value) {
		setMaxMinHeight()
		if (props.autosize === true || Dap.common.isObject(props.autosize)) {
			autosizeSet()
		}
	}
})
</script>

<template>
	<div class="mvi-field" :class="fieldClass" :disabled="disabled || null" :data-type="type">
		<!-- 前置区域 -->
		<div class="mvi-field-prepend" v-if="showPrepend" @click="prependClick">
			<slot v-if="$slots.prepend" name="prepend"></slot>
			<Icon v-else :type="parseIcon(prepend).type" :url="parseIcon(prepend).url" :spin="parseIcon(prepend).spin" :size="parseIcon(prepend).size" :color="parseIcon(prepend).color" />
		</div>
		<!-- 输入主体 -->
		<div class="mvi-field-body" :class="fieldBodyClass" :style="fieldBodyStyle">
			<!-- 前缀区域 -->
			<div class="mvi-field-prefix" v-if="showPrefix" @click="prefixClick">
				<slot v-if="$slots.prefix" name="prefix"></slot>
				<Icon v-else :type="parseIcon(prefix).type" :url="parseIcon(prefix).url" :spin="parseIcon(prefix).spin" :size="parseIcon(prefix).size" :color="parseIcon(prefix).color" />
			</div>
			<!-- textarea -->
			<textarea ref="textareaRef" v-if="type == 'textarea'" :disabled="disabled" :readonly="readonly" class="mvi-field-input" :style="inputStyle" :placeholder="placeholder" v-model="realValue" autocomplete="off" @focus="inputFocus" @blur="inputBlur" :maxlength="maxlength" :name="name" :autofocus="autofocus" :rows="rowsFilter" @input="input" @keydown="keydown" @keyup="keyup"></textarea>
			<!-- input -->
			<input v-else ref="inputRef" :disabled="disabled" :readonly="readonly" :class="['mvi-field-input', showPrefix ? 'left-none-radius' : '', showSuffix || (clearable && showClear) ? 'right-none-radius' : '']" :style="inputStyle" :type="cmpType" :placeholder="placeholder" v-model="realValue" autocomplete="off" :inputmode="inputMode" @focus="inputFocus" @blur="inputBlur" :maxlength="maxlength" :name="name" :autofocus="autofocus" @input="input" @keydown="keydown" @keyup="keyup" />
			<!-- 清除图标 -->
			<div class="mvi-field-clear" v-if="clearable && type != 'textarea'" v-show="showClear" :style="clearStyle" @click="doClear">
				<Icon type="times-o" />
			</div>
			<!-- 后缀区域 -->
			<div class="mvi-field-suffix" v-if="showSuffix" @click="suffixClick">
				<slot v-if="$slots.suffix" name="suffix"></slot>
				<Icon v-else :type="parseIcon(props.suffix).type" :url="parseIcon(props.suffix).url" :spin="parseIcon(props.suffix).spin" :size="parseIcon(props.suffix).size" :color="parseIcon(props.suffix).color" />
			</div>
		</div>
		<!-- 后置区域 -->
		<div class="mvi-field-append" v-if="showAppend" @click="appendClick">
			<slot v-if="$slots.append" name="append"></slot>
			<Icon v-else :type="parseIcon(append).type" :url="parseIcon(append).url" :spin="parseIcon(append).spin" :size="parseIcon(append).size" :color="parseIcon(append).color" />
		</div>
	</div>
</template>

<style scoped src="./field.less"></style>

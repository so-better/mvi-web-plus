<script setup name="m-autocomplete" lang="ts">
import { DefineComponent, computed, getCurrentInstance, ref } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { Layer } from '../layer'
import { AutocompleteProps } from './props'
import { IconPropsType } from '../icon/props'
import { LayerPropsType } from '../layer/props'

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(AutocompleteProps)

//事件
const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'input', 'left-click', 'right-click', 'select', 'clear', 'keydown', 'keyup'])

//是否获取焦点
const focus = ref<boolean>(false)
//menu
const menuRef = ref<HTMLElement | null>(null)
//relate
const relateRef = ref<HTMLElement | null>(null)
//layer
const layerRef = ref<DefineComponent | null>(null)
//input
const inputRef = ref<HTMLElement | null>(null)

const realValue = computed<string>({
	set: value => {
		if (props.modelValue !== value) {
			emits('update:modelValue', value)
		}
	},
	get: () => {
		return props.modelValue
	}
})
const cmpFilter = computed<string[]>(() => {
	if (typeof props.filterMethod == 'function') {
		return props.filterMethod(realValue.value, props.list)
	}
	if (props.filterMethod) {
		return defaultFilter()
	}
	return props.list
})
const show = computed<boolean>(() => {
	return focus.value && cmpFilter.value.length != 0
})
const parseIcon = computed<(params: IconPropsType | string) => IconPropsType>(() => {
	return (params: IconPropsType | string) => {
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
const showClearIcon = computed<boolean>(() => {
	if (props.disabled) {
		return false
	}
	if (realValue.value && focus.value) {
		return true
	}
	return false
})
const clearStyle = computed<any>(() => {
	let style: any = {}
	if (parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url) {
		style.borderRadius = 0
	}
	return style
})
const inputStyle = computed<any>(() => {
	let style: any = {}
	if (parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url) {
		style.paddingLeft = 0
	}
	if ((showClearIcon.value && props.clearable) || parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url) {
		style.paddingRight = 0
	}
	if (props.align) {
		style.textAlign = props.align
	}
	return style
})
const relateStyle = computed<any>(() => {
	let style: any = {}
	if (props.activeColor && focus.value) {
		style.borderColor = props.activeColor
		const rgb = Dap.color.hex2rgb(props.activeColor)
		style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
	}
	return style
})
const relateClass = computed<string[]>(() => {
	let cls = []
	if (props.activeType && !props.activeColor && focus.value) {
		cls.push(props.activeType)
	}
	return cls
})
const layerRealProps = computed<LayerPropsType>(() => {
	return {
		placement: props.layerProps.placement ? props.layerProps.placement : 'bottom-start',
		width: props.layerProps.width,
		zIndex: Dap.number.isNumber(props.layerProps.zIndex) ? props.layerProps.zIndex : 400,
		offset: props.layerProps.offset ? props.layerProps.offset : '0.1rem',
		animation: props.layerProps.animation,
		timeout: Dap.number.isNumber(props.layerProps.timeout) ? props.layerProps.timeout : 200,
		showTriangle: typeof props.layerProps.showTriangle == 'boolean' ? props.layerProps.showTriangle : false,
		shadow: typeof props.layerProps.shadow == 'boolean' ? props.layerProps.shadow : true,
		border: typeof props.layerProps.border == 'boolean' ? props.layerProps.border : false,
		borderColor: props.layerProps.borderColor
	}
})

//悬浮层显示前进行宽度设置
const layerShow = () => {
	if (!layerRealProps.value.width) {
		menuRef.value!.style.width = relateRef.value!.offsetWidth + 'px'
	}
}
const rightClick = () => {
	if (props.disabled) {
		return
	}
	emits('right-click', realValue.value)
}
const leftClick = () => {
	if (props.disabled) {
		return
	}
	emits('left-click', realValue.value)
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
const input = () => {
	if (props.disabled) {
		return
	}
	focus.value = true
	layerRef.value!.update()
	emits('input', realValue.value)
}
const inputBlur = () => {
	if (props.disabled) {
		return
	}
	setTimeout(() => {
		focus.value = false
		emits('blur', realValue.value)
	}, 200)
}
const inputFocus = () => {
	if (props.disabled) {
		return
	}
	focus.value = true
	emits('focus', realValue.value)
}
const doClear = () => {
	if (props.disabled) {
		return
	}
	if (!props.clearable) {
		return
	}
	setTimeout(() => {
		realValue.value = ''
		emits('clear', '')
		inputRef.value!.focus()
	}, 210)
}
const doSelect = (item: string) => {
	if (props.disabled) {
		return
	}
	realValue.value = item
	emits('select', item)
	focus.value = false
}
//默认过滤方法
const defaultFilter = (): string[] => {
	return props.list.filter((item: string) => {
		return String(item).toLocaleLowerCase().includes(realValue.value.toLocaleLowerCase())
	})
}
</script>

<template>
	<div class="mvi-autocomplete" :class="[size, { round: round, square: !round && square }]" :disabled="disabled || null">
		<div class="mvi-autocomplete-relate" :class="relateClass" :style="relateStyle" :data-id="'mvi-autocomplete-relate-' + instance.uid" ref="relateRef">
			<div @click="leftClick" v-if="parseIcon(leftIcon).type || parseIcon(leftIcon).url" class="mvi-autocomplete-left-icon">
				<Icon :type="parseIcon(leftIcon).type" :url="parseIcon(leftIcon).url" :spin="parseIcon(leftIcon).spin" :size="parseIcon(leftIcon).size" :color="parseIcon(leftIcon).color" />
			</div>
			<input ref="inputRef" @input="input" v-model="realValue" type="text" :placeholder="placeholder" :style="inputStyle" :name="name" @focus="inputFocus" @blur="inputBlur" :disabled="disabled" autocomplete="off" @keydown="keydown" @keyup="keyup" :class="{ 'left-none-radius': parseIcon(leftIcon).type || parseIcon(leftIcon).url, 'right-none-radius': parseIcon(rightIcon).type || parseIcon(rightIcon).url || (clearable && showClearIcon) }" />
			<div @click="doClear" v-if="clearable" v-show="showClearIcon" class="mvi-autocomplete-clear" :style="clearStyle">
				<Icon type="times-o" />
			</div>
			<div class="mvi-autocomplete-right-icon" v-if="parseIcon(rightIcon).type || parseIcon(rightIcon).url" @click="rightClick">
				<Icon :type="parseIcon(rightIcon).type" :url="parseIcon(rightIcon).url" :spin="parseIcon(rightIcon).spin" :size="parseIcon(rightIcon).size" :color="parseIcon(rightIcon).color" />
			</div>
		</div>
		<Layer :model-value="show" :relate="`[data-id='mvi-autocomplete-relate-${instance.uid}']`" :placement="layerRealProps.placement" :offset="layerRealProps.offset" :z-index="layerRealProps.zIndex" ref="layerRef" :animation="layerRealProps.animation" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :timeout="layerRealProps.timeout" :closable="false" :show-triangle="layerRealProps.showTriangle" :border-color="layerRealProps.borderColor" :width="layerRealProps.width" @showing="layerShow">
			<div class="mvi-autocomplete-menu" :class="[size]" :style="{ maxHeight: height }" ref="menuRef">
				<div class="mvi-autocomplete-list" v-for="item in cmpFilter" v-text="item" @click="doSelect(item)"></div>
			</div>
		</Layer>
	</div>
</template>

<style scoped src="./autocomplete.less"></style>

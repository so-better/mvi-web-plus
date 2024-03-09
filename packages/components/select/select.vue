<template>
	<div class="mvi-select" :class="[size, { round: round, square: !round && square }]" :disabled="disabled || null">
		<div @mouseenter="hover = true" @mouseleave="hover = false" :data-id="'mvi-select-relate-' + instance.uid" class="mvi-select-relate" :class="relateClass" :style="relateStyle" ref="relateRef" @click="trigger">
			<span class="mvi-select-label" :class="{ placeholder: !selectLabel }" :data-placeholder="placeholder" v-html="selectLabel"></span>
			<!-- 清除图标 -->
			<Icon @click="doClear" class="mvi-clear-icon" type="times-o" v-if="clearable" v-show="showClearIcon" />
			<!-- 下拉图标 -->
			<Icon v-show="!clearable || !showClearIcon" class="mvi-select-icon" :class="{ active: focus }" :type="icon" />
		</div>
		<Layer v-model="focus" :relate="`[data-id='mvi-select-relate-${instance.uid}']`" :placement="layerRealProps.placement" :offset="layerRealProps.offset" :z-index="layerRealProps.zIndex" closable :show-triangle="layerRealProps.showTriangle" :animation="layerRealProps.animation" :timeout="layerRealProps.timeout" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :border-color="layerRealProps.borderColor" :width="layerRealProps.width" @showing="layerShow">
			<div class="mvi-select-menu" :class="[size]" ref="menuRef" :style="{ maxHeight: height }">
				<template v-if="cmpOptions.length">
					<div class="mvi-select-option" @click="optionClick(item)" v-for="item in cmpOptions" :disabled="item.disabled || null">
						<div class="mvi-select-option-value" v-html="item.label"></div>
						<Icon v-if="isSelect(item)" :type="parseIcon(selectedIcon).type" :spin="parseIcon(selectedIcon).spin" :size="parseIcon(selectedIcon).size" :url="parseIcon(selectedIcon).url" :color="parseIcon(selectedIcon).color" />
					</div>
				</template>
				<div v-else class="mvi-select-empty">{{ emptyText }}</div>
			</div>
		</Layer>
		<input type="hidden" :value="formData" :name="name" />
	</div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { Layer } from '../layer'
import { SelectOptionsItemType, SelectProps } from './props'
import { IconPropsType } from '../icon/props'
import { LayerPropsType } from '../layer/props'

defineOptions({
	name: 'm-select'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(SelectProps)

//事件
const emits = defineEmits(['update:modelValue', 'change', 'clear'])

const hover = ref<boolean>(false)
const focus = ref<boolean>(false)
const relateRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const formData = computed<any>(() => {
	if (props.multiple && Array.isArray(props.modelValue)) {
		return props.modelValue.join(',')
	}
	return props.modelValue
})
const relateClass = computed<string[]>(() => {
	let cls: string[] = []
	if (props.activeType && !props.activeColor && focus.value) {
		cls.push(props.activeType)
	}
	return cls
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
const cmpOptions = computed<SelectOptionsItemType[]>(() => {
	let options: SelectOptionsItemType[] = []
	props.options.forEach((opt: any) => {
		let item: SelectOptionsItemType = {}
		if (Dap.common.isObject(opt)) {
			item.label = opt[props.props.label]
			item.value = opt[props.props.value]
			item.disabled = !!opt.disabled
		} else {
			item.label = opt
			item.value = opt
			item.disabled = false
		}
		options.push(item)
	})
	return options
})
const selectLabel = computed<string>(() => {
	if (props.multiple) {
		let labels: string[] = []
		cmpOptions.value.forEach((item: SelectOptionsItemType) => {
			if (Array.isArray(props.modelValue)) {
				let flag = props.modelValue.some(i => {
					return Dap.common.equal(i, item.value)
				})
				if (flag) {
					labels.push(<string>item.label)
				}
			}
		})
		if (typeof props.filterMethod == 'function') {
			return props.filterMethod(labels)
		}
		return labels.join(' ')
	}
	let label = ''
	cmpOptions.value.forEach((item: SelectOptionsItemType) => {
		if (Dap.common.equal(props.modelValue, item.value)) {
			label = <string>item.label
		}
	})
	if (typeof props.filterMethod == 'function') {
		return props.filterMethod(label)
	}
	return label
})
const isSelect = computed<(item: SelectOptionsItemType) => boolean>(() => {
	return (item: SelectOptionsItemType) => {
		if (props.multiple) {
			let flag = props.modelValue.some((i: any) => {
				return Dap.common.equal(i, item.value)
			})
			return props.showSelected && flag
		}
		return false
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
const showClearIcon = computed<boolean>(() => {
	//多选
	if (props.multiple) {
		if (props.modelValue.length != 0 && hover.value) {
			return true
		}
		return false
	} else {
		if (props.modelValue === '' || props.modelValue === null || props.modelValue === undefined || !hover.value) {
			return false
		}
		return true
	}
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

//点击清除
const doClear = (e: Event) => {
	e.stopPropagation()
	if (props.disabled) {
		return
	}
	if (!props.clearable) {
		return
	}
	if (focus.value) {
		focus.value = false
	}
	if (props.multiple) {
		emits('update:modelValue', [])
		emits('clear', [])
	} else {
		emits('update:modelValue', null)
		emits('clear', null)
	}
}
//layer显示前进行宽度设置
const layerShow = () => {
	if (!layerRealProps.value.width) {
		menuRef.value!.style.width = relateRef.value!.offsetWidth + 'px'
	}
}
//触发选择打开或关闭
const trigger = () => {
	if (props.disabled) {
		return
	}
	focus.value = !focus.value
}
//点击选项
const optionClick = (item: SelectOptionsItemType) => {
	if (props.disabled || item.disabled) {
		return
	}
	if (props.multiple) {
		let arr = props.modelValue
		if (!Array.isArray(arr)) {
			throw new TypeError('modelValue should be an array')
		}
		let flag = arr.some(tmp => {
			return Dap.common.equal(tmp, item.value)
		})
		if (flag) {
			arr = arr.filter(tmp => {
				return !Dap.common.equal(tmp, item.value)
			})
		} else {
			arr.push(item.value)
		}
		emits('update:modelValue', arr)
		emits(
			'change',
			cmpOptions.value.filter((tmp: SelectOptionsItemType) => {
				return arr.some((tmp2: any) => {
					return Dap.common.equal(tmp.value, tmp2)
				})
			})
		)
	} else {
		emits('update:modelValue', item.value)
		emits('change', item)
		trigger()
	}
}
</script>
<style scoped src="./select.less"></style>

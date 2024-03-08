<template>
	<Popup ref="popupRef" v-model="show" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" placement="bottom" :round="round" :use-padding="usePadding" :mount-el="mountEl" :closable="closable">
		<div class="mvi-actionsheet">
			<div class="mvi-actionsheet-title" :class="[size]" v-if="title" v-text="title"></div>
			<div class="mvi-actionsheet-list">
				<div class="mvi-actionsheet-item" :class="itemClass(item)" v-for="(item, index) in options" :disabled="itemDisabled(item) || null" @click="doSelect(item, index)">
					<Loading :size="size == 'large' ? '0.5rem' : '0.4rem'" color="#bbb" v-if="item.loading || false"> </Loading>
					<div class="mvi-actionsheet-content" v-else-if="item.label || parseIcon(item.icon).type || parseIcon(item.icon).url">
						<Icon data-placement="left" v-if="(parseIcon(item.icon).type || parseIcon(item.icon).url) && item.placement != 'right'" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
						<span v-if="item.label" class="mvi-actionsheet-item-label" v-text="item.label"></span>
						<Icon data-placement="right" v-if="(parseIcon(item.icon).type || parseIcon(item.icon).url) && item.placement == 'right'" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
					</div>
				</div>
			</div>
			<div class="mvi-actionsheet-divider"></div>
			<div class="mvi-actionsheet-button" :class="[size, { active: active }]" v-if="showCancel" v-text="cancelText" @click="show = false"></div>
		</div>
	</Popup>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Popup } from '../popup'
import { Loading } from '../loading'
import { Icon } from '../icon'
import { ActionsheetProps, ActionsheetOptionsItemType } from './props'
import { DefineComponent, computed, ref } from 'vue'
import { IconPropsType } from '../icon/props'

defineOptions({
	name: 'm-actionsheet'
})

//属性
const props = defineProps(ActionsheetProps)

//事件
const emits = defineEmits(['update:modelValue', 'select'])

//popup组件
const popupRef = ref<DefineComponent | null>(null)

const $$el = computed<HTMLElement>(() => {
	return popupRef.value!.$$el
})
const show = computed<boolean>({
	get() {
		return props.modelValue
	},
	set(value) {
		emits('update:modelValue', value)
	}
})
//转换图标字段
const parseIcon = computed<(params: any) => IconPropsType>(() => {
	return (params: any) => {
		let icon: IconPropsType = {
			spin: false,
			type: '',
			url: '',
			color: '',
			size: ''
		}
		if (Dap.common.isObject(params)) {
			if (typeof params.spin == 'boolean') {
				icon.spin = params.spin
			}
			if (typeof params.type == 'string') {
				icon.type = params.type
			}
			if (typeof params.url == 'string') {
				icon.url = params.url
			}
			if (typeof params.color == 'string') {
				icon.color = params.color
			}
			if (typeof params.size == 'string') {
				icon.size = params.size
			}
		} else if (typeof params == 'string') {
			icon.type = params
		}
		return icon
	}
})
const itemClass = computed<(item: ActionsheetOptionsItemType) => string[]>(() => {
	return (item: ActionsheetOptionsItemType) => {
		let cls: string[] = [props.size]
		if (props.active && !item.loading && !item.disabled) {
			cls.push('active')
		}
		return cls
	}
})
const itemDisabled = computed<(item: ActionsheetOptionsItemType) => boolean>(() => {
	return (item: ActionsheetOptionsItemType) => {
		if (typeof item.disabled == 'boolean') {
			return item.disabled
		}
		return false
	}
})
//点击选项
const doSelect = (item: ActionsheetOptionsItemType, index: number) => {
	if (item.disabled || item.loading) {
		return
	}
	if (props.selectClose) {
		show.value = false
	}
	emits('select', { ...item }, index)
}

defineExpose({
	$$el
})
</script>
<style scoped src="./actionsheet.less"></style>

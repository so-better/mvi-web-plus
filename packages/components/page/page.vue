<template>
	<div class="mvi-page" ref="elRef">
		<div v-if="firstText || parseIcon(firstIcon).type || parseIcon(firstIcon).url" :disabled="modelValue == 1 || null" @click="pageFirst" class="mvi-page-first" :class="{ active: active && modelValue != 1 }" :style="firstStyle">
			<Icon :class="{ 'margin-right': !!firstText }" v-if="parseIcon(firstIcon).type || parseIcon(firstIcon).url" :type="parseIcon(firstIcon).type" :url="parseIcon(firstIcon).url" :spin="parseIcon(firstIcon).spin" :size="parseIcon(firstIcon).size" :color="parseIcon(firstIcon).color" />
			<span v-if="firstText" v-text="firstText"></span>
		</div>
		<div v-if="prevText || parseIcon(prevIcon).type || parseIcon(prevIcon).url" :disabled="modelValue == 1 || null" @click="pagePrev" class="mvi-page-prev" :class="{ active: active && modelValue != 1 }" :style="firstStyle">
			<Icon :class="{ 'margin-right': !!prevText }" v-if="parseIcon(prevIcon).type || parseIcon(prevIcon).url" :type="parseIcon(prevIcon).type" :url="parseIcon(prevIcon).url" :size="parseIcon(prevIcon).size" :spin="parseIcon(prevIcon).spin" :color="parseIcon(prevIcon).color" />
			<span v-if="prevText" v-text="prevText"></span>
		</div>
		<div class="mvi-page-numbers">
			<div class="mvi-page-numbers-simple" v-if="simple">{{ modelValue }} / {{ total }}</div>
			<div class="mvi-page-numbers-items" v-else>
				<!--total不超过overNumber -->
				<template v-for="item in total">
					<div v-if="total <= overNumber" class="mvi-page-numbers-item" :class="{ 'number-active': modelValue == item, active: active && modelValue != item }" v-text="item" @click="toPage(item)" :style="pageStyle(item)"></div>
				</template>
				<!-- total超过overNumber -->
				<div v-if="total > overNumber && modelValue > (overNumber - 1) / 2 + 1" class="mvi-page-numbers-item" :class="{ active: active }" @click="toPage(modelValue - (overNumber - 1))" :style="{ color: color || '' }">...</div>
				<template v-for="item in arr">
					<div v-if="total > overNumber" class="mvi-page-numbers-item" :class="{ 'number-active': modelValue == item, active: active && modelValue != item }" v-text="item" @click="toPage(item)" :style="pageStyle(item)"></div>
				</template>
				<div v-if="total > overNumber && modelValue < total - (overNumber - 1) / 2" class="mvi-page-numbers-item" :class="{ active: active }" @click="toPage(modelValue + (overNumber - 1))" :style="{ color: color || '' }">...</div>
			</div>
		</div>
		<div v-if="nextText || parseIcon(nextIcon).type || parseIcon(nextIcon).url" :disabled="modelValue == total || null" @click="pageNext" class="mvi-page-next" :class="{ active: active && modelValue != total }" :style="lastStyle">
			<span v-if="nextText" v-text="nextText"></span>
			<Icon :class="nextText ? 'margin-left' : ''" v-if="parseIcon(nextIcon).type || parseIcon(nextIcon).url" :type="parseIcon(nextIcon).type" :url="parseIcon(nextIcon).url" :size="parseIcon(nextIcon).size" :spin="parseIcon(nextIcon).spin" :color="parseIcon(nextIcon).color" />
		</div>
		<div v-if="lastText || parseIcon(lastIcon).type || parseIcon(lastIcon).url" :disabled="modelValue == total || null" @click="pageLast" class="mvi-page-last" :class="{ active: active && modelValue != total }" :style="lastStyle">
			<span v-if="lastText" v-text="lastText"></span>
			<Icon :class="{ 'margin-left': !!lastText }" v-if="parseIcon(lastIcon).type || parseIcon(lastIcon).url" :type="parseIcon(lastIcon).type" :url="parseIcon(lastIcon).url" :size="parseIcon(lastIcon).size" :spin="parseIcon(lastIcon).spin" :color="parseIcon(lastIcon).color" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, ref } from 'vue'
import { Icon, IconPropsType } from '@/components/icon'
import { PageProps } from './props'

defineOptions({
	name: 'm-page'
})

//属性
const props = defineProps(PageProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

const elRef = ref<HTMLElement | null>(null)

const pageStyle = computed<(item: number) => any>(() => {
	return (item: number) => {
		let style: any = {}
		if (props.modelValue == item) {
			if (elRef.value) {
				style.color = Dap.element.getCssStyle(elRef.value, 'background-color')
			}
			style.backgroundColor = props.color || ''
		} else {
			style.color = props.color || ''
		}
		return style
	}
})
const arr = computed<number[]>(() => {
	let arr: number[] = []
	if (props.modelValue <= (props.overNumber - 1) / 2 + 1) {
		for (let i = 0; i < props.overNumber; i++) {
			arr.push(i + 1)
		}
	} else if (props.modelValue <= props.total - (props.overNumber - 1) / 2) {
		for (let i = 0; i < (props.overNumber - 1) / 2; i++) {
			arr.push(props.modelValue - ((props.overNumber - 1) / 2 - i))
		}
		arr.push(props.modelValue)
		for (let i = 0; i < (props.overNumber - 1) / 2; i++) {
			arr.push(props.modelValue + (i + 1))
		}
	} else {
		for (let i = 0; i < props.overNumber; i++) {
			arr.push(props.total - (props.overNumber - 1 - i))
		}
	}
	return arr
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
const firstStyle = computed<any>(() => {
	let style: any = {}
	if (props.modelValue > 1 && props.color) {
		style.color = props.color
	}
	return style
})
const lastStyle = computed<any>(() => {
	let style: any = {}
	if (props.modelValue < props.total && props.color) {
		style.color = props.color
	}
	return style
})

//上一页
const pagePrev = () => {
	if (props.modelValue == 1) {
		return
	}
	let page = props.modelValue - 1
	emits('update:modelValue', page)
	emits('change', page)
}
//下一页
const pageNext = () => {
	if (props.modelValue == props.total) {
		return
	}
	let page = props.modelValue + 1
	emits('update:modelValue', page)
	emits('change', page)
}
//首页
const pageFirst = () => {
	if (props.modelValue == 1) {
		return
	}
	emits('update:modelValue', 1)
	emits('change', 1)
}
//尾页
const pageLast = () => {
	if (props.modelValue == props.total) {
		return
	}
	emits('update:modelValue', props.total)
	emits('change', props.total)
}
//指定页
const toPage = (page: number) => {
	if (props.modelValue == page) {
		return
	}
	if (page >= props.total) {
		page = props.total
	}
	if (page <= 1) {
		page = 1
	}
	emits('update:modelValue', page)
	emits('change', page)
}
</script>
<style scoped src="./page.less"></style>

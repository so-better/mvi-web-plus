<script setup name="m-image" lang="ts">
import Dap from 'dap-util'
import { Spy } from '../../directives/spy'
import { Icon } from '../icon'
import { ImageProps } from './props'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { IconPropsType } from '../icon/props'

//属性
const props = defineProps(ImageProps)

//事件
const emits = defineEmits(['success', 'error'])

//是否加载失败
const error = ref<boolean>(false)
//是否正在加载中
const loading = ref<boolean>(true)
//延迟加载显示的图片地址
const lazySrc = ref<string>('')
//是否正在延迟中
const lazying = ref<boolean>(false)
//spy对象
const spy = ref<Spy | null>(null)
//容器元素
const elRef = ref<HTMLElement | null>(null)

//转换图标字段
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
//图片容器样式
const imageStyle = computed<any>(() => {
	let style: any = {}
	if (props.round) {
		style.borderRadius = '50%'
	}
	if (props.width) {
		style.width = props.width
	}
	if (props.height) {
		style.height = props.height
	}
	return style
})
//图片类
const imgClass = computed<string>(() => {
	if (props.fit == 'contain') {
		return 'mvi-image-contain'
	}
	if (props.fit == 'cover') {
		return 'mvi-image-cover'
	}
	if (props.fit == 'none') {
		return 'mvi-image-none'
	}
	if (props.fit == 'response') {
		return 'mvi-image-response'
	}
	return 'mvi-image-fill'
})
//图片链接
const cmpSrc = computed(() => {
	if (props.lazyLoad) {
		return lazySrc.value
	} else {
		return props.src
	}
})

//延时加载方法
const lazyloadFun = () => {
	lazying.value = true
	//延时加载
	spy.value = new Spy(elRef.value!, {
		el: props.root,
		//图片进入可视端口时加载
		beforeEnter: () => {
			lazying.value = false
			lazySrc.value = props.src
		}
	})
	spy.value.init()
}
//图片加载成功
const loadSuccess = (e: Event) => {
	error.value = false
	loading.value = false
	emits('success', e.target)
}
//图片加载失败
const loadError = (e: Event) => {
	loading.value = false
	error.value = true
	emits('error', e.target)
}

watch(
	() => cmpSrc.value,
	() => {
		loading.value = true
	}
)

onMounted(() => {
	if (props.lazyLoad) {
		lazyloadFun()
	}
})

onBeforeUnmount(() => {
	if (spy.value) {
		spy.value.destroy()
	}
})
</script>

<template>
	<div class="mvi-image" :style="imageStyle" ref="elRef">
		<!-- 加载中 -->
		<div v-if="(loading || lazying) && showLoading" class="mvi-image-loading">
			<slot name="loading" v-if="$slots.loading"></slot>
			<Icon v-else :type="parseIcon(loadIcon).type" :url="parseIcon(loadIcon).url" :spin="parseIcon(loadIcon).spin" :size="parseIcon(loadIcon).size" :color="parseIcon(loadIcon).color" />
		</div>
		<!-- 加载失败 -->
		<div v-else-if="error && showError" class="mvi-image-error" ref="error">
			<slot name="error" v-if="$slots.error"></slot>
			<Icon v-else :type="parseIcon(errorIcon).type" :url="parseIcon(errorIcon).url" :spin="parseIcon(errorIcon).spin" :size="parseIcon(errorIcon).size" :color="parseIcon(errorIcon).color" />
		</div>
		<!-- 加载成功 -->
		<img @load="loadSuccess" @error="loadError" :src="cmpSrc" :alt="showError ? '' : alt" :class="imgClass" />
	</div>
</template>

<style scoped src="./image.less"></style>

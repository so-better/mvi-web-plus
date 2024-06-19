<template>
	<div class="mvi-list">
		<slot></slot>
		<div v-if="finished" class="mvi-list-finished">
			<slot name="finished" v-if="$slots.finished"></slot>
			<span v-else>{{ finishedText }}</span>
		</div>
		<div v-else-if="loading" class="mvi-list-loading">
			<slot name="loading" v-if="$slots.loading"></slot>
			<span v-else>{{ loadingText }}</span>
		</div>
		<div v-else-if="error" @click="doLoad" class="mvi-list-error">
			<slot name="error" v-if="$slots.error"></slot>
			<span v-else>{{ errorText }}</span>
		</div>
		<div v-else-if="content || $slots.content" @click="doLoad" class="mvi-list-content">
			<slot name="content" v-if="$slots.content"></slot>
			<span v-else>{{ content }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Scroll } from '@/directives/scroll'
import { ListProps } from './props'

defineOptions({
	name: 'm-list'
})

//属性
const props = defineProps(ListProps)

//事件
const emits = defineEmits(['load', 'update:loading', 'update:error'])

//监听滚动的对象
const scrollObj = ref<Scroll | null>(null)

//执行加载函数
const doLoad = () => {
	if (props.finished) {
		return
	}
	emits('update:loading', true)
	emits('update:error', false)
	emits('load')
}
//监听滚动元素到底部
const initScroll = () => {
	const el = document.body.querySelector(props.scrollEl)
	if (!el) {
		return
	}
	if (scrollObj.value) {
		return
	}
	scrollObj.value = new Scroll(<HTMLElement>el, {
		bottom: () => {
			if (props.finished || props.loading || props.error) {
				return
			}
			doLoad()
		}
	})
	scrollObj.value.init()
}

onMounted(() => {
	initScroll()
	if (props.immediateLoad) {
		doLoad()
	}
})
</script>
<style scoped src="./list.less"></style>

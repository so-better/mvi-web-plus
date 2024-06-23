<template>
	<div class="mvi-loading">
		<div v-if="type == 'default'" class="mvi-loading-default" :style="{ width: size, height: size }">
			<div v-for=" in new Array(12)" :style="loadingStyle"></div>
		</div>
		<svg v-else-if="type == 'circle'" xmlns="https://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 38 38" :stroke="innerColor">
			<g fill="none" fill-rule="evenodd">
				<g transform="translate(1 1)" stroke-width="2">
					<circle stroke-opacity=".2" cx="18" cy="18" r="18" />
					<path d="M36 18c0-9.94-8.06-18-18-18">
						<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
					</path>
				</g>
			</g>
		</svg>
		<svg v-else-if="type == 'dots'" xmlns="https://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 240 60" :fill="innerColor">
			<circle cx="30" cy="30" r="30">
				<animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" />
				<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
			</circle>
			<circle cx="120" cy="30" r="18" fill-opacity="0.3">
				<animate attributeName="r" from="18" to="18" begin="0s" dur="0.8s" values="18;30;18" calcMode="linear" repeatCount="indefinite" />
				<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s6s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
			</circle>
			<circle cx="210" cy="30" r="30">
				<animate attributeName="r" from="30" to="30" begin="0s" dur="0.8s" values="30;18;30" calcMode="linear" repeatCount="indefinite" />
				<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
			</circle>
		</svg>
		<svg v-else-if="type == 'spin'" xmlns="https://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 38 38">
			<defs>
				<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" :id="`spin_${instance.uid}`">
					<stop :stop-color="innerColor" stop-opacity="0" offset="0%" />
					<stop :stop-color="innerColor" stop-opacity=".631" offset="63.146%" />
					<stop :stop-color="innerColor" offset="100%" />
				</linearGradient>
			</defs>
			<g fill="none" fill-rule="evenodd">
				<g transform="translate(1 1)">
					<path d="M36 18c0-9.94-8.06-18-18-18" :stroke="`url(#spin_${instance.uid})`" stroke-width="2">
						<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
					</path>
					<circle :fill="innerColor" cx="36" cy="18" r="1">
						<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
					</circle>
				</g>
			</g>
		</svg>
		<svg v-else-if="type == 'transfer'" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 25 30">
			<rect x="0" y="10" width="5" height="10" :fill="innerColor" opacity="0.2">
				<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			<rect x="10" y="10" width="5" height="10" :fill="innerColor" opacity="0.2">
				<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
			</rect>
			<rect x="20" y="10" width="5" height="10" :fill="innerColor" opacity="0.2">
				<animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
				<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
			</rect>
		</svg>
	</div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import { LoadingProps } from './props'
import { isDark } from '@/utils'
import { Observe } from '@/directives/observe'

defineOptions({
	name: 'm-loading'
})

//属性
const props = defineProps(LoadingProps)
//实例
const instance = getCurrentInstance()!
//observe对象
const observe = ref<Observe | null>(null)
//颜色
const innerColor = ref<string>(props.color || (isDark() ? '#4a4a4a' : '#bbb'))
//default类型的加载样式
const loadingStyle = computed<any>(() => {
	let style: any = {}
	style.background = innerColor.value
	style.width = 'calc(' + props.size + '/20)'
	style.height = 'calc(' + props.size + '/4)'
	style.transformOrigin = 'calc(' + props.size + '/40) calc(' + props.size + '/2)'
	style.webkitTransformOrigin = 'calc(' + props.size + '/40) calc(' + props.size + '/2)'
	return style
})

onMounted(() => {
	observe.value = new Observe(document.documentElement, {
		attributes: true,
		childList: false,
		subtree: false,
		attributeNames: ['data-mvi-dark'],
		attributesChange: () => {
			innerColor.value = props.color || (isDark() ? '#4a4a4a' : '#bbb')
		}
	})
	observe.value.init()
})

onBeforeUnmount(() => {
	observe.value?.destroy()
})
</script>

<style scoped src="./loading.less"></style>

<template>
	<div @click="clickStopFun" @mouseenter="hoverIn" @mouseleave="hoverOut" class="mvi-roll-container" ref="containerRef">
		<div class="mvi-roll" :class="[direction == 'left' || direction == 'right' ? 'horizontal' : 'vertical', { center: center }]" :style="rollStyle" ref="rollRef">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { RollProps } from './props'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
	name: 'm-roll'
})

//属性
const props = defineProps(RollProps)

//事件
const emits = defineEmits(['play', 'stop', 'pause'])

//延时器
const timer = ref<any>(null)
//0表示正在滚动，1表示暂停，2表示停止
const status = ref<number>(-1)

//容器元素
const containerRef = ref<HTMLElement | null>(null)
//滚动元素
const rollRef = ref<HTMLElement | null>(null)
//滚动元素的style
const rollStyle = computed<any>(() => {
	let obj: any = {}
	if (props.direction == 'left') {
		obj.left = '100%'
		obj.right = 'auto'
	} else if (props.direction == 'right') {
		obj.right = '100%'
		obj.left = 'auto'
	} else if (props.direction == 'up') {
		obj.top = '100%'
		obj.bottom = 'auto'
	} else if (props.direction == 'down') {
		obj.bottom = '100%'
		obj.top = 'auto'
	}
	return obj
})
//是否暂停
const isPaused = computed<boolean>(() => {
	return status.value == 1
})
//是否停止
const isStopped = computed<boolean>(() => {
	return status.value == 2
})

//api：暂停
const pause = () => {
	//只有滚动状态下才能暂停
	if (status.value != 0) {
		return
	}
	status.value = 1
	let placement = Dap.element.getElementPoint(rollRef.value, containerRef.value)
	//去除动画
	rollRef.value!.style.transition = ''
	//去除计时器
	if (timer.value) {
		clearTimeout(timer.value)
		timer.value = null
	}
	if (props.direction == 'left') {
		rollRef.value!.style.left = placement.left + 'px'
		rollRef.value!.style.right = 'auto'
	} else if (props.direction == 'right') {
		rollRef.value!.style.right = placement.right + 'px'
		rollRef.value!.style.left = 'auto'
	} else if (props.direction == 'up') {
		rollRef.value!.style.top = placement.top + 'px'
		rollRef.value!.style.bottom = 'auto'
	} else if (props.direction == 'down') {
		rollRef.value!.style.bottom = placement.bottom + 'px'
		rollRef.value!.style.top = 'auto'
	}
	emits('pause')
}
//api：停止
const stop = () => {
	if (status.value == 2) {
		return
	}
	status.value = 2
	//去除动画
	rollRef.value!.style.transition = ''
	if (props.direction == 'left') {
		rollRef.value!.style.left = '100%'
		rollRef.value!.style.right = 'auto'
	} else if (props.direction == 'right') {
		rollRef.value!.style.right = '100%'
		rollRef.value!.style.left = 'auto'
	} else if (props.direction == 'up') {
		rollRef.value!.style.top = '100%'
		rollRef.value!.style.bottom = 'auto'
	} else if (props.direction == 'down') {
		rollRef.value!.style.bottom = '100%'
		rollRef.value!.style.top = 'auto'
	}
	if (timer.value) {
		clearTimeout(timer.value)
		timer.value = null
	}
	emits('stop')
}
//api：播放
const play = () => {
	if (!rollRef.value) {
		return
	}
	if (status.value == 0) {
		return
	}
	status.value = 0
	let placement = Dap.element.getElementPoint(rollRef.value, containerRef.value)
	let interval = 0
	if (props.direction == 'left') {
		interval = Math.round(((placement.left + rollRef.value.offsetWidth) / (containerRef.value!.offsetWidth + rollRef.value.offsetWidth)) * props.interval)
	} else if (props.direction == 'right') {
		interval = Math.round(((placement.right + rollRef.value.offsetWidth) / (containerRef.value!.offsetWidth + rollRef.value.offsetWidth)) * props.interval)
	} else if (props.direction == 'up') {
		interval = Math.round(((placement.top + rollRef.value.offsetHeight) / (containerRef.value!.offsetHeight + rollRef.value.offsetHeight)) * props.interval)
	} else if (props.direction == 'down') {
		interval = Math.round(((placement.bottom + rollRef.value.offsetHeight) / (containerRef.value!.offsetHeight + rollRef.value.offsetHeight)) * props.interval)
	}
	//设置动画和速度
	rollRef.value.style.transition = 'all ' + interval + 'ms ' + props.animation
	//执行
	setTimeout(() => {
		if (!rollRef.value) {
			return
		}
		if (props.direction == 'left') {
			rollRef.value.style.left = -rollRef.value.offsetWidth + 'px'
			rollRef.value.style.right = 'auto'
		} else if (props.direction == 'right') {
			rollRef.value.style.right = -rollRef.value.offsetWidth + 'px'
			rollRef.value.style.left = 'auto'
		} else if (props.direction == 'up') {
			rollRef.value.style.top = -rollRef.value.offsetHeight + 'px'
			rollRef.value.style.bottom = 'auto'
		} else if (props.direction == 'down') {
			rollRef.value.style.bottom = -rollRef.value.offsetHeight + 'px'
			rollRef.value.style.top = 'auto'
		}
		emits('play')
		timer.value = setTimeout(() => {
			stop()
			if (props.loop) {
				play() //重新开始
			}
		}, interval)
	}, 0)
}
//鼠标进入
const hoverIn = () => {
	if (props.hoverStop) {
		//滚动中可暂停
		if (status.value == 0) {
			pause()
		}
	}
}
//鼠标移出
const hoverOut = () => {
	if (props.hoverStop) {
		//暂停时可开始
		if (status.value == 1) {
			play()
		}
	}
}
//点击暂停
const clickStopFun = () => {
	if (props.clickStop) {
		//滚动中可暂停
		if (status.value == 0) {
			pause()
		}
		//暂停时可开始
		else if (status.value == 1) {
			play()
		}
	}
}

onMounted(() => {
	containerRef.value!.style.height = Dap.element.getCssStyle(rollRef.value, 'height')
	if (props.autoplay) {
		play()
	}
})

onBeforeUnmount(() => {
	stop()
})

defineExpose({
	pause,
	stop,
	play,
	isStopped,
	isPaused
})
</script>
<style scoped src="./roll.less"></style>

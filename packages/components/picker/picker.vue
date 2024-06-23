<template>
	<div class="mvi-picker">
		<div class="mvi-picker-loading" v-if="loading" :style="loadingStyle">
			<Loading size="0.5rem"></Loading>
		</div>
		<div v-if="showToolbar && !loading" class="mvi-picker-toolbar">
			<div class="mvi-picker-toolbar-cancel" v-text="cancelText" @click="doCancel"></div>
			<div class="mvi-picker-toolbar-title" v-if="title" v-text="title"></div>
			<div class="mvi-picker-toolbar-confirm" v-text="confirmText" @click="doConfirm"></div>
		</div>
		<div v-if="!loading" class="mvi-picker-content" :style="contentStyle" ref="content" @touchmove="contentTouchMove">
			<div v-for="(column, index) in cmpOptions" class="mvi-picker-items" :ref="el => (itemRefs[index] = <HTMLElement>el)" :style="columnStyle(index)" @touchstart="touchstart($event, index)" @touchmove="touchmove" @touchend="touchend" @mousedown="mousedown($event, index)">
				<div class="mvi-picker-item" v-for="item in column.values" :style="{ height: selectHeight || '' }">
					<div v-text="item"></div>
				</div>
			</div>
			<div class="mvi-picker-active" :style="{ height: selectHeight || '' }"></div>
			<div class="mvi-picker-mask" :style="maskStyle"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Loading } from '@/components/loading'
import { PickerProps, PickerActiveType, PickerOptionsItemType, PickerCrisisType } from './props'

defineOptions({
	name: 'm-picker'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(PickerProps)

//事件
const emits = defineEmits(['confirm', 'cancel', 'change'])

const itemRefs = ref<HTMLElement[]>([])
const offsets = ref<number[]>([])
const startY = ref<number>(0)
const startY2 = ref<number>(0)
//触摸的时间
const time = ref<number>(0)
const oldActives = ref<PickerActiveType[]>([])
const amounts = ref<number>(0)
//鼠标是否按下
const mouseDown = ref<boolean>(false)
//按下的列序列
const columnIndex = ref<number>(0)
//开始时间
const startTimeStamp = ref<number>(0)
//结束时间
const endTimeStamp = ref<number>(0)

//单个高度
const cmpHeight = computed<number>(() => {
	if (props.selectHeight.includes('px')) {
		return parseFloat(props.selectHeight)
	}
	if (props.selectHeight.includes('rem')) {
		return Dap.element.rem2px(parseFloat(props.selectHeight))
	}
	return 0
})
//加载状态样式
const loadingStyle = computed<any>(() => {
	let style: any = {}
	style.height = `calc(${Dap.number.mutiply(cmpHeight.value, props.visibleCounts)}px + 0.88rem)`
	return style
})
//内容区域样式
const contentStyle = computed<any>(() => {
	let style: any = {}
	style.height = `${Dap.number.mutiply(cmpHeight.value, props.visibleCounts)}px`
	return style
})
//选项配置
const cmpOptions = computed<PickerOptionsItemType[]>(() => {
	let op: PickerOptionsItemType[] = []
	if (Array.isArray(props.options)) {
		op = props.options
	} else {
		op = [props.options]
	}
	return op
})
//每一列样式
const columnStyle = computed<(index: number) => any>(() => {
	return (index: number) => {
		let style: any = {}
		style.transform = `translate3d(0,${offsets.value[index] || 0}px,0)`
		return style
	}
})
const actives = computed<PickerActiveType[]>(() => {
	let arr: PickerActiveType[] = []
	for (let i = 0; i < offsets.value.length; i++) {
		arr.push({
			index: getActive(offsets.value[i]),
			value: cmpOptions.value[i].values[getActive(offsets.value[i])]
		})
	}
	return arr
})
const maskStyle = computed<any>(() => {
	let style: any = {}
	if (props.selectHeight) {
		style.backgroundSize = '100% ' + Dap.number.mutiply(cmpHeight.value, Dap.number.divide(props.visibleCounts - 1, 2)) + 'px'
	}
	return style
})

//根据序列计算offset
const getOffset = (index: number): number => {
	return Dap.number.mutiply(Dap.number.subtract(Dap.number.divide(props.visibleCounts - 1, 2), index), cmpHeight.value)
}
//根据offset计算序列
const getActive = (value: number) => {
	let num = Math.abs(Dap.number.divide(value - Dap.number.mutiply(Dap.number.divide(props.visibleCounts - 1, 2), cmpHeight.value), cmpHeight.value))
	return Math.round(num)
}
//添加动画
const addTransition = (index: number, timeout: number) => {
	return new Promise<void>(resolve => {
		itemRefs.value[index].style.transition = 'all ' + timeout + 'ms ease-out'
		setTimeout(() => {
			resolve()
		}, 0)
	})
}
//移除动画
const removeTransition = (index: number) => {
	return new Promise<void>(resolve => {
		itemRefs.value[index].style.transition = ''
		setTimeout(() => {
			resolve()
		}, 0)
	})
}
//滑动临界值
const crisis = (index: number): PickerCrisisType => {
	let max = Dap.number.divide(props.visibleCounts - 1, 2)
	max = Dap.number.mutiply(max, cmpHeight.value)
	let min = -Dap.number.divide(props.visibleCounts - 1, 2)
	min = Dap.number.mutiply(min, cmpHeight.value)
	min += Dap.number.mutiply(props.visibleCounts - cmpOptions.value[index].values.length, cmpHeight.value)
	return {
		max,
		min
	}
}
//滑动后归位处理
const endDeal = (moveTotal: number, timeout: number) => {
	if (moveTotal > 0) {
		if (offsets.value[columnIndex.value] >= crisis(columnIndex.value).max) {
			offsets.value[columnIndex.value] = crisis(columnIndex.value).max
		} else {
			let order = getActive(offsets.value[columnIndex.value])
			offsets.value[columnIndex.value] = getOffset(order)
		}
	} else {
		if (offsets.value[columnIndex.value] <= crisis(columnIndex.value).min) {
			offsets.value[columnIndex.value] = crisis(columnIndex.value).min
		} else {
			let order = getActive(offsets.value[columnIndex.value])
			offsets.value[columnIndex.value] = getOffset(order)
		}
	}
	if (actives.value.length == 1) {
		if (actives.value[0].index != oldActives.value[0].index) {
			emits('change', columnIndex.value, actives.value[0])
		}
	} else {
		let flag = true
		for (let i = 0; i < oldActives.value.length; i++) {
			if (oldActives.value[i].index != actives.value[i].index) {
				flag = false
			}
		}
		if (!flag) {
			emits('change', columnIndex.value, actives.value)
		}
	}
	setTimeout(() => {
		removeTransition(columnIndex.value)
	}, timeout)
}
//初始化
const init = () => {
	offsets.value = []
	for (let i = 0; i < cmpOptions.value.length; i++) {
		offsets.value.push(getOffset(cmpOptions.value[i].defaultIndex || 0))
	}
}
//确认
const doConfirm = () => {
	if (actives.value.length == 1) {
		emits('confirm', actives.value[0])
	} else {
		emits('confirm', actives.value)
	}
}
//取消
const doCancel = () => {
	init()
	if (actives.value.length == 1) {
		emits('cancel', actives.value[0])
	} else {
		emits('cancel', actives.value)
	}
}
//开始触摸
const touchstart = (event: TouchEvent, index: number) => {
	startY.value = event.targetTouches[0].pageY
	startY2.value = startY.value
	time.value = Date.now()
	oldActives.value = actives.value
	amounts.value = 0
	columnIndex.value = index
	startTimeStamp.value = Date.now()
}
//鼠标开始按下
const mousedown = (event: MouseEvent, index: number) => {
	startY.value = event.pageY
	startY2.value = startY.value
	time.value = Date.now()
	oldActives.value = actives.value
	amounts.value = 0
	mouseDown.value = true
	columnIndex.value = index
	startTimeStamp.value = Date.now()
}
//触摸过程
const touchmove = (event: TouchEvent) => {
	if (event.cancelable) {
		event.preventDefault()
	}
	let endY = event.targetTouches[0].pageY
	let moveY = endY - startY.value //每次偏移量
	let moveY2 = endY - startY2.value //总偏移量
	//已经在第一个选项且是下滑的
	if (offsets.value[columnIndex.value] >= crisis(columnIndex.value).max && moveY2 > 0) {
		amounts.value += 5
		offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value
		return
	}
	//已经在最后一个选项且是上滑的
	if (offsets.value[columnIndex.value] <= crisis(columnIndex.value).min && moveY2 < 0) {
		amounts.value += 5
		offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value
		return
	}
	offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / 1.6
	startY.value = endY
}
//鼠标拖动
const mousemove = (event: Event) => {
	if (!mouseDown.value) {
		return
	}
	if (event.cancelable) {
		event.preventDefault()
	}
	let endY = (<MouseEvent>event).pageY
	let moveY = endY - startY.value //每次偏移量
	let moveY2 = endY - startY2.value //总偏移量
	//已经在第一个选项且是下滑的
	if (offsets.value[columnIndex.value] >= crisis(columnIndex.value).max && moveY2 > 0) {
		amounts.value += 5
		offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value
		return
	}
	//已经在最后一个选项且是上滑的
	if (offsets.value[columnIndex.value] <= crisis(columnIndex.value).min && moveY2 < 0) {
		amounts.value += 5
		offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / amounts.value
		return
	}
	offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + moveY / 1.6
	startY.value = endY
}
//触摸结束
const touchend = (event: TouchEvent) => {
	endTimeStamp.value = Date.now()
	let moveTotal = event.changedTouches[0].pageY - startY2.value
	let totalTimeStamp = endTimeStamp.value - startTimeStamp.value //时间差
	if (totalTimeStamp < 300 && Math.abs(moveTotal) > cmpHeight.value) {
		//惯性滑动
		addTransition(columnIndex.value, 1000)
			.then(() => {
				if (moveTotal > 0) {
					offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + (Dap.element.rem2px(10) * totalTimeStamp) / 1000
				} else {
					offsets.value[columnIndex.value] = offsets.value[columnIndex.value] - (Dap.element.rem2px(10) * totalTimeStamp) / 1000
				}
				return addTransition(columnIndex.value, 300)
			})
			.then(() => {
				endDeal(moveTotal, 300)
			})
	} else {
		addTransition(columnIndex.value, 300).then(() => {
			endDeal(moveTotal, 300)
		})
	}
}
//鼠标松开
const mouseup = (event: Event) => {
	if (!mouseDown.value) {
		return
	}
	mouseDown.value = false
	endTimeStamp.value = Date.now()
	let moveTotal = (<MouseEvent>event).pageY - startY2.value
	let totalTimeStamp = endTimeStamp.value - startTimeStamp.value //时间差
	if (totalTimeStamp < 300 && Math.abs(moveTotal) > cmpHeight.value) {
		//惯性滑动
		addTransition(columnIndex.value, 1000)
			.then(() => {
				if (moveTotal > 0) {
					offsets.value[columnIndex.value] = offsets.value[columnIndex.value] + (Dap.element.rem2px(10) * totalTimeStamp) / 1000
				} else {
					offsets.value[columnIndex.value] = offsets.value[columnIndex.value] - (Dap.element.rem2px(10) * totalTimeStamp) / 1000
				}
				return addTransition(columnIndex.value, 300)
			})
			.then(() => {
				endDeal(moveTotal, 300)
			})
	} else {
		addTransition(columnIndex.value, 300).then(() => {
			endDeal(moveTotal, 300)
		})
	}
}
//禁用content的touchmove
const contentTouchMove = (event: TouchEvent) => {
	if (event.cancelable) {
		event.preventDefault()
	}
}

watch(
	() => cmpOptions.value,
	() => {
		init()
	}
)

onMounted(() => {
	init()
	Dap.event.on(document.documentElement, `mousemove.picker_${instance.uid}`, mousemove)
	Dap.event.on(document.documentElement, `mouseup.picker_${instance.uid}`, mouseup)
})

onBeforeUnmount(() => {
	Dap.event.off(document.documentElement, `mousemove.picker_${instance.uid} mouseup.picker_${instance.uid}`)
})
</script>
<style scoped src="./picker.less"></style>

<template>
	<div class="mvi-date-chooser" :data-id="`mvi-date-chooser-${instance.uid}`" :class="{ block: block }" ref="relateRef" @click="clickCalendar" @mouseenter="mouseEnterRelate" @mouseleave="mouseLeaveRelate" v-bind="$attrs">
		<slot></slot>
	</div>
	<Layer :relate="`[data-id='mvi-date-chooser-${instance.uid}']`" v-model="show" :placement="layerRealProps.placement" :offset="layerRealProps.offset" :z-index="layerRealProps.zIndex" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :animation="layerRealProps.animation" :border-color="layerRealProps.borderColor" :timeout="layerRealProps.timeout" :closable="closable" :show-triangle="layerRealProps.showTriangle" :width="layerRealProps.width" @showing="layerShow" @mouseleave="mouseLeaveLayer" ref="layerRef">
		<div class="mvi-date-chooser-layer" ref="panelRef">
			<!-- 年视图头部 -->
			<div v-if="view == 'year'" class="mvi-date-chooser-year-header">
				<div class="mvi-date-chooser-year-left" :class="[type]" @click="updateYear(-1)">
					<Icon type="angle-double-left" />
				</div>
				<div class="mvi-date-chooser-year-center">
					<span>{{ formatShow('year', years[0]) }}</span>
					<span>-</span>
					<span>{{ formatShow('year', years[years.length - 1]) }}</span>
				</div>
				<div class="mvi-date-chooser-year-right" :class="[type]" @click="updateYear(1)">
					<Icon type="angle-double-right" />
				</div>
			</div>
			<!-- 月视图头部 -->
			<div v-else-if="view == 'month'" class="mvi-date-chooser-month-header">
				<div class="mvi-date-chooser-month-left" :class="[type]" @click="updateYear(-1)">
					<Icon type="angle-double-left" />
				</div>
				<div class="mvi-date-chooser-month-center" :class="[type]" @click="goYear">{{ formatShow('year', selectedDate) }}</div>
				<div class="mvi-date-chooser-month-right" :class="[type]" @click="updateYear(1)">
					<Icon type="angle-double-right" />
				</div>
			</div>
			<!-- 日期头部 -->
			<div v-else-if="view == 'date'" class="mvi-date-chooser-date-header">
				<div class="mvi-date-chooser-date-left">
					<div :class="type" @click="updateYear(-1)">
						<Icon type="angle-double-left" />
					</div>
					<div :class="type" @click="updateMonth(-1)">
						<Icon type="angle-left" />
					</div>
				</div>
				<div class="mvi-date-chooser-date-center">
					<div :class="type" @click="goYear">{{ formatShow('year', selectedDate) }}</div>
					<div :class="type" @click="goMonth">{{ formatShow('month', selectedDate) }}</div>
				</div>
				<div class="mvi-date-chooser-date-right">
					<div :class="type" @click="updateMonth(1)">
						<Icon type="angle-right" />
					</div>
					<div :class="type" @click="updateYear(1)">
						<Icon type="angle-double-right" />
					</div>
				</div>
			</div>
			<Calendar :view="view" v-model="selectedDate" :month-text="monthText" :week-text="weekText" :start-date="startDate" :end-date="endDate" :non-current-click="false" :active="active" :type="type" @date-click="dateClick" @month-click="monthClick" @year-click="yearClick"> </Calendar>
		</div>
	</Layer>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import Dap from 'dap-util'
import { computed, getCurrentInstance, ref } from 'vue'
import { Layer, LayerPropsType } from '@/components/layer'
import { Icon } from '@/components/icon'
import { Calendar, CalendarViewType } from '@/components/calendar'
import { DateChooserProps } from './props'

defineOptions({
	name: 'm-date-chooser',
	inheritAttrs: false
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(DateChooserProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

const show = ref<boolean>(false)
const view = ref<CalendarViewType>(props.mode)
const selectedDate = ref<Date>(props.modelValue)
const relateRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const layerRef = ref<InstanceType<typeof Layer> | null>(null)

const layerRealProps = computed<LayerPropsType>(() => {
	return {
		placement: props.layerProps.placement ? props.layerProps.placement : 'bottom-start',
		width: props.layerProps.width,
		zIndex: Dap.number.isNumber(props.layerProps.zIndex) ? props.layerProps.zIndex : 400,
		offset: props.layerProps.offset ? props.layerProps.offset : '0.2rem',
		animation: props.layerProps.animation,
		timeout: Dap.number.isNumber(props.layerProps.timeout) ? props.layerProps.timeout : 200,
		showTriangle: typeof props.layerProps.showTriangle == 'boolean' ? props.layerProps.showTriangle : false,
		shadow: typeof props.layerProps.shadow == 'boolean' ? props.layerProps.shadow : true,
		border: typeof props.layerProps.border == 'boolean' ? props.layerProps.border : false,
		borderColor: props.layerProps.borderColor
	}
})
//年数组
const years = computed<Date[]>(() => {
	let arr: Date[] = []
	//获取指定的年份
	const year = selectedDate.value.getFullYear()
	const startYear = props.startDate.getFullYear()
	//指定日期所在年份所在数组的序列,12个值为一个数组
	let index = Math.floor((year - startYear) / 12)
	for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
		arr.push(dayjs(props.modelValue).year(i).toDate())
	}
	return arr
})
//头部显示年月的值
const formatShow = computed<(type: CalendarViewType, date: Date) => string>(() => {
	return (type: CalendarViewType, date: Date) => {
		if (typeof props.headerFormatter == 'function') {
			if (type == 'year') {
				return props.headerFormatter.apply(instance.proxy, [type, date.getFullYear()])
			}
			if (type == 'month') {
				return props.headerFormatter.apply(instance.proxy, [type, date.getMonth() + 1])
			}
		}
		if (type == 'year') {
			return dayjs(date).format('YYYY') + '年'
		}
		if (type == 'month') {
			return dayjs(date).format('MM') + '月'
		}
		return ''
	}
})

//悬浮层显示前进行宽度设置
const layerShow = () => {
	if (!layerRealProps.value.width) {
		panelRef.value!.style.width = relateRef.value!.offsetWidth + 'px'
	}
}
//点击打开/关闭日历弹窗
const clickCalendar = () => {
	if (props.disabled) {
		return
	}
	if (props.trigger == 'click') {
		if (show.value) {
			closeCalendar()
		} else {
			openCalendar()
		}
	}
}
//点击日期
const dateClick = (date: Date) => {
	emits('update:modelValue', date)
	emits('change', date)
	show.value = false
}
//点击年份
const yearClick = (date: Date) => {
	if (props.mode == 'year') {
		emits('update:modelValue', date)
		emits('change', date)
		show.value = false
		return
	}
	setTimeout(() => {
		view.value = 'month'
	}, 0)
}
//点击月份
const monthClick = (date: Date) => {
	if (props.mode == 'month') {
		emits('update:modelValue', date)
		emits('change', date)
		show.value = false
		return
	}
	setTimeout(() => {
		view.value = 'date'
	}, 0)
}
//更新年份
const updateYear = (num: number) => {
	selectedDate.value = dayjs(selectedDate.value).add(num, 'year').toDate()
	emits('update:modelValue', selectedDate.value)
	emits('change', selectedDate.value)
}
//更新月份
const updateMonth = (num: number) => {
	selectedDate.value = dayjs(selectedDate.value).add(num, 'month').toDate()
	emits('update:modelValue', selectedDate.value)
	emits('change', selectedDate.value)
}
//跳转年视图
const goYear = () => {
	setTimeout(() => {
		view.value = 'year'
	}, 0)
}
//跳转月视图
const goMonth = () => {
	setTimeout(() => {
		view.value = 'month'
	}, 0)
}
//api：打开日期选择弹窗
const openCalendar = () => {
	if (props.disabled) {
		return
	}
	show.value = true
}
//api：关闭日期选择弹窗
const closeCalendar = () => {
	if (props.disabled) {
		return
	}
	show.value = false
}
//鼠标进入关联元素
const mouseEnterRelate = () => {
	if (props.disabled) {
		return
	}
	if (props.trigger != 'hover') {
		return
	}
	//打开日期面板
	openCalendar()
}
//鼠标离开关联元素
const mouseLeaveRelate = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	if (props.trigger != 'hover') {
		return
	}
	//如果浮层元素存在
	if (layerRef.value && layerRef.value.$$el) {
		const layerRect = layerRef.value.$$el.getBoundingClientRect()
		//如果鼠标进入的是浮层元素
		if (event.pageX >= layerRect.left && event.pageX <= layerRect.right && event.pageY >= layerRect.top && event.pageY <= layerRect.bottom) {
			return
		}
	}
	//关闭日期面板
	closeCalendar()
}
//鼠标离开浮层元素
const mouseLeaveLayer = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	if (props.trigger != 'hover') {
		return
	}
	//如果关联元素存在
	if (relateRef.value) {
		const relateRect = relateRef.value.getBoundingClientRect()
		//如果鼠标进入的是关联元素
		if (event.pageX >= relateRect.left && event.pageX <= relateRect.right && event.pageY >= relateRect.top && event.pageY <= relateRect.bottom) {
			return
		}
	}
	//关闭日期面板
	closeCalendar()
}

defineExpose({
	openCalendar,
	closeCalendar
})
</script>
<style scoped src="./date-chooser.less"></style>

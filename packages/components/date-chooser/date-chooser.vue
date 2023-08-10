<template>
	<div :class="['mvi-date-chooser', block ? 'block' : '']" :data-id="`mvi-date-chooser-${uid}`">
		<div class="mvi-date-chooser-target" :data-id="`mvi-date-chooser-target-${uid}`" ref="target" @click="clickCalendar">
			<slot></slot>
		</div>
		<Layer :target="`[data-id='mvi-date-chooser-target-${uid}']`" :root="`[data-id='mvi-date-chooser-${uid}']`" v-model="show" :placement="layerRealProps.placement" :fixed="layerRealProps.fixed" :fixed-auto="layerRealProps.fixedAuto" :offset="layerRealProps.offset" :z-index="layerRealProps.zIndex" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :animation="layerRealProps.animation" :border-color="layerRealProps.borderColor" :timeout="layerRealProps.timeout" :closable="closable" :show-triangle="layerRealProps.showTriangle" :width="layerRealProps.width" @showing="layerShow">
			<div class="mvi-date-chooser-layer" ref="panel">
				<!-- 年视图头部 -->
				<div v-if="view == 'year'" class="mvi-date-chooser-year-header">
					<div :class="['mvi-date-chooser-year-left', type]" @click="updateYear(-1)">
						<Icon type="angle-double-left" />
					</div>
					<div class="mvi-date-chooser-year-center">
						<span>{{ formatShow('year', years[0]) }}</span>
						<span>-</span>
						<span>{{ formatShow('year', years[years.length - 1]) }}</span>
					</div>
					<div :class="['mvi-date-chooser-year-right', type]" @click="updateYear(1)">
						<Icon type="angle-double-right" />
					</div>
				</div>
				<!-- 月视图头部 -->
				<div v-else-if="view == 'month'" class="mvi-date-chooser-month-header">
					<div :class="['mvi-date-chooser-month-left', type]" @click="updateYear(-1)">
						<Icon type="angle-double-left" />
					</div>
					<div :class="['mvi-date-chooser-month-center', type]" @click="goYear">{{ formatShow('year', selectedDate) }}</div>
					<div :class="['mvi-date-chooser-month-right', type]" @click="updateYear(1)">
						<Icon type="angle-double-right" />
					</div>
				</div>
				<!-- 日期头部 -->
				<div v-else-if="view == 'date'" class="mvi-date-chooser-date-header">
					<div class="mvi-date-chooser-date-left">
						<div :class="type" @click="updateYear(-1)"><Icon type="angle-double-left" /></div>
						<div :class="type" @click="updateMonth(-1)"><Icon type="angle-left" /></div>
					</div>
					<div class="mvi-date-chooser-date-center">
						<div :class="type" @click="goYear">{{ formatShow('year', selectedDate) }}</div>
						<div :class="type" @click="goMonth">{{ formatShow('month', selectedDate) }}</div>
					</div>
					<div class="mvi-date-chooser-date-right">
						<div :class="type" @click="updateMonth(1)"><Icon type="angle-right" /></div>
						<div :class="type" @click="updateYear(1)"><Icon type="angle-double-right" /></div>
					</div>
				</div>
				<Calendar :view="view" v-model="selectedDate" :month-text="monthText" :week-text="weekText" :start-date="startDate" :end-year="endDate" :non-current-click="false" :active="active" :type="type" @date-click="dateClick" @month-click="monthClick" @year-click="yearClick" ref="calendar"></Calendar>
			</div>
		</Layer>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Layer } from '../layer'
import { Icon } from '../icon'
import { Calendar } from '../calendar'
import dayjs from 'dayjs'
export default {
	name: 'm-date-chooser',
	data() {
		return {
			show: false,
			view: 'date',
			selectedDate: new Date()
		}
	},
	emits: ['update:modelValue', 'change'],
	props: {
		//当前日期
		modelValue: {
			type: Date,
			default: function () {
				return new Date()
			}
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//layer组件参数
		layerProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//点击其他地方是否关闭日历
		closable: {
			type: Boolean,
			default: true
		},
		//触发方法
		trigger: {
			type: String,
			default: 'click',
			validator(value) {
				return ['hover', 'click', 'custom'].includes(value)
			}
		},
		//模式
		mode: {
			type: String,
			default: 'date',
			validator(value) {
				return ['year', 'month', 'date'].includes(value)
			}
		},
		//月份面板显示的月份数组文字
		monthText: {
			type: Array,
			default: function () {
				return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			}
		},
		//头部显示的星期数组
		weekText: {
			type: Array,
			default: function () {
				return ['日', '一', '二', '三', '四', '五', '六']
			}
		},
		//开始日期
		startDate: {
			type: Date,
			default: function () {
				return dayjs('1970-01-01').toDate()
			}
		},
		//截止日期
		endDate: {
			type: Date,
			default: function () {
				return dayjs('2099-01-01').toDate()
			}
		},
		//日历面板点击态
		active: {
			type: Boolean,
			default: true
		},
		//主题样式
		type: {
			type: String,
			default: 'info',
			validator(value) {
				return ['info', 'primary', 'error', 'warn', 'success'].includes(value)
			}
		},
		//是否块级
		block: {
			type: Boolean,
			default: false
		},
		//头部年月显示格式化
		headerFormatter: {
			type: Function
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	computed: {
		layerRealProps() {
			return {
				placement: this.layerProps.placement ? this.layerProps.placement : 'bottom-start',
				fixed: typeof this.layerProps.fixed == 'boolean' ? this.layerProps.fixed : false,
				fixedAuto: typeof this.layerProps.fixedAuto == 'boolean' ? this.layerProps.fixedAuto : false,
				width: this.layerProps.width,
				zIndex: Dap.number.isNumber(this.layerProps.zIndex) ? this.layerProps.zIndex : 400,
				offset: this.layerProps.offset ? this.layerProps.offset : '0.2rem',
				animation: this.layerProps.animation,
				timeout: Dap.number.isNumber(this.layerProps.timeout) ? this.layerProps.timeout : 200,
				showTriangle: typeof this.layerProps.showTriangle == 'boolean' ? this.layerProps.showTriangle : false,
				shadow: typeof this.layerProps.shadow == 'boolean' ? this.layerProps.shadow : true,
				border: typeof this.layerProps.border == 'boolean' ? this.layerProps.border : false,
				borderColor: this.layerProps.borderColor
			}
		},
		//年数组
		years() {
			let arr = []
			//获取指定的年份
			const year = this.selectedDate.getFullYear()
			const startYear = this.startDate.getFullYear()
			//指定日期所在年份所在数组的序列,12个值为一个数组
			let index = Math.floor((year - startYear) / 12)
			for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
				arr.push(dayjs(this.modelValue).year(i).toDate())
			}
			return arr
		},
		//头部显示年月的值
		formatShow() {
			return (type, date) => {
				if (typeof this.headerFormatter == 'function') {
					if (type == 'year') {
						return this.headerFormatter.apply(this, [type, date.getFullYear()])
					}
					if (type == 'month') {
						return this.headerFormatter.apply(this, [type, date.getMonth() + 1])
					}
				}
				if (type == 'year') {
					return dayjs(date).format('YYYY') + '年'
				}
				if (type == 'month') {
					return dayjs(date).format('MM') + '月'
				}
			}
		}
	},
	components: {
		Layer,
		Icon,
		Calendar
	},
	created() {
		this.view = this.mode
		this.selectedDate = this.modelValue
	},
	mounted() {
		if (this.trigger == 'hover') {
			Dap.event.on(this.$el, 'mouseenter.dateChooser', this.openCalendar)
			Dap.event.on(this.$el, 'mouseleave.dateChooser', this.closeCalendar)
		}
	},
	methods: {
		//悬浮层显示前进行宽度设置
		layerShow() {
			if (!this.layerRealProps.width) {
				this.$refs.panel.style.width = this.$refs.target.offsetWidth + 'px'
			}
		},
		//点击打开/关闭日历弹窗
		clickCalendar() {
			if (this.disabled) {
				return
			}
			if (this.trigger == 'click') {
				if (this.show) {
					this.closeCalendar()
				} else {
					this.openCalendar()
				}
			}
		},
		//点击日期
		dateClick(date) {
			this.$emit('update:modelValue', date)
			this.$emit('change', date)
			this.show = false
		},
		//点击年份
		yearClick(date) {
			if (this.mode == 'year') {
				this.$emit('update:modelValue', date)
				this.$emit('change', date)
				this.show = false
				return
			}
			setTimeout(() => {
				this.view = 'month'
			}, 0)
		},
		//点击月份
		monthClick(date) {
			if (this.mode == 'month') {
				this.$emit('update:modelValue', date)
				this.$emit('change', date)
				this.show = false
				return
			}
			setTimeout(() => {
				this.view = 'date'
			}, 0)
		},
		//更新年份
		updateYear(num) {
			this.selectedDate = dayjs(this.selectedDate).add(num, 'year').toDate()
			this.$emit('update:modelValue', this.selectedDate)
			this.$emit('change', this.selectedDate)
		},
		//更新月份
		updateMonth(num) {
			this.selectedDate = dayjs(this.selectedDate).add(num, 'month').toDate()
			this.$emit('update:modelValue', this.selectedDate)
			this.$emit('change', this.selectedDate)
		},
		//跳转年视图
		goYear() {
			setTimeout(() => {
				this.view = 'year'
			}, 0)
		},
		//跳转月视图
		goMonth() {
			setTimeout(() => {
				this.view = 'month'
			}, 0)
		},
		//api：打开日期选择弹窗
		openCalendar() {
			if (this.disabled) {
				return
			}
			this.show = true
		},
		//api：关闭日期选择弹窗
		closeCalendar() {
			if (this.disabled) {
				return
			}
			this.show = false
		}
	},
	beforeUnmount() {
		if (this.trigger == 'hover') {
			Dap.event.off(this.$el, 'mouseenter.dateChooser mouseleave.dateChooser')
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-date-chooser {
	position: relative;
	display: inline-block;

	.mvi-date-chooser-target {
		position: relative;
		display: inline-block;
	}

	&.block {
		display: block;

		.mvi-date-chooser-target {
			display: block;
		}
	}
}

.mvi-date-chooser-layer {
	display: block;
	width: 100%;
	position: relative;
	overflow: hidden;
	background-color: #fff;
	color: @font-color-default;
	border-radius: inherit;
}

.mvi-date-chooser-year-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: @small-height;
	user-select: none;
	padding: 0 @mp-sm;

	.mvi-date-chooser-year-left,
	.mvi-date-chooser-year-right {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 0 @mp-md;
		color: @font-color-default;
		font-size: @font-size-small;
		transition: color 200ms linear;

		&:hover {
			cursor: pointer;

			&.info {
				color: @info-normal;
			}

			&.success {
				color: @success-normal;
			}

			&.warn {
				color: @warn-normal;
			}

			&.error {
				color: @error-normal;
			}

			&.primary {
				color: @primary-normal;
			}
		}
	}

	.mvi-date-chooser-year-center {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: @font-size-small;
		color: @font-color-default;

		& > span:first-child + span {
			margin: 0 @mp-sm;
		}
	}
}

.mvi-date-chooser-month-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: @small-height;
	user-select: none;
	padding: 0 @mp-sm;

	.mvi-date-chooser-month-left,
	.mvi-date-chooser-month-right {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		padding: 0 @mp-md;
		color: @font-color-default;
		font-size: @font-size-small;
		transition: color 200ms linear;

		&:hover {
			cursor: pointer;

			&.info {
				color: @info-normal;
			}

			&.success {
				color: @success-normal;
			}

			&.warn {
				color: @warn-normal;
			}

			&.error {
				color: @error-normal;
			}

			&.primary {
				color: @primary-normal;
			}
		}
	}

	.mvi-date-chooser-month-center {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: @font-size-small;
		color: @font-color-default;
		transition: color 200ms linear;

		&:hover {
			cursor: pointer;

			&.info {
				color: @info-normal;
			}

			&.success {
				color: @success-normal;
			}

			&.warn {
				color: @warn-normal;
			}

			&.error {
				color: @error-normal;
			}

			&.primary {
				color: @primary-normal;
			}
		}
	}
}

.mvi-date-chooser-date-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: @small-height;
	user-select: none;
	padding: 0 @mp-sm;

	.mvi-date-chooser-date-left,
	.mvi-date-chooser-date-right {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 100%;

		& > div {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			padding: 0 @mp-sm;
			color: @font-color-default;
			font-size: @font-size-small;
			transition: color 200ms linear;

			&:hover {
				cursor: pointer;

				&.info {
					color: @info-normal;
				}

				&.success {
					color: @success-normal;
				}

				&.warn {
					color: @warn-normal;
				}

				&.error {
					color: @error-normal;
				}

				&.primary {
					color: @primary-normal;
				}
			}
		}
	}

	.mvi-date-chooser-date-center {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: @font-size-small;
		color: @font-color-default;

		& > div {
			transition: color 200ms linear;

			&:first-child {
				margin-right: @mp-md;
			}
			&:hover {
				cursor: pointer;

				&.info {
					color: @info-normal;
				}

				&.success {
					color: @success-normal;
				}

				&.warn {
					color: @warn-normal;
				}

				&.error {
					color: @error-normal;
				}

				&.primary {
					color: @primary-normal;
				}
			}
		}
	}
}
</style>

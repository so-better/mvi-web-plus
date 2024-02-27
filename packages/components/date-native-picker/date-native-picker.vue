<template>
	<input @blur="selectDateForIOS" @change="selectDateForAndroid" class="mvi-date-native-picker" :type="dateType" :value="defaultDate" />
</template>

<script>
import dayjs from 'dayjs'
import { Dap } from '../dap'
export default {
	name: 'm-date-native-picker',
	emits: ['update:modelValue', 'error', 'change'],
	props: {
		//选择的类型
		type: {
			type: String,
			default: 'date',
			validator(value) {
				return ['date', 'datetime', 'month', 'time'].includes(value)
			}
		},
		//日期
		modelValue: {
			type: Date,
			default: null
		},
		//最大日期
		max: {
			type: Date,
			default: null
		},
		//最小日期
		min: {
			type: Date,
			default: null
		}
	},
	computed: {
		dateType() {
			if (this.type == 'datetime') {
				return 'datetime-local'
			} else {
				return this.type
			}
		},
		defaultDate() {
			if (this.modelValue) {
				if (this.type == 'date') {
					return dayjs(this.modelValue).format('YYYY-MM-DD')
				}
				if (this.type == 'datetime') {
					return dayjs(this.modelValue).format('YYYY-MM-DD HH:mm')
				}
				if (this.type == 'month') {
					return dayjs(this.modelValue).format('YYYY-MM')
				}
				if (this.type == 'time') {
					return dayjs(this.modelValue).format('HH:mm')
				}
			}
			return ''
		}
	},
	data() {
		return {
			ios: Dap.platform.os().ios,
			iPad: Dap.platform.device().iPad
		}
	},
	methods: {
		//api：触发日期选择弹窗
		trigger() {
			if (this.ios && !this.iPad) {
				this.$el.focus()
			} else {
				this.$el.click()
			}
		},
		//ios系统下选择日期（排除ipad）
		selectDateForIOS() {
			if (this.ios && !this.iPad) {
				this.selectDate()
			}
		},
		//安卓系统下选择日期（加上ipad）
		selectDateForAndroid() {
			if (!this.ios || this.iPad) {
				this.selectDate()
			}
		},
		//选择时间
		selectDate() {
			if (this.$el.value) {
				let val = this.type == 'time' ? `${dayjs(this.modelValue).format('YYYY-MM-DD')} ${this.$el.value}` : this.$el.value
				const date = dayjs(val)
				if (this.min && date.isBefore(dayjs(this.min))) {
					this.$emit('error', 0, 'The date is less than min')
					return
				}
				if (this.max && dayjs(this.max).isBefore(date)) {
					this.$emit('error', 1, 'The date is greater than max')
					return
				}
				this.$emit('update:modelValue', date.toDate())
				this.$emit('change', date.toDate())
			} else {
				this.$emit('update:modelValue', null)
				this.$emit('change', null)
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-date-native-picker {
	width: 0;
	height: 0;
	opacity: 0;
	border: none;
	min-width: 0;
	max-width: 0;
	position: relative;
}
</style>

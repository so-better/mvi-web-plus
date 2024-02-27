<template>
	<div class="mvi-stepper" :class="[size]">
		<div :disabled="disabledMinus || arrivalMin || disabled || null" :class="minusClass" v-if="showMinus" @click="doMinus">
			<Icon type="minus" />
		</div>
		<div :disabled="disabled || disabledInput || null" class="mvi-stepper-input" :class="{ border: border }" :style="{ width: inputWidth || '' }" v-if="showInput">
			<input ref="input" v-model="realValue" :disabled="disabled || disabledInput || null" type="text" @blur="changeValue" @keyup.enter="changeValue" :style="{ textAlign: inputAlign }" inputmode="numeric" />
		</div>
		<div :disabled="disabledPlus || arrivalMax || disabled || null" :class="plusClass" v-if="showPlus" @click="doPlus">
			<Icon type="plus" />
		</div>
	</div>
</template>

<script>
import Dap from 'dap-util'
import { Icon } from '../icon'
export default {
	name: 'm-stepper',
	emits: ['update:modelValue', 'change'],
	props: {
		//输入框的值
		modelValue: {
			type: [String, Number],
			default: 0
		},
		//步进
		step: {
			type: Number,
			default: 1
		},
		//尺寸
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['small', 'medium', 'large'].includes(value)
			}
		},
		//最小值
		min: {
			type: Number,
			default: null
		},
		//最大值
		max: {
			type: Number,
			default: null
		},
		//显示小数位数
		digit: {
			type: Number,
			default: 0
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否禁用加号
		disabledPlus: {
			type: Boolean,
			default: false
		},
		//是否禁用减号
		disabledMinus: {
			type: Boolean,
			default: false
		},
		//是否禁用输入框
		disabledInput: {
			type: Boolean,
			default: false
		},
		//是否显示加号
		showPlus: {
			type: Boolean,
			default: true
		},
		//是否显示减号
		showMinus: {
			type: Boolean,
			default: true
		},
		//是否显示输入框
		showInput: {
			type: Boolean,
			default: true
		},
		//输入框宽度
		inputWidth: {
			type: String,
			default: null
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//输入框数字对齐方式
		inputAlign: {
			type: String,
			default: 'center',
			validator(value) {
				return ['left', 'center', 'right'].includes(value)
			}
		},
		//是否显示边框
		border: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		arrivalMin() {
			if (this.min != null) {
				return this.realValue <= this.min
			}
			return false
		},
		arrivalMax() {
			if (this.max != null) {
				return this.realValue >= this.max
			}
			return false
		},
		minusClass() {
			let cls = ['mvi-stepper-minus']
			if (!(this.disabledMinus || this.arrivalMin || this.disabled) && this.active) {
				cls.push('active')
			}
			if (this.border) {
				cls.push('border')
			}
			return cls
		},
		plusClass() {
			let cls = ['mvi-stepper-plus']
			if (!(this.disabledPlus || this.arrivalMax || this.disabled) && this.active) {
				cls.push('active')
			}
			if (this.border) {
				cls.push('border')
			}
			return cls
		},
		realValue: {
			set(value) {
				let val = this.updateValue(value)
				if (this.modelValue !== val) {
					this.$emit('update:modelValue', val)
					this.$emit('change', val)
				}
			},
			get() {
				return this.modelValue
			}
		}
	},
	components: {
		Icon
	},
	methods: {
		//减法
		doMinus() {
			if (this.disabled) {
				return
			}
			if (this.disabledMinus) {
				return
			}
			if (this.arrivalMin) {
				return
			}
			this.realValue = Dap.number.subtract(this.realValue, this.step)
		},
		//加法
		doPlus() {
			if (this.disabled) {
				return
			}
			if (this.disabledPlus) {
				return
			}
			if (this.arrivalMax) {
				return
			}
			this.realValue = Dap.number.add(this.realValue, this.step)
		},
		//输入框修改值
		changeValue() {
			if (this.disabled) {
				return
			}
			if (this.disabledInput) {
				return
			}
			this.$refs.input.value = this.realValue
		},
		//校验更新value值
		updateValue(value) {
			let val = parseFloat(value)
			if (isNaN(val)) {
				val = 0
			}
			val = Number(val.toFixed(this.digit))
			if (val <= this.min && this.min != null) {
				val = this.min
			}
			if (val >= this.max && this.max != null) {
				val = this.max
			}
			return val
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-stepper {
	display: inline-flex;
	display: -webkit-inline-flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;

	.mvi-stepper-minus,
	.mvi-stepper-plus {
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		background-color: @bg-color-dark;
		border-radius: @radius-default;
		color: @font-color-sub;
		position: relative;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;

		&.active:active::before {
			.mvi-active();
		}

		&.border {
			border: 1px solid @border-color;
		}

		&[disabled] {
			opacity: 0.6;
		}
	}

	.mvi-stepper-minus {
		margin-right: @mp-xs;
	}

	.mvi-stepper-input {
		min-width: 0;
		background-color: @bg-color-dark;
		margin-right: @mp-xs;
		border-radius: @radius-default;
		width: 1.5rem;
		color: @font-color-sub;
		padding: 0 @mp-sm;

		&.border {
			border: 1px solid @border-color;
		}

		input {
			position: relative;
			display: block;
			background-color: transparent;
			height: 100%;
			width: 100%;
			min-width: 0;
			color: inherit;
			font-size: inherit;
			border: none;
			border-radius: @radius-default;
			font-family: @font-family;
			background-image: none;
			margin: 0;
			padding: 0;
			font-size: inherit;

			&[disabled] {
				background-color: inherit;
				color: inherit;
			}
		}

		&[disabled] {
			opacity: 0.6;
		}
	}

	&.small {
		.mvi-stepper-minus,
		.mvi-stepper-plus {
			width: @small-height;
			height: @small-height;
			font-size: @font-size-small;
		}

		.mvi-stepper-input {
			height: @small-height;
			font-size: @font-size-small;
		}
	}

	&.medium {
		.mvi-stepper-minus,
		.mvi-stepper-plus {
			width: @medium-height;
			height: @medium-height;
			font-size: @font-size-default;
		}

		.mvi-stepper-input {
			height: @medium-height;
			font-size: @font-size-default;
		}
	}

	&.large {
		.mvi-stepper-minus,
		.mvi-stepper-plus {
			width: @large-height;
			height: @large-height;
			font-size: @font-size-h6;
		}

		.mvi-stepper-input {
			height: @large-height;
			font-size: @font-size-h6;
		}
	}
}
</style>

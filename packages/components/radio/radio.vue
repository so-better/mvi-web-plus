<template>
	<label class="mvi-radio" :disabled="disabled || null">
		<span v-if="placement == 'left' && label" class="mvi-radio-label" :data-placement="placement" v-text="label"></span>
		<input @change="change" :value="value" :disabled="disabled" :checked="check" type="radio" :name="name" />
		<span :class="['mvi-radio-item', check ? 'check' : '', round ? 'round' : '']" :style="itemStyle">
			<Icon type="success" :style="{ opacity: this.check ? '' : 0 }" />
		</span>
		<span v-if="placement == 'right' && label" class="mvi-radio-label" :data-placement="placement" v-text="label"></span>
	</label>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-radio',
	emits: ['update:modelValue', 'change'],
	props: {
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否选中
		modelValue: {
			type: [Boolean, String, Number, Object],
			default: false
		},
		//label文字
		label: {
			type: String,
			default: null
		},
		//值
		value: {
			type: [Object, Number, String],
			default: ''
		},
		//是否圆形
		round: {
			type: Boolean,
			default: true
		},
		//原生name属性
		name: {
			type: String,
			default: null
		},
		//文字位置
		placement: {
			type: String,
			default: 'right',
			validator(value) {
				return ['left', 'right'].includes(value)
			}
		},
		//大小
		size: {
			type: String,
			default: null
		},
		//主题颜色
		color: {
			type: String,
			default: null
		}
	},
	computed: {
		check() {
			if (typeof this.modelValue == 'boolean') {
				return this.modelValue
			} else {
				return Dap.common.equal(this.modelValue, this.value)
			}
		},
		itemStyle() {
			let style = {}
			if (this.color && this.check && !this.disabled) {
				style.backgroundColor = this.color
				style.borderColor = this.color
			}
			if (this.size) {
				style.fontSize = this.size
			}
			return style
		}
	},
	components: {
		Icon
	},
	methods: {
		change(event) {
			if (typeof this.modelValue == 'boolean') {
				this.$emit('update:modelValue', event.target.checked)
				this.$emit('change', event.target.checked)
			} else {
				//勾选
				if (event.target.checked) {
					this.$emit('update:modelValue', this.value)
					this.$emit('change', this.value)
				}
			}
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-radio {
	display: inline-flex;
	margin: 0;
	padding: 0;
	position: relative;
	vertical-align: middle;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	user-select: none;

	input[type='radio'] {
		width: 0;
		height: 0;
		opacity: 0;
		border: none;
		display: none;
	}

	.mvi-radio-item {
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin: 0;
		padding: @mp-xs / 5;
		border: 1px solid @border-color;
		background-color: #fff;
		font-size: @font-size-small;
		border-radius: @radius-default / 2;
		color: #fff;
		transition: border-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46), background-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46), color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46);

		&.check {
			background-color: @info-normal;
			border-color: @info-normal;
		}

		&.round {
			border-radius: 50%;
		}
	}

	.mvi-radio-label {
		vertical-align: middle;
		font-size: @font-size-default;
		color: @font-color-default;
		user-select: none;

		&[data-placement='left'] {
			margin-right: @mp-xs;
		}

		&[data-placement='right'] {
			margin-left: @mp-xs;
		}
	}

	&[disabled] {
		.mvi-radio-item,
		.mvi-radio-item.check {
			background-color: @bg-color-dark;
			border-color: @border-color;
			color: @font-color-mute;
		}

		.mvi-radio-label {
			color: @font-color-mute;
		}
	}
}
</style>

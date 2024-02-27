<template>
	<label class="mvi-switch" :class="{ checked: modelValue }" :style="switchStyle" :disabled="disabled || null">
		<span class="mvi-switch-el" :class="{ checked: modelValue }" :style="elStyle">
			<Icon v-if="loading && !disabled" type="load-e" spin size="0.8em" />
		</span>
		<input @change="change" type="checkbox" :checked="modelValue" :disabled="disabled || loading" />
	</label>
</template>

<script>
import { Icon } from '../icon'
export default {
	name: 'm-switch',
	emits: ['update:modelValue', 'change'],
	props: {
		//是否勾选
		modelValue: {
			type: Boolean,
			default: false
		},
		//是否显示加载状态
		loading: {
			type: Boolean,
			default: false
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//尺寸大小
		size: {
			type: String,
			default: '0.4rem'
		},
		//开关打开时背景色
		activeColor: {
			type: String,
			default: null
		},
		//开关关闭时背景色
		inactiveColor: {
			type: String,
			default: null
		}
	},
	components: {
		Icon
	},
	methods: {
		//更改状态
		change(event) {
			let check = event.target.checked
			this.$emit('update:modelValue', check)
			this.$emit('change', check)
		}
	},
	computed: {
		switchStyle() {
			let style = {}
			if (this.inactiveColor && !this.modelValue) {
				style.backgroundColor = this.inactiveColor
			}
			if (this.activeColor && this.modelValue) {
				style.backgroundColor = this.activeColor
			}
			if (this.size) {
				style.width = `calc(${this.size} * 2)`
			}
			return style
		},
		elStyle() {
			let style = {}
			if (this.activeColor) {
				style.color = this.activeColor
			}
			if (this.size) {
				style.width = this.size
				style.height = this.size
				style.fontSize = this.size
			}
			return style
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-switch {
	display: inline-flex;
	display: -webkit-inline-flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	background-color: #fff;
	border-radius: @radius-round;
	border: 1px solid rgba(0, 0, 0, 0.05);
	transition: background-color 300ms;
	-webkit-transition: background-color 300ms;
	cursor: pointer;

	input[type='checkbox'] {
		display: none;
		width: 0;
		height: 0;
		opacity: 0;

		&[disabled] {
			pointer-events: none;
		}
	}

	&[disabled] {
		opacity: 0.6;
	}

	&.checked {
		background-color: @info-normal;
	}

	.mvi-switch-el {
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: center;
		align-items: center;
		color: @info-normal;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: @radius-circle;
		box-shadow: @boxshadow;
		background-color: #fff;
		margin: 0;
		padding: 0;
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
		-webkit-transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);

		&.checked {
			transform: translateX(100%);
			-webkit-transform: translateX(100%);
		}
	}
}
</style>

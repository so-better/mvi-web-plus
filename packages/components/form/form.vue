<template>
	<div :class="['mvi-form', block ? 'mvi-form-block' : '']" :style="formStyle">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'm-form',
	props: {
		//竖排显示时整个表单宽度
		width: {
			type: String,
			default: null
		},
		//是否竖排显示
		block: {
			type: Boolean,
			default: false
		},
		//竖排显示时标签是否独立一行
		labelBlock: {
			type: Boolean,
			default: false
		},
		//同form-el的align
		align: {
			type: String,
			default: 'center'
		},
		//标签额外样式
		labelClass: {
			type: String,
			default: null
		},
		//标签宽度
		labelWidth: {
			type: String,
			default: null
		},
		//标签距离右侧距离
		labelOffset: {
			type: String,
			default: null
		}
	},
	computed: {
		formStyle() {
			let style = {}
			if (this.block && this.width) {
				style.width = this.width
			}
			return style
		}
	},
	provide() {
		return {
			form: this
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-form {
	display: flex;
	display: -webkit-flex;
	width: 100%;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	-webkit-flex-wrap: wrap;

	&.mvi-form-block {
		display: block;
	}
}
</style>

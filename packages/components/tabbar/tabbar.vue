<template>
	<div :class="['mvi-tabbar', border ? 'border' : '', fixed ? 'fixed' : '']" :style="tabbarStyle">
		<TabbarItem v-for="(item, index) in tabs" :name="item.name" :value="item.value" :icon="item.icon" :disabled="item.disabled" :badge="item.badge" :route="item.route" :style="tabbarItemStyle(index)"></TabbarItem>
	</div>
</template>

<script>
import { Dap } from '../dap'
import TabbarItem from './tabbar-item.vue'
export default {
	name: 'm-tabbar',
	components: {
		TabbarItem
	},
	emits: ['update:modelValue', 'item-click', 'change'],
	provide() {
		return {
			tabbar: this
		}
	},
	props: {
		//激活标签的value值
		modelValue: {
			type: [Object, Number, String, Array],
			default: null
		},
		//标签栏的标签配置
		tabs: {
			type: Array,
			default: function () {
				return []
			}
		},
		//是否固定底部
		fixed: {
			type: Boolean,
			default: false
		},
		//是否显示上边框
		border: {
			type: Boolean,
			default: false
		},
		//层级
		zIndex: {
			type: Number,
			default: 400
		},
		//激活颜色
		activeColor: {
			type: String,
			default: null
		},
		//未激活颜色
		inactiveColor: {
			type: String,
			default: null
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//标签排列方式
		flex: {
			type: String,
			default: null
		},
		//设置每个标签左外边距
		offset: {
			type: String,
			default: null
		}
	},
	computed: {
		tabbarItemStyle() {
			return index => {
				let style = {}
				if (index != 0 && this.offset) {
					style.marginLeft = this.offset
				}
				return style
			}
		},
		tabbarStyle() {
			let style = {}
			if (this.fixed && Dap.number.isNumber(this.zIndex)) {
				style.zIndex = this.zIndex
			}
			if (this.flex) {
				style.justifyContent = this.flex
			}
			return style
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-tabbar {
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: @mini-height * 2;
	background-color: #fff;
	padding: 0 @mp-xs;
	color: @font-color-default;

	&.border {
		border-top: 1px solid @border-color;
	}

	&.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
	}
}
</style>

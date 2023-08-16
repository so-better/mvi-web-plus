<template>
	<transition :name="'mvi-tab-' + tabs.animation + (back ? '-back' : '')">
		<div v-show="show" v-if="firstShow" class="mvi-tab" :style="tabStyle">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
export default {
	name: 'm-tab',
	inject: ['tabs'],
	data() {
		return {
			show: false,
			back: false,
			firstShow: false
		}
	},
	setup() {
		const uid = getCurrentInstance().uid
		return {
			uid
		}
	},
	created() {
		this.tabs.children.push(this)
		if (this.tabs.modelValue == this.tabIndex) {
			this.show = true
			if (!this.firstShow) {
				this.firstShow = true
			}
		}
	},
	props: {
		//标题
		title: {
			type: String,
			default: ''
		},
		//标题侧边显示的图标
		icon: {
			type: [String, Object],
			default: null
		},
		//是否禁用选项卡
		disabled: {
			type: Boolean,
			default: false
		},
		//图标位置
		placement: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'right'].includes(value)
			}
		}
	},
	computed: {
		tabStyle() {
			let style = {}
			if (this.tabs.animation == 'slide') {
				style.transition = 'left ' + this.tabs.timeout + 'ms,opacity ' + this.tabs.timeout + 'ms'
				style.webkitTransition = 'left ' + this.tabs.timeout + 'ms,opacity ' + this.tabs.timeout + 'ms'
			} else if (this.tabs.animation == 'fade') {
				style.transition = 'opacity ' + this.tabs.timeout + 'ms'
				style.webkitTransition = 'opacity ' + this.tabs.timeout + 'ms'
			}
			return style
		},
		//tab在tabs中的序列值
		tabIndex() {
			return this.tabs.children.findIndex(vm => {
				return Dap.common.equal(vm.uid, this.uid)
			})
		}
	},
	unmounted() {
		this.tabs.children.splice(this.tabIndex, 1)
		if (this.tabs.modelValue > 0) {
			this.tabs.$emit('update:modelValue', this.tabs.modelValue - 1)
			this.tabs.$emit('change', this.tabs.modelValue - 1)
		} else {
			this.tabs.to(0, 0)
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-tab {
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	background-color: #fff;
}

.mvi-tab-fade-enter-from,
.mvi-tab-fade-leave-to,
.mvi-tab-fade-back-enter-from,
.mvi-tab-fade-back-leave-to {
	opacity: 0;
}

.mvi-tab-slide-enter-from {
	left: 100%;
	opacity: 0;
}

.mvi-tab-slide-leave-to {
	left: -100%;
	opacity: 0;
}

.mvi-tab-slide-back-enter-from {
	left: -100%;
	opacity: 0;
}

.mvi-tab-slide-back-leave-to {
	left: 100%;
	opacity: 0;
}
</style>

<template>
	<transition name="mvi-transition-slide" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave" @enter="enter" @leave="leave">
		<div class="mvi-transition-slide" v-show="show" :style="{ opacity: opacity }">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
import Dap from 'dap-util'
export default {
	name: 'm-transition-slide',
	data() {
		return {
			//初始就显示
			show: true,
			//记录的高度
			height: null,
			//初始不使用动画
			useAnimation: false,
			//透明度默认为0
			opacity: 0
		}
	},
	emits: ['before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'],
	props: {
		//是否展开
		expand: {
			type: Boolean,
			default: true
		},
		//动画时间
		timeout: {
			type: Number,
			default: 200
		}
	},
	watch: {
		expand(newValue) {
			this.show = newValue
		}
	},
	mounted() {
		//show取值于expand
		this.show = this.expand
		//如果初始化就是展开的，则设置动画并且恢复透明度
		if (this.show) {
			this.useAnimation = true
			this.opacity = ''
		}
	},
	methods: {
		//元素显示前
		beforeEnter(el) {
			//设置高度为0
			el.style.height = 0
			//设置动画
			el.style.transition = 'height ' + this.timeout + 'ms linear'
			el.style.webkitTransition = 'height ' + this.timeout + 'ms linear'
			//触发事件
			this.$emit('before-slide-down', this.$el)
		},
		//元素显示时
		enter(el) {
			//促使浏览器重绘
			el.offsetWidth
			//设置显示后的高度
			el.style.height = this.height
		},
		//元素显示后
		afterEnter(el) {
			//移除动画
			el.style.transition = ''
			el.style.webkitTransition = ''
			//动画结束后恢复高度
			el.style.height = ''
			//触发事件
			this.$emit('slide-down', this.$el)
		},
		//元素隐藏之前
		beforeLeave(el) {
			//只记录第一次的高度
			if (!this.height) {
				this.height = Dap.element.getCssStyle(el, 'height')
			}
			//设置元素高度
			el.style.height = this.height
			//此时有动画，则设置动画属性，并触发事件
			if (this.useAnimation) {
				el.style.transition = 'height ' + this.timeout + 'ms linear'
				el.style.webkitTransition = 'height ' + this.timeout + 'ms linear'
				//触发事件
				this.$emit('before-slide-up', this.$el)
			}
		},
		//元素隐藏时
		leave(el) {
			//促使浏览器重绘
			el.offsetWidth
			//设置隐藏后的高度
			el.style.height = 0
		},
		//元素隐藏后
		afterLeave(el) {
			//动画结束后恢复高度
			el.style.height = ''
			//此时有动画效果，则设置动画效果相关的属性，并触发事件
			if (this.useAnimation) {
				el.style.transition = ''
				el.style.webkitTransition = ''
				//触发事件
				this.$emit('slide-up', this.$el)
			}
			//此时没有动画效果，表示元素初始化是隐藏的，需要为后续做动画进行准备
			else {
				this.useAnimation = true
				this.opacity = ''
			}
		}
	}
}
</script>

<style scoped lang="less">
.mvi-transition-slide {
	display: block;
	width: 100%;
	overflow: hidden;
	padding: 0;
	margin: 0;
	border: none;
	background: none;
}
</style>

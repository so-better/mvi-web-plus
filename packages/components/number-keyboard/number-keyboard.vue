<template>
	<Overlay ref="overlay" v-model="cmpShow" @show="overlayShow" @hide="overlayHide" :z-index="zIndex" :color="overlayColor" :closable="closable" :timeout="timeout" :mount-el="mountEl" :use-padding="usePadding">
		<transition name="mvi-keyboard" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave" @leave="leave" @enter="enter">
			<div ref="keyboard" class="mvi-number-keyboard" v-if="firstShow" v-show="keyboardShow" :style="boardStyle" v-bind="$attrs">
				<div v-if="!border && (title || $slots.title)" class="mvi-number-keyboard-title">
					<slot v-if="$slots.title"></slot>
					<span v-else>{{ title }}</span>
				</div>
				<div :class="['mvi-number-keyboard-wrapper', border ? '' : 'border']">
					<div class="mvi-number-keyboard-left">
						<template v-for="(item, index) in cpmNumbers">
							<div :class="leftNumberClass(item, index)">
								<div @click="numberClick(item)" :class="leftNumberElClass(item, index)">{{ item }}</div>
							</div>
						</template>
					</div>
					<div class="mvi-number-keyboard-right" v-if="showComplete || showDelete">
						<div :class="deleteBtnClass" v-if="showDelete">
							<div :disabled="deleteDisabeld || null" :class="deleteBtnElClass" @click="deleteClick">
								<slot name="delete" v-if="$slots.delete"></slot>
								<span v-text="deleteText" v-else></span>
							</div>
						</div>
						<div :class="completeBtnClass" v-if="showComplete">
							<div :disabled="promiseEmpty ? null : completeDisabled || null" :class="completeBtnElClass" @click="completeClick">
								<slot name="complete" v-if="$slots.complete"></slot>
								<span v-text="completeText"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</Overlay>
</template>

<script>
import Dap from 'dap-util'
import { Overlay } from '../overlay'
export default {
	name: 'm-number-keyboard',
	data() {
		return {
			//第一次显示进行渲染
			firstShow: false,
			//键盘是否显示
			keyboardShow: false,
			//键盘按键
			numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '.', '0'],
			//每次打开时的键盘布局缓存
			oldNumbers: []
		}
	},
	emits: ['update:modelValue', 'update:show', 'input', 'delete', 'complete', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'],
	inheritAttrs: false,
	props: {
		//是否显示小数点
		showDecimal: {
			type: Boolean,
			default: true
		},
		//是否显示删除按钮
		showDelete: {
			type: Boolean,
			default: true
		},
		//是否显示完成按钮
		showComplete: {
			type: Boolean,
			default: true
		},
		//是否显示键盘
		show: {
			type: Boolean,
			default: false
		},
		//当前输入的值
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//zIndex
		zIndex: {
			type: Number,
			default: 850
		},
		//动画时长
		timeout: {
			type: Number,
			default: 200
		},
		//点击背景是否可关闭
		closable: {
			type: Boolean,
			default: false
		},
		//输入值最大长度
		maxlength: {
			type: Number,
			default: -1
		},
		//删除按钮文字
		deleteText: {
			type: String,
			default: '删除'
		},
		//完成按钮文字
		completeText: {
			type: String,
			default: '完成'
		},
		//空值时完成按钮是否可点击
		promiseEmpty: {
			type: Boolean,
			default: false
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//遮罩层颜色
		overlayColor: {
			type: String,
			default: 'rgba(0,10,20,0.2)'
		},
		//是否考虑滚动条
		usePadding: {
			type: Boolean,
			default: false
		},
		//是否进行数字校准
		calibration: {
			type: Boolean,
			default: false
		},
		//是否为身份证输入键盘
		showX: {
			type: Boolean,
			default: false
		},
		//是否随即键盘
		random: {
			type: Boolean,
			default: false
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//是否显示边框
		border: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		$$el() {
			return this.$refs.overlay.$$el
		},
		cmpShow: {
			set(value) {
				this.$emit('update:show', value)
			},
			get() {
				return this.show
			}
		},
		cmpValue: {
			set(value) {
				this.$emit('update:modelValue', value)
			},
			get() {
				if (Dap.number.isNumber(this.modelValue)) {
					return this.modelValue.toString()
				}
				return this.modelValue
			}
		},
		boardStyle() {
			return {
				transition: 'all ' + this.timeout + 'ms',
				zIndex: this.zIndex + 10
			}
		},
		deleteDisabeld() {
			if (this.modelValue === '') {
				return true
			}
			return false
		},
		completeDisabled() {
			if (this.modelValue === '') {
				return true
			}
			return false
		},
		leftNumberClass() {
			return (item, index) => {
				let cls = ['mvi-number-keyboard-left-number']
				//最后一个数值键盘宽度不一致
				if (index == this.cpmNumbers.length - 1) {
					if (this.showX || this.showDecimal) {
						cls.push('half')
					} else {
						cls.push('full')
					}
				}
				if (this.border) {
					cls.push('border')
				}
				return cls
			}
		},
		leftNumberElClass() {
			return () => {
				let cls = ['mvi-number-keyboard-left-number-el']
				if (this.active) {
					cls.push('active')
				}
				return cls
			}
		},
		deleteBtnClass() {
			let cls = ['mvi-number-keyboard-delete']
			if (this.border) {
				cls.push('border')
			}
			return cls
		},
		deleteBtnElClass() {
			let cls = ['mvi-number-keyboard-delete-el']
			if (this.active && !this.deleteDisabeld) {
				cls.push('active')
			}
			return cls
		},
		completeBtnClass() {
			let cls = ['mvi-number-keyboard-complete']
			if (this.border) {
				cls.push('border')
			}
			return cls
		},
		completeBtnElClass() {
			let cls = ['mvi-number-keyboard-complete-el']
			if (this.active && !(this.promiseEmpty ? false : this.completeDisabled)) {
				cls.push('active')
			}
			return cls
		},
		showKeyBoard() {
			return item => {
				if (item == 'X') {
					return this.showX
				}
				if (item == '.') {
					return this.showDecimal && !this.showX
				}
				return true
			}
		},
		cpmNumbers() {
			let numbers = this.numbers.filter(item => {
				return this.showKeyBoard(item)
			})
			if (this.random) {
				if (this.show) {
					let arr = []
					let length = numbers.length
					for (let i = 0; i < length; i++) {
						arr.push(this.getRandomNumber(arr))
					}
					this.oldNumbers = [...arr]
					return arr
				}
				return this.oldNumbers
			}
			return numbers
		}
	},
	components: {
		Overlay
	},
	methods: {
		//获取一个随机键盘值
		getRandomNumber(arr) {
			let numbers = this.numbers.filter(item => {
				return this.showKeyBoard(item)
			})
			let index = Math.floor(Math.random() * numbers.length)
			if (arr.includes(numbers[index])) {
				return this.getRandomNumber(arr)
			}
			return numbers[index]
		},
		//遮罩层显示前
		overlayShow() {
			if (!this.firstShow) {
				this.firstShow = true
			}
			this.keyboardShow = true
		},
		//遮罩层隐藏前
		overlayHide() {
			this.keyboardShow = false
		},
		//数字点击
		numberClick(item) {
			if (this.cmpValue.length >= this.maxlength && this.maxlength > 0) {
				return
			}
			this.cmpValue += item
			this.$emit('input', item)
		},
		//删除点击
		deleteClick() {
			if (this.deleteDisabeld) {
				return
			}
			let value = Dap.string.delete(this.cmpValue, this.cmpValue.length - 1, 1)
			this.cmpValue = value
			this.$emit('delete', value)
		},
		//完成点击
		completeClick() {
			if (this.completeDisabled && !this.promiseEmpty) {
				return
			}
			if (this.calibration) {
				this.cmpValue = parseFloat(this.cmpValue) || ''
			}
			this.$emit('complete', this.cmpValue)
			this.cmpShow = false
		},
		//弹出层显示前
		beforeEnter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-keyboard-beforeEnter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-keyboard-beforeEnter-trigger', true)
			this.$emit('show', el)
			if (typeof this.keyboardComponentWatch == 'function') {
				this.keyboardComponentWatch.apply(this, ['show', el])
			}
		},
		//弹出层显示时
		enter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-keyboard-enter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-keyboard-enter-trigger', true)
			this.$emit('showing', el)
			if (typeof this.keyboardComponentWatch == 'function') {
				this.keyboardComponentWatch.apply(this, ['showing', el])
			}
		},
		//弹出层显示后
		afterEnter(el) {
			this.$emit('shown', el)
			if (typeof this.keyboardComponentWatch == 'function') {
				this.keyboardComponentWatch.apply(this, ['shown', el])
			}
		},
		//弹出层隐藏前
		beforeLeave(el) {
			//清除标记
			Dap.data.remove(el, 'mvi-keyboard-beforeEnter-trigger')
			Dap.data.remove(el, 'mvi-keyboard-enter-trigger')

			this.$emit('hide', el)
			if (typeof this.keyboardComponentWatch == 'function') {
				this.keyboardComponentWatch.apply(this, ['hide', el])
			}
		},
		//弹出层隐藏时
		leave(el) {
			this.$emit('hidding', el)
			if (typeof this.keyboardComponentWatch == 'function') {
				this.keyboardComponentWatch.apply(this, ['hidding', el])
			}
		},
		//弹出层隐藏后
		afterLeave(el) {
			this.$emit('hidden', el)
			if (typeof this.keyboardComponentWatch == 'function') {
				this.keyboardComponentWatch.apply(this, ['hidden', el])
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-number-keyboard {
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	background-color: #fff;
	user-select: none;
	-webkit-user-select: none;
	font-size: @font-size-h6;
	box-shadow: @boxshadow;

	.mvi-number-keyboard-title {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: @mp-sm @mp-sm 0 @mp-sm;
		font-size: @font-size-default;
		color: @font-color-sub;
	}

	.mvi-number-keyboard-wrapper {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		width: 100%;
		height: 4.8rem;

		&.border {
			padding: @mp-sm;
		}

		.mvi-number-keyboard-left {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			-webkit-flex-wrap: wrap;
			flex: 1;
			height: 100%;

			.mvi-number-keyboard-left-number {
				display: block;
				width: calc(~'1/3 * 100%');
				height: calc(~'1/4 * 100%');
				margin: 0;
				padding: @mp-xs;

				& > .mvi-number-keyboard-left-number-el {
					position: relative;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					background-color: @bg-color-default;
					border-radius: @radius-default;
					cursor: pointer;
					font-weight: bold;

					&.active:active::before {
						.mvi-active();
					}
				}

				&.border {
					border-top: 1px solid @border-color;
					border-right: 1px solid @border-color;
					padding: 0;

					& > .mvi-number-keyboard-left-number-el {
						background-color: transparent;
						border-radius: 0;
					}
				}

				&.half {
					width: calc(~'2/3 * 100%');
				}
				&.full {
					width: 100%;
				}
			}
		}

		.mvi-number-keyboard-right {
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			flex-direction: column;
			height: 100%;
			width: 2.1rem;

			.mvi-number-keyboard-delete {
				display: block;
				width: 100%;
				flex: 1;
				padding: @mp-xs;

				.mvi-number-keyboard-delete-el {
					position: relative;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					background-color: @bg-color-dark;
					font-weight: bold;
					cursor: pointer;
					height: 100%;
					width: 100%;
					border-radius: @radius-default;

					&.active:active::before {
						.mvi-active();
					}

					&[disabled] {
						opacity: 0.6;
					}
				}

				&.border {
					border-top: 1px solid @border-color;
					padding: 0;

					& > .mvi-number-keyboard-delete-el {
						border-radius: 0;
					}
				}
			}

			.mvi-number-keyboard-complete {
				display: block;
				width: 100%;
				flex: 1;
				padding: @mp-xs;

				.mvi-number-keyboard-complete-el {
					position: relative;
					display: flex;
					display: -webkit-flex;
					justify-content: center;
					align-items: center;
					background-color: @bg-color-dark;
					font-weight: bold;
					cursor: pointer;
					height: 100%;
					width: 100%;
					background-color: @primary-normal;
					color: #fff;
					font-weight: bold;
					cursor: pointer;
					border-radius: @radius-default;

					&.active:active::before {
						.mvi-active();
					}
					&[disabled] {
						opacity: 0.6;
					}
				}

				&.border {
					border-top: 1px solid @border-color;
					padding: 0;

					& > .mvi-number-keyboard-complete-el {
						border-radius: 0;
					}
				}
			}
		}
	}
}

.mvi-keyboard-enter-from,
.mvi-keyboard-leave-to {
	transform: translateY(100%);
}
</style>

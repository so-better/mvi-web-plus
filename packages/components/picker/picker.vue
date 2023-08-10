<template>
	<div class="mvi-picker">
		<div class="mvi-picker-loading" v-if="loading" :style="loadingStyle">
			<Loading size="0.5rem" color="#ddd"></Loading>
		</div>
		<div v-if="showToolbar && !loading" class="mvi-picker-toolbar">
			<div class="mvi-picker-toolbar-cancel" v-text="cancelText" @click="doCancel"></div>
			<div class="mvi-picker-toolbar-title" v-if="title" v-text="title"></div>
			<div class="mvi-picker-toolbar-confirm" v-text="confirmText" @click="doConfirm"></div>
		</div>
		<div v-if="!loading" class="mvi-picker-content" :style="contentStyle" ref="content" @touchmove="contentTouchMove">
			<div v-for="(column, index) in cmpOptions" class="mvi-picker-items" :ref="el => (itemRefs[index] = el)" :style="columnStyle(column, index)" @touchstart="touchstart($event, index)" @touchmove="touchmove" @touchend="touchend" @mousedown="mousedown($event, index)">
				<div class="mvi-picker-item" v-for="(item, index2) in column.values" v-text="item" :style="{ height: selectHeight || '' }"></div>
			</div>
			<div class="mvi-picker-active" :style="{ height: selectHeight || '' }"></div>
			<div class="mvi-picker-mask" :style="maskStyle"></div>
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Loading } from '../loading'
export default {
	name: 'm-picker',
	data() {
		return {
			offsets: [],
			startY: 0,
			startY2: 0,
			//触摸的时间
			time: 0,
			oldActives: [],
			amounts: 0,
			//鼠标是否按下
			mouseDown: false,
			//按下的列序列
			columnIndex: 0,
			//开始时间
			StartTimeStamp: 0,
			//结束时间
			endTimeStamp: 0,
			itemRefs: []
		}
	},
	emits: ['confirm', 'cancel', 'change'],
	props: {
		//选择器配置
		options: {
			type: [Array, Object],
			default: function () {
				return {
					values: [],
					defaultIndex: 0
				}
			}
		},
		//是否显示标题栏
		showToolbar: {
			type: Boolean,
			default: true
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//确认文字
		confirmText: {
			type: String,
			default: '确定'
		},
		//取消文字
		cancelText: {
			type: String,
			default: '取消'
		},
		//是否显示加载状态
		loading: {
			type: Boolean,
			default: false
		},
		//可见选项个数
		visibleCounts: {
			type: Number,
			default: 5
		},
		//选择框高度
		selectHeight: {
			type: String,
			default: '0.88rem'
		}
	},
	watch: {
		cmpOptions() {
			this.init()
		}
	},
	computed: {
		//单个高度
		cmpHeight() {
			if (this.selectHeight.includes('px')) {
				return parseFloat(this.selectHeight)
			} else if (this.selectHeight.includes('rem')) {
				return Dap.element.rem2px(parseFloat(this.selectHeight))
			}
		},
		//加载状态样式
		loadingStyle() {
			let style = {}
			style.height = `calc(${Dap.number.mutiply(this.cmpHeight, this.visibleCounts)}px + 0.88rem)`
			return style
		},
		//内容区域样式
		contentStyle() {
			let style = {}
			style.height = `${Dap.number.mutiply(this.cmpHeight, this.visibleCounts)}px`
			return style
		},
		//选项配置
		cmpOptions() {
			let op = []
			if (Array.isArray(this.options)) {
				op = this.options
			} else {
				op = [this.options]
			}
			return op
		},
		//每一列样式
		columnStyle() {
			return (column, index) => {
				let style = {}
				style.transform = `translate3d(0,${this.offsets[index] || 0}px,0)`
				style.webkitTransform = `translate3d(0,${this.offsets[index] || 0}px,0)`
				return style
			}
		},
		actives() {
			let arr = []
			for (let i = 0; i < this.offsets.length; i++) {
				arr.push({
					index: this.getActive(this.offsets[i]),
					value: this.cmpOptions[i].values[this.getActive(this.offsets[i])]
				})
			}
			return arr
		},
		maskStyle() {
			let style = {}
			if (this.selectHeight) {
				style.backgroundSize = '100% ' + Dap.number.mutiply(this.cmpHeight, Dap.number.divide(this.visibleCounts - 1, 2)) + 'px'
			}
			return style
		}
	},
	components: {
		Loading
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		this.init()
		Dap.event.on(document.documentElement, `mousemove.picker_${this.uid}`, this.mousemove)
		Dap.event.on(document.documentElement, `mouseup.picker_${this.uid}`, this.mouseup)
	},
	methods: {
		//初始化
		init() {
			this.offsets = []
			for (let i = 0; i < this.cmpOptions.length; i++) {
				this.offsets.push(this.getOffset(this.cmpOptions[i].defaultIndex || 0))
			}
		},
		//滑动临界值
		crisis(index) {
			let max = Dap.number.divide(this.visibleCounts - 1, 2)
			max = Dap.number.mutiply(max, this.cmpHeight)
			let min = -Dap.number.divide(this.visibleCounts - 1, 2)
			min = Dap.number.mutiply(min, this.cmpHeight)
			min += Dap.number.mutiply(this.visibleCounts - this.cmpOptions[index].values.length, this.cmpHeight)
			return {
				max,
				min
			}
		},
		//根据offset计算序列
		getActive(value) {
			let num = Math.abs(Dap.number.divide(value - Dap.number.mutiply(Dap.number.divide(this.visibleCounts - 1, 2), this.cmpHeight), this.cmpHeight))
			return Math.round(num)
		},
		//根据序列计算offset
		getOffset(index) {
			return Dap.number.mutiply(Dap.number.subtract(Dap.number.divide(this.visibleCounts - 1, 2), index), this.cmpHeight)
		},
		//确认
		doConfirm() {
			if (this.actives.length == 1) {
				this.$emit('confirm', this.actives[0])
			} else {
				this.$emit('confirm', this.actives)
			}
		},
		//取消
		doCancel() {
			this.init()
			if (this.actives.length == 1) {
				this.$emit('cancel', this.actives[0])
			} else {
				this.$emit('cancel', this.actives)
			}
		},
		//添加动画
		addTransition(index, timeout) {
			return new Promise(resolve => {
				this.itemRefs[index].style.transition = 'all ' + timeout + 'ms ease-out'
				this.itemRefs[index].style.webkitTransition = 'all ' + timeout + 'ms ease-out'
				setTimeout(() => {
					resolve()
				}, 0)
			})
		},
		//移除动画
		removeTransition(index) {
			return new Promise(resolve => {
				this.itemRefs[index].style.transition = ''
				this.itemRefs[index].style.webkitTransition = ''
				setTimeout(() => {
					resolve()
				}, 0)
			})
		},
		//开始触摸
		touchstart(event, index) {
			this.startY = event.targetTouches[0].pageY
			this.startY2 = this.startY
			this.time = Date.now()
			this.oldActives = this.actives
			this.amounts = 0
			this.columnIndex = index
			this.StartTimeStamp = Date.now()
		},
		//鼠标开始按下
		mousedown(event, index) {
			this.startY = event.pageY
			this.startY2 = this.startY
			this.time = Date.now()
			this.oldActives = this.actives
			this.amounts = 0
			this.mouseDown = true
			this.columnIndex = index
			this.StartTimeStamp = Date.now()
		},
		//触摸过程
		touchmove(event) {
			if (event.cancelable) {
				event.preventDefault()
			}
			let endY = event.targetTouches[0].pageY
			let moveY = endY - this.startY //每次偏移量
			let moveY2 = endY - this.startY2 //总偏移量
			//已经在第一个选项且是下滑的
			if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max && moveY2 > 0) {
				this.amounts += 5
				this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts
				return
			}
			//已经在最后一个选项且是上滑的
			if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min && moveY2 < 0) {
				this.amounts += 5
				this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts
				return
			}
			this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / 1.6
			this.startY = endY
		},
		//鼠标拖动
		mousemove(event) {
			if (!this.mouseDown) {
				return
			}
			if (event.cancelable) {
				event.preventDefault()
			}
			let endY = event.pageY
			let moveY = endY - this.startY //每次偏移量
			let moveY2 = endY - this.startY2 //总偏移量
			//已经在第一个选项且是下滑的
			if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max && moveY2 > 0) {
				this.amounts += 5
				this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts
				return
			}
			//已经在最后一个选项且是上滑的
			if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min && moveY2 < 0) {
				this.amounts += 5
				this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / this.amounts
				return
			}
			this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + moveY / 1.6
			this.startY = endY
		},
		//触摸结束
		touchend(event) {
			this.endTimeStamp = Date.now()
			let moveTotal = event.changedTouches[0].pageY - this.startY2
			let totalTimeStamp = this.endTimeStamp - this.StartTimeStamp //时间差
			if (totalTimeStamp < 300 && Math.abs(moveTotal) > this.cmpHeight) {
				//惯性滑动
				this.addTransition(this.columnIndex, 1000)
					.then(() => {
						if (moveTotal > 0) {
							this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + (Dap.element.rem2px(10) * totalTimeStamp) / 1000
						} else {
							this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - (Dap.element.rem2px(10) * totalTimeStamp) / 1000
						}
						return this.addTransition(this.columnIndex, 300)
					})
					.then(() => {
						this.endDeal(moveTotal, 300)
					})
			} else {
				this.addTransition(this.columnIndex, 300).then(() => {
					this.endDeal(moveTotal, 300)
				})
			}
		},
		//鼠标松开
		mouseup(event) {
			if (!this.mouseDown) {
				return
			}
			this.mouseDown = false
			this.endTimeStamp = Date.now()
			let moveTotal = event.pageY - this.startY2
			let totalTimeStamp = this.endTimeStamp - this.StartTimeStamp //时间差
			if (totalTimeStamp < 300 && Math.abs(moveTotal) > this.cmpHeight) {
				//惯性滑动
				this.addTransition(this.columnIndex, 1000)
					.then(() => {
						if (moveTotal > 0) {
							this.offsets[this.columnIndex] = this.offsets[this.columnIndex] + (Dap.element.rem2px(10) * totalTimeStamp) / 1000
						} else {
							this.offsets[this.columnIndex] = this.offsets[this.columnIndex] - (Dap.element.rem2px(10) * totalTimeStamp) / 1000
						}
						return this.addTransition(this.columnIndex, 300)
					})
					.then(() => {
						this.endDeal(moveTotal, 300)
					})
			} else {
				this.addTransition(this.columnIndex, 300).then(() => {
					this.endDeal(moveTotal, 300)
				})
			}
		},
		//滑动后归位处理
		endDeal(moveTotal, timeout) {
			if (moveTotal > 0) {
				if (this.offsets[this.columnIndex] >= this.crisis(this.columnIndex).max) {
					this.offsets[this.columnIndex] = this.crisis(this.columnIndex).max
				} else {
					let order = this.getActive(this.offsets[this.columnIndex])
					this.offsets[this.columnIndex] = this.getOffset(order)
				}
			} else {
				if (this.offsets[this.columnIndex] <= this.crisis(this.columnIndex).min) {
					this.offsets[this.columnIndex] = this.crisis(this.columnIndex).min
				} else {
					let order = this.getActive(this.offsets[this.columnIndex])
					this.offsets[this.columnIndex] = this.getOffset(order)
				}
			}
			if (this.actives.length == 1) {
				if (this.actives[0].index != this.oldActives[0].index) {
					this.$emit('change', this.columnIndex, this.actives[0])
				}
			} else {
				let flag = true
				for (let i = 0; i < this.oldActives.length; i++) {
					if (this.oldActives[i].index != this.actives[i].index) {
						flag = false
					}
				}
				if (!flag) {
					this.$emit('change', this.columnIndex, this.actives)
				}
			}
			setTimeout(() => {
				this.removeTransition(this.columnIndex)
			}, timeout)
		},
		//禁用content的touchmove
		contentTouchMove(event) {
			if (event.cancelable) {
				event.preventDefault()
			}
		}
	},
	beforeUnmount() {
		Dap.event.off(document.documentElement, `mousemove.picker_${this.uid} mouseup.picker_${this.uid}`)
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-picker {
	display: block;
	width: 100%;
	background-color: #fff;
	color: @font-color-default;
	font-size: @font-size-default;

	.mvi-picker-loading {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #fff;
	}

	.mvi-picker-toolbar {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		height: @medium-height;
		border-bottom: 1px solid @border-color;
		padding: 0;

		.mvi-picker-toolbar-confirm {
			display: flex;
			display: -webkit-flex;
			position: relative;
			justify-content: center;
			align-items: center;
			font-size: @font-size-h6;
			color: @primary-normal;
			font-weight: bold;
			height: 100%;
			padding: 0 @mp-md;
			cursor: pointer;
			user-select: none;
		}

		.mvi-picker-toolbar-cancel {
			display: flex;
			display: -webkit-flex;
			position: relative;
			justify-content: center;
			align-items: center;
			font-size: @font-size-h6;
			color: @font-color-sub;
			height: 100%;
			padding: 0 @mp-md;
			cursor: pointer;
			user-select: none;
		}

		.mvi-picker-toolbar-title {
			font-size: @font-size-default;
			color: @font-color-default;
			max-width: 50%;
			line-height: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.mvi-picker-content {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		position: relative;
		overflow: hidden;

		.mvi-picker-items {
			display: block;
			flex: 1;
			height: 100%;
			position: relative;
			color: @font-color-default;
			font-size: @font-size-default;
			cursor: pointer;
			user-select: none;

			& > .mvi-picker-item {
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
			}
		}

		.mvi-picker-active {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			width: 100%;
			z-index: 10;
			pointer-events: none;

			&::before,
			&::after {
				position: absolute;
				left: 0;
				display: block;
				width: 100%;
				height: 0;
				border-bottom: 1px solid @border-color;
				content: '';
			}

			&::before {
				top: 0;
			}

			&::after {
				bottom: 0;
			}
		}

		.mvi-picker-mask {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 5;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.6)), linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.6));
			background-repeat: no-repeat;
			background-position: top, bottom;
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
			pointer-events: none;
		}
	}
}
</style>

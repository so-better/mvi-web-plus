export default {
	//提示文本
	message: {
		default: null
	},
	//动画效果
	animation: {
		type: String,
		default: null
	},
	//自动关闭的时间
	timeout: {
		type: Number,
		default: null
	},
	//弹窗z-index
	zIndex: {
		type: Number,
		default: null
	},
	//弹窗背景色
	background: {
		type: String,
		default: null
	},
	//弹窗字体颜色
	color: {
		type: String,
		default: null
	},
	//移除方法
	__remove: {
		type: Function,
		default: function () {
			return function () {}
		}
	}
}

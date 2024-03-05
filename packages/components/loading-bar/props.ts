export default {
	//进度条颜色
	color: {
		type: String,
		default: null
	},
	//进度条层级
	zIndex: {
		type: Number,
		default: null
	},
	//进度条移除方法
	__remove: {
		type: Function,
		default: function () {
			return function () {}
		}
	},
	//进度条初始化方法
	__init: {
		type: Function,
		default: function () {
			return function () {}
		}
	}
}

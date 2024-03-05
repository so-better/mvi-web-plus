export default {
	//徽标内容
	content: {
		type: [String, Number],
		default: null
	},
	//徽标位置
	placement: {
		type: String,
		default: 'top-right',
		validator(value: any) {
			return ['top-right', 'top-left', 'bottom-left', 'bottom-right'].includes(value)
		}
	},
	//是否圆点
	dot: {
		type: Boolean,
		default: false
	},
	//徽标是否显示
	show: {
		type: Boolean,
		default: true
	},
	//徽标偏移值
	offset: {
		type: Array,
		default: function () {
			return null
		}
	},
	//背景色
	background: {
		type: String,
		default: null
	},
	//字体颜色
	color: {
		type: String,
		default: null
	},
	//是否块级
	block: {
		type: Boolean,
		default: false
	}
}

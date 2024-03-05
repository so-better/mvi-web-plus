export default {
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
}

import { ExtractPublicPropTypes } from 'vue'

export const NumberKeyboardProps = {
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
}

export type NumberKeyboardPropsType = ExtractPublicPropTypes<typeof NumberKeyboardProps>

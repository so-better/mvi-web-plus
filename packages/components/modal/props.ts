import { ExtractPublicPropTypes } from 'vue'

export const ModalProps = {
	//是否显示
	modelValue: {
		type: Boolean,
		default: false
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//模态框标题
	title: {
		type: String,
		default: ''
	},
	//标题是否居中
	center: {
		type: Boolean,
		default: false
	},
	//标题是否只一行，超出省略
	ellipsis: {
		type: Boolean,
		default: false
	},
	//模态框内容
	content: {
		type: String,
		default: ''
	},
	//尾注信息
	footer: {
		type: String,
		default: null
	},
	//是否显示关闭图标
	showTimes: {
		type: Boolean,
		default: false
	},
	//动画时间
	timeout: {
		type: Number,
		default: 200
	},
	//点击背景遮罩是否关闭
	closable: {
		type: Boolean,
		default: false
	},
	//遮罩层颜色
	overlayColor: {
		type: String,
		default: null
	},
	//遮罩层z-index
	zIndex: {
		type: Number,
		default: 900
	},
	//弹窗显示的宽度
	width: {
		type: String,
		default: null
	},
	//模态框圆角
	radius: {
		type: String,
		default: null
	},
	//动画
	animation: {
		type: String,
		//'narrow','scale','translate-top','translate-bottom','translate-left','translate-right'
		default: 'scale'
	},
	//局部显示是否考虑PC端滚动条影响
	usePadding: {
		type: Boolean,
		default: false
	},
	//是否全屏
	fullScreen: {
		type: Boolean,
		default: false
	},
	//模态框作为dialog时的属性，不设置footer的内边距，仅供内部使用
	__ignorePadding: {
		type: Boolean,
		default: false
	}
}

export type ModalPropsType = ExtractPublicPropTypes<typeof ModalProps>

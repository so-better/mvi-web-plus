//默认的layer组件配置
export default {
	//位置
	placement: 'bottom-start',
	//距离触发元素的距离
	offset: '0rem',
	//浮层z-index
	zIndex: 400,
	//是否fixed
	fixed: false,
	//适配fixed下tansform父元素
	fixedAuto: false,
	//宽度
	width: null,
	//主体额外样式
	wrapperClass: null,
	//显示与隐藏动画时长
	timeout: 100,
	//是否显示三角
	showTriangle: false,
	//自定义动画
	animation: null,
	//是否显示阴影
	shadow: true,
	//是否显示边框
	border: true,
	//边框颜色
	borderColor: '#eee',
	//背景颜色
	background: '#fff'
}

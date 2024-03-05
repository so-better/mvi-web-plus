export default {
	//栅格占据的列数
	span: {
		type: Number,
		default: 24
	},
	//栅格左侧的间隔格数
	offset: {
		type: Number,
		default: 0
	},
	//渲染标签
	tag: {
		type: String,
		default: 'div'
	},
	// >=0px 响应式栅格数或者栅格属性对象
	xs: {
		type: [Number, Object],
		default: null
	},
	// >=640px 响应式栅格数或者栅格属性对象
	sm: {
		type: [Number, Object],
		default: null
	},
	// >=992px 响应式栅格数或者栅格属性对象
	md: {
		type: [Number, Object],
		default: null
	},
	// >=1440px 响应式栅格数或者栅格属性对象
	lg: {
		type: [Number, Object],
		default: null
	},
	// >=1920px 响应式栅格数或者栅格属性对象
	xl: {
		type: [Number, Object],
		default: null
	}
}

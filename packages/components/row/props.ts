export default {
	//排列方式
	justify: {
		type: String,
		default: 'flex-start',
		validator(value: any) {
			return ['flex-start', 'flex-end', 'space-around', 'space-between'].includes(value)
		}
	},
	//垂直对齐方式
	align: {
		type: String,
		default: 'flex-start',
		validator(value: any) {
			return ['flex-start', 'flex-end', 'center'].includes(value)
		}
	},
	//渲染标签
	tag: {
		type: String,
		default: 'div'
	}
}

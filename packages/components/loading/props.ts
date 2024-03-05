export default {
	//类型
	type: {
		type: String,
		default: 'default',
		validator(value: any) {
			return ['default', 'circle', 'dots', 'spin', 'transfer'].includes(value)
		}
	},
	//颜色
	color: {
		type: String,
		default: '#bbb'
	},
	//尺寸
	size: {
		type: String,
		default: '0.6rem'
	}
}

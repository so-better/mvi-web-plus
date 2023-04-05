export default [
	{
		key: 'title',
		name: '标题',
		value: 'p',
		data: [
			{
				label: 'H1',
				value: 'h1'
			},
			{
				label: 'H2',
				value: 'h2'
			},
			{
				label: 'H3',
				value: 'h3'
			},
			{
				label: 'H4',
				value: 'h4'
			},
			{
				label: 'H5',
				value: 'h5'
			},
			{
				label: '正文',
				value: 'p'
			}
		]
	},
	{
		key: 'undo',
		name: '撤回',
		icon: 'undo',
		data: true
	},
	{
		key: 'redo',
		name: '恢复',
		icon: 'redo',
		data: true
	},
	{
		key: 'removeFormat',
		name: '清除格式',
		icon: 'clear',
		data: true
	},
	{
		key: 'divider',
		name: '分隔线',
		icon: 'divider',
		data: true
	},
	{
		key: 'bold',
		name: '加粗',
		icon: 'bold',
		data: true
	},
	{
		key: 'italic',
		name: '斜体',
		icon: 'italic',
		data: true
	},
	{
		key: 'underline',
		name: '下划线',
		icon: 'underline',
		data: true
	},
	{
		key: 'strikeThrough',
		name: '删除线',
		icon: 'strikethrough',
		data: true
	},
	{
		key: 'subscript',
		name: '下标',
		icon: 'subscript',
		data: true
	},
	{
		key: 'superscript',
		name: '上标',
		icon: 'superscript',
		data: true
	},
	{
		key: 'fontFamily',
		name: '字体',
		value: '微软雅黑',
		data: [
			{
				label: '默认字体',
				value: '微软雅黑'
			},
			'黑体',
			'仿宋',
			'楷体',
			'宋体',
			'Arial',
			'Consolas'
		]
	},
	{
		key: 'fontSize',
		name: '字号',
		value: '0.28rem',
		data: [
			{
				label: '默认字号',
				value: '0.28rem'
			},
			{
				label: '12px',
				value: '0.24rem'
			},
			{
				label: '16px',
				value: '0.32rem'
			},
			{
				label: '20px',
				value: '0.4rem'
			},
			{
				label: '28px',
				value: '0.56rem'
			},
			{
				label: '36px',
				value: '0.72rem'
			},
			{
				label: '48px',
				value: '0.96rem'
			}
		]
	},
	{
		key: 'foreColor',
		name: '文字颜色',
		icon: 'color-picker',
		data: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
	},
	{
		key: 'backColor',
		name: '背景色',
		icon: 'brush',
		data: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
	},
	{
		key: 'ol',
		name: '有序列表',
		icon: 'ol',
		data: true
	},
	{
		key: 'ul',
		name: '无序列表',
		icon: 'ul',
		data: true
	},
	{
		key: 'justify',
		name: '对齐方式',
		icon: 'align-left',
		data: [
			{
				label: '左对齐',
				value: 'justifyLeft',
				icon: 'align-left'
			},
			{
				label: '居中对齐',
				value: 'justifyCenter',
				icon: 'align-center'
			},
			{
				label: '右对齐',
				value: 'justifyRight',
				icon: 'align-right'
			},
			{
				label: '两端对齐',
				value: 'justifyFull',
				icon: 'align-justify'
			}
		]
	},
	{
		key: 'quote',
		name: '引用',
		icon: 'quote',
		data: true
	},
	{
		key: 'link',
		name: '插入链接',
		icon: 'link',
		data: [
			{
				label: '插入链接',
				value: 'link'
			}
		]
	},
	{
		key: 'image',
		name: '插入图片',
		icon: 'image',
		data: [
			{
				label: '本地上传',
				value: 'upload'
			},
			{
				label: '网络图片',
				value: 'remote'
			}
		]
	},
	{
		key: 'video',
		name: '插入视频',
		icon: 'video',
		data: [
			{
				label: '本地上传',
				value: 'upload'
			},
			{
				label: '网络视频',
				value: 'remote'
			}
		]
	},
	{
		key: 'table',
		name: '插入表格',
		icon: 'table-alt',
		data: []
	},
	{
		key: 'code',
		name: '插入代码',
		icon: 'code',
		data: true
	},
	{
		key: 'codeView',
		name: '显示源码',
		icon: 'eye',
		data: false
	}
]

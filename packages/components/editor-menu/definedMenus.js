export default [
	{
		name: 'undo',
		type: 'default',
		icon: 'undo',
		title: '撤销'
	},
	{
		name: 'redo',
		type: 'default',
		icon: 'redo',
		title: '重做'
	},
	{
		name: 'removeFormat',
		type: 'default',
		icon: 'clear',
		title: '清除格式'
	},
	{
		name: 'divider',
		type: 'default',
		icon: 'divider',
		title: '分隔线'
	},
	{
		name: 'bold',
		type: 'default',
		icon: 'bold',
		title: '加粗'
	},
	{
		name: 'italic',
		type: 'default',
		icon: 'italic',
		title: '斜体'
	},
	{
		name: 'underline',
		type: 'default',
		icon: 'underline',
		title: '下划线'
	},
	{
		name: 'strikeThrough',
		type: 'default',
		icon: 'strikethrough',
		title: '删除线'
	},
	{
		name: 'subscript',
		type: 'default',
		icon: 'subscript',
		title: '下标'
	},
	{
		name: 'superscript',
		type: 'default',
		icon: 'superscript',
		title: '上标'
	},
	{
		name: 'title',
		type: 'display',
		title: '标题',
		list: [
			{
				label: '一级标题',
				value: 'h1'
			},
			{
				label: '二级标题',
				value: 'h2'
			},
			{
				label: '三级标题',
				value: 'h3'
			},
			{
				label: '四级标题',
				value: 'h4'
			},
			{
				label: '五级标题',
				value: 'h5'
			},
			{
				label: '正文',
				value: 'p'
			}
		],
		value: 'p'
	},
	{
		name: 'fontFamily',
		type: 'display',
		title: '字体',
		value: '',
		list: [
			{
				label: '默认字体',
				value: ''
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
		name: 'fontSize',
		type: 'display',
		title: '字号',
		value: '',
		list: [
			{
				label: '默认字号',
				value: ''
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
		name: 'foreColor',
		type: 'select',
		title: '文字颜色',
		icon: 'color-picker',
		list: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
	},
	{
		name: 'backColor',
		type: 'select',
		title: '背景颜色',
		icon: 'brush',
		list: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
	},
	{
		name: 'ol',
		type: 'default',
		icon: 'ol',
		title: '有序列表'
	},
	{
		name: 'ul',
		type: 'default',
		icon: 'ul',
		title: '无序列表'
	},
	{
		name: 'justify',
		type: 'select',
		icon: 'align-left',
		title: '对齐方式',
		list: [
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
		name: 'quote',
		type: 'default',
		icon: 'quote',
		title: '引用'
	},
	{
		name: 'link',
		type: 'select',
		icon: 'link',
		title: '插入链接',
		list: [
			{
				label: '插入链接',
				value: 'link'
			}
		]
	},
	{
		name: 'image',
		icon: 'image',
		title: '插入图片',
		type: 'select',
		list: [
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
		name: 'video',
		icon: 'video',
		title: '插入视频',
		type: 'select',
		list: [
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
		name: 'table',
		type: 'select',
		icon: 'table-alt',
		title: '插入表格',
		list: []
	},
	{
		name: 'code',
		type: 'default',
		icon: 'code',
		title: '代码块'
	},
	{
		name: 'codeView',
		type: 'default',
		icon: 'eye',
		title: '源码视图'
	}
]

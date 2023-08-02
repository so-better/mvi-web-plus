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
		name: 'removeformat',
		type: 'default',
		icon: 'clear',
		title: '清除格式'
	},
	{
		name: 'indent',
		type: 'select',
		icon: 'indent-right',
		title: '缩进',
		list: [
			{
				label: '增加缩进',
				value: 'indent-right',
				icon: 'indent-right'
			},
			{
				label: '减少缩进',
				value: 'indent-left',
				icon: 'indent-left'
			}
		]
	},
	{
		name: 'divider',
		type: 'default',
		icon: 'divider',
		title: '分隔线'
	},
	{
		name: 'code',
		type: 'default',
		icon: 'code',
		title: '代码'
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
		name: 'strikethrough',
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
				label: '六级标题',
				value: 'h6'
			},
			{
				label: '正文',
				value: 'p'
			}
		],
		value: 'p'
	},
	{
		name: 'fontfamily',
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
		name: 'fontsize',
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
		name: 'forecolor',
		type: 'select',
		title: '文字颜色',
		icon: 'color-picker',
		list: ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
	},
	{
		name: 'backcolor',
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
				value: 'left',
				icon: 'align-left'
			},
			{
				label: '居中对齐',
				value: 'center',
				icon: 'align-center'
			},
			{
				label: '右对齐',
				value: 'right',
				icon: 'align-right'
			},
			{
				label: '两端对齐',
				value: 'justify',
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
		props: {
			placeholder: ['输入文本', '输入地址'],
			targetText: '新窗口打开',
			removeText: '移除链接',
			insertText: '插入'
		}
	},
	{
		name: 'image',
		icon: 'image',
		title: '插入图片',
		type: 'select',
		props: {
			placeholder: '图片地址',
			insertText: '插入'
		},
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
		props: {
			placeholder: '视频地址',
			insertText: '插入'
		},
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
		props: {
			insertRowText: '插入行',
			removeRowText: '删除行',
			insertColumnText: '插入列',
			removeColumnText: '删除列',
			deleteText: '删除表格'
		}
	},
	{
		name: 'codeblock',
		type: 'default',
		icon: 'code-block',
		title: '代码块'
	},
	{
		name: 'codeview',
		type: 'default',
		icon: 'eye',
		title: '源码视图'
	}
]

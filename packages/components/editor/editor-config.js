//不激活的菜单
const unactiveMenus = ['undo', 'redo', 'removeFormat', 'selectAll', 'divider', 'tag', 'fontFamily', 'fontSize', 'foreColor', 'backColor', 'list', 'justify', 'image', 'video']
//背景色默认配置
const backColor = ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
//字体颜色默认配置
const foreColor = ['#000000', '#505050', '#808080', '#BBBBBB', '#CCCCCC', '#EEEEEE', '#F7F7F7', '#FFFFFF', '#EC1A0A', '#FF9900', '#FFFF00', '#07C160', '#00FFFF', '#0B73DE', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#e45649', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#50a14f', '#4A7B8C', '#03A8F3', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#986801', '#295218', '#083139', '#003163', '#21104A', '#4A1031']
//字号默认配置
const fontSize = [
    {
        label: '12px',
        value: '0.24rem'
    },
    {
        label: '14px',
        value: '0.28rem'
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
//对齐方式默认配置
const justify = [
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
//默认字体配置
const fontFamily = ['PingFang SC', 'Helvetica Neue', 'kaiTi', 'Microsoft YaHei', 'Arial', 'sans-serif']
//默认列表配置
const list = [
    {
        label: '有序列表',
        value: 'ol',
        icon: 'ol'
    },
    {
        label: '无序列表',
        value: 'ul',
        icon: 'ul'
    }
]
//上传图片的后缀格式默认配置
const allowedImageType = ['jpg', 'png', 'JPG', 'PNG', 'JPEG', 'jpeg', 'gif', 'GIF', 'jfif', 'JFIF', 'webp', 'WEBP']
//上传视频的后缀格式默认配置
const allowedVideoType = ['mp4', 'MP4', 'avi', 'AVI', 'WAV', 'wav']
//默认标签配置
const tag = [
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
        label: 'H6',
        value: 'h6'
    },
    {
        label: '段落',
        value: 'p'
    }
]
export default { unactiveMenus, backColor, foreColor, fontSize, justify, fontFamily, list, allowedImageType, allowedVideoType, tag }

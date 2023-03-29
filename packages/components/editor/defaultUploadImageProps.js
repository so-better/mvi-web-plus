//默认上传图片配置
export default {
	//是否多选
	multiple: false,
	//限定格式
	allowedFileType: ['jpg', 'png', 'JPG', 'PNG', 'JPEG', 'jpeg', 'gif', 'GIF', 'jfif', 'JFIF', 'webp', 'WEBP'],
	//限制类型
	accept: 'image',
	//限制单个图片最小值，单位kb
	minSize: -1,
	//限定单个图片最大值，单位kb
	maxSize: -1,
	//多选时选择图片的最小数量
	minLength: -1,
	//多选时选择图片的最大数量
	maxLength: -1
}

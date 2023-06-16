//默认上传视频配置
export default {
	//是否多选
	multiple: false,
	//限定格式
	allowedFileType: ['mp4', 'MP4', 'avi', 'AVI', 'WAV', 'wav'],
	//限制类型
	accept: 'video',
	//限制单个视频最小值，单位kb
	minSize: -1,
	//限定单个视频最大值，单位kb
	maxSize: -1,
	//多选时选择视频的最小数量
	minLength: -1,
	//多选时选择视频的最大数量
	maxLength: -1
}

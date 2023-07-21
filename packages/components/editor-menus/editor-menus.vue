<template>
	<div :class="['mvi-editor-menus', border ? 'border' : '']">
		<slot></slot>
	</div>
</template>
<script>
import defaultTooltipProps from './defaultTooltipProps'
import defaultLayerProps from './defaultLayerProps'
import defaultUploadImageProps from './defaultUploadImageProps'
import defaultUploadVideoProps from './defaultUploadVideoProps'
import { Dap } from '../dap'
import { getCurrentInstance } from 'vue'
export default {
	name: 'm-editor-menus',
	data() {
		return {
			//编辑器组件实例
			instance: null
		}
	},
	emits: ['upload-image', 'upload-video'],
	provide() {
		return {
			menus: this
		}
	},
	props: {
		//菜单项是否使用工具提示
		useTooltip: {
			type: Boolean,
			default: false
		},
		//菜单项浮层参数
		layerProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//菜单项上传图片配置
		uploadImageProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//菜单项上传视频配置
		uploadVideoProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//上传图片或者视频是否使用base64
		useBase64: {
			type: Boolean,
			default: true
		},
		//自定义上传图片出错回调
		uploadImageError: {
			type: Function
		},
		//自定义上传视频出错回调
		uploadVideoError: {
			type: Function
		},
		//触发悬浮层显现的方式
		trigger: {
			type: String,
			default: 'click',
			validator(value) {
				return ['hover', 'click'].includes(value)
			}
		},
		//提示组件参数配置
		tooltipProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//是否显示菜单栏边框
		border: {
			type: Boolean,
			default: false
		},
		//是否禁用整个菜单项
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		//工具提示组件配置
		combinedTooltipProps() {
			return this.initOption(defaultTooltipProps, this.tooltipProps)
		},
		//浮层组件配置
		combinedLayerProps() {
			return this.initOption(defaultLayerProps, this.layerProps)
		},
		//上传图片配置
		combinedUploadImageProps() {
			return this.initOption(defaultUploadImageProps, this.uploadImageProps)
		},
		//上传视频配置
		combinedUploadVideoProps() {
			return this.initOption(defaultUploadVideoProps, this.uploadVideoProps)
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		Dap.event.on(document.documentElement, `click.editor_menus_${this.uid}`, e => {
			if (!this.instance) {
				return
			}
			//如果点击了除编辑器菜单栏和编辑区域外的地方，菜单栏不可使用
			if (!Dap.element.isContains(this.$el, e.target) && !Dap.element.isContains(this.instance.$el, e.target)) {
				this.instance.canUseMenus = false
			}
		})
	},
	methods: {
		initOption(defaultObj, propObj) {
			let obj = {}
			Object.assign(obj, defaultObj)
			Object.assign(obj, propObj)
			return obj
		}
	},
	beforeUnmount() {
		Dap.event.off(document.documentElement, `click.editor_menus_${this.uid}`)
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menus {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	width: 100%;
	padding: @mp-xs;
	margin: 0;
	background-color: #fff;
	position: relative;
	border-radius: @radius-default;
	color: @font-color-default;
	font-size: @font-size-default;

	&.border {
		border: 1px solid @border-color;
	}
}
</style>

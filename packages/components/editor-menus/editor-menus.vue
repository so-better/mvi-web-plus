<template>
	<div class="mvi-editor-menus" :style="{ border: border ? '' : 'none' }" :disabled="disabled ? disabled : null">
		<template v-for="item in menus">
			<editorMenu v-if="showMenu(item)" :options="item">
				<template #layer v-if="isLayerMenu(item) && item.customLayer && $slots.layer">
					<slot name="layer" :options="item"></slot>
				</template>
			</editorMenu>
		</template>
	</div>
</template>
<script>
import { Dap } from '../dap'
import defaultConfig from './defaultConfig'
import defaultLayerProps from './defaultLayerProps'
import defaultTooltipProps from './defaultTooltipProps'
import editorMenu from './editor-menu.vue'
export default {
	name: 'm-editor-menus',
	emits: ['upload-image', 'upload-video', 'custom'],
	props: {
		//名字
		name: {
			type: String,
			default: 'editor'
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//是否显示边框
		border: {
			type: Boolean,
			default: false
		},
		//菜单配置
		config: {
			type: Array,
			default: function () {
				return []
			}
		},
		//菜单项浮层参数
		layerProps: {
			type: Object,
			default: function () {
				return {}
			}
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
		//本地上传文件是否使用base64
		useBase64: {
			type: Boolean,
			default: true
		},
		//自定义上传图片配置
		uploadImageProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//自定义上传视频配置
		uploadVideoProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//自定义上传图片出错回调
		uploadImageError: {
			type: Function
		},
		//自定义上传视频出错回调
		uploadVideoError: {
			type: Function
		}
	},
	components: {
		editorMenu
	},
	computed: {
		//菜单列表
		menus() {
			let menus = defaultConfig.filter(item => {
				return !this.config.some(el => {
					return el.key == item.key
				})
			})
			menus = [...menus, ...this.config]
			menus = menus.map(item => {
				let obj = { ...item }
				//菜单data初始化
				obj.data = this.initMenuData(obj.data)
				//菜单图标初始化
				obj.icon = this.initMenuIcon(obj.icon)
				//菜单是否禁用初始化
				obj.disabled = Boolean(obj.disabled)
				//菜单序列初始化
				if (!Dap.number.isNumber(obj.index)) {
					obj.index = 0
				}
				return obj
			})
			return menus.sort((a, b) => {
				return a.index - b.index
			})
		},
		//是否显示菜单
		showMenu() {
			return item => {
				if (typeof item.data == 'boolean') {
					return item.data
				}
				if (Array.isArray(item.data) && item.data.length) {
					return true
				}
				return false
			}
		},
		//浮层组件配置
		combinedLayerProps() {
			return this.initOption(defaultLayerProps, this.layerProps)
		},
		//工具提示组件配置
		combinedTooltipProps() {
			return this.initOption(defaultTooltipProps, this.tooltipProps)
		},
		//是否弹出式菜单
		isLayerMenu() {
			return item => {
				return Array.isArray(item.data) && item.data.length
			}
		}
	},
	methods: {
		//初始化对象参数方法
		initOption(defaultObj, propObj) {
			let obj = {}
			Object.assign(obj, defaultObj)
			Object.assign(obj, propObj)
			return obj
		},
		//初始化菜单图标
		initMenuIcon(icon) {
			//icon属性初始化
			if (Dap.common.isObject(icon)) {
				return {
					custom: icon.custom || false,
					value: icon.value || ''
				}
			}
			if (typeof icon == 'string' && icon) {
				return {
					custom: false,
					value: icon
				}
			}
			return null
		},
		//初始化菜单data
		initMenuData(data) {
			//data是数组
			if (Array.isArray(data)) {
				let newData = []
				data.forEach(item => {
					if (typeof item == 'string' && item) {
						newData.push({
							label: item,
							value: item,
							icon: null,
							disabled: false
						})
					} else if (Dap.common.isObject(item)) {
						newData.push({
							label: item.label,
							value: item.value,
							icon: this.initMenuIcon(item.icon),
							disabled: Boolean(item.disabled)
						})
					}
				})
				return newData
			}
			if (typeof data == 'boolean') {
				return data
			}
			return false
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menus {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	background-color: #fff;
	margin-bottom: @mp-sm;
	border: 1px solid @border-color;
	border-radius: @radius-default;
	padding: @mp-xs @mp-sm;
}
</style>

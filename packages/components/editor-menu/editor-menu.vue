<template>
	<div class="mvi-editor-menu" :data-id="`mvi-editor-menu-${uid}`" @mouseenter="_menuHover('enter')" @mouseleave="_menuHover('leave')">
		<Tooltip :disabled="!menus.useTooltip || !title || cmpDisabled" :title="title" trigger="hover" :placement="menus.combinedTooltipProps.placement" :timeout="menus.combinedTooltipProps.timeout" :color="menus.combinedTooltipProps.color" :text-color="menus.combinedTooltipProps.textColor" :border-color="menus.combinedTooltipProps.borderColor" :offset="menus.combinedTooltipProps.offset" :z-index="menus.combinedTooltipProps.zIndex" :fixed="menus.combinedTooltipProps.fixed" :fixed-auto="menus.combinedTooltipProps.fixedAuto" :width="menus.combinedTooltipProps.width" :animation="menus.combinedTooltipProps.animation" :show-triangle="menus.combinedTooltipProps.showTriangle" block>
			<div :disabled="cmpDisabled || null" class="mvi-editor-menu-el" :data-id="`mvi-editor-menu-el-${uid}`" @click="_menuClick">
				<!-- 显示下拉选的值 -->
				<span v-if="type == 'display'" class="mvi-editor-menu-text">{{ selectedVal.label }}</span>
				<!-- 菜单项图标 -->
				<Icon v-else-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :size="parseIcon(icon).size" :color="parseIcon(icon).color" :spin="parseIcon(icon).spin"></Icon>
				<!-- 下拉选倒三角图标 -->
				<Icon v-if="type == 'select' || type == 'display'" type="caret-down" class="mvi-editor-menu-caret"></Icon>
			</div>
		</Tooltip>
		<Layer v-if="type == 'select' || type == 'display'" v-model="layerShow" ref="layer" :placement="menus.combinedLayerProps.placement" :z-index="menus.combinedLayerProps.zIndex" :fixed="menus.combinedLayerProps.fixed" :fixed-auto="menus.combinedLayerProps.fixedAuto" :offset="menus.combinedLayerProps.offset" :wrapper-class="menus.combinedLayerProps.wrapperClass" :timeout="menus.combinedLayerProps.timeout" :show-triangle="menus.combinedLayerProps.showTriangle" :animation="menus.combinedLayerProps.animation" :shadow="menus.combinedLayerProps.shadow" :border="menus.combinedLayerProps.border" :width="menus.combinedLayerProps.width" :closable="menus.trigger == 'click'" :target="`[data-id='mvi-editor-menu-el-${uid}']`" :root="`[data-id='mvi-editor-menu-${uid}']`">
			<!-- 字体颜色、背景色 -->
			<div v-if="name == 'foreColor' || name == 'backColor'" class="mvi-editor-menu-colors">
				<div class="mvi-editor-menu-color" v-for="item in parseList">
					<Tooltip :disabled="!menus.useTooltip || !item.label || cmpDisabled" trigger="hover" :title="item.label" :placement="menus.combinedTooltipProps.placement" :timeout="menus.combinedTooltipProps.timeout" :color="menus.combinedTooltipProps.color" :text-color="menus.combinedTooltipProps.textColor" :border-color="menus.combinedTooltipProps.borderColor" :offset="menus.combinedTooltipProps.offset" :z-index="menus.combinedTooltipProps.zIndex" :fixed="menus.combinedTooltipProps.fixed" :fixed-auto="menus.combinedTooltipProps.fixedAuto" :width="menus.combinedTooltipProps.width" :animation="menus.combinedTooltipProps.animation" :show-triangle="menus.combinedTooltipProps.showTriangle" block>
						<div :style="{ backgroundColor: item.value }" @click="_layerClick(item)" class="mvi-editor-menu-color-el"></div>
					</Tooltip>
				</div>
			</div>
			<!-- 表格 -->
			<div v-else-if="name == 'table'"></div>
			<!-- 链接 -->
			<div v-else-if="name == 'link'"></div>
			<!-- 图片或者视频 -->
			<div v-else-if="name == 'image' || name == 'video'"></div>
			<!-- 正常的下拉选 -->
			<div v-else class="mvi-editor-menu-default">
				<EditorTag :tag="layerElTag(item)" v-for="item in parseList" class="mvi-editor-menu-layer-el" @click="_layerClick(item)">
					<Icon v-if="item.icon.type || item.icon.url" class="mvi-editor-menu-layer-icon" :type="item.icon.type" :url="item.icon.url" :spin="item.icon.spin" :size="item.icon.size" :color="item.icon.color" />
					<span v-text="item.label"></span>
				</EditorTag>
			</div>
			<!-- 自定义浮层内容 -->
			<slot name="layer" v-if="$slots.layer"></slot>
		</Layer>
	</div>
</template>
<script>
import definedMenus from './definedMenus'
import { Dap } from '../dap'
import { Icon } from '../icon'
import { Tooltip } from '../tooltip'
import { Layer } from '../layer'
import EditorTag from './editor-tag.vue'
import { getCurrentInstance } from 'vue'
import { AlexElement } from 'alex-editor'
//根据名称获取指定菜单项配置
const getMenu = name => {
	if (name == 'custom') {
		return null
	}
	return definedMenus.find(item => {
		return name == item.name
	})
}
export default {
	name: 'm-editor-menu',
	emits: ['custom'],
	props: {
		//菜单项名称，唯一标识
		name: {
			type: String,
			default: '',
			validator(value) {
				const names = definedMenus.map(item => {
					return item.name
				})
				return [...names, 'custom'].includes(value)
			}
		},
		//菜单项类型
		type: {
			type: String,
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.type : 'default'
			},
			validator(value) {
				//default表示一般的菜单项，显示图标
				//select表示下拉选形式的菜单选项，显示图标
				//display表示显示值的下拉选菜单项，不显示图标
				return ['default', 'select', 'display'].includes(value)
			}
		},
		//菜单项使用的图标
		icon: {
			type: [String, Object],
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.icon : null
			}
		},
		//下拉选菜单项的列表配置
		list: {
			type: Array,
			default: function (props) {
				const menu = getMenu(props.name)
				//包含label/value/icon三个属性
				return menu ? menu.list : []
			}
		},
		//工具提示内容
		title: {
			type: String,
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.title : ''
			}
		},
		//是否禁用菜单项
		disabled: {
			type: Boolean,
			default: false
		}
	},
	inject: ['menus'],
	data() {
		return {
			//下拉选菜单项的已选值
			selectedVal: {},
			//浮层是否显示
			layerShow: false
		}
	},
	computed: {
		//转换图标字段
		parseIcon() {
			return param => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(param)) {
					if (typeof param.spin == 'boolean') {
						icon.spin = param.spin
					}
					if (typeof param.type == 'string') {
						icon.type = param.type
					}
					if (typeof param.url == 'string') {
						icon.url = param.url
					}
					if (typeof param.color == 'string') {
						icon.color = param.color
					}
					if (typeof param.size == 'string') {
						icon.size = param.size
					}
				} else if (typeof param == 'string') {
					icon.type = param
				}
				return icon
			}
		},
		//转换列表字段
		parseList() {
			if (Array.isArray(this.list)) {
				return this.list.map(item => {
					let obj = {}
					if (Dap.common.isObject(item)) {
						obj.label = item.label
						obj.value = item.value
						obj.icon = this.parseIcon(item.icon)
					} else if (typeof item == 'string') {
						obj.label = item
						obj.value = item
						obj.icon = this.parseIcon(null)
					}
					return obj
				})
			}
			return []
		},
		//菜单项是否禁用
		cmpDisabled() {
			//菜单项直接禁用
			if (this.disabled) {
				return true
			}
			//菜单栏整体禁用
			if (this.menus.disabled) {
				return true
			}
			//如果编辑器还没有获取则禁用
			if (!this.menus.instance) {
				return true
			}
			//编辑器被禁用
			if (this.menus.instance.disabled) {
				return true
			}
			//如果是代码视图，则禁用除"codeView"菜单项以外的所有菜单
			if (this.menus.instance.codeViewShow && this.name != 'codeView') {
				return true
			}
			//如果编辑器没有获取焦点
			if (!this.menus.instance.focus) {
				return true
			}
			return false
		},
		//下拉选选项的渲染元素
		layerElTag() {
			return item => {
				if (this.name == 'title') {
					return item.value
				}
				return 'div'
			}
		},
		//判断是否编辑器内部配置的菜单项
		isDefinedMenu() {
			const menu = getMenu(this.name)
			return !!menu
		}
	},
	components: {
		Icon,
		Tooltip,
		Layer,
		EditorTag
	},
	setup() {
		return {
			uid: getCurrentInstance().uid
		}
	},
	watch: {
		//监听list变化设置初始值为list第一个选项
		list: {
			handler: function (newVal) {
				if (newVal && (this.type == 'select' || this.type == 'display')) {
					this.selectedVal = { ...this.parseList[0] }
				}
			},
			immediate: true
		}
	},
	methods: {
		//菜单项悬浮
		_menuHover(type) {
			if (this.cmpDisabled) {
				return
			}
			if (this.menus.trigger != 'hover') {
				return
			}
			if (type == 'enter') {
				this._showLayer()
			} else if (type == 'leave') {
				this._hideLayer()
			}
		},
		//浮层点击
		_layerClick(item) {
			if (this.cmpDisabled) {
				return
			}
			//如果是内部已配置菜单
			if (this.isDefinedMenu) {
				this._handleOpt(item)
			}
			//自定义菜单项
			else {
				this.$emit('custom', { ...item })
			}
			//隐藏浮层
			this._hideLayer()
		},
		//菜单项点击
		_menuClick() {
			if (this.cmpDisabled) {
				return
			}
			//如果是下拉选形式的菜单
			if (this.type == 'select' || this.type == 'display') {
				if (this.menus.trigger == 'click') {
					if (this.layerShow) {
						this._hideLayer()
					} else {
						this._showLayer()
					}
				}
			}
			//如果是普通菜单则直接作用
			else {
				//如果是内部已配置菜单
				if (this.isDefinedMenu) {
					this._handleOpt()
				} else {
					//触发自定义操作
					this.$emit('custom')
				}
			}
		},
		//显示浮层
		_showLayer() {
			if (this.cmpDisabled) {
				return
			}
			if (this.type == 'select' || this.type == 'display') {
				this.layerShow = true
			}
		},
		//隐藏浮层
		_hideLayer() {
			if (this.type == 'select' || this.type == 'display') {
				this.layerShow = false
			}
		},
		//执行富文本操作
		_handleOpt(item) {
			//撤销
			if (this.name == 'undo') {
				const historyRecord = this.menus.instance.editor.history.get(-1)
				if (historyRecord) {
					this.menus.instance.editor.stack = historyRecord.stack
					this.menus.instance.editor.range = historyRecord.range
					this.menus.instance.editor.formatElementStack()
					this.menus.instance.editor.domRender(true)
					this.menus.instance.editor.setCursor()
				}
			}
			//重做
			else if (this.name == 'redo') {
				const historyRecord = this.menus.instance.editor.history.get(1)
				if (historyRecord) {
					this.menus.instance.editor.stack = historyRecord.stack
					this.menus.instance.editor.range = historyRecord.range
					this.menus.instance.editor.formatElementStack()
					this.menus.instance.editor.domRender(true)
					this.menus.instance.editor.setCursor()
				}
			}
			//清除格式
			else if (this.name == 'removeFormat') {
				this.menus.instance.editor.removeAllStyles()
				this.menus.instance.editor.formatElementStack()
				this.menus.instance.editor.domRender()
				this.menus.instance.editor.setCursor()
			}
			//分隔线
			else if (this.name == 'divider') {
				this._insertDivider()
			}
			//加粗
			else if (this.name == 'bold') {
				// const elements = this.menus.instance.editor.getElementsByRange(true)
				// let isBold = elements.every(item => {
				// 	const styleValue = this.getCurrentStyle(item, 'font-weight')
				// 	return styleValue == 'bold'
				// })
				// if (isBold) {
				// 	this.menus.instance.editor.setStyle({
				// 		'font-weight': ''
				// 	})
				// } else {
				// 	this.menus.instance.editor.setStyle({
				// 		'font-weight': 'bold'
				// 	})
				// }
				//重新渲染
				this.menus.instance.editor.formatElementStack()
				this.menus.instance.editor.domRender()
				this.menus.instance.editor.setCursor()
			}
			//字体颜色
			else if (this.name == 'foreColor') {
				this.menus.instance.editor.setStyle({
					color: item.value
				})
				//重新渲染
				this.menus.instance.editor.formatElementStack()
				this.menus.instance.editor.domRender()
				this.menus.instance.editor.setCursor()
			}
			//背景颜色
			else if (this.name == 'backColor') {
				this.menus.instance.editor.setStyle({
					'background-color': item.value
				})
				//重新渲染
				this.menus.instance.editor.formatElementStack()
				this.menus.instance.editor.domRender()
				this.menus.instance.editor.setCursor()
			}
			//源码视图
			else if (this.name == 'codeView') {
				this.menus.instance.codeViewShow = !this.menus.instance.codeViewShow
			}
		},
		//插入分隔符
		_insertDivider() {
			const marks = {
				class: 'mvi-editor-divider'
			}
			//创建分隔线
			const divider = this.menus.instance.editor.formatElement(new AlexElement('closed', 'hr', marks, null, null))
			//插入分割符
			this.menus.instance.editor.insertElement(divider)
			//换行
			this.menus.instance.editor.insertParagraph()
			//重新渲染
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.setCursor()
		},
		getCurrentStyle(element, style) {
			//如果元素拥有此样式
			if (element.hasStyles() && element.styles.hasOwnProperty(style) && element.styles[style] != '') {
				return element.styles[style]
			}
			//如果元素没有该样式，则向上查找

			//根元素无法向上查找，返回null
			if (element.isRoot()) {
				return null
			}

			return this.getCurrentStyle(element.parent, style)
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menu {
	display: block;
	padding: @mp-xs;

	.mvi-editor-menu-el {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		white-space: nowrap;
		padding: @mp-sm;
		border-radius: @radius-default;
		opacity: 0.8;
		line-height: 1;

		&:hover {
			opacity: 1;
			cursor: pointer;
			background-color: @bg-color-default;
		}

		&:active {
			background-color: @bg-color-dark;
		}

		&[disabled] {
			opacity: 0.6;
			background-color: transparent;
		}

		.mvi-editor-menu-text {
			max-width: 2.8rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.mvi-editor-menu-caret {
			transform: scale(0.5);
		}
	}

	.mvi-editor-menu-colors {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: calc(@small-height * 4 + @mp-xs * 10 + 16px);
		padding: @mp-xs;

		.mvi-editor-menu-color {
			display: block;
			padding: @mp-xs / 2;
			border: 1px solid transparent;
			border-radius: @radius-default / 2;

			.mvi-editor-menu-color-el {
				display: block;
				width: @small-height / 2;
				height: @small-height / 2;
				border: 1px solid @border-color;
				border-radius: @radius-default / 2;
				position: relative;
				transition: transform 200ms;
				-webkit-transition: transform 200ms;
				-moz-transition: transform 200ms;

				&:hover {
					cursor: pointer;
					transform: translate3d(0, 0, 0) scale(1.5);
					z-index: 2;
				}
			}
		}
	}

	.mvi-editor-menu-default {
		display: block;
		padding: @mp-xs 0;
		max-height: 8rem;
		overflow-x: hidden;
		overflow-y: auto;

		.mvi-editor-menu-layer-el {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: @mp-sm @mp-lg;
			margin: 0;
			text-align: center;
			opacity: 0.8;

			&:hover {
				opacity: 1;
				cursor: pointer;
				background-color: @bg-color-default;
			}

			&:active {
				background-color: @bg-color-dark;
			}

			.mvi-editor-menu-layer-icon {
				margin-right: @mp-xs;
			}

			span {
				max-width: 2.8rem;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
}
</style>

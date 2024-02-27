<template>
	<div :disabled="disabled || null" :class="cmpClass" :style="cmpStyle" @click="setActive">
		<Badge :show="badge?.show" class="mvi-tabbar-badge" :content="badge?.content" :background="badge?.background" :color="badge?.color" :dot="badge?.dot" :placement="badge?.placement" :offset="badge?.offset">
			<div class="mvi-tabbar-item-child">
				<span class="mvi-tabbar-icon" v-if="parseIcon(icon).type || parseIcon(icon).url" :style="{ marginBottom: name ? '' : '0px' }">
					<Icon :type="parseIcon(icon).type" :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size" :color="parseIcon(icon).color" />
				</span>
				<span class="mvi-tabbar-name" :class="{ small: parseIcon(icon).type || parseIcon(icon).url }" v-text="name"></span>
			</div>
		</Badge>
	</div>
</template>

<script>
import Dap from 'dap-util'
import { Icon } from '../icon'
import { Badge } from '../badge'
export default {
	name: 'm-tabbar-item',
	inject: ['tabbar'],
	props: {
		//路由参数配置
		route: {
			type: [String, Object],
			default: null
		},
		//图标
		icon: {
			type: [String, Object],
			default: null
		},
		//名称
		name: {
			type: String,
			default: null
		},
		//值
		value: {
			type: [Object, Number, String, Array],
			default: null
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//徽章角标
		badge: {
			type: Object,
			default: null
		}
	},
	computed: {
		parseIcon() {
			return params => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(params)) {
					if (typeof params.spin == 'boolean') {
						icon.spin = params.spin
					}
					if (typeof params.type == 'string') {
						icon.type = params.type
					}
					if (typeof params.url == 'string') {
						icon.url = params.url
					}
					if (typeof params.color == 'string') {
						icon.color = params.color
					}
					if (typeof params.size == 'string') {
						icon.size = params.size
					}
				} else if (typeof params == 'string') {
					icon.type = params
				}
				return icon
			}
		},
		cmpClass() {
			let cls = ['mvi-tabbar-item']
			if (Dap.common.equal(this.value, this.tabbar.modelValue)) {
				cls.push('item-active')
			}
			if (this.tabbar.active && !this.disabled && !Dap.common.equal(this.value, this.tabbar.modelValue)) {
				cls.push('active')
			}
			return cls
		},
		cmpStyle() {
			let style = {}
			//激活
			if (Dap.common.equal(this.value, this.tabbar.modelValue)) {
				if (this.tabbar.activeColor) {
					style.color = this.tabbar.activeColor
				}
			} else {
				if (this.tabbar.inactiveColor) {
					style.color = this.tabbar.inactiveColor
				}
			}
			return style
		},
		cmpRoute() {
			if (!this.route) {
				return null
			}
			let route = {}
			if (typeof this.route == 'string') {
				route = {
					path: this.route
				}
			} else if (Dap.common.isObject(this.route)) {
				//路径
				if (typeof this.route.path == 'string' && this.route.path) {
					route.path = this.route.path
				}
				//路由名称
				if (typeof this.route.name == 'string' && this.route.name) {
					route.name = this.route.name
				}
				//路由参数
				if (Dap.common.isObject(this.route.query)) {
					route.query = this.route.query
				} else {
					route.query = {}
				}
				//动态路由参数
				if (Dap.common.isObject(this.route.params)) {
					route.params = this.route.params
				} else {
					route.params = {}
				}
				//是否使用replace
				if (typeof this.route.replace == 'boolean') {
					route.replace = this.route.replace
				} else {
					route.replace = false
				}
			}
			if (!route.query) {
				route.query = {}
			}
			if (!route.params) {
				route.params = {}
			}
			return route
		}
	},
	components: {
		Icon,
		Badge
	},
	methods: {
		setActive() {
			//触发item-click事件
			this.tabbar.$emit('item-click', JSON.parse(JSON.stringify(this.$props)))

			if (this.disabled) {
				return
			}
			if (Dap.common.equal(this.tabbar.modelValue, this.value)) {
				return
			}
			//如果路由存在
			if (this.cmpRoute && this.$router && this.$router.replace && this.$router.push) {
				//path存在首先使用path
				if (this.cmpRoute.path) {
					if (this.cmpRoute.replace) {
						this.$router.replace({
							path: this.cmpRoute.path,
							query: this.cmpRoute.query,
							params: this.cmpRoute.params
						})
					} else {
						this.$router.push({
							path: this.cmpRoute.path,
							query: this.cmpRoute.query,
							params: this.cmpRoute.params
						})
					}
				}
				//使用路由名称
				else if (this.cmpRoute.name) {
					if (this.cmpRoute.replace) {
						this.$router.replace({
							name: this.cmpRoute.name,
							query: this.cmpRoute.query,
							params: this.cmpRoute.params
						})
					} else {
						this.$router.push({
							name: this.cmpRoute.name,
							query: this.cmpRoute.query,
							params: this.cmpRoute.params
						})
					}
				}
			}
			this.tabbar.$emit('update:modelValue', this.value)
			this.tabbar.$emit('change', JSON.parse(JSON.stringify(this.$props)))
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-tabbar-item {
	position: relative;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	vertical-align: middle;
	height: 100%;
	padding: 0 @mp-lg;
	cursor: pointer;
	user-select: none;

	.mvi-tabbar-badge {
		width: 100%;
	}
	.mvi-tabbar-item-child {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		vertical-align: middle;

		.mvi-tabbar-icon {
			display: block;
			width: 100%;
			text-align: center;
			margin: 0;
			padding: 0;
			font-size: @font-size-h4;
		}

		.mvi-tabbar-name {
			display: block;
			width: 100%;
			text-align: center;
			font-size: @font-size-h6;
			white-space: nowrap;

			&.small {
				font-size: @font-size-small;
			}
		}
	}

	&.item-active {
		color: @info-normal;
	}

	&.active:active::before {
		.mvi-active();
	}

	&[disabled] {
		opacity: 0.6;
	}
}
</style>

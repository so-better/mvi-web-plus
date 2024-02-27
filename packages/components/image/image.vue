<template>
	<div class="mvi-image" :style="imageStyle">
		<!-- 加载中 -->
		<div v-if="(loading || lazying) && showLoading" class="mvi-image-loading">
			<slot name="loading" v-if="$slots.loading"></slot>
			<Icon v-else :type="parseIcon(loadIcon).type" :url="parseIcon(loadIcon).url" :spin="parseIcon(loadIcon).spin" :size="parseIcon(loadIcon).size" :color="parseIcon(loadIcon).color" />
		</div>
		<!-- 加载失败 -->
		<div v-else-if="error && showError" class="mvi-image-error" ref="error">
			<slot name="error" v-if="$slots.error"></slot>
			<Icon v-else :type="parseIcon(errorIcon).type" :url="parseIcon(errorIcon).url" :spin="parseIcon(errorIcon).spin" :size="parseIcon(errorIcon).size" :color="parseIcon(errorIcon).color" />
		</div>
		<!-- 加载成功 -->
		<img @load="loadSuccess" @error="loadError" :src="cmpSrc" :alt="showError ? '' : alt" :class="imgClass" />
	</div>
</template>
<script>
import Dap from 'dap-util'
import { Spy } from '../spy'
import { Icon } from '../icon'
export default {
	name: 'm-image',
	data() {
		return {
			//是否加载失败
			error: false,
			//是否正在加载中
			loading: true,
			//延迟加载显示的图片地址
			lazySrc: '',
			//是否正在延迟中
			lazying: false,
			//spy对象
			spy: null
		}
	},
	emits: ['success', 'error'],
	props: {
		//图片链接
		src: {
			type: String,
			default: ''
		},
		//填充类型
		fit: {
			type: String,
			default: 'fill',
			validator(value) {
				return ['fill', 'cover', 'contain', 'response', 'none'].includes(value)
			}
		},
		//原生alt属性
		alt: {
			type: String,
			default: ''
		},
		//是否显示图片加载失败提示
		showError: {
			type: Boolean,
			default: true
		},
		//是否显示图片加载中提示
		showLoading: {
			type: Boolean,
			default: true
		},
		//是否启用延迟加载
		lazyLoad: {
			type: Boolean,
			default: false
		},
		//延时加载时指定的滚动容器选择器
		root: {
			type: String,
			default: null
		},
		//加载图标
		loadIcon: {
			type: [String, Object],
			default: 'image-alt'
		},
		//失败图标
		errorIcon: {
			type: [String, Object],
			default: 'image-error'
		},
		//是否圆形图片
		round: {
			type: Boolean,
			default: false
		},
		//图片宽度
		width: {
			type: String,
			default: null
		},
		//图片高度
		height: {
			type: String,
			default: null
		}
	},
	computed: {
		//转换图标字段
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
		//图片容器样式
		imageStyle() {
			let style = {}
			if (this.round) {
				style.borderRadius = '50%'
			}
			if (this.width) {
				style.width = this.width
			}
			if (this.height) {
				style.height = this.height
			}
			return style
		},
		//图片类
		imgClass() {
			if (this.fit == 'contain') {
				return 'mvi-image-contain'
			} else if (this.fit == 'cover') {
				return 'mvi-image-cover'
			} else if (this.fit == 'none') {
				return 'mvi-image-none'
			} else if (this.fit == 'response') {
				return 'mvi-image-response'
			} else {
				return 'mvi-image-fill'
			}
		},
		//图片链接
		cmpSrc() {
			if (this.lazyLoad) {
				return this.lazySrc
			} else {
				return this.src
			}
		}
	},
	components: {
		Icon
	},
	watch: {
		cmpSrc() {
			this.loading = true
		}
	},
	mounted() {
		if (this.lazyLoad) {
			this.lazyloadFun()
		}
	},
	methods: {
		//延时加载方法
		lazyloadFun() {
			this.lazying = true
			//延时加载
			this.spy = new Spy(this.$el, {
				el: this.root,
				//图片进入可视端口时加载
				beforeEnter: () => {
					this.lazying = false
					this.lazySrc = this.src
				}
			})
			this.spy.init()
		},
		//图片加载成功
		loadSuccess(e) {
			this.error = false
			this.loading = false
			this.$emit('success', e.target)
		},
		//图片加载失败
		loadError(e) {
			this.loading = false
			this.error = true
			this.$emit('error', e.target)
		}
	},
	beforeUnmount() {
		if (this.spy) {
			this.spy.destroy()
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-image {
	display: inline-block;
	overflow: hidden;
	position: relative;

	img {
		display: block;
		margin: 0;
		padding: 0;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;

		&.mvi-image-contain {
			object-fit: contain;
		}

		&.mvi-image-cover {
			object-fit: cover;
		}

		&.mvi-image-fill {
			object-fit: fill;
		}

		&.mvi-image-none {
			object-fit: none;
		}

		&.mvi-image-response {
			object-fit: scale-down;
		}
	}

	.mvi-image-error,
	.mvi-image-loading {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: @bg-color-dark;
		color: @font-color-sub;
		z-index: 2;
	}
}
</style>

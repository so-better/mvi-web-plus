<template>
	<Overlay ref="overlay" v-model="show" color="#000" :fade="false" @showing="overlayShowing" :z-index="zIndex" :use-padding="usePadding" :mountEl="mountEl">
		<Swiper v-if="firstShow" class="mvi-image-preview-swiper" :initial-slide="active" show-indicators ref="swiper" @change="swiperChange" :show-control="showControl" :fade="fade" :touchable="enableTouch">
			<SwiperSlide v-for="(item, index) in images" class="mvi-preview-container">
				<RichImage :ref="el => (imageRefs[index] = el)" @close-preview="closeOverlay" @disable-swiper-touch="enableTouch = false" @enable-swiper-touch="enableTouch = true" :src="item" :error-icon="errorIcon" :load-icon="loadIcon" :max-scale="maxScale" :min-scale="minScale"></RichImage>
			</SwiperSlide>
			<template #indicators="data">
				<div class="mvi-image-preview-page" v-if="showPage">
					<slot name="page" :total="data.total" :current="data.active" v-if="$slots.page"></slot>
					<div v-else>
						<span v-text="data.active + 1"></span>
						<span>/</span>
						<span v-text="data.total"></span>
					</div>
				</div>
				<div v-if="useTools || $slots.descriptions || descriptions.length > 0" class="mvi-image-preview-footer">
					<div v-if="useTools" class="mvi-image-preview-tools">
						<Icon @click="plusImage(data.active)" class="mvi-image-preview-tools-icon" type="search-plus-o" />
						<Icon @click="minusImage(data.active)" class="mvi-image-preview-tools-icon" type="search-minus-o" />
						<Icon @click="resetImage(data.active)" class="mvi-image-preview-tools-icon" type="double-circle" />
						<Icon @click="leftRotateImage(data.active)" class="mvi-image-preview-tools-icon" type="left-rotate" />
						<Icon @click="rightRotateImage(data.active)" class="mvi-image-preview-tools-icon" type="right-rotate" />
						<slot name="tools" v-if="$slots.tools"></slot>
					</div>
					<div v-if="$slots.descriptions || descriptions.length > 0" class="mvi-image-preview-description" :class="{ 'mvi-image-preview-description-margin': useTools }">
						<slot name="descriptions" :total="data.total" :current="data.active" v-if="$slots.descriptions"> </slot>
						<div v-else-if="descriptions.length > 0" class="mvi-image-preview-description-el" v-text="descriptions[data.active]"></div>
					</div>
				</div>
			</template>
		</Swiper>
	</Overlay>
</template>

<script setup lang="ts">
import { Overlay } from '../overlay'
import { Swiper } from '../swiper'
import { SwiperSlide } from '../swiper-slide'
import { Icon } from '../icon'
import RichImage from './rich-image.vue'
// export default {
// 	name: 'm-image-preview',
// 	data() {
// 		return {
// 			firstShow: false,
// 			enableTouch: true,
// 			imageRefs: []
// 		}
// 	},
// 	emits: ['update:modelValue', 'change'],
// 	props: {
// 		//是否显示
// 		modelValue: {
// 			type: Boolean,
// 			default: false
// 		},
// 		//图片数组
// 		images: {
// 			type: Array,
// 			default: function () {
// 				return []
// 			}
// 		},
// 		//图片描述
// 		descriptions: {
// 			type: Array,
// 			default: function () {
// 				return []
// 			}
// 		},
// 		//默认显示的图片序列
// 		active: {
// 			type: Number,
// 			default: 0
// 		},
// 		//挂载元素
// 		mountEl: {
// 			type: String,
// 			default: null
// 		},
// 		//是否显示页码
// 		showPage: {
// 			type: Boolean,
// 			default: true
// 		},
// 		//z-index值
// 		zIndex: {
// 			type: Number,
// 			default: 5000
// 		},
// 		//是否使用渐变
// 		fade: {
// 			type: Boolean,
// 			default: false
// 		},
// 		//是否显示控制器
// 		showControl: {
// 			type: Boolean,
// 			default: false
// 		},
// 		//局部显示是否考虑滚动条影响
// 		usePadding: {
// 			type: Boolean,
// 			default: false
// 		},
// 		//图片加载失败提示设置
// 		errorIcon: {
// 			type: [String, Object],
// 			default: {
// 				size: '1rem',
// 				type: 'image-error'
// 			}
// 		},
// 		//图片加载中提示设置
// 		loadIcon: {
// 			type: [String, Object],
// 			default: function () {
// 				return {
// 					size: '1rem',
// 					type: 'image-alt'
// 				}
// 			}
// 		},
// 		//是否使用图片工具栏
// 		useTools: {
// 			type: Boolean,
// 			default: false
// 		},
// 		//最大缩放值
// 		maxScale: {
// 			type: Number,
// 			default: 3
// 		},
// 		//最小缩放值
// 		minScale: {
// 			type: Number,
// 			default: 0.3
// 		}
// 	},
// 	computed: {
// 		$$el() {
// 			return this.$refs.overlay.$$el
// 		},
// 		show: {
// 			set(value) {
// 				this.$emit('update:modelValue', value)
// 			},
// 			get() {
// 				return this.modelValue
// 			}
// 		}
// 	},
// 	components: {
// 		Overlay,
// 		Swiper,
// 		SwiperSlide,
// 		Icon,
// 		RichImage
// 	},
// 	methods: {
// 		//重置图片
// 		resetImage(active) {
// 			this.imageRefs[active]?.reset()
// 		},
// 		//放大图片
// 		plusImage(active) {
// 			this.imageRefs[active]?.scalePlus()
// 		},
// 		//缩小图片
// 		minusImage(active) {
// 			this.imageRefs[active]?.scaleMinus()
// 		},
// 		//左旋转图片
// 		leftRotateImage(active) {
// 			this.imageRefs[active]?.leftRotate()
// 		},
// 		//右旋转图片
// 		rightRotateImage(active) {
// 			this.imageRefs[active]?.rightRotate()
// 		},
// 		//遮罩层显示时
// 		overlayShowing() {
// 			if (!this.firstShow) {
// 				this.firstShow = true
// 			}
// 		},
// 		//关闭遮罩
// 		closeOverlay(e) {
// 			for (let richImage of this.imageRefs) {
// 				richImage?.reset()
// 			}
// 			this.show = false
// 		},
// 		//图片变更
// 		swiperChange(active) {
// 			for (let richImage of this.imageRefs) {
// 				richImage?.reset()
// 			}
// 			this.$emit('change', active)
// 		}
// 	}
// }
</script>

<style scoped src="./image-preview.less"></style>

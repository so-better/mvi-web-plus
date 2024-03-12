<template>
	<Overlay ref="overlayRef" v-model="show" color="#000" :fade="false" @showing="overlayShowing" :z-index="zIndex" :use-padding="usePadding" :mountEl="mountEl">
		<Carousel v-if="showCarousel" ref="carouselRef" class="mvi-image-preview-carousel" v-model="carouselIndex" :controls="controls" :indicators="!!(showPage || useTools || $slots.descriptions || descriptions.length)" :mode="mode" :loop="loop" :touchable="enableTouch" @change="carouselChange">
			<CarouselItem v-for="(item, index) in images">
				<RichImage :ref="el => setImageRef(<RichImageType>el, index)" @double-touchstart="disabledCarouselTouch" @translate-touchstart="disabledCarouselTouch" @translate-mousedown="disabledCarouselTouch" @double-touchend="enableCarouselTouch" @translate-touchend="enableCarouselTouch" @translate-mouseup="enableCarouselTouch" @reset="enableCarouselTouch" :src="item" @on-click="closeOverlay" :error-icon="errorIcon" :load-icon="loadIcon" :max-scale="maxScale" :min-scale="minScale"></RichImage>
			</CarouselItem>
			<template #indicators="data">
				<div class="mvi-image-preview-page" v-if="showPage">
					<slot name="page" :total="data.total" :current="carouselIndex" v-if="$slots.page"></slot>
					<div v-else>
						<span v-text="carouselIndex + 1"></span>
						<span>/</span>
						<span v-text="data.total"></span>
					</div>
				</div>
				<div v-if="!!(useTools || $slots.descriptions || descriptions.length)" class="mvi-image-preview-footer">
					<div v-if="useTools" class="mvi-image-preview-tools">
						<Icon @click="plusImage" class="mvi-image-preview-tools-icon" type="search-plus-o" />
						<Icon @click="minusImage" class="mvi-image-preview-tools-icon" type="search-minus-o" />
						<Icon @click="resetImage" class="mvi-image-preview-tools-icon" type="double-circle" />
						<Icon @click="leftRotateImage" class="mvi-image-preview-tools-icon" type="left-rotate" />
						<Icon @click="rightRotateImage" class="mvi-image-preview-tools-icon" type="right-rotate" />
						<slot name="tools" v-if="$slots.tools"></slot>
					</div>
					<div v-if="!!($slots.descriptions || descriptions.length)" class="mvi-image-preview-descriptions" :class="{ 'has-tools': useTools }">
						<slot name="descriptions" :total="data.total" :current="carouselIndex" v-if="$slots.descriptions"> </slot>
						<div v-else-if="!!descriptions.length" class="mvi-image-preview-description" v-text="descriptions[carouselIndex]"></div>
					</div>
				</div>
			</template>
		</Carousel>
	</Overlay>
</template>

<script setup lang="ts">
import { Overlay } from '../overlay'
import { Carousel } from '../carousel'
import { CarouselItem } from '../carousel-item'
import { Icon } from '../icon'
import { RichImage } from '../rich-image'
import { ImagePreviewProps } from './props'
import { computed, ref, watch } from 'vue'

defineOptions({
	name: 'm-image-preview'
})

//属性
const props = defineProps(ImagePreviewProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

//是否显示轮播组件
const showCarousel = ref<boolean>(false)
//当前轮播序列
const carouselIndex = ref<number>(0)
//是否允许触摸滑动轮播
const enableTouch = ref<boolean>(true)
//富图片类型
type RichImageType = InstanceType<typeof RichImage>
//富图片数组
const imageRefs = ref<RichImageType[]>([])
//遮罩层组件
const overlayRef = ref<InstanceType<typeof Overlay> | null>(null)
//启用触摸滑动的延时器
const touchTimer = ref<any>(null)

const $$el = computed<HTMLElement | null>(() => {
	return overlayRef.value ? overlayRef.value.$$el : null
})
const show = computed<boolean>({
	set(value) {
		emits('update:modelValue', value)
	},
	get() {
		return props.modelValue
	}
})

//获取富图片数组
const setImageRef = (el: RichImageType, index: number) => {
	imageRefs.value[index] = el
}
//关闭遮罩
const closeOverlay = () => {
	imageRefs.value.forEach(imageRef => {
		imageRef.reset()
	})
	show.value = false
}
//重置图片
const resetImage = () => {
	imageRefs.value[carouselIndex.value]?.reset()
}
//放大图片
const plusImage = () => {
	imageRefs.value[carouselIndex.value]?.scaleUp()
}
//缩小图片
const minusImage = () => {
	imageRefs.value[carouselIndex.value]?.scaleDown()
}
//左旋转图片
const leftRotateImage = () => {
	imageRefs.value[carouselIndex.value]?.leftRotate()
}
//右旋转图片
const rightRotateImage = () => {
	imageRefs.value[carouselIndex.value]?.rightRotate()
}
//遮罩层显示时
const overlayShowing = () => {
	if (!showCarousel.value) {
		showCarousel.value = true
	}
}
//轮播变更
const carouselChange = () => {
	imageRefs.value.forEach(imageRef => {
		imageRef.reset()
	})
	emits('change', carouselIndex.value)
}
//禁用触摸滑动
const disabledCarouselTouch = () => {
	if (touchTimer.value) {
		clearTimeout(touchTimer.value)
	}
	enableTouch.value = false
}
//启用触摸滑动
const enableCarouselTouch = () => {
	touchTimer.value = setTimeout(() => {
		enableTouch.value = true
	}, 100)
}

//监听active属性更新carouselIndex
watch(
	() => props.active,
	newVal => {
		carouselIndex.value = newVal
	},
	{
		immediate: true
	}
)

defineExpose({
	$$el
})
</script>

<style scoped src="./image-preview.less"></style>

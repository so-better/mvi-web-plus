<script setup name="m-transition-slide" lang="ts">
import Dap from 'dap-util'
import { TransitionSlideProps } from './props'
import { onMounted, ref, watch } from 'vue';

//属性
const props = defineProps(TransitionSlideProps)

//事件
const emits = defineEmits(['before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'])

//初始就显示
const show = ref<boolean>(true)
//记录的高度
const height = ref<string>('')
//初始不使用动画
const useAnimation = ref<boolean>(false)
//透明度默认为0
const opacity = ref<number | string>(0)
//元素
const slideRef = ref<HTMLElement | null>(null)


watch(() => props.expand, (newValue) => {
    show.value = newValue
})

//元素显示前
const beforeEnter = (el: Element) => {
    //设置高度为0
    (<HTMLElement>el).style.height = '0';
    //设置动画
    (<HTMLElement>el).style.transition = 'height ' + props.timeout + 'ms linear'
    //触发事件
    emits('before-slide-down', slideRef.value)
}
//元素显示时
const enter = (el: Element) => {
    //促使浏览器重绘
    (<HTMLElement>el).offsetWidth;
    //设置显示后的高度
    (<HTMLElement>el).style.height = height.value
}
//元素显示后
const afterEnter = (el: Element) => {
    //移除动画
    (<HTMLElement>el).style.transition = '';
    //动画结束后恢复高度
    (<HTMLElement>el).style.height = ''
    //触发事件
    emits('slide-down', slideRef.value)
}
//元素隐藏之前
const beforeLeave = (el: Element) => {
    //只记录第一次的高度
    if (!height.value) {
        height.value = Dap.element.getCssStyle(el, 'height')
    }
    //设置元素高度
    (<HTMLElement>el).style.height = height.value
    //此时有动画，则设置动画属性，并触发事件
    if (useAnimation.value) {
        (<HTMLElement>el).style.transition = 'height ' + props.timeout + 'ms linear'
        //触发事件
        emits('before-slide-up', slideRef.value)
    }
}
//元素隐藏时
const leave = (el: Element) => {
    //促使浏览器重绘
    (<HTMLElement>el).offsetWidth;
    //设置隐藏后的高度
    (<HTMLElement>el).style.height = '0'
}
//元素隐藏后
const afterLeave = (el: Element) => {
    //动画结束后恢复高度
    (<HTMLElement>el).style.height = ''
    //此时有动画效果，则设置动画效果相关的属性，并触发事件
    if (useAnimation.value) {
        (<HTMLElement>el).style.transition = '';
        //触发事件
        emits('slide-up', slideRef.value)
    }
    //此时没有动画效果，表示元素初始化是隐藏的，需要为后续做动画进行准备
    else {
        useAnimation.value = true
        opacity.value = ''
    }
}

onMounted(() => {
    //show取值于expand
    show.value = props.expand
    //如果初始化就是展开的，则设置动画并且恢复透明度
    if (show.value) {
        useAnimation.value = true
        opacity.value = ''
    }
})

</script>

<template>
    <transition name="mvi-transition-slide" @before-enter="beforeEnter" @after-enter="afterEnter"
        @before-leave="beforeLeave" @after-leave="afterLeave" @enter="enter" @leave="leave">
        <div class="mvi-transition-slide" ref="slideRef" v-show="show" :style="{ opacity: opacity }">
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped src="./transition-slide.less"></style>

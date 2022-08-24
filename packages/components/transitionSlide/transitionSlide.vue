<template>
    <transition name="mvi-transition-slide" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave" @enter="enter" @leave="leave">
        <div class="mvi-transition-slide" v-show="show" :style="{opacity:opacity}">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-transition-slide',
    data() {
        return {
            show: true,
            height: null,
            useAnimation: false,
            opacity: ''
        }
    },
    emits: ['before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'],
    props: {
        //是否展开
        expand: {
            type: Boolean,
            default: true
        },
        //动画时间
        timeout: {
            type: Number,
            default: 400
        }
    },
    watch: {
        expand(newValue) {
            this.show = newValue
        }
    },
    created() {
        //初始化不展开，则设置透明度为0
        if (!this.expand) {
            this.opacity = 0
        }
    },
    mounted() {
        //show取值于expand
        this.show = this.expand
        //启用动画
        this.$nextTick(() => {
            this.useAnimation = true
            //恢复第一次设置的透明度
            if (this.opacity === 0) {
                this.opacity = ''
            }
        })
    },
    methods: {
        beforeEnter(el) {
            //设置高度为0
            el.style.height = 0
            //设置动画
            if (this.useAnimation) {
                el.style.transition = 'height ' + this.timeout + 'ms linear'
                el.style.webkitTransition =
                    'height ' + this.timeout + 'ms linear'
            }
            //触发事件
            this.$emit('before-slide-down', this.$el)
        },
        enter(el) {
            //促使浏览器重绘
            el.offsetWidth
            //设置显示后的高度
            el.style.height = this.height
        },
        afterEnter(el) {
            //移除动画
            if (this.useAnimation) {
                el.style.transition = ''
                el.style.webkitTransition = ''
            }
            //动画结束后恢复高度
            el.style.height = ''
            //触发事件
            this.$emit('slide-down', this.$el)
        },
        beforeLeave(el) {
            //只记录第一次的高度
            if (!this.height) {
                this.height = $dap.element.getCssStyle(el, 'height')
            }
            //设置元素高度
            el.style.height = this.height
            //设置动画
            if (this.useAnimation) {
                el.style.transition = 'height ' + this.timeout + 'ms linear'
                el.style.webkitTransition =
                    'height ' + this.timeout + 'ms linear'
            }
            //触发事件
            this.$emit('before-slide-up', this.$el)
        },
        leave(el) {
            //促使浏览器重绘
            el.offsetWidth
            //设置隐藏后的高度
            el.style.height = 0
        },
        afterLeave(el) {
            //移除动画
            if (this.useAnimation) {
                el.style.transition = ''
                el.style.webkitTransition = ''
            }
            //动画结束后恢复高度
            el.style.height = ''
            //触发事件
            this.$emit('slide-up', this.$el)
        }
    }
}
</script>

<style scoped lang="less">
.mvi-transition-slide {
    display: block;
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
}
</style>

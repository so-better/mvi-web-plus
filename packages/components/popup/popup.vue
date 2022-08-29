<template>
    <m-overlay ref="overlay" :model-value="modelValue" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding" :z-index="zIndex" @click.self="hide" :color="overlayColor || null" :timeout="timeout" :mount-el="mountEl">
        <transition :name="'mvi-slide-'+placement" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
            <!-- 弹出层 -->
            <div v-if="firstShow" v-show="popupShow" :class="popupClass" :style="popupStyle" v-bind="$attrs">
                <!-- 关闭图标 -->
                <div v-if="showTimes" :class="['mvi-popup-times','mvi-popup-times-'+timesPlacement]">
                    <m-icon @click="hidePopup" :type="iconType" :url="iconUrl" :spin="iconSpin" :size="iconSize" :color="iconColor" />
                </div>
                <!-- 正文内容 -->
                <div :class="['mvi-popup-content',showTimes?'mvi-popup-content-padding':'']">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </m-overlay>
</template>

<script>
import $dap from 'dap-util'
import mOverlay from '../overlay/overlay'
import mIcon from '../icon/icon'
export default {
    name: 'm-popup',
    data() {
        return {
            //popup弹窗是否显示
            popupShow: false,
            //popup弹窗是否渲染
            firstShow: false
        }
    },
    emits: [
        'update:modelValue',
        'show',
        'showing',
        'shown',
        'hide',
        'hidding',
        'hidden',
        'overlay-click'
    ],
    inheritAttrs: false,
    props: {
        //挂载元素
        mountEl: {
            type: String,
            default: null
        },
        //是否显示关闭图标
        showTimes: {
            type: Boolean,
            default: false
        },
        //关闭图标的位置
        timesPlacement: {
            type: String,
            default: 'top-right',
            validator(value) {
                return [
                    'top-right',
                    'top-left',
                    'bottom-right',
                    'bottom-left'
                ].includes(value)
            }
        },
        //自定义关闭按钮
        timesIcon: {
            type: [String, Object],
            default: null
        },
        //显示与否
        modelValue: {
            type: Boolean,
            default: false
        },
        //点击背景遮罩是否关闭
        closable: {
            type: Boolean,
            default: false
        },
        //遮罩层颜色
        overlayColor: {
            type: String,
            default: null
        },
        //弹出层背景色
        popupColor: {
            type: String,
            default: null
        },
        //弹出层字体颜色
        color: {
            type: String,
            default: null
        },
        //遮罩层z-index
        zIndex: {
            type: Number,
            default: 900
        },
        //动画时长
        timeout: {
            type: Number,
            default: 200
        },
        //弹窗的位置
        placement: {
            type: String,
            default: 'bottom',
            validator(value) {
                return ['left', 'top', 'bottom', 'right'].includes(value)
            }
        },
        //弹窗是否显示圆角
        round: {
            type: Boolean,
            default: false
        },
        //弹窗显示的宽度或者高度
        width: {
            type: String,
            default: null
        },
        //是否考虑滚动条影响
        usePadding: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        $$el() {
            return this.$refs.overlay.$$el
        },
        iconType() {
            let type = 'times'
            if ($dap.common.isObject(this.timesIcon)) {
                if (typeof this.timesIcon.type == 'string') {
                    type = this.timesIcon.type
                }
            } else if (typeof this.timesIcon == 'string') {
                type = this.timesIcon
            }
            return type
        },
        iconUrl() {
            let url = null
            if ($dap.common.isObject(this.timesIcon)) {
                if (typeof this.timesIcon.url == 'string') {
                    url = this.timesIcon.url
                }
            }
            return url
        },
        iconSpin() {
            let spin = false
            if ($dap.common.isObject(this.timesIcon)) {
                if (typeof this.timesIcon.spin == 'boolean') {
                    spin = this.timesIcon.spin
                }
            }
            return spin
        },
        iconSize() {
            let size = null
            if ($dap.common.isObject(this.timesIcon)) {
                if (typeof this.timesIcon.size == 'string') {
                    size = this.timesIcon.size
                }
            }
            return size
        },
        iconColor() {
            let color = null
            if ($dap.common.isObject(this.timesIcon)) {
                if (typeof this.timesIcon.color == 'string') {
                    color = this.timesIcon.color
                }
            }
            return color
        },
        //弹出层类
        popupClass() {
            let cls = ['mvi-popup', 'mvi-popup-' + this.placement]
            if (this.round) {
                cls.push('mvi-popup-round')
            }
            return cls
        },
        //弹出层样式
        popupStyle() {
            let style = {}
            if (this.placement == 'left' || this.placement == 'right') {
                if (this.width) {
                    style.width = this.width
                }
            } else if (this.placement == 'top' || this.placement == 'bottom') {
                if (this.width) {
                    style.height = this.width
                }
            }
            if (this.showTimes) {
                if (
                    this.timesPlacement == 'top-left' ||
                    this.timesPlacement == 'top-right'
                ) {
                    style.flexDirection = 'column'
                    style.webkitFlexDirection = 'column'
                } else if (
                    this.timesPlacement == 'bottom-left' ||
                    this.timesPlacement == 'bottom-right'
                ) {
                    style.flexDirection = 'column-reverse'
                    style.webkitFlexDirection = 'column-reverse'
                }
            }
            if (this.popupColor) {
                style.backgroundColor = this.popupColor
            }
            if (this.color) {
                style.color = this.color
            }
            if ($dap.number.isNumber(this.zIndex)) {
                style.zIndex = this.zIndex + 10
            }
            style.transition = 'all ' + this.timeout + 'ms'
            style.webkitTransition = 'all ' + this.timeout + 'ms'
            style.msTransition = 'all ' + this.timeout + 'ms'
            style.MozTransition = 'all ' + this.timeout + 'ms'
            return style
        }
    },
    components: {
        mIcon,
        mOverlay
    },
    methods: {
        //遮罩层显示前
        overlayShow(el) {
            if (!this.firstShow) {
                this.firstShow = true
            }
            this.popupShow = true
        },
        //遮罩层隐藏之前
        overlayHide() {
            this.popupShow = false
        },
        //点击遮罩层关闭
        hide(e) {
            if (this.closable) {
                this.hidePopup()
            }
            this.$emit('overlay-click', e)
        },
        //点击关闭按钮
        hidePopup() {
            this.$emit('update:modelValue', false)
        },
        //弹出层显示前
        beforeEnter(el) {
            //解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
            if ($dap.data.get(el, 'mvi-popup-beforeEnter-trigger')) {
                return
            }
            $dap.data.set(el, 'mvi-popup-beforeEnter-trigger', true)

            this.$emit('show', el)
            if (typeof this.popupComponentWatch == 'function') {
                this.popupComponentWatch.apply(this, ['show', el])
            }
        },
        //弹出层显示时
        enter(el) {
            //解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
            if ($dap.data.get(el, 'mvi-popup-enter-trigger')) {
                return
            }
            $dap.data.set(el, 'mvi-popup-enter-trigger', true)

            this.$emit('showing', el)
            if (typeof this.popupComponentWatch == 'function') {
                this.popupComponentWatch.apply(this, ['showing', el])
            }
        },
        //弹出层显示后
        afterEnter(el) {
            this.$emit('shown', el)
            if (typeof this.popupComponentWatch == 'function') {
                this.popupComponentWatch.apply(this, ['shown', el])
            }
        },
        //弹出层隐藏前
        beforeLeave(el) {
            //清除标记
            $dap.data.remove(el, 'mvi-popup-beforeEnter-trigger')
            $dap.data.remove(el, 'mvi-popup-enter-trigger')

            this.$emit('hide', el)
            if (typeof this.popupComponentWatch == 'function') {
                this.popupComponentWatch.apply(this, ['hide', el])
            }
        },
        //弹出层隐藏时
        leave(el) {
            this.$emit('hidding', el)
            if (typeof this.popupComponentWatch == 'function') {
                this.popupComponentWatch.apply(this, ['hidding', el])
            }
        },
        //弹出层隐藏后
        afterLeave(el) {
            this.$emit('hidden', el)
            if (typeof this.popupComponentWatch == 'function') {
                this.popupComponentWatch.apply(this, ['hidden', el])
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-popup {
    position: absolute;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;
    padding: 0;
    display: -webkit-flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: column;
    color: @font-color-default;
}

.mvi-popup-left {
    left: 0;
    right: auto;
    top: 0;
    bottom: auto;
    height: 100%;
    max-width: 100%;
}

.mvi-popup-right {
    left: auto;
    right: 0;
    top: 0;
    bottom: auto;
    height: 100%;
    max-width: 100%;
}

.mvi-popup-top {
    left: 0;
    right: auto;
    top: 0;
    bottom: auto;
    width: 100%;
    max-height: 100%;
}

.mvi-popup-bottom {
    left: 0;
    right: auto;
    top: auto;
    bottom: 0;
    width: 100%;
    max-height: 100%;
}

.mvi-popup-left.mvi-popup-round {
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
}

.mvi-popup-right.mvi-popup-round {
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
}

.mvi-popup-top.mvi-popup-round {
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
}

.mvi-popup-bottom.mvi-popup-round {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
}

.mvi-popup-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
}

.mvi-popup-content.mvi-popup-content-padding {
    padding: 0 @mp-sm;
    height: calc(~'100% - @{mini-height}');
}

.mvi-popup-times {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin: 0;
    padding: 0 @mp-sm;
    height: @mini-height;
    width: 100%;
    cursor: pointer;
    color: @font-color-mute;
}

.mvi-popup-times.mvi-popup-times-top-right,
.mvi-popup-times.mvi-popup-times-bottom-right {
    justify-content: flex-end;
}

.mvi-popup-times.mvi-popup-times-top-left,
.mvi-popup-times.mvi-popup-times-bottom-left {
    justify-content: flex-start;
}

.mvi-slide-left-enter-from,
.mvi-slide-left-leave-to {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
}

.mvi-slide-right-enter-from,
.mvi-slide-right-leave-to {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
    -ms-transform: translateX(100%);
    -moz-transform: translateX(100%);
}

.mvi-slide-top-enter-from,
.mvi-slide-top-leave-to {
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
}

.mvi-slide-bottom-enter-from,
.mvi-slide-bottom-leave-to {
    transform: translateY(100%);
    -webkit-transform: translateY(100%);
    -ms-transform: translateY(100%);
    -moz-transform: translateY(100%);
}
</style>

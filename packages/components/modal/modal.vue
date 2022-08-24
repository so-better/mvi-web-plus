<template>
    <m-overlay ref="overlay" :model-value="modelValue" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding" :z-index="zIndex" @click.self="hide" :color="overlayColor" :timeout="timeout" :mount-el="mountEl">
        <div ref="modal" class="mvi-modal" :style="modalStyle">
            <transition :name="'mvi-modal-'+animation" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
                <!-- 弹出层 -->
                <div v-if="firstShow" v-show="modalShow" class="mvi-modal-wrapper" ref="wrapper" :style="wrapperStyle" v-bind="$attrs">
                    <div class="mvi-modal-times" @click="hideModal" v-if="showTimes && (iconType || iconUrl)">
                        <m-icon :type="iconType" :url="iconUrl" :spin="iconSpin" :size="iconSize" :color="iconColor" />
                    </div>
                    <div ref="header" :class="titleCls" v-if="$slots.title || title" :style="headerStyle">
                        <slot name="title" v-if="$slots.title"></slot>
                        <span v-html="title" v-else-if="title"></span>
                    </div>
                    <div ref="content" :class="['mvi-modal-content',contentClass || '']" v-if="$slots.default || content" :style="{padding:contentPadding?'':'0'}">
                        <slot v-if="$slots.default"></slot>
                        <span v-html="content" v-else-if="content"></span>
                    </div>
                    <div ref="footer" :class="['mvi-modal-footer',footerClass || '']" v-if="$slots.footer || footer" :style="{padding:footerPadding?'':'0'}">
                        <slot name="footer" v-if="$slots.footer"></slot>
                        <span class="mvi-modal-footer-text" v-html="footer" v-else-if="footer"></span>
                    </div>
                </div>
            </transition>
        </div>
    </m-overlay>
</template>

<script>
import $dap from 'dap-util'
import mOverlay from '../overlay/overlay'
import mIcon from '../icon/icon'
export default {
    name: 'm-modal',
    data() {
        return {
            //模态框是否显示
            modalShow: false,
            //模态框是否渲染
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
        'hidden'
    ],
    inheritAttrs: false,
    props: {
        //挂载元素
        mountEl: {
            type: String,
            default: null
        },
        //模态框标题
        title: {
            type: String,
            default: ''
        },
        //标题额外样式
        titleClass: {
            type: String,
            default: null
        },
        //模态框内容
        content: {
            type: String,
            default: ''
        },
        //内容额外样式
        contentClass: {
            type: String,
            default: null
        },
        //尾注信息
        footer: {
            type: String,
            default: null
        },
        //尾注额外样式
        footerClass: {
            type: String,
            default: null
        },
        //是否显示关闭图标
        showTimes: {
            type: Boolean,
            default: false
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
        //动画时间
        timeout: {
            type: Number,
            default: 300
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
        //模态框背景色
        modalColor: {
            type: String,
            default: null
        },
        //模态框字体颜色
        color: {
            type: String,
            default: null
        },
        //遮罩层z-index
        zIndex: {
            type: Number,
            default: 900
        },
        //弹窗显示的宽度
        width: {
            type: String,
            default: null
        },
        //尾注内边距
        footerPadding: {
            type: Boolean,
            default: true
        },
        //主体内边距
        contentPadding: {
            type: Boolean,
            default: true
        },
        //头部内边距
        headerPadding: {
            type: Boolean,
            default: true
        },
        //模态框圆角
        radius: {
            type: String,
            default: null
        },
        //动画
        animation: {
            type: String,
            default: 'scale' //'narrow','scale','translate-top','translate-bottom','translate-left','translate-right'
        },
        //标题是否只一行，超出省略
        titleEllipsis: {
            type: Boolean,
            default: false
        },
        //局部显示是否考虑PC端滚动条影响
        usePadding: {
            type: Boolean,
            default: false
        },
        //是否全屏
        fullScreen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
		$$el(){
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
        modalStyle() {
            let style = {}
            style.zIndex = this.zIndex + 10
            return style
        },
        wrapperStyle() {
            let style = {}
            if (this.radius) {
                style.borderRadius = this.radius
            }
            if (this.modalColor) {
                style.background = this.modalColor
            }
            if (this.color) {
                style.color = this.color
            }
            style.transition = 'all ' + this.timeout + 'ms'
            style.webkitTransition = 'all ' + this.timeout + 'ms'
            return style
        },
        titleCls() {
            let cls = ['mvi-modal-title']
            if (this.titleEllipsis) {
                cls.push('mvi-modal-title-ellipsis')
            }
            if (this.titleClass) {
                cls.push(this.titleClass)
            }
            return cls
        },
        headerStyle() {
            let style = {}
            //主体存在
            if (this.$slots.default || this.content) {
                style.paddingBottom = '0'
            }
            if (!this.headerPadding) {
                style.padding = '0'
            }
            return style
        }
    },
    components: {
        mIcon,
        mOverlay
    },
    watch: {
        fullScreen(newValue) {
            this.modalSize()
        }
    },
    methods: {
        //模态框宽高设置
        modalSize() {
            //如果是全屏显示
            if (this.fullScreen) {
                this.$refs.modal.style.width =
                    this.$refs.overlay.$$el.offsetParent.offsetWidth + 'px'
                this.$refs.wrapper.style.height =
                    this.$refs.overlay.$$el.offsetParent.offsetHeight + 'px'
                this.$refs.wrapper.style.maxHeight = ''
            } else {
                if (this.width) {
                    this.$refs.modal.style.width = this.width
                } else {
                    this.$refs.modal.style.width = ''
                }
                this.$refs.wrapper.style.maxHeight =
                    this.$refs.overlay.$$el.offsetParent.offsetHeight * 0.96 +
                    'px'
                this.$refs.wrapper.style.height = ''
            }
        },
        //遮罩层显示前
        overlayShow(el) {
            if (!this.firstShow) {
                this.firstShow = true
            }
            this.modalShow = true
        },
        //遮罩层隐藏之前
        overlayHide() {
            this.modalShow = false
        },
        //点击遮罩层关闭
        hide() {
            if (this.closable) {
                this.hideModal()
            }
        },
        //点击关闭按钮
        hideModal() {
            this.$emit('update:modelValue', false)
        },
        //弹出层显示前
        beforeEnter(el) {
            //解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
            if ($dap.data.get(el, 'mvi-modal-beforeEnter-trigger')) {
                return
            }
            $dap.data.set(el, 'mvi-modal-beforeEnter-trigger', true)
            this.$emit('show', el)
            if (typeof this.modalComponentWatch == 'function') {
                this.modalComponentWatch.apply(this, ['show', el])
            }
        },
        //弹出层显示时
        enter(el) {
            //解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
            if ($dap.data.get(el, 'mvi-modal-enter-trigger')) {
                return
            }
            $dap.data.set(el, 'mvi-modal-enter-trigger', true)
            this.modalSize()
            this.$emit('showing', el)
            if (typeof this.modalComponentWatch == 'function') {
                this.modalComponentWatch.apply(this, ['showing', el])
            }
        },
        //弹出层显示后
        afterEnter(el) {
            this.$emit('shown', el)
            if (typeof this.modalComponentWatch == 'function') {
                this.modalComponentWatch.apply(this, ['shown', el])
            }
        },
        //弹出层隐藏前
        beforeLeave(el) {
            //清除标记
            $dap.data.remove(el, 'mvi-modal-beforeEnter-trigger')
            $dap.data.remove(el, 'mvi-modal-enter-trigger')

            this.$emit('hide', el)
            if (typeof this.modalComponentWatch == 'function') {
                this.modalComponentWatch.apply(this, ['hide', el])
            }
        },
        //弹出层隐藏时
        leave(el) {
            this.$emit('hidding', el)
            if (typeof this.modalComponentWatch == 'function') {
                this.modalComponentWatch.apply(this, ['hidding', el])
            }
        },
        //弹出层隐藏后
        afterLeave(el) {
            this.$emit('hidden', el)
            if (typeof this.modalComponentWatch == 'function') {
                this.modalComponentWatch.apply(this, ['hidden', el])
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-modal {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 0;
    padding: 0;
    width: 6rem;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: transparent;
    font-size: @font-size-default;
    color: @font-color-default;
}

.mvi-modal-wrapper {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    width: 100%;
    background: #fff;
    font-size: @font-size-default;
    color: @font-color-default;
    border-radius: @radius-default;
    box-shadow: @boxshadow;
    position: relative;
}

.mvi-modal-title {
    display: block;
    width: 100%;
    font-weight: bold;
    font-size: @font-size-h6;
    padding: @mp-lg @mp-md;

    &.mvi-modal-title-ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.mvi-modal-times {
    position: absolute;
    right: @mp-sm;
    top: @mp-sm;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    color: @font-color-mute;
    font-size: @font-size-small;
    cursor: pointer;
}

.mvi-modal-content {
    display: block;
    padding: @mp-lg @mp-md;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: inherit;
    font-size: @font-size-default;
}

.mvi-modal-footer {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid @border-color;
    padding: @mp-sm @mp-md;
    text-align: right;

    & > .mvi-modal-footer-text {
        opacity: 0.6;
    }
}

.mvi-modal-narrow-enter-from {
    transform: translate3d(0, 0, 0) scale(1.4);
    opacity: 0;
}

.mvi-modal-scale-enter-from,
.mvi-modal-scale-leave-to,
.mvi-modal-narrow-leave-to {
    transform: translate3d(0, 0, 0) scale(0.6);
    opacity: 0;
}

.mvi-modal-translate-bottom-enter-from,
.mvi-modal-translate-bottom-leave-to {
    transform: translateY(1rem);
    opacity: 0;
}

.mvi-modal-translate-top-enter-from,
.mvi-modal-translate-top-leave-to {
    transform: translateY(-1rem);
}

.mvi-modal-translate-left-enter-from,
.mvi-modal-translate-left-leave-to {
    transform: translateX(-1rem);
}

.mvi-modal-translate-right-enter-from,
.mvi-modal-translate-right-leave-to {
    transform: translateX(1rem);
}
</style>

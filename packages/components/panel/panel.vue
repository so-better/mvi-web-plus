<template>
    <div :class="['mvi-panel',outBorder?'mvi-panel-border':'',radius?'mvi-panel-radius-top mvi-panel-radius-bottom':'']">
        <div @click="titleClick" :class="titleCls" v-if="$slots.title || title">
            <slot name="title" v-if="$slots.title"></slot>
            <span v-else v-text="title"></span>
        </div>
        <TransitionSlide v-if="$slots.default || content || $slots.footer || footer" :expand="expand" @before-slide-down="beforeSlideDown" @slide-up="slideUp">
            <div :class="contentCls" v-if="$slots.default || content">
                <slot v-if="$slots.default"></slot>
                <span v-else v-text="content"></span>
            </div>
            <div :class="footerCls" v-if="$slots.footer || footer">
                <slot name="footer" v-if="$slots.footer"></slot>
                <span v-else v-text="footer"></span>
            </div>
        </TransitionSlide>
    </div>
</template>

<script>
import { TransitionSlide } from '../transition-slide'
export default {
    name: 'm-panel',
    data() {
        return {
            //是否展开
            expand: true,
            //是否已收起
            hasUp: false
        }
    },
    props: {
        //标题
        title: {
            type: String,
            default: null
        },
        //内容
        content: {
            type: String,
            default: null
        },
        //尾注
        footer: {
            type: String,
            default: null
        },
        //标题class
        titleClass: {
            type: String,
            default: null
        },
        //内容class
        contentClass: {
            type: String,
            default: null
        },
        //尾注class
        footerClass: {
            type: String,
            default: null
        },
        //点击标题进行折叠/展开
        collapseClick: {
            type: Boolean,
            default: false
        },
        //是否显示内部边框
        inBorder: {
            type: Boolean,
            default: true
        },
        //是否显示外部边框
        outBorder: {
            type: Boolean,
            default: true
        },
        //是否显示圆角
        radius: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        titleCls() {
            let cls = ['mvi-panel-header']
            if (this.radius) {
                cls.push('mvi-panel-radius-top')
                if (
                    !(
                        this.$slots.default ||
                        this.content ||
                        this.$slots.footer ||
                        this.footer
                    ) ||
                    this.hasUp
                ) {
                    cls.push('mvi-panel-radius-bottom')
                }
            }
            if (this.titleClass) {
                cls.push(this.titleClass)
            }
            return cls
        },
        contentCls() {
            let cls = ['mvi-panel-content']
            if ((this.$slots.title || this.title) && this.inBorder) {
                cls.push('mvi-panel-border')
            }
            if (this.radius) {
                if (!(this.$slots.title || this.title)) {
                    cls.push('mvi-panel-radius-top')
                }
                if (!(this.$slots.footer || this.footer)) {
                    cls.push('mvi-panel-radius-bottom')
                }
            }
            if (this.contentClass) {
                cls.push(this.contentClass)
            }
            return cls
        },
        footerCls() {
            let cls = ['mvi-panel-footer']
            if (
                (this.$slots.default ||
                    this.content ||
                    this.$slots.title ||
                    this.title) &&
                this.inBorder
            ) {
                cls.push('mvi-panel-border')
            }
            if (this.radius) {
                cls.push('mvi-panel-radius-bottom')
                if (
                    !(
                        this.$slots.default ||
                        this.content ||
                        this.$slots.title ||
                        this.title
                    )
                ) {
                    cls.push('mvi-panel-radius-top')
                }
            }
            if (this.footerClass) {
                cls.push(this.footerClass)
            }
            return cls
        }
    },
    components: {
        TransitionSlide
    },
    methods: {
        //点击面板标题触发
        titleClick() {
            if (
                this.collapseClick &&
                (this.$slots.default ||
                    this.content ||
                    this.$slots.footer ||
                    this.footer)
            ) {
                this.expand = !this.expand
            }
        },
        beforeSlideDown() {
            this.hasUp = false
        },
        slideUp() {
            this.hasUp = true
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-panel {
    display: block;
    position: relative;
    width: 100%;
    background-color: #fff;

    &.mvi-panel-border {
        border: 1px solid @border-color;
    }
}

.mvi-panel-header,
.mvi-panel-content,
.mvi-panel-footer {
    position: relative;
    display: block;
    width: 100%;
    line-height: 1.5;
    padding: @mp-sm;
}

.mvi-panel-header {
    font-size: @font-size-default;
    color: @font-color-default;
}

.mvi-panel-content {
    font-size: @font-size-default;
    color: @font-color-sub;

    &.mvi-panel-border {
        border-top: 1px solid @border-color;
    }
}

.mvi-panel-footer {
    font-size: @font-size-small;
    color: @font-color-mute;
    text-align: right;

    &.mvi-panel-border {
        border-top: 1px solid @border-color;
    }
}

.mvi-panel-radius-top {
    border-top-left-radius: @radius-default;
    border-top-right-radius: @radius-default;
}

.mvi-panel-radius-bottom {
    border-bottom-left-radius: @radius-default;
    border-bottom-right-radius: @radius-default;
}
</style>

<template>
    <div :class="navbarClass" :style="'z-index:'+(fixed?zIndex:'')">
        <div @click="leftClick" :class="['mvi-navbar-left',leftClass || '']" :style="leftStyle" v-if="leftIconType||leftIconUrl||$slots.left||leftText">
            <slot name="left" v-if="$slots.left"></slot>
            <Icon :class="[leftText?'mvi-navbar-left-icon':'']" v-if="(leftIconType||leftIconUrl) && !$slots.left" :type="leftIconType" :url="leftIconUrl" :spin="leftIconSpin" :size="leftIconSize" :color="leftIconColor" />
            <span class="mvi-navbar-left-text" v-if="leftText && !$slots.left" v-text="leftText"></span>
        </div>
        <div @click="titleClick" class="mvi-navbar-center" :style="centerStyle" v-if="$slots.title||title">
            <div :class="['mvi-navbar-title',titleClass || '']">
                <slot name="title" v-if="$slots.title"></slot>
                <span v-else-if="title" v-text="title"></span>
            </div>
        </div>
        <div @click="rightClick" :class="['mvi-navbar-right',rightClass || '']" :style="rightStyle" v-if="rightIconType||rightIconUrl||$slots.right||rightText">
            <slot name="right" v-if="$slots.right"></slot>
            <span class="mvi-navbar-right-text" v-if="rightText && !$slots.right" v-text="rightText"></span>
            <Icon :class="[rightText?'mvi-navbar-right-icon':'']" v-if="(rightIconType||rightIconSpin) && !$slots.right" :type="rightIconType" :url="rightIconUrl" :spin="rightIconSpin" :size="rightIconSize" :color="rightIconColor" />
        </div>
    </div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
    name: 'm-navbar',
    props: {
        //标题
        title: {
            type: String,
            default: null
        },
        //左侧文本
        leftText: {
            type: String,
            default: null
        },
        //右侧文本
        rightText: {
            type: String,
            default: null
        },
        //左侧图标
        leftIcon: {
            type: [String, Object],
            default: null
        },
        //右侧图标
        rightIcon: {
            type: [String, Object],
            default: null
        },
        //是否固定顶部
        fixed: {
            type: Boolean,
            default: false
        },
        //是否显示下边框
        border: {
            type: Boolean,
            default: false
        },
        //层级
        zIndex: {
            type: Number,
            default: 400
        },
        //左侧class
        leftClass: {
            type: String,
            default: null
        },
        //标题class
        titleClass: {
            type: String,
            default: null
        },
        //右侧class
        rightClass: {
            type: String,
            default: null
        }
    },
    emits: ['left-click', 'right-click', 'title-click'],
    computed: {
        leftStyle() {
            let style = {}
            if (this.title || this.$slots.title) {
                style.width = '20%'
            } else if (
                this.rightIconType ||
                this.rightIconUrl ||
                this.$slots.right ||
                this.rightText
            ) {
                style.width = '50%'
            } else {
                style.width = '100%'
            }
            return style
        },
        rightStyle() {
            let style = {}
            if (this.title || this.$slots.title) {
                style.width = '20%'
            } else if (
                this.leftIconType ||
                this.leftIconUrl ||
                this.$slots.left ||
                this.leftText
            ) {
                style.width = '50%'
            } else {
                style.width = '100%'
            }
            return style
        },
        leftIconType() {
            let type = null
            if (Dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.type == 'string') {
                    type = this.leftIcon.type
                }
            } else if (typeof this.leftIcon == 'string') {
                type = this.leftIcon
            }
            return type
        },
        leftIconUrl() {
            let url = null
            if (Dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.url == 'string') {
                    url = this.leftIcon.url
                }
            }
            return url
        },
        leftIconSpin() {
            let spin = false
            if (Dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.spin == 'boolean') {
                    spin = this.leftIcon.spin
                }
            }
            return spin
        },
        leftIconSize() {
            let size = null
            if (Dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.size == 'string') {
                    size = this.leftIcon.size
                }
            }
            return size
        },
        leftIconColor() {
            let color = null
            if (Dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.color == 'string') {
                    color = this.leftIcon.color
                }
            }
            return color
        },
        rightIconType() {
            let type = null
            if (Dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.type == 'string') {
                    type = this.rightIcon.type
                }
            } else if (typeof this.rightIcon == 'string') {
                type = this.rightIcon
            }
            return type
        },
        rightIconUrl() {
            let url = null
            if (Dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.url == 'string') {
                    url = this.rightIcon.url
                }
            }
            return url
        },
        rightIconSpin() {
            let spin = false
            if (Dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.spin == 'boolean') {
                    spin = this.rightIcon.spin
                }
            }
            return spin
        },
        rightIconSize() {
            let size = null
            if (Dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.size == 'string') {
                    size = this.rightIcon.size
                }
            }
            return size
        },
        rightIconColor() {
            let color = null
            if (Dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.color == 'string') {
                    color = this.rightIcon.color
                }
            }
            return color
        },
        navbarClass() {
            let cls = ['mvi-navbar']
            if (this.fixed) {
                cls.push('mvi-navbar-fixed')
            }
            if (this.border) {
                cls.push('mvi-navbar-border')
            }
            return cls
        },
        centerStyle() {
            let style = {}
            if (
                this.rightIconType ||
                this.rightIconUrl ||
                this.$slots.right ||
                this.rightText ||
                this.leftIconType ||
                this.leftIconUrl ||
                this.$slots.left ||
                this.leftText
            ) {
                style.width = '60%'
            } else {
                style.width = '100%'
            }
            return style
        }
    },
    components: {
        Icon
    },
    methods: {
        leftClick() {
            this.$emit('left-click')
        },
        rightClick() {
            this.$emit('right-click')
        },
        titleClick() {
            this.$emit('title-click')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-navbar {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: @medium-height;
    background-color: #fff;
    padding: 0 @mp-sm;
    position: relative;
    color: @font-color-default;
    font-size: @font-size-h6;
}

.mvi-navbar-border {
    border-bottom: 1px solid @border-color;
}

.mvi-navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
}

.mvi-navbar-left {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    vertical-align: middle;
    padding-left: @mp-sm;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.mvi-navbar-left-icon {
    margin-right: @mp-xs;
}

.mvi-navbar-left-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mvi-navbar-center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    height: 100%;
}

.mvi-navbar-title {
    display: block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}

.mvi-navbar-right {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding-right: @mp-sm;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mvi-navbar-right-icon {
    margin-left: @mp-xs;
}

.mvi-navbar-right-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<template>
    <div :class="cellClass">
        <div class="mvi-cell-item">
            <m-icon class="mvi-cell-icon" v-if="iconType||iconUrl" :type="iconType" :url="iconUrl" :spin="iconSpin" :size="iconSize" :color="iconColor" />
            <div :class="['mvi-cell-title',noWrap?'mvi-cell-nowrap':'']">
                <slot name="title" v-if="$slots.title"></slot>
                <span v-else v-text="title" :class="titleClass || ''"></span>
            </div>
            <div :class="['mvi-cell-content',noWrap?'mvi-cell-nowrap':'']" v-if="$slots.content || content">
                <slot name="content" v-if="$slots.content"></slot>
                <span v-else-if="content" v-text="content" :class="contentClass || ''"></span>
            </div>
            <m-icon class="mvi-cell-arrow" v-if="arrowType||arrowUrl" :type="arrowType" :url="arrowUrl" :spin="arrowSpin" :size="arrowSize" :color="arrowColor" />
        </div>
        <div :class="['mvi-cell-label',labelClass || '']" v-if="label || $slots.label" :style="labelTextStyle">
            <slot name="label" v-if="$slots.label"></slot>
            <span v-text="label" v-else-if="label"></span>
        </div>
    </div>
</template>

<script>
import $dap from 'dap-util'
import mIcon from '../icon/icon'
export default {
    name: 'm-cell',
    props: {
        //左侧图标
        icon: {
            type: [String, Object],
            default: null
        },
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
        //描述文本
        label: {
            type: String,
            default: null
        },
        //是否显示下边框
        border: {
            type: Boolean,
            default: null
        },
        //右侧图标
        arrow: {
            type: [String, Object],
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
        //描述文本class
        labelClass: {
            type: String,
            default: null
        },
        //是否显示点击态
        active: {
            type: Boolean,
            default: null
        },
        //是否对描述文本内容进行行数限制
        ellipsis: {
            type: [Boolean, Number],
            default: null
        },
        //标题和内容超出一行是否省略
        noWrap: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconType() {
            let type = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.type == 'string') {
                    type = this.icon.type
                }
            } else if (typeof this.icon == 'string') {
                type = this.icon
            }
            return type
        },
        iconUrl() {
            let url = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.url == 'string') {
                    url = this.icon.url
                }
            }
            return url
        },
        iconSpin() {
            let spin = false
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.spin == 'boolean') {
                    spin = this.icon.spin
                }
            }
            return spin
        },
        iconSize() {
            let size = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.size == 'string') {
                    size = this.icon.size
                }
            }
            return size
        },
        iconColor() {
            let color = null
            if ($dap.common.isObject(this.icon)) {
                if (typeof this.icon.color == 'string') {
                    color = this.icon.color
                }
            }
            return color
        },
        arrowType() {
            let type = null
            if ($dap.common.isObject(this.arrow)) {
                if (typeof this.arrow.type == 'string') {
                    type = this.arrow.type
                }
            } else if (typeof this.arrow == 'string') {
                type = this.arrow
            }
            return type
        },
        arrowUrl() {
            let url = null
            if ($dap.common.isObject(this.arrow)) {
                if (typeof this.arrow.url == 'string') {
                    url = this.arrow.url
                }
            }
            return url
        },
        arrowSpin() {
            let spin = false
            if ($dap.common.isObject(this.arrow)) {
                if (typeof this.arrow.spin == 'boolean') {
                    spin = this.arrow.spin
                }
            }
            return spin
        },
        arrowSize() {
            let size = null
            if ($dap.common.isObject(this.arrow)) {
                if (typeof this.arrow.size == 'string') {
                    size = this.arrow.size
                }
            }
            return size
        },
        arrowColor() {
            let color = null
            if ($dap.common.isObject(this.arrow)) {
                if (typeof this.arrow.color == 'string') {
                    color = this.arrow.color
                }
            }
            return color
        },
        computedActive() {
            if (typeof this.active == 'boolean') {
                return this.active
            } else if (typeof this.$parent.active == 'boolean') {
                return this.$parent.active
            } else {
                return true
            }
        },
        computedBorder() {
            if (typeof this.border == 'boolean') {
                return this.border
            } else if (typeof this.$parent.border == 'boolean') {
                return this.$parent.border
            } else {
                return false
            }
        },
        labelTextStyle() {
            let style = {}
            //如果ellipsis不是false
            if (this.ellipsis) {
                style.display = '-webkit-box'
                style.textOverflow = 'ellipsis'
                style.webkitBoxOrient = 'vertical'
                style.overflow = 'hidden'
                if (typeof this.ellipsis == 'boolean') {
                    style.webkitLineClamp = 3
                } else {
                    style.webkitLineClamp = this.ellipsis
                }
            }
            return style
        },
        cellClass() {
            let cls = ['mvi-cell']
            if (this.computedBorder) {
                cls.push('mvi-cell-border')
            }
            if (this.computedActive) {
                cls.push('mvi-cell-active')
            }
            return cls
        }
    },
    components: {
        mIcon
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-cell {
    display: block;
    width: 100%;
    background-color: #fff;
    color: @font-color-default;
    padding: @mp-sm;
    position: relative;
}

.mvi-cell-active:active::before {
    .mvi-active();
}

.mvi-cell.mvi-cell-border::after {
    display: block;
    position: absolute;
    left: @mp-sm;
    bottom: 0;
    content: '';
    height: 0;
    border-bottom: 1px solid @border-color;
    width: calc(100% - @mp-sm);
    box-sizing: content-box;
}

.mvi-cell-item {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0;
    position: relative;
    overflow: hidden;
}

.mvi-cell-icon {
    margin-right: @mp-xs;
}

.mvi-cell-title {
    display: block;
    width: 100%;
    font-size: @font-size-default;
    word-wrap: break-word;
}

.mvi-cell-content {
    display: block;
    position: relative;
    width: 100%;
    text-align: right;
    overflow: hidden;
    word-wrap: break-word;
    color: @font-color-sub;
}

.mvi-cell-title + .mvi-cell-content {
    margin-left: @mp-sm;
}

.mvi-cell-nowrap {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.mvi-cell-arrow {
    margin-left: @mp-xs;
    color: @font-color-sub;
}

.mvi-cell-label {
    width: 100%;
    margin-top: @mp-xs;
    font-size: @font-size-small;
    color: @font-color-mute;
    word-wrap: break-word;
}
</style>

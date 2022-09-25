<template>
    <transition v-if="closable" name="mvi-label">
        <div v-if="show" :class="labelClass" :style="labelStyle">
            <slot></slot>
            <span class="mvi-label-closable" @click="closeLabel">
                <m-icon type="times" />
            </span>
        </div>
    </transition>
    <div v-else :class="labelClass" :style="labelStyle">
        <slot></slot>
    </div>
</template>

<script>
import mIcon from '../icon/icon.vue'
export default {
    name: 'm-label',
    data() {
        return {
            show: true
        }
    },
    props: {
        //标签样式
        type: {
            type: String,
            default: 'default',
            validator(value) {
                return [
                    'default',
                    'error',
                    'info',
                    'primary',
                    'success',
                    'warn'
                ].includes(value)
            }
        },
        //标签大小
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['medium', 'large'].includes(value)
            }
        },
        //自定义颜色
        color: {
            type: String,
            default: null
        },
        //是否为朴素样式
        plain: {
            type: Boolean,
            default: false
        },
        //是否为圆角样式
        round: {
            type: Boolean,
            default: false
        },
        //是否为标记样式
        mark: {
            type: Boolean,
            default: false
        },
        //文本颜色
        subColor: {
            type: String,
            default: null
        },
        //是否可关闭
        closable: {
            type: Boolean,
            default: false
        },
        //标记样式时是否反向
        reverse: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        labelClass() {
            let cls = ['mvi-label']
            if (this.size) {
                cls.push('mvi-label-' + this.size)
            }
            if (this.type) {
                cls.push('mvi-label-' + this.type)
            }
            if (this.plain) {
                cls.push('mvi-label-plain')
            }
            if (this.round) {
                cls.push('mvi-label-round')
            }
            if (this.mark) {
                cls.push('mvi-label-mark')
                if (this.reverse) {
                    cls.push('mvi-label-reverse')
                }
            }
            return cls
        },
        labelStyle() {
            let style = {}
            if (this.color) {
                if (this.plain) {
                    style.borderColor = this.color
                    style.color = this.color
                    style.backgroundColor = this.subColor || '#fff'
                } else {
                    style.backgroundColor = this.color
                    style.borderColor = this.color
                    style.color = this.subColor || '#fff'
                }
            }
            return style
        }
    },
    components: {
        mIcon
    },
    methods: {
        closeLabel() {
            this.show = false
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-label {
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: @radius-default;
    border: 1px solid transparent;
    margin: 0;
}

.mvi-label-medium {
    padding: @mp-xs;
    font-size: @font-size-small;
    line-height: 1;
}

.mvi-label-large {
    padding: @mp-sm;
    font-size: @font-size-default;
    line-height: 1;
}

.mvi-label-default {
    background-color: @light-default;
    border-color: @light-default;
    color: @font-color-sub;
}

.mvi-label-success {
    background-color: @success-normal;
    border-color: @success-normal;
    color: #fff;
}

.mvi-label-warn {
    background-color: @warn-normal;
    border-color: @warn-normal;
    color: #fff;
}

.mvi-label-error {
    background-color: @error-normal;
    border-color: @error-normal;
    color: #fff;
}

.mvi-label-info {
    background-color: @info-normal;
    border-color: @info-normal;
    color: #fff;
}

.mvi-label-primary {
    background-color: @primary-normal;
    border-color: @primary-normal;
    color: #fff;
}

.mvi-label-round {
    border-radius: @radius-round;
}

.mvi-label-mark {
    border-radius: 0 @radius-round @radius-round 0;
}

.mvi-label-mark.mvi-label-reverse {
    border-radius: @radius-round 0 0 @radius-round;
}

.mvi-label-plain {
    background-color: #fff;
}

.mvi-label-default.mvi-label-plain {
    border-color: @border-color;
    color: @font-color-sub;
}

.mvi-label-success.mvi-label-plain {
    border-color: @success-normal;
    color: @success-normal;
}

.mvi-label-warn.mvi-label-plain {
    border-color: @warn-normal;
    color: @warn-normal;
}

.mvi-label-error.mvi-label-plain {
    border-color: @error-normal;
    color: @error-normal;
}

.mvi-label-info.mvi-label-plain {
    border-color: @info-normal;
    color: @info-normal;
}

.mvi-label-primary.mvi-label-plain {
    border-color: @primary-normal;
    color: @primary-normal;
}

.mvi-label-closable {
    display: inline-block;
    margin-left: @mp-sm;
    font-size: 0.8em;
    cursor: pointer;
}

.mvi-label-enter-active,
.mvi-label-leave-active {
    transition: opacity 300ms;
    -webkit-transition: opacity 300ms;
}

.mvi-label-enter-from,
.mvi-label-leave-to {
    opacity: 0;
}
</style>

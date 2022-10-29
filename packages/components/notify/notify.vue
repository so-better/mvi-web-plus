<template>
    <teleport to="body">
        <transition name="mvi-notify" @after-leave="afterLeave" @after-enter="afterEnter">
            <div v-show="show" :class="['mvi-notify','mvi-notify-'+computedType]" :style="notifyStyle">
                <div class="mvi-notify-content">
                    <Icon v-if="iconType || iconUrl" :type="iconType" :url="iconUrl" :spin="iconSpin" :size="iconSize" :color="iconColor" />
                    <span v-text="computedMessage"></span>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
    name: 'm-notify',
    data() {
        return {
            //计时器
            timer: null,
            //是否显示
            show: false
        }
    },
    props: {
        //提示类型
        type: {
            type: String,
            default: null
        },
        //展示文字
        message: {
            type: String,
            default: null
        },
        //字体颜色
        color: {
            type: String,
            default: null
        },
        //背景色
        background: {
            type: String,
            default: null
        },
        //层级
        zIndex: {
            type: Number,
            default: null
        },
        //自动关闭间隔
        timeout: {
            type: Number,
            default: null
        },
        //图标
        icon: {
            type: [String, Object],
            default: null
        },
        //移除方法
        remove: {
            type: Function,
            default: function () {
                return function () {}
            }
        },
        //初始化方法
        init: {
            type: Function,
            default: function () {
                return function () {}
            }
        }
    },
    computed: {
        //类型
        computedType() {
            let arr = ['success', 'info', 'primary', 'error', 'warn']
            if (arr.includes(this.type)) {
                return this.type
            } else {
                return 'success'
            }
        },
        //消息文本
        computedMessage() {
            if (typeof this.message == 'string') {
                return this.message
            } else if (Dap.common.isObject(this.message)) {
                return JSON.stringify(this.message)
            } else {
                return String(this.message)
            }
        },
        //自定义文字颜色
        computedColor() {
            if (typeof this.color == 'string') {
                return this.color
            } else {
                return null
            }
        },
        //自定义背景色
        computedBackground() {
            if (typeof this.background == 'string') {
                return this.background
            } else {
                return null
            }
        },
        //自定义zIndex
        computedZIndex() {
            if (Dap.number.isNumber(this.zIndex)) {
                return this.zIndex
            } else {
                return 1100
            }
        },
        //自动关闭时间
        computedTimeout() {
            if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
                return this.timeout
            } else {
                return 1500
            }
        },
        //图标类型
        iconType() {
            let type = null
            if (Dap.common.isObject(this.icon)) {
                if (typeof this.icon.type == 'string') {
                    type = this.icon.type
                }
            } else if (typeof this.icon == 'string') {
                type = this.icon
            }
            return type
        },
        //图标url
        iconUrl() {
            let url = null
            if (Dap.common.isObject(this.icon)) {
                if (typeof this.icon.url == 'string') {
                    url = this.icon.url
                }
            }
            return url
        },
        //图标是否旋转
        iconSpin() {
            let spin = false
            if (Dap.common.isObject(this.icon)) {
                if (typeof this.icon.spin == 'boolean') {
                    spin = this.icon.spin
                }
            }
            return spin
        },
        //图标大小
        iconSize() {
            let size = null
            if (Dap.common.isObject(this.icon)) {
                if (typeof this.icon.size == 'string') {
                    size = this.icon.size
                }
            }
            return size
        },
        //图标颜色
        iconColor() {
            let color = null
            if (Dap.common.isObject(this.icon)) {
                if (typeof this.icon.color == 'string') {
                    color = this.icon.color
                }
            }
            return color
        },
        //通知样式
        notifyStyle() {
            let style = {}
            style.zIndex = this.computedZIndex
            if (this.computedBackground) {
                style.backgroundColor = this.computedBackground
            }
            if (this.computedColor) {
                style.color = this.computedColor
            }
            return style
        }
    },
    components: {
        Icon
    },
    mounted() {
        this.show = true
        this.init(this)
    },
    methods: {
        //完全显示后
        afterEnter(el) {
            if (this.computedTimeout > 0) {
                this.timer = setTimeout(() => {
                    this.show = false
                }, this.computedTimeout)
            }
        },
        //完全隐藏后
        afterLeave(el) {
            this.clearTimer()
            this.remove()
        },
        //清除计时器
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-notify {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: @small-height;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0 @mp-sm;
}

.mvi-notify-success {
    background-color: @success-normal;
    color: #fff;
}

.mvi-notify-info {
    background-color: @info-normal;
    color: #fff;
}

.mvi-notify-primary {
    background-color: @primary-normal;
    color: #fff;
}

.mvi-notify-error {
    background-color: @error-normal;
    color: #fff;
}

.mvi-notify-warn {
    background-color: @warn-normal;
    color: #fff;
}

.mvi-notify-content {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & > .mvi-icon {
        margin-right: @mp-sm;
    }

    & > span {
        vertical-align: middle;
    }
}

.mvi-notify-enter-active,
.mvi-notify-leave-active {
    transition: all 300ms;
    -webkit-transition: all 300ms;
    -moz-transition: all 300ms;
    -ms-transition: all 300ms;
}

.mvi-notify-enter-from,
.mvi-notify-leave-to {
    opacity: 0;
    transform: translateY(-100%);
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
}
</style>

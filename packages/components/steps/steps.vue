<template>
    <div :class="['mvi-steps',vertical?'mvi-steps-vertical':'']">
        <slot></slot>
    </div>
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-steps',
    data() {
        return {
            //存放step组件的数组
            children: []
        }
    },
    props: {
        //当前步骤
        active: {
            type: Number,
            default: 0
        },
        //是否垂直
        vertical: {
            type: Boolean,
            default: false
        },
        //激活状态的颜色
        activeColor: {
            type: String,
            default: null
        },
        //未激活状态的颜色
        inactiveColor: {
            type: String,
            default: null
        },
        //激活状态的图标
        activeIcon: {
            type: [String, Object],
            default: null
        },
        //未激活状态的图标
        inactiveIcon: {
            type: [String, Object],
            default: null
        }
    },
    provide() {
        return {
            steps: this
        }
    },
    computed: {
        activeIconType() {
            let type = 'success-o'
            if ($dap.common.isObject(this.activeIcon)) {
                if (typeof this.activeIcon.type == 'string') {
                    type = this.activeIcon.type
                }
            } else if (typeof this.activeIcon == 'string') {
                type = this.activeIcon
            }
            return type
        },
        activeIconUrl() {
            let url = null
            if ($dap.common.isObject(this.activeIcon)) {
                if (typeof this.activeIcon.url == 'string') {
                    url = this.activeIcon.url
                }
            }
            return url
        },
        activeIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.activeIcon)) {
                if (typeof this.activeIcon.spin == 'boolean') {
                    spin = this.activeIcon.spin
                }
            }
            return spin
        },
        activeIconSize() {
            let size = null
            if ($dap.common.isObject(this.activeIcon)) {
                if (typeof this.activeIcon.size == 'string') {
                    size = this.activeIcon.size
                }
            }
            return size
        },
        activeIconColor() {
            let color = null
            if ($dap.common.isObject(this.activeIcon)) {
                if (typeof this.activeIcon.color == 'string') {
                    color = this.activeIcon.color
                }
            }
            return color
        },
        inactiveIconType() {
            let type = null
            if ($dap.common.isObject(this.inactiveIcon)) {
                if (typeof this.inactiveIcon.type == 'string') {
                    type = this.inactiveIcon.type
                }
            } else if (typeof this.inactiveIcon == 'string') {
                type = this.inactiveIcon
            }
            return type
        },
        inactiveIconUrl() {
            let url = null
            if ($dap.common.isObject(this.inactiveIcon)) {
                if (typeof this.inactiveIcon.url == 'string') {
                    url = this.inactiveIcon.url
                }
            }
            return url
        },
        inactiveIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.inactiveIcon)) {
                if (typeof this.inactiveIcon.spin == 'boolean') {
                    spin = this.inactiveIcon.spin
                }
            }
            return spin
        },
        inactiveIconSize() {
            let size = null
            if ($dap.common.isObject(this.inactiveIcon)) {
                if (typeof this.inactiveIcon.size == 'string') {
                    size = this.inactiveIcon.size
                }
            }
            return size
        },
        inactiveIconColor() {
            let color = null
            if ($dap.common.isObject(this.inactiveIcon)) {
                if (typeof this.inactiveIcon.color == 'string') {
                    color = this.inactiveIcon.color
                }
            }
            return color
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-steps {
    display: flex;
    display: -webkit-flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: @mp-sm;
    background-color: #fff;
}

.mvi-steps.mvi-steps-vertical {
    flex-direction: column;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
}
</style>

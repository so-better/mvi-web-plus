<template>
    <label :class="['mvi-switch',modelValue?'mvi-switch-checked':'']" :style="switchStyle" :disabled="disabled || null">
        <span :class="['mvi-switch-el',modelValue?'mvi-switch-el-checked':'']" :style="elStyle">
            <m-icon v-if="loading && !disabled" :type="iconType" :spin="iconSpin" :url="iconUrl" :size="iconSize" :color="iconColor" />
        </span>
        <input @change="change" type="checkbox" :checked="modelValue" :disabled="disabled || loading || null" />
    </label>
</template>

<script>
import $dap from 'dap-util'
import mIcon from '../icon/icon.vue'
export default {
    name: 'm-switch',
    emits: ['update:modelValue', 'change'],
    props: {
        //是否勾选
        modelValue: {
            type: Boolean,
            default: false
        },
        //是否显示加载状态
        loading: {
            type: Boolean,
            default: false
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //尺寸大小
        size: {
            type: String,
            default: '0.4rem'
        },
        //开关打开时背景色
        activeColor: {
            type: String,
            default: null
        },
        //开关关闭时背景色
        inactiveColor: {
            type: String,
            default: null
        },
        //加载状态图标
        icon: {
            type: [String, Object],
            default: null
        }
    },
    components: {
        mIcon
    },
    methods: {
        //更改状态
        change(event) {
            let check = event.target.checked
            this.$emit('update:modelValue', check)
            this.$emit('change', check)
        }
    },
    computed: {
        iconType() {
            let type = 'load-e'
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
            let spin = true
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
        switchStyle() {
            let style = {}
            if (this.inactiveColor && !this.modelValue) {
                style.backgroundColor = this.inactiveColor
            }
            if (this.activeColor && this.modelValue) {
                style.backgroundColor = this.activeColor
            }
            if (this.size) {
                style.width = `calc(${this.size} * 2)`
            }
            return style
        },
        elStyle() {
            let style = {}
            if (this.activeColor) {
                style.color = this.activeColor
            }
            if (this.size) {
                style.width = this.size
                style.height = this.size
                style.fontSize = this.size
            }
            return style
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-switch {
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    background-color: #fff;
    border-radius: @radius-round;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: background-color 300ms;
    -webkit-transition: background-color 300ms;
    cursor: pointer;

    & > input[type='checkbox'] {
        display: none;
        width: 0;
        height: 0;
        opacity: 0;
    }

    & > input[type='checkbox'][disabled] {
        pointer-events: none;
    }
}

.mvi-switch[disabled] {
    opacity: 0.6;
}

.mvi-switch.mvi-switch-checked {
    background-color: @info-normal;
}

.mvi-switch-el {
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: center;
    align-items: center;
    font-size: @font-size-h6;
    color: @info-normal;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: @radius-circle;
    box-shadow: @boxshadow;
    background-color: #fff;
    margin: 0;
    padding: 0;
    transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    -webkit-transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
}

.mvi-switch-el.mvi-switch-el-checked {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
}
</style>

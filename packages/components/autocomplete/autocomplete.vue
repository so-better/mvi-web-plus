<template>
    <div :data-id="'mvi-autocomplete-'+uid" :class="autocompleteClass" :disabled="disabled || null">
        <div :class="targetClass" :style="targetStyle" :data-id="'mvi-autocomplete-target-'+uid" ref="target">
            <div @click="leftClick" v-if="leftIconType || leftIconUrl" class="mvi-autocomplete-left-icon">
                <m-icon :type="leftIconType" :url="leftIconUrl" :spin="leftIconSpin" :size="leftIconSize" :color="leftIconColor" />
            </div>
            <input ref="input" @input="input" v-model="realValue" type="text" :placeholder="placeholder" :style="inputStyle" :name="name" @focus="inputFocus" @blur="inputBlur" :disabled="disabled || null" autocomplete="off" />
            <div @click="doClear" v-if="clearable" v-show="showClearIcon" class="mvi-autocomplete-clear" :style="clearStyle">
                <m-icon type="times-o" />
            </div>
            <div class="mvi-autocomplete-right-icon" v-if="rightIconType || rightIconUrl" @click="rightClick">
                <m-icon :type="rightIconType" :url="rightIconUrl" :spin="rightIconSpin" :size="rightIconSize" :color="rightIconColor" />
            </div>
        </div>
        <m-layer :model-value="show" :target="`[data-id='mvi-autocomplete-target-${uid}']`" :root="`[data-id='mvi-autocomplete-${uid}']`" :placement="layerRealProps.placement" :offset="layerRealProps.offset" :fixed="layerRealProps.fixed" :z-index="layerRealProps.zIndex" :fixed-auto="layerRealProps.fixedAuto" ref="layer" :wrapper-class="layerRealProps.wrapperClass" :animation="layerRealProps.animation" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :timeout="layerRealProps.timeout" :closable="false" :show-triangle="layerRealProps.showTriangle" :border-color="layerRealProps.borderColor" :background="layerRealProps.background" @showing="layerShow">
            <div class="mvi-autocomplete-menu" :style="menuStyle" ref="menu">
                <div class="mvi-autocomplete-list" v-for="(item,index) in computedFilter" v-text="item" @click="doSelect(item)" @mouseenter="listEnter" @mouseleave="listLeave" :key="'mvi-autocomplete-list-'+index"></div>
            </div>
        </m-layer>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import $dap from 'dap-util'
import mIcon from '../icon/icon'
import mLayer from '../layer/layer'
export default {
    name: 'm-autocomplete',
    data() {
        return {
            focus: false
        }
    },
    emits: [
        'update:modelValue',
        'focus',
        'blur',
        'input',
        'left-click',
        'right-click',
        'select',
        'clear'
    ],
    props: {
        //输入框的值
        modelValue: {
            type: [String, Number],
            default: ''
        },
        //占位符
        placeholder: {
            type: String,
            default: ''
        },
        //组件大小
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['small', 'medium', 'large'].includes(value)
            }
        },
        //可选值数组
        list: {
            type: Array,
            default: function () {
                return []
            }
        },
        //激活样式
        activeType: {
            type: String,
            default: 'info',
            validator(value) {
                return ['info', 'success', 'warn', 'error', 'primary'].includes(
                    value
                )
            }
        },
        //激活颜色
        activeColor: {
            type: String,
            default: null,
            validator(value) {
                return $dap.common.matchingText(value, 'hex')
            }
        },
        //过滤方法
        filterMethod: {
            type: [Function, Boolean],
            default: false
        },
        //是否启用清除图标
        clearable: {
            type: Boolean,
            default: false
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //layer组件参数
        layerProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //提示框最大高度
        height: {
            type: String,
            default: null
        },
        //原生name
        name: {
            type: String,
            default: null
        },
        //layer层列表悬浮样式
        hoverClass: {
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
        //是否圆角
        round: {
            type: Boolean,
            default: false
        },
        //是否方形
        square: {
            type: Boolean,
            default: false
        },
        //对齐方式
        align: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right', 'center'].includes(value)
            }
        }
    },
    components: {
        mIcon,
        mLayer
    },
    setup() {
        const instance = getCurrentInstance()
        return {
            uid: instance.uid
        }
    },
    computed: {
        show() {
            return this.focus && this.computedFilter.length != 0
        },
        leftIconType() {
            let type = null
            if ($dap.common.isObject(this.leftIcon)) {
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
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.url == 'string') {
                    url = this.leftIcon.url
                }
            }
            return url
        },
        leftIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.spin == 'boolean') {
                    spin = this.leftIcon.spin
                }
            }
            return spin
        },
        leftIconSize() {
            let size = null
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.size == 'string') {
                    size = this.leftIcon.size
                }
            }
            return size
        },
        leftIconColor() {
            let color = null
            if ($dap.common.isObject(this.leftIcon)) {
                if (typeof this.leftIcon.color == 'string') {
                    color = this.leftIcon.color
                }
            }
            return color
        },
        rightIconType() {
            let type = null
            if ($dap.common.isObject(this.rightIcon)) {
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
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.url == 'string') {
                    url = this.rightIcon.url
                }
            }
            return url
        },
        rightIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.spin == 'boolean') {
                    spin = this.rightIcon.spin
                }
            }
            return spin
        },
        rightIconSize() {
            let size = null
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.size == 'string') {
                    size = this.rightIcon.size
                }
            }
            return size
        },
        rightIconColor() {
            let color = null
            if ($dap.common.isObject(this.rightIcon)) {
                if (typeof this.rightIcon.color == 'string') {
                    color = this.rightIcon.color
                }
            }
            return color
        },
        showClearIcon() {
            if (this.disabled) {
                return false
            }
            if (this.realValue && this.focus) {
                return true
            } else {
                return false
            }
        },
        clearStyle() {
            let style = {}
            if (this.rightIconType || this.rightIconUrl) {
                style.borderRadius = 0
            }
            return style
        },
        menuStyle() {
            let style = {}
            if (this.height) {
                style.maxHeight = this.height
            }
            return style
        },
        computedFilter() {
            if (typeof this.filterMethod == 'function') {
                return this.filterMethod(this.realValue, this.list)
            } else if (this.filterMethod) {
                return this.defaultFilter()
            } else {
                return this.list
            }
        },
        inputStyle() {
            let style = {}
            if (this.leftIconType || this.leftIconUrl) {
                style.paddingLeft = 0
            }
            if (this.showClearIcon && this.clearable) {
                style.paddingRight = 0
            } else if (this.rightIconType || this.rightIconUrl) {
                style.paddingRight = 0
            }
            if (this.align) {
                style.textAlign = this.align
            }
            return style
        },
        autocompleteClass() {
            let cls = ['mvi-autocomplete', 'mvi-autocomplete-' + this.size]
            if (this.round) {
                cls.push('mvi-autocomplete-round')
            } else if (this.square) {
                cls.push('mvi-autocomplete-square')
            }
            return cls
        },
        targetStyle() {
            let style = {}
            if (this.activeColor && this.focus) {
                style.borderColor = this.activeColor
                const rgb = $dap.color.hex2rgb(this.activeColor)
                style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
            }
            return style
        },
        targetClass() {
            let cls = ['mvi-autocomplete-target']
            if (this.activeType && !this.activeColor && this.focus) {
                cls.push('mvi-autocomplete-' + this.activeType)
            }
            return cls
        },
        realValue: {
            set(value) {
                if (this.modelValue !== value) {
                    this.$emit('update:modelValue', value)
                }
            },
            get() {
                return this.modelValue
            }
        },
        layerRealProps() {
            return {
                placement: this.layerProps.placement
                    ? this.layerProps.placement
                    : 'bottom-start',
                fixed:
                    typeof this.layerProps.fixed == 'boolean'
                        ? this.layerProps.fixed
                        : false,
                fixedAuto:
                    typeof this.layerProps.fixedAuto == 'boolean'
                        ? this.layerProps.fixedAuto
                        : false,
                width: this.layerProps.width,
                zIndex: $dap.number.isNumber(this.layerProps.zIndex)
                    ? this.layerProps.zIndex
                    : 400,
                offset: this.layerProps.offset
                    ? this.layerProps.offset
                    : '0.1rem',
                wrapperClass: this.layerProps.wrapperClass,
                animation: this.layerProps.animation,
                timeout: $dap.number.isNumber(this.layerProps.timeout)
                    ? this.layerProps.timeout
                    : 200,
                showTriangle:
                    typeof this.layerProps.showTriangle == 'boolean'
                        ? this.layerProps.showTriangle
                        : false,
                shadow:
                    typeof this.layerProps.shadow == 'boolean'
                        ? this.layerProps.shadow
                        : true,
                border:
                    typeof this.layerProps.border == 'boolean'
                        ? this.layerProps.border
                        : false,
                borderColor: this.layerProps.borderColor,
                background: this.layerProps.background
            }
        }
    },
    methods: {
        //悬浮层显示前进行宽度设置
        layerShow() {
            if (this.layerRealProps.width) {
                this.$refs.menu.style.width = this.layerRealProps.width
            } else {
                this.$refs.menu.style.width =
                    this.$refs.target.offsetWidth + 'px'
            }
        },
        rightClick(e) {
            if (this.disabled) {
                return
            }
            this.$emit('right-click', this.realValue)
        },
        leftClick(e) {
            if (this.disabled) {
                return
            }
            this.$emit('left-click', this.realValue)
        },
        listEnter(e) {
            if (this.hoverClass) {
                $dap.element.addClass(e.currentTarget, this.hoverClass)
            }
        },
        listLeave(e) {
            if (this.hoverClass) {
                $dap.element.removeClass(e.currentTarget, this.hoverClass)
            }
        },
        input() {
            if (this.disabled) {
                return
            }
            this.focus = true
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$refs.layer.reset()
                }, 10)
            })
            this.$emit('input', this.realValue)
        },
        inputBlur() {
            if (this.disabled) {
                return
            }
            this.$emit('blur', this.realValue)
            setTimeout(() => {
                this.focus = false
            }, 200)
        },
        inputFocus() {
            if (this.disabled) {
                return
            }
            this.$emit('focus', this.realValue)
            setTimeout(() => {
                this.focus = true
            }, 200)
        },
        doClear() {
            if (this.disabled) {
                return
            }
            if (!this.clearable) {
                return
            }
            setTimeout(() => {
                this.realValue = ''
                this.$emit('clear', '')
                this.$refs.input.focus()
            }, 200)
        },
        doSelect(item) {
            if (this.disabled) {
                return
            }
            this.realValue = item
            this.$emit('select', item)
            this.focus = false
        },
        //默认过滤方法
        defaultFilter() {
            let arr = []
            let length = this.list.length
            for (let i = 0; i < length; i++) {
                if (this.list[i].includes(this.realValue)) {
                    arr.push(this.list[i])
                }
            }
            return arr
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-autocomplete {
    display: block;
    width: 100%;
    border-radius: @radius-default;
    color: @font-color-default;
    position: relative;
    background-color: #fff;

    &.mvi-autocomplete-round {
        border-radius: @radius-round;
    }

    &.mvi-autocomplete-square {
        border-radius: 0;
    }

    &.mvi-autocomplete-small {
        font-size: @font-size-small;
        height: @small-height;

        .mvi-autocomplete-left-icon,
        .mvi-autocomplete-right-icon,
        .mvi-autocomplete-clear {
            padding: 0 @mp-xs*2.4;
        }

        input {
            padding: 0 @mp-sm;
        }

        .mvi-autocomplete-list {
            padding: @mp-sm;
        }
    }

    &.mvi-autocomplete-medium {
        font-size: @font-size-default;
        height: @medium-height;

        .mvi-autocomplete-left-icon,
        .mvi-autocomplete-right-icon,
        .mvi-autocomplete-clear {
            padding: 0 @mp-md;
        }

        input {
            padding: 0 @mp-md;
        }

        .mvi-autocomplete-list {
            padding: @mp-md;
        }
    }

    &.mvi-autocomplete-large {
        font-size: @font-size-h6;
        height: @large-height;

        .mvi-autocomplete-left-icon,
        .mvi-autocomplete-right-icon,
        .mvi-autocomplete-clear {
            padding: 0 @mp-xs*3.4;
        }

        input {
            padding: 0 @mp-lg;
        }

        .mvi-autocomplete-list {
            padding: @mp-lg;
        }
    }

    &[disabled] {
        opacity: 0.6;
    }
}

.mvi-autocomplete-target {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: 1px solid @border-color;
    transition: border-color 600ms, box-shadow 600ms;
    -webkit-transition: border-color 600ms, box-shadow 600ms;
    box-shadow: none;

    input {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        display: block;
        width: 100%;
        height: 100%;
        flex: 1;
        margin: 0;
        padding: 0;
        border: none;
        border-radius: inherit;
        background-color: inherit;
        color: inherit;
        font-size: inherit;

        &::-webkit-input-placeholder,
        &::placeholder,
        &::-moz-placeholder,
        &:-ms-input-placeholder {
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            opacity: 0.5;
            vertical-align: middle;
        }

        &[disabled] {
            background-color: inherit;
            color: inherit;
        }
    }

    //左侧图标、右侧图标、清除图标
    .mvi-autocomplete-left-icon,
    .mvi-autocomplete-right-icon,
    .mvi-autocomplete-clear {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        border-radius: 0;

        &:hover {
            cursor: pointer;
        }
    }

    .mvi-autocomplete-clear {
        opacity: 0.6;
    }

    .mvi-autocomplete-left-icon {
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }

    .mvi-autocomplete-right-icon,
    .mvi-autocomplete-clear {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    &.mvi-autocomplete-info {
        border-color: @info-normal;
        box-shadow: 0 0 0.16rem @info-shadow;
    }

    &.mvi-autocomplete-success {
        border-color: @success-normal;
        box-shadow: 0 0 0.16rem @success-shadow;
    }

    &.mvi-autocomplete-primary {
        border-color: @primary-normal;
        box-shadow: 0 0 0.16rem @primary-shadow;
    }

    &.mvi-autocomplete-warn {
        border-color: @warn-normal;
        box-shadow: 0 0 0.16rem @warn-shadow;
    }

    &.mvi-autocomplete-error {
        border-color: @error-normal;
        box-shadow: 0 0 0.16rem @error-shadow;
    }
}

//悬浮层
.mvi-autocomplete-menu {
    display: block;
    padding: @mp-xs 0;
    overflow: auto;
    overflow-x: hidden;

    .mvi-autocomplete-list {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mvi-autocomplete-list:hover {
        cursor: pointer;
        background-color: @bg-color-default;
    }
}
</style>

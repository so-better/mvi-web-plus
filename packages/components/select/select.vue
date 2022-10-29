<template>
    <div :data-id="'mvi-select-' + uid" :class="selectClass" :disabled="disabled || null">
        <div @mouseenter="hoverIn" @mouseleave="hoverOut" :data-id="'mvi-select-target-' + uid" :class="targetClass" :style="targetStyle" ref="target" @click="trigger" :disabled="disabled || null">
            <span :class="['mvi-select-label',selectLabel ? '' : 'mvi-select-label-placeholder']" :data-placeholder="placeholder" v-html="selectLabel"></span>
            <!-- 清除图标 -->
            <Icon @click="doClear" class="mvi-clear-icon" type="times-o" v-if="clearable" v-show="showClearIcon" />
            <!-- 下拉图标 -->
            <Icon v-show="!clearable || !showClearIcon" :class="iconClass" :type="icon" />
        </div>
        <Layer v-model="focus" :target="`[data-id='mvi-select-target-${uid}']`" :root="`[data-id='mvi-select-${uid}']`" :placement="layerRealProps.placement" :offset="layerRealProps.offset" :fixed="layerRealProps.fixed" :fixed-auto="layerRealProps.fixedAuto" :z-index="layerRealProps.zIndex" closable :show-triangle="layerRealProps.showTriangle" :wrapper-class="layerRealProps.wrapperClass" :animation="layerRealProps.animation" :timeout="layerRealProps.timeout" :shadow="layerRealProps.shadow" :border="layerRealProps.border" :border-color="layerRealProps.borderColor" :background="layerRealProps.background" @showing="layerShow" ref="layer">
            <div class="mvi-select-menu" ref="menu" :style="menuStyle">
                <div :class="['mvi-option','mvi-option-' + size]" @click="optionClick(item)" @mouseenter="mouseEnter($event, item)" @mouseleave="mouseLeave($event, item)" v-for="(item, index) in options" :key="'mvi-select-option-' + index" :disabled="item.disabled || null">
                    <div class="mvi-option-value" v-html="item.label"></div>
                    <Icon v-if="isSelect(item)" :type="selectedIconType" :spin="selectedIconSpin" :size="selectedIconSize" :url="selectedIconUrl" :color="selectedIconColor" />
                </div>
            </div>
        </Layer>
        <input type="hidden" :value="formData" :name="name" />
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
import { Layer } from '../layer'
export default {
    name: 'm-select',
    emits: ['update:modelValue', 'change', 'clear'],
    data() {
        return {
            hover: false,
            //是否点击达到了获取焦点效果
            focus: false,
            target: null
        }
    },
    props: {
        //选项
        options: {
            type: Array,
            default: []
        },
        //选择的值
        modelValue: {
            type: [Object, Number, String, Array],
            default: null
        },
        //占位符
        placeholder: {
            type: String,
            default: ''
        },
        //尺寸
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['small', 'medium', 'large'].includes(value)
            }
        },
        //layer组件参数
        layerProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //下拉框最大高度
        height: {
            type: String,
            default: null
        },
        //输入框激活样式
        activeType: {
            type: String,
            default: 'info',
            validator(value) {
                return ['info', 'success', 'warn', 'primary', 'error'].includes(
                    value
                )
            }
        },
        //输入框激活颜色
        activeColor: {
            type: String,
            default: null,
            validator(value) {
                return Dap.common.matchingText(value, 'hex')
            }
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //下拉图标
        icon: {
            type: String,
            default: 'caret-down'
        },
        //原生name属性
        name: {
            type: String,
            default: null
        },
        //layer层列表悬浮样式
        hoverClass: {
            type: String,
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
        //是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        //选择时显示内容的过滤方法
        filterMethod: {
            type: Function,
            default: null
        },
        //是否显示已选择的icon
        showSelectIcon: {
            type: Boolean,
            default: true
        },
        //已选择标志icon
        selectedIcon: {
            type: [String, Object],
            default: null
        },
        //显示清除图标
        clearable: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const instance = getCurrentInstance()
        return {
            uid: instance.uid
        }
    },
    computed: {
        formData() {
            if (this.multiple && Array.isArray(this.modelValue)) {
                return this.modelValue.join(',')
            }
            return this.modelValue
        },
        menuStyle() {
            let style = {}
            if (this.height) {
                style.maxHeight = this.height
            }
            return style
        },
        selectClass() {
            let cls = ['mvi-select', 'mvi-select-' + this.size]
            if (this.round) {
                cls.push('mvi-select-round')
            } else if (this.square) {
                cls.push('mvi-select-square')
            }
            return cls
        },
        targetClass() {
            let cls = ['mvi-select-target']
            if (this.activeType && !this.activeColor && this.focus) {
                cls.push('mvi-select-' + this.activeType)
            }
            return cls
        },
        targetStyle() {
            let style = {}
            if (this.activeColor && this.focus) {
                style.borderColor = this.activeColor
                const rgb = Dap.color.hex2rgb(this.activeColor)
                style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
            }
            return style
        },
        iconClass() {
            let cls = ['mvi-select-icon']
            if (this.focus) {
                cls.push('mvi-select-active')
            }
            return cls
        },
        selectLabel() {
            if (this.multiple) {
                let labels = []
                this.options.forEach((item, index) => {
                    if (Array.isArray(this.modelValue)) {
                        let flag = this.modelValue.some(i => {
                            return Dap.common.equal(i, item.value)
                        })
                        if (flag) {
                            labels.push(item.label)
                        }
                    }
                })
                if (typeof this.filterMethod == 'function') {
                    return this.filterMethod(labels)
                } else {
                    return labels.join(' ')
                }
            } else {
                let label = ''
                this.options.forEach((item, index) => {
                    if (Dap.common.equal(this.modelValue, item.value)) {
                        label = item.label
                    }
                })
                if (typeof this.filterMethod == 'function') {
                    return this.filterMethod(label)
                } else {
                    return label
                }
            }
        },
        isSelect() {
            return item => {
                if (this.multiple) {
                    let flag = this.modelValue.some(i => {
                        return Dap.common.equal(i, item.value)
                    })
                    return this.showSelectIcon && flag
                }
                return false
            }
        },
        selectedIconType() {
            let type = 'success'
            if (Dap.common.isObject(this.selectedIcon)) {
                if (typeof this.selectedIcon.type == 'string') {
                    type = this.selectedIcon.type
                }
            } else if (typeof this.selectedIcon == 'string') {
                type = this.selectedIcon
            }
            return type
        },
        selectedIconSize() {
            let size = null
            if (Dap.common.isObject(this.selectedIcon)) {
                if (typeof this.selectedIcon.size == 'string') {
                    size = this.selectedIcon.size
                }
            }
            return size
        },
        selectedIconUrl() {
            let url = null
            if (Dap.common.isObject(this.selectedIcon)) {
                if (typeof this.selectedIcon.url == 'string') {
                    url = this.selectedIcon.url
                }
            }
            return url
        },
        selectedIconSpin() {
            let spin = false
            if (Dap.common.isObject(this.selectedIcon)) {
                if (typeof this.selectedIcon.spin == 'boolean') {
                    spin = this.selectedIcon.spin
                }
            }
            return spin
        },
        selectedIconColor() {
            let color = null
            if (Dap.common.isObject(this.selectedIcon)) {
                if (typeof this.selectedIcon.color == 'string') {
                    color = this.selectedIcon.color
                }
            }
            return color
        },
        showClearIcon() {
            //多选
            if (this.multiple) {
                if (this.modelValue.length != 0 && this.hover) {
                    return true
                }
                return false
            } else {
                if (
                    this.modelValue === '' ||
                    this.modelValue === null ||
                    this.modelValue === undefined ||
                    !this.hover
                ) {
                    return false
                }
                return true
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
                zIndex: Dap.number.isNumber(this.layerProps.zIndex)
                    ? this.layerProps.zIndex
                    : 400,
                offset: this.layerProps.offset
                    ? this.layerProps.offset
                    : '0.1rem',
                wrapperClass: this.layerProps.wrapperClass,
                animation: this.layerProps.animation,
                timeout: Dap.number.isNumber(this.layerProps.timeout)
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
    components: {
        Layer,
        Icon
    },
    methods: {
        //鼠标移入下拉选框
        hoverIn() {
            this.hover = true
        },
        //鼠标移出下拉选框
        hoverOut() {
            this.hover = false
        },
        //点击清除
        doClear(e) {
            e.stopPropagation()
            if (this.disabled) {
                return
            }
            if (!this.clearable) {
                return
            }
            if (this.focus) {
                this.focus = false
            }
            if (this.multiple) {
                this.$emit('update:modelValue', [])
                this.$emit('clear', [])
            } else {
                this.$emit('update:modelValue', null)
                this.$emit('clear', null)
            }
        },
        //layer显示前进行宽度设置
        layerShow() {
            if (this.layerRealProps.width) {
                this.$refs.menu.style.width = this.layerRealProps.width
            } else {
                this.$refs.menu.style.width =
                    this.$refs.target.offsetWidth + 'px'
            }
        },
        //鼠标移入选项
        mouseEnter(e, item) {
            if (this.disabled || item.disabled) {
                return
            }
            if (this.hoverClass) {
                Dap.element.addClass(e.currentTarget, this.hoverClass)
            }
        },
        //鼠标移出选项
        mouseLeave(e, item) {
            if (this.disabled || item.disabled) {
                return
            }
            if (this.hoverClass) {
                Dap.element.removeClass(e.currentTarget, this.hoverClass)
            }
        },
        //点击选项
        optionClick(item) {
            if (this.disabled || item.disabled) {
                return
            }
            if (this.multiple) {
                let arr = this.modelValue
                if (!Array.isArray(arr)) {
                    throw new TypeError('modelValue should be an array')
                }
                let flag = arr.some(tmp => {
                    return Dap.common.equal(tmp, item.value)
                })
                if (flag) {
                    arr = arr.filter(tmp => {
                        return !Dap.common.equal(tmp, item.value)
                    })
                } else {
                    arr.push(item.value)
                }
                this.$emit('update:modelValue', arr)
                this.$emit(
                    'change',
                    this.options.filter(tmp => {
                        return arr.some(tmp2 => {
                            return Dap.common.equal(tmp.value, tmp2)
                        })
                    })
                )
            } else {
                this.$emit('update:modelValue', item.value)
                this.$emit('change', item)
            }
            this.trigger()
        },
        //触发选择打开或关闭
        trigger() {
            if (this.disabled) {
                return
            }
            this.focus = !this.focus
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-select {
    display: block;
    width: 100%;
    position: relative;
    font-family: @font-family;
    color: @font-color-default;
    border-radius: @radius-default;
    background-color: #fff;

    //大小
    &.mvi-select-small {
        .mvi-select-target {
            height: @small-height;
            font-size: @font-size-small;
            padding: 0 @mp-sm*3 0 @mp-sm;
        }

        .mvi-select-icon,
        .mvi-clear-icon {
            right: @mp-sm;
            font-size: @font-size-small;
        }
    }

    &.mvi-select-medium {
        .mvi-select-target {
            height: @medium-height;
            font-size: @font-size-default;
            padding: 0 @mp-md*3 0 @mp-md;
        }

        .mvi-select-icon,
        .mvi-clear-icon {
            right: @mp-md;
            font-size: @font-size-default;
        }
    }

    &.mvi-select-large {
        .mvi-select-target {
            height: @large-height;
            font-size: @font-size-h6;
            padding: 0 @mp-lg*3 0 @mp-lg;
        }

        .mvi-select-icon,
        .mvi-clear-icon {
            right: @mp-lg;
            font-size: @font-size-h6;
        }
    }

    &.mvi-select-round {
        border-radius: @radius-round;
    }

    &.mvi-select-square {
        border-radius: 0;
    }

    &[disabled] {
        opacity: 0.6;
    }
}

.mvi-select-target {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
    background-color: inherit;
    border: 1px solid @border-color;
    border-radius: inherit;
    transition: border-color 600ms, box-shadow 600ms;
    -webkit-transition: border-color 600ms, box-shadow 600ms;
    box-shadow: none;
    cursor: pointer;
    color: inherit;

    //输入框样式
    &.mvi-select-info {
        border-color: @info-normal;
        box-shadow: 0 0 0.16rem @info-shadow;
    }

    &.mvi-select-success {
        border-color: @success-normal;
        box-shadow: 0 0 0.16rem @success-shadow;
    }

    &.mvi-select-primary {
        border-color: @primary-normal;
        box-shadow: 0 0 0.16rem @primary-shadow;
    }

    &.mvi-select-warn {
        border-color: @warn-normal;
        box-shadow: 0 0 0.16rem @warn-shadow;
    }

    &.mvi-select-error {
        border-color: @error-normal;
        box-shadow: 0 0 0.16rem @error-shadow;
    }

    &[disabled] {
        background-color: inherit;
        color: inherit;
    }
}

.mvi-select-label {
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    //placeholder样式
    &.mvi-select-label-placeholder::before {
        position: relative;
        content: attr(data-placeholder);
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        opacity: 0.5;
        vertical-align: middle;
    }
}

.mvi-select-icon {
    position: absolute;
    top: auto;
    color: inherit;
    opacity: 0.6;
    transition: transform 200ms;
    -ms-transition: transform 200ms;
    -webkit-transition: transform 200ms;
    -moz-transition: transform 200ms;

    &.mvi-select-active {
        transform: rotate(180deg);
    }
}

.mvi-clear-icon {
    position: absolute;
    top: auto;
    color: inherit;
    opacity: 0.6;
    transition: opacity 200ms;
    -ms-transition: opacity 200ms;
    -webkit-transition: opacity 200ms;
    -moz-transition: opacity 200ms;
}

.mvi-select-menu {
    display: block;
    padding: 0;
    overflow: auto;
    overflow-x: hidden;
    padding: @mp-xs 0;
}

.mvi-option {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;

    &.mvi-option-small {
        padding: @mp-xs @mp-sm;
        font-size: @font-size-small;
    }

    &.mvi-option-medium {
        padding: @mp-sm @mp-md;
        font-size: @font-size-default;
    }

    &.mvi-option-large {
        font-size: @font-size-h6;
        padding: @mp-md @mp-lg;
    }

    &:hover:not([disabled]) {
        cursor: pointer;
        background-color: @bg-color-default;
    }

    &[disabled] {
        opacity: 0.6;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
    }
}

.mvi-option-value {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
}
</style>

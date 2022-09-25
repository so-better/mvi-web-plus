<template>
    <m-popup ref="popup" :model-value="show" @overlay-click="hide" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" :placement="placement" :round="round" :use-padding="usePadding" :mount-el="mountEl">
        <div class="mvi-dropdown">
            <div :disabled="itemDisabled(item) || null" :class="dropdownItemClass(item, index)" v-for="(item, index) in options" :key="'item-'+index" @click="doSelect(item, index)" :style="dropdownItemStyle(item, index)">
                <div class="mvi-dropdown-item-label">
                    <m-icon v-if="item.icon" :type="iconType(item.icon)" :url="iconUrl(item.icon)" :spin="iconSpin(item.icon)" class="mvi-dropdown-icon" :size="iconSize(item.icon)" :color="iconColor(item.icon)" />
                    <span class="mvi-dropdown-label-text" v-text="item.label || ''"></span>
                </div>
                <div v-if="equalValue(item, index)" class="mvi-dropdown-item-checked" :data-placement="placement">
                    <m-icon :type="selectIconType" :url="selectIconUrl" :spin="selectIconSpin" :size="selectIconSize" :color="selectIconColor" />
                </div>
            </div>
        </div>
    </m-popup>
</template>

<script>
import $dap from 'dap-util'
import mIcon from '../icon/icon.vue'
import mPopup from '../popup/popup.vue'
export default {
    name: 'm-dropdown',
    data() {
        return {
            oldIndex: null
        }
    },
    emits: ['update:modelValue', 'update:show', 'select'],
    props: {
        //默认选中的选项
        modelValue: {
            type: [Object, Number, String, Array],
            default: null
        },
        //菜单列表选中的颜色
        activeColor: {
            type: String,
            default: null
        },
        //列表参数,含label,value,disabled,class,icon
        options: {
            type: Array,
            default: function () {
                return []
            }
        },
        //列表项额外的class
        itemClass: {
            type: String,
            default: null
        },
        //选择完毕后是否关闭
        selectClose: {
            type: Boolean,
            default: true
        },
        //自定义右侧选中的图标
        selectIcon: {
            type: [String, Object],
            default: null
        },
        //是否显示
        show: {
            type: Boolean,
            default: false
        },
        //遮罩层颜色
        overlayColor: {
            type: String,
            default: null
        },
        //层级
        zIndex: {
            type: Number,
            default: 900
        },
        //动画时间
        timeout: {
            type: Number,
            default: 200
        },
        //是否圆角
        round: {
            type: Boolean,
            default: false
        },
        //位置
        placement: {
            type: String,
            default: 'top'
        },
        //点击遮罩是否可关闭
        closable: {
            type: Boolean,
            default: true
        },
        //挂载元素
        mountEl: {
            type: String,
            default: null
        },
        //是否显示点击态
        active: {
            type: Boolean,
            default: true
        },
        //局部显示时是否考虑滚动条影响
        usePadding: {
            type: Boolean,
            default: false
        },
        //未选中列表颜色
        inactiveColor: {
            type: String,
            default: null
        }
    },
    computed: {
        $$el() {
            return this.$refs.popup.$$el
        },
        selectIconType() {
            let type = 'success'
            if ($dap.common.isObject(this.selectIcon)) {
                if (typeof this.selectIcon.type == 'string') {
                    type = this.selectIcon.type
                }
            } else if (typeof this.selectIcon == 'string') {
                type = this.selectIcon
            }
            return type
        },
        selectIconUrl() {
            let url = null
            if ($dap.common.isObject(this.selectIcon)) {
                if (typeof this.selectIcon.url == 'string') {
                    url = this.selectIcon.url
                }
            }
            return url
        },
        selectIconSpin() {
            let spin = false
            if ($dap.common.isObject(this.selectIcon)) {
                if (typeof this.selectIcon.spin == 'boolean') {
                    spin = this.selectIcon.spin
                }
            }
            return spin
        },
        selectIconSize() {
            let size = null
            if ($dap.common.isObject(this.selectIcon)) {
                if (typeof this.selectIcon.size == 'string') {
                    size = this.selectIcon.size
                }
            }
            return size
        },
        selectIconColor() {
            let color = null
            if ($dap.common.isObject(this.selectIcon)) {
                if (typeof this.selectIcon.color == 'string') {
                    color = this.selectIcon.color
                }
            }
            return color
        },
        iconType() {
            return icon => {
                let type = null
                if ($dap.common.isObject(icon)) {
                    if (typeof icon.type == 'string') {
                        type = icon.type
                    }
                } else if (typeof icon == 'string') {
                    type = icon
                }
                return type
            }
        },
        iconUrl() {
            return icon => {
                let url = null
                if ($dap.common.isObject(icon)) {
                    if (typeof icon.url == 'string') {
                        url = icon.url
                    }
                }
                return url
            }
        },
        iconSpin() {
            return icon => {
                let spin = false
                if ($dap.common.isObject(icon)) {
                    if (typeof icon.spin == 'boolean') {
                        spin = icon.spin
                    }
                }
                return spin
            }
        },
        iconSize() {
            return icon => {
                let size = null
                if ($dap.common.isObject(icon)) {
                    if (typeof icon.size == 'string') {
                        size = icon.size
                    }
                }
                return size
            }
        },
        iconColor() {
            return icon => {
                let color = null
                if ($dap.common.isObject(icon)) {
                    if (typeof icon.color == 'string') {
                        color = icon.color
                    }
                }
                return color
            }
        },
        //判断是否选中项
        equalValue() {
            return (item, index) => {
                if (item.value === undefined || item.value === null) {
                    return this.modelValue === index
                }
                return $dap.common.equal(this.modelValue, item.value)
            }
        },
        itemDisabled() {
            return item => {
                if (typeof item.disabled == 'boolean') {
                    return item.disabled
                } else {
                    return false
                }
            }
        },
        dropdownItemStyle() {
            return (item, index) => {
                let style = {}
                if (!this.itemDisabled(item)) {
                    //激活选中情况下
                    if (this.equalValue(item, index)) {
                        if (this.activeColor) {
                            style.color = this.activeColor
                        }
                    } else {
                        if (this.inactiveColor) {
                            style.color = this.inactiveColor
                        }
                    }
                }
                return style
            }
        },
        dropdownItemClass() {
            return (item, index) => {
                let cls = ['mvi-dropdown-item']
                if (item.class) {
                    cls.push(item.class)
                } else if (this.itemClass) {
                    cls.push(this.itemClass)
                }
                if (this.equalValue(item, index)) {
                    cls.push('mvi-dropdown-checked')
                }
                if (this.active && !item.disabled) {
                    cls.push('mvi-dropdown-active')
                }
                return cls
            }
        }
    },
    components: {
        mIcon,
        mPopup
    },
    mounted() {
        this.oldIndex = this.modelValue
    },
    methods: {
        //点击遮罩关闭
        hide() {
            if (this.closable) {
                this.doCancel()
            }
        },
        //取消
        doCancel() {
            this.$emit('update:show', false)
        },
        //选择
        doSelect(item, index) {
            if (item.disabled) {
                return
            }
            //点击的是已选择的选项
            if (
                $dap.common.equal(
                    this.valueFilter(item.value, index),
                    this.oldIndex
                )
            ) {
                this.$emit('select', {
                    item: Object.assign({}, item),
                    index: index
                })
                if (this.selectClose) {
                    this.doCancel()
                }
            } else {
                this.$emit(
                    'update:modelValue',
                    this.valueFilter(item.value, index)
                )
                this.$emit('select', {
                    item: Object.assign({}, item),
                    index: index
                })
                if (this.selectClose) {
                    this.doCancel()
                }
                this.oldIndex = this.valueFilter(item.value, index)
            }
        },
        //获取当前选择的value值
        valueFilter(value, index) {
            if (value === undefined || value === null) {
                return index
            }
            return value
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-dropdown {
    display: block;
    width: 100%;
    position: relative;
    color: @font-color-default;
}

.mvi-dropdown-item {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
    height: @medium-height;
    border-bottom: 1px solid @border-color;
    padding: 0 @mp-sm;
    font-size: @font-size-default;
    cursor: pointer;
}

.mvi-dropdown-active:active::before {
    .mvi-active();
}

.mvi-dropdown-item.mvi-dropdown-checked {
    color: @info-normal;
}

.mvi-dropdown-item[disabled] {
    color: @font-color-mute;
}

.mvi-dropdown-item:last-child {
    border-bottom: none;
}

.mvi-dropdown-item-label {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    transition: color 200ms;
    -webkit-transition: color 200ms;
    -ms-transition: color 200ms;
    -moz-transition: color 200ms;
}

.mvi-dropdown-label-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mvi-dropdown-item-checked {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    padding-left: @mp-sm;
    height: 100%;
    transition: color 200ms;
    -webkit-transition: color 200ms;
    -ms-transition: color 200ms;
    -moz-transition: color 200ms;
}

.mvi-dropdown-item-checked[data-placement='left'],
.mvi-dropdown-item-checked[data-placement='right'] {
    margin-left: @mp-lg*5;
}

.mvi-dropdown-icon {
    margin-right: @mp-xs;
}
</style>

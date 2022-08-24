<template>
    <m-popup ref="popup" :model-value="modelValue" @overlay-click="hide" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" placement="bottom" :round="round" :use-padding="usePadding" :mount-el="mountEl">
        <div class="mvi-acionsheet">
            <div class="mvi-acionsheet-title" v-if="title" :style="{color:titleColor || ''}">
                <span v-text="title"></span>
            </div>
            <div class="mvi-acionsheet-list">
                <div :class="itemClass(item)" v-for="(item,index) in options" :style="itemStyle(item)" :key="'action-'+index" :disabled="itemDisabled(item) || null" @click="doSelect(item,index)">
                    <m-loading :size="(size=='large'?'0.4rem':'0.36rem')" color="#bbb" v-if="(item.loading || false)"></m-loading>
                    <div class="mvi-acionsheet-content" v-else-if="item.label||item.sub || iconType(item.icon) || iconUrl(item.icon)">
                        <m-icon data-placement="left" v-if="(iconType(item.icon) || iconUrl(item.icon)) && item.placement!='right'" :type="iconType(item.icon)" :url="iconUrl(item.icon)" :spin="iconSpin(item.icon)" :size="iconSize(item.icon)" :color="iconColor(item.icon)" />
                        <span v-if="item.label" class="mvi-actionsheet-item-label" v-text="item.label"></span>
                        <span v-if="item.sub" class="mvi-acionsheet-item-sub" v-text="item.sub"></span>
                        <m-icon data-placement="right" v-if="(iconType(item.icon) || iconUrl(item.icon)) && item.placement=='right'" :type="iconType(item.icon)" :url="iconUrl(item.icon)" :spin="iconSpin(item.icon)" :size="iconSize(item.icon)" :color="iconColor(item.icon)" />
                    </div>
                </div>
            </div>
            <div class="mvi-acionsheet-divider"></div>
            <div :class="['mvi-acionsheet-button',active?'mvi-acionsheet-active':'']" v-if="showCancel" v-text="cancelText" @click="doCancel" :style="{color:cancelColor || ''}"></div>
        </div>
    </m-popup>
</template>

<script>
import $dap from 'dap-util'
import mPopup from '../popup/popup'
import mLoading from '../loading/loading'
import mIcon from '../icon/icon'
export default {
    name: 'm-actionsheet',
    emits: ['update:modelValue', 'select'],
    props: {
        //是否显示
        modelValue: {
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
            default: 300
        },
        //是否显示圆角
        round: {
            type: Boolean,
            default: true
        },
        //标题
        title: {
            type: String,
            default: null
        },
        //标题颜色
        titleColor: {
            type: String,
            default: null
        },
        //点击遮罩是否可关闭
        closable: {
            type: Boolean,
            default: true
        },
        //配置项，每个配置项包含label、loading、sub、icon、placement、class、color、disabled
        options: {
            type: Array,
            default: function () {
                return []
            }
        },
        //是否显示取消按钮
        showCancel: {
            type: Boolean,
            default: true
        },
        //取消按钮文字
        cancelText: {
            type: String,
            default: '取消'
        },
        //取消按钮颜色
        cancelColor: {
            type: String,
            default: null
        },
        //列表和取消按钮是否显示点击态
        active: {
            type: Boolean,
            default: true
        },
        //挂载元素
        mountEl: {
            type: String,
            default: null
        },
        //选择完是否自动关闭
        selectClose: {
            type: Boolean,
            default: true
        },
        //局部显示时是否考虑滚动条影响
        usePadding: {
            type: Boolean,
            default: false
        },
        //列表字体颜色
        color: {
            type: String,
            default: null
        },
        //尺寸
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['medium', 'large'].includes(value)
            }
        }
    },
    computed: {
		$$el(){
			return this.$refs.popup.$$el
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
        itemClass() {
            return item => {
                let cls = [
                    'mvi-acionsheet-item',
                    'mvi-actionsheet-item-' + this.size
                ]
                if (item.class) {
                    cls.push(item.class)
                }
                if (this.active && !item.loading && !item.disabled) {
                    cls.push('mvi-acionsheet-active')
                }
                return cls
            }
        },
        itemStyle() {
            return item => {
                let style = {}
                //非禁用状态
                if (!this.itemDisabled(item)) {
                    if (item.color) {
                        style.color = item.color
                    } else if (this.color) {
                        style.color = this.color
                    }
                }
                return style
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
        }
    },
    components: {
        mIcon,
        mLoading,
        mPopup
    },
    methods: {
        //点击遮罩关闭
        hide(event) {
            if (this.closable) {
                this.doCancel()
            }
        },
        //取消
        doCancel() {
            this.$emit('update:modelValue', false)
        },
        //点击选项
        doSelect(item, index) {
            if (item.disabled || item.loading) {
                return
            }
            if (this.selectClose) {
                this.$emit('update:modelValue', false)
            }
            this.$emit('select', {
                item: Object.assign({}, item),
                index: index
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

//菜单
.mvi-acionsheet {
    display: block;
    width: 100%;
    position: relative;
}

//标题
.mvi-acionsheet-title {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: @medium-height;
    border-bottom: 1px solid @border-color;
    font-size: @font-size-small;
    color: @font-color-sub;
    padding: 0 @mp-md;

    & > span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

//选项列表
.mvi-acionsheet-list {
    display: block;
    width: 100%;
}

//列表项
.mvi-acionsheet-item {
    display: flex;
    display: -webkit-flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid @border-color;
    color: @font-color-default;
    padding: 0 @mp-md;
    cursor: pointer;

    &.mvi-actionsheet-item-medium {
        height: @medium-height;
        font-size: @font-size-default;
    }

    &.mvi-actionsheet-item-large {
        height: @large-height;
        font-size: @font-size-h6;
    }
}

.mvi-acionsheet-active:active::before {
    .mvi-active();
}

.mvi-acionsheet-item[disabled] {
    color: @font-color-mute;
}

.mvi-acionsheet-content {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .mvi-icon {
        font-size: inherit;
        margin-right: @mp-xs;
        margin-left: 0;
    }

    .mvi-icon[data-placement='right'] {
        margin-left: @mp-xs;
        margin-right: 0;
    }
}

.mvi-actionsheet-item-label {
    display: inline-block;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.mvi-acionsheet-item-sub {
    font-size: @font-size-small;
    margin-left: @mp-xs;
    opacity: 0.6;
    max-width: 15%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.mvi-acionsheet-item:last-child {
    border-bottom: none;
}

.mvi-acionsheet-divider {
    display: block;
    width: 100%;
    height: 0.3rem;
    background-color: @bg-color-default;
}

.mvi-acionsheet-button {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: @medium-height;
    font-size: @font-size-h6;
    color: @font-color-default;
}
</style>

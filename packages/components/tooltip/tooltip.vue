<template>
    <div :class="['mvi-tooltip',block?'mvi-tooltip-block':'']" :data-id="'mvi-tooltip-' + uid">
        <div @click="clickShowTooltip" @mouseenter="hoverShowTooltip" @mouseleave="hoverHideToolTip" class="mvi-tooltip-toggle" ref="toggle" :data-id="'mvi-tooltip-target-' + uid">
            <slot></slot>
        </div>
        <m-layer v-model="show" :offset="offset" :background="color" border :border-color="borderColor" closable :show-triangle="showTriangle" :z-index="zIndex" :target="`[data-id='mvi-tooltip-target-${uid}']`" :root="`[data-id='mvi-tooltip-${uid}']`" :placement="placement" :fixed="fixed" :fixed-auto="fixedAuto" :width="width" :timeout="timeout" :animation="animation || 'mvi-tooltip'" :shadow="false">
            <div class="mvi-tooltip-content" ref="content" :style="contentStyle">
                <slot v-if="$slots.title" name="title"></slot>
                <span v-else v-text="title"></span>
            </div>
        </m-layer>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import $dap from 'dap-util'
import mLayer from '../layer/layer'
export default {
    name: 'm-tooltip',
    data() {
        return {
            show: false
        }
    },
    props: {
        //提示内容
        title: {
            type: String,
            default: ''
        },
        //显示位置
        placement: {
            type: String,
            default: 'bottom',
            validator(value) {
                return [
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                    'top',
                    'top-start',
                    'top-end',
                    'left',
                    'left-start',
                    'left-end',
                    'right',
                    'right-start',
                    'right-end'
                ].includes(value)
            }
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //动画时间
        timeout: {
            type: Number,
            default: 300
        },
        //边框颜色
        borderColor: {
            type: String,
            default: '#333'
        },
        //背景色
        color: {
            type: String,
            default: '#333'
        },
        //字体颜色
        textColor: {
            type: String,
            default: '#fff'
        },
        //触发方式
        trigger: {
            type: String,
            default: 'click',
            validator(value) {
                return ['hover', 'click', 'custom'].includes(value)
            }
        },
        //提示内容距离触发元素的距离
        offset: {
            type: String,
            default: '0.1rem'
        },
        //层级
        zIndex: {
            type: Number,
            default: 20
        },
        //是否fixed定位
        fixed: {
            type: Boolean,
            default: false
        },
        //此属性用以解决fixed模式下layer父元素存在transform属性样式时fixed失效的bug
        fixedAuto: {
            type: Boolean,
            default: false
        },
        //宽度
        width: {
            type: String,
            default: null
        },
        //显示动画
        animation: {
            type: String,
            default: null
        },
        //是否显示三角图标
        showTriangle: {
            type: Boolean,
            default: true
        },
        //是否以块级展示
        block: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        contentStyle() {
            let style = {}
            if (this.textColor) {
                style.color = this.textColor
            }
            if (this.width) {
                style.whiteSpace = 'normal'
            }
            return style
        }
    },
    components: {
        mLayer
    },
    setup() {
        const instance = getCurrentInstance()
        return {
            uid: instance.uid
        }
    },
    methods: {
        //鼠标进入显示
        hoverShowTooltip() {
            if (this.trigger == 'hover') {
                this.showTooltip()
            }
        },
        //鼠标移出隐藏
        hoverHideToolTip() {
            if (this.trigger == 'hover') {
                this.hideTooltip()
            }
        },
        //点击显示工具提示
        clickShowTooltip() {
            if (this.trigger === 'click') {
                if (this.show) {
                    this.hideTooltip()
                } else {
                    this.showTooltip()
                }
            }
        },
        //显示
        showTooltip() {
            if (this.disabled) {
                return
            }
            this.show = true
        },
        //隐藏
        hideTooltip() {
            if (this.disabled) {
                return
            }
            this.show = false
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-tooltip {
    display: inline-flex;
    display: -webkit-inline-flex;
    position: relative;

    .mvi-tooltip-toggle {
        position: relative;
        display: inline-flex;
        display: -webkit-inline-flex;
    }

    &.mvi-tooltip-block {
        display: block;

        .mvi-tooltip-toggle {
            display: block;
        }
    }
}

.mvi-tooltip-content {
    position: relative;
    display: block;
    padding: @mp-sm;
    font-size: @font-size-small;
    margin: 0;
    white-space: nowrap;
    line-height: 1;
    text-align: center;
}

.mvi-tooltip-enter-from,
.mvi-tooltip-leave-to {
    opacity: 0;
}
</style>

<template>
    <div class="mvi-tabs">
        <!-- 选项卡头部 -->
        <div ref="headers" :data-type="type" :class="['mvi-tabs-header',(type == 'default' && border)?'mvi-tabs-header-border':'']" :style="headersStyle">
            <!-- 选项卡滑动条 -->
            <div v-if="type=='default'" class="mvi-tabs-slider" :style="sliderStyle"></div>
            <!-- 选项卡头部卡片 -->
            <div :data-type="type" :class="headerClass(item,index)" v-for="(item,index) in children" :key="'header-'+index" @click="clickHeader(item,index)" :style="headerStyle(item,index)" :disabled="item.disabled || null">
                <m-icon v-if="item.placement=='left' && item.iconType || item.iconUrl" :class="['mvi-tab-icon',item.title?'mvi-tab-icon-left':'']" :type="item.iconType" :url="item.iconUrl" :spin="item.iconSpin" :size="item.iconSize" :color="item.iconColor"></m-icon>
                <span class="mvi-tab-header-text" v-html="item.title" v-if="item.title"></span>
                <m-icon v-if="item.placement=='right' && item.iconType || item.iconUrl" :class="['mvi-tab-icon',item.title?'mvi-tab-icon-right':'']" :type="item.iconType" :url="item.iconUrl" :spin="item.iconSpin" :size="item.iconSize" :color="item.iconColor"></m-icon>
            </div>
        </div>
        <div class="mvi-tabs-content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import $dap from 'dap-util'
import mIcon from '../icon/icon'
export default {
    name: 'm-tabs',
    data() {
        return {
            //子tab实例数组
            children: [],
            //滑动条距离左边的距离
            slideLeft: 0,
            //滑动条宽度
            slideWidth: 0,
            //与active值一样，但区别在于active变化后节点更新后才会变化此值
            current: 0
        }
    },
    provide() {
        return {
            tabs: this
        }
    },
    emits: ['update:modelValue', 'change'],
    props: {
        //tabs类型
        type: {
            type: String,
            default: 'default',
            validator(value) {
                return ['default', 'card'].includes(value)
            }
        },
        //激活的tab序列
        modelValue: {
            type: Number,
            default: 0
        },
        //tab切换动画
        animation: {
            type: String,
            default: 'none',
            validator(value) {
                return ['none', 'slide', 'fade'].includes(value)
            }
        },
        //当animation为slide或者fade时的动画时长
        timeout: {
            type: Number,
            default: 300
        },
        //激活的标签标题颜色
        activeColor: {
            type: String,
            default: null
        },
        //未激活的标签标题色
        inactiveColor: {
            type: String,
            default: null
        },
        //激活时的背景色
        activeBackground: {
            type: String,
            default: null
        },
        //未激活时的背景色
        inactiveBackground: {
            type: String,
            default: null
        },
        //激活的标签标题样式
        activeClass: {
            type: String,
            default: null
        },
        //未激活的标签样式
        inactiveClass: {
            type: String,
            default: null
        },
        //标题部分背景色
        titleBackground: {
            type: String,
            default: null
        },
        //内容部分背景色
        contentBackground: {
            type: String,
            default: null
        },
        //滑动条高度
        lineHeight: {
            type: String,
            default: '0.04rem'
        },
        //当标题过长时是否省略，标题栏最大长度只有1/n，n表示标题栏个数
        ellipsis: {
            type: Boolean,
            default: true
        },
        //是否显示选项卡头部下边框
        border: {
            type: Boolean,
            default: false
        },
        //布局方式
        flex: {
            type: String,
            default: 'space-between'
        },
        //每个选项卡头部距离左侧的距离
        offset: {
            type: String,
            default: '0'
        }
    },
    computed: {
        sliderStyle() {
            let style = {}
            if (this.activeColor) {
                style.backgroundColor = this.activeColor
            }
            if (this.animation == 'slide' || this.animation == 'fade') {
                style.transition =
                    'left ' + this.timeout + 'ms,width ' + this.timeout + 'ms'
                style.webkitTransition =
                    'left ' + this.timeout + 'ms,width ' + this.timeout + 'ms'
            }
            if (this.lineHeight) {
                style.height = this.lineHeight
            }
            style.width = this.slideWidth + 'px'
            style.left = this.slideLeft + 'px'
            return style
        },
        headersStyle() {
            let style = {}
            if (this.titleBackground) {
                style.backgroundColor = this.titleBackground
            }
            if (this.type == 'card' && this.activeBackground) {
                style.borderColor = this.activeBackground
            }
            if (this.flex && this.type == 'default') {
                style.justifyContent = this.flex
            }
            return style
        },
        headerClass() {
            return (item, index) => {
                let cls = ['mvi-tab-header']
                if (this.modelValue == index) {
                    cls.push('mvi-tab-header-active')
                    if (this.activeClass) {
                        cls.push(this.activeClass)
                    }
                } else {
                    if (this.inactiveClass) {
                        cls.push(this.inactiveClass)
                    }
                }
                if (this.ellipsis) {
                    cls.push('mvi-tab-header-ellipsis')
                }
                return cls
            }
        },
        headerStyle() {
            return (item, index) => {
                let style = {}
                if (this.modelValue == index) {
                    if (this.activeColor) {
                        style.color = this.activeColor
                    }
                } else {
                    if (this.inactiveColor) {
                        style.color = this.inactiveColor
                    }
                }
                if (this.offset && index != 0 && this.type == 'default') {
                    style.marginLeft = this.offset
                }
                if (this.type == 'card') {
                    if (this.modelValue == index) {
                        if (this.activeBackground) {
                            style.backgroundColor = this.activeBackground
                        }
                    } else {
                        if (this.inactiveBackground) {
                            style.backgroundColor = this.inactiveBackground
                        }
                    }

                    if (this.activeBackground) {
                        style.borderRightColor = this.activeBackground
                    }
                }
                style.maxWidth = `calc(100% / ${this.children.length})`
                return style
            }
        }
    },
    components: {
        mIcon
    },
    created() {
        this.current = this.modelValue
    },
    watch: {
        modelValue(newValue, oldValue) {
            this.to(newValue, oldValue)
        }
    },
    setup() {
        const instance = getCurrentInstance()
        return {
            uid: instance.uid
        }
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.setSlider()
            }, 100)
        })
        this.setHeight()
        $dap.event.on(window, `resize.tabs_${this.uid}`, this.setHeight)
    },
    methods: {
        //设置面板高度
        setHeight() {
            if (this.children[this.current] && this.$refs.content) {
                this.$refs.content.style.height =
                    this.children[this.current].$el.offsetHeight + 'px'
            }
        },
        //点击头部的标题
        clickHeader(item, index) {
            if (item.disabled) {
                return
            }
            if (this.modelValue == index) {
                return
            }
            this.$emit('update:modelValue', index)
            this.$emit('change', index)
        },
        //激活指定的tab
        to(newValue, oldValue) {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].show = false
                if (newValue < oldValue) {
                    this.children[i].back = true
                } else {
                    this.children[i].back = false
                }
            }
            this.children[newValue].show = true
            if (!this.children[newValue].firstShow) {
                this.children[newValue].firstShow = true
            }
            this.$nextTick(() => {
                this.current = newValue
                this.setHeight()
                this.setSlider()
            })
        },
        //设置滑动条
        setSlider() {
            this.slideWidth = parseFloat(
                $dap.element.getCssStyle(
                    this.$refs.headers.querySelector('.mvi-tab-header-active'),
                    'width'
                )
            )
            this.slideLeft = $dap.element.getElementPoint(
                this.$refs.headers.querySelector('.mvi-tab-header-active'),
                this.$refs.headers
            ).left
        }
    },
    beforeUnmount() {
        $dap.event.off(window, `resize.tabs_${this.uid}`)
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-tabs {
    display: block;
    width: 100%;
    background-color: #fff;
}

.mvi-tabs-header {
    display: flex;
    display: -webkit-flex;
    position: relative;
    justify-content: space-between;
    align-items: stretch;
    padding: 0 @mp-sm;

    &.mvi-tabs-header-border {
        border-bottom: 1px solid @border-color;
    }
}

.mvi-tabs-header[data-type='card'] {
    border: 0.02rem solid @error-normal;
    border-radius: @radius-default;
    padding: 0;
}

.mvi-tabs-slider {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1rem;
    transition: left 400ms, width 400ms;
    -webkit-transition: left 400ms, width 400ms;
    border-radius: @radius-default;
    background-color: @error-normal;
    z-index: 20;
}

.mvi-tab-header {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    position: relative;
    align-items: center;
    line-height: 1.5;
    padding: @mp-xs 0;
    color: @font-color-default;
    font-size: @font-size-default;
    cursor: pointer;
}

.mvi-tab-header[disabled] {
    opacity: 0.6;
}

.mvi-tab-header[data-type='card'] {
    flex: 1;
    justify-content: center;
    border-right: 0.02rem solid @error-normal;
}

.mvi-tab-header[data-type='card']:last-child {
    border-right: none;
}

.mvi-tab-header.mvi-tab-header-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & .mvi-tab-header-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.mvi-tab-header.mvi-tab-header-active {
    color: @error-normal;
}

.mvi-tab-header.mvi-tab-header-active[data-type='card'] {
    background-color: @error-normal;
    color: #fff;
}

.mvi-tab-icon {
    font-size: 0.8em;
}

.mvi-tab-icon-left {
    margin-right: @mp-xs;
}

.mvi-tab-icon-right {
    margin-left: @mp-xs;
}

.mvi-tabs-content {
    position: relative;
    overflow: hidden;
}
</style>

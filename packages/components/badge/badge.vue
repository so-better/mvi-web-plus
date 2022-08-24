<template>
    <span :class="['mvi-badge','mvi-badge-'+size,dot?'mvi-badge-dot':'']" :style="badgeStyle">
        <slot></slot>
    </span>
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-badge',
    props: {
        //背景色
        background: {
            type: String,
            default: null
        },
        //字体颜色
        color: {
            type: String,
            default: null
        },
        //是否圆点
        dot: {
            type: Boolean,
            default: false
        },
        //尺寸
        size: {
            type: String,
            default: 'medium',
            validator(value) {
                return ['large', 'medium'].includes(value)
            }
        }
    },
    watch: {
        dot(newValue) {
            if (newValue) {
                this.$el.innerHTML = ''
            } else {
                this.$nextTick(() => {
                    let html = ''
                    this.$slots.default().forEach(item => {
                        if (item && $dap.element.isElement(item.el)) {
                            html += item.el.outerHTML
                        }
                    })
                    this.$el.innerHTML = html
                })
            }
            this.$nextTick(() => {
                this.setPadding()
            })
        }
    },
    computed: {
        badgeStyle() {
            let style = {}
            if (this.background) {
                style.backgroundColor = this.background
            }
            if (this.color) {
                style.color = this.color
            }
            return style
        }
    },
    mounted() {
        if (this.dot) {
            this.$el.innerHTML = ''
        }
        this.setPadding()
    },
    methods: {
        setPadding() {
            if (this.dot) {
                this.$el.style.padding = 0
            } else {
                const width = Number(
                    parseFloat(
                        $dap.element.getCssStyle(this.$el, 'width')
                    ).toFixed(2)
                )
                const height = Number(
                    parseFloat(
                        $dap.element.getCssStyle(this.$el, 'height')
                    ).toFixed(2)
                )
                if (width >= height) {
                    if (this.size == 'large') {
                        this.$el.style.padding = '0 0.15rem'
                    } else {
                        this.$el.style.padding = '0 0.12rem'
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-badge {
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: @error-normal;
    color: #fff;
    font-size: @font-size-small;
    border-radius: @radius-round;
    vertical-align: middle;
    overflow: hidden;
}

.mvi-badge-medium {
    font-size: @font-size-small;
    height: @small-height / 2;
    min-width: @small-height / 2;
}

.mvi-badge-large {
    height: @medium-height / 2;
    font-size: @font-size-default;
    min-width: @medium-height / 2;
}

.mvi-badge-dot {
    min-width: auto;
    border-radius: @radius-circle;
    padding: 0;
}

.mvi-badge-medium.mvi-badge-dot {
    width: 0.15rem;
    height: 0.15rem;
}

.mvi-badge-large.mvi-badge-dot {
    width: 0.22rem;
    height: 0.22rem;
}
</style>

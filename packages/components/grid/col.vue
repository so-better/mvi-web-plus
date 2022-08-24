<template>
    <Col :class="colStyle">
    <slot></slot>
    </Col>
</template>

<script>
import { h } from 'vue'
import $dap from 'dap-util'
export default {
    name: 'm-col',
    props: {
        //栅格占据的列数
        span: {
            type: Number,
            default: 24
        },
        //栅格左侧的间隔格数
        offset: {
            type: Number,
            default: 0
        },
        //渲染标签
        tag: {
            type: String,
            default: 'div'
        },
        // >=0px 响应式栅格数或者栅格属性对象
        xs: {
            type: [Number, Object],
            default: null
        },
        // >=640px 响应式栅格数或者栅格属性对象
        sm: {
            type: [Number, Object],
            default: null
        },
        // >=992px 响应式栅格数或者栅格属性对象
        md: {
            type: [Number, Object],
            default: null
        },
        // >=1440px 响应式栅格数或者栅格属性对象
        lg: {
            type: [Number, Object],
            default: null
        },
        // >=1920px 响应式栅格数或者栅格属性对象
        xl: {
            type: [Number, Object],
            default: null
        }
    },
    inject: ['row'],
    computed: {
        colStyle() {
            let cls = []
            if (this.span) {
                cls.push('mvi-col-' + this.span)
            }
            if (this.offset) {
                cls.push('mvi-col-offset-' + this.offset)
            }

            if ($dap.common.isObject(this.xs)) {
                if ($dap.number.isNumber(this.xs.span)) {
                    cls.push('mvi-col-xs-' + this.xs.span)
                }
                if ($dap.number.isNumber(this.xs.offset)) {
                    cls.push('mvi-col-offset-xs-' + this.xs.offset)
                }
            } else if ($dap.number.isNumber(this.xs)) {
                cls.push('mvi-col-xs-' + this.xs)
            }

            if ($dap.common.isObject(this.sm)) {
                if ($dap.number.isNumber(this.sm.span)) {
                    cls.push('mvi-col-sm-' + this.sm.span)
                }
                if ($dap.number.isNumber(this.sm.offset)) {
                    cls.push('mvi-col-offset-sm-' + this.sm.offset)
                }
            } else if ($dap.number.isNumber(this.sm)) {
                cls.push('mvi-col-sm-' + this.sm)
            }

            if ($dap.common.isObject(this.md)) {
                if ($dap.number.isNumber(this.md.span)) {
                    cls.push('mvi-col-md-' + this.md.span)
                }
                if ($dap.number.isNumber(this.md.offset)) {
                    cls.push('mvi-col-offset-md-' + this.md.offset)
                }
            } else if ($dap.number.isNumber(this.md)) {
                cls.push('mvi-col-md-' + this.md)
            }

            if ($dap.common.isObject(this.lg)) {
                if ($dap.number.isNumber(this.lg.span)) {
                    cls.push('mvi-col-lg-' + this.lg.span)
                }
                if ($dap.number.isNumber(this.lg.offset)) {
                    cls.push('mvi-col-offset-lg-' + this.lg.offset)
                }
            } else if ($dap.number.isNumber(this.lg)) {
                cls.push('mvi-col-lg-' + this.lg)
            }

            if ($dap.common.isObject(this.xl)) {
                if ($dap.number.isNumber(this.xl.span)) {
                    cls.push('mvi-col-xl-' + this.xl.span)
                }
                if ($dap.number.isNumber(this.xl.offset)) {
                    cls.push('mvi-col-offset-xl-' + this.xl.offset)
                }
            } else if ($dap.number.isNumber(this.xl)) {
                cls.push('mvi-col-xl-' + this.xl)
            }

            return cls
        }
    },
    components: {
        Col: {
            render() {
                return h(
                    this.$parent.tag,
                    {},
                    {
                        default: this.$slots.default
                    }
                )
            }
        }
    }
}
</script>

<style scoped lang="less">
.span(@num) when (@num >=0) {
    .mvi-col-@{num} {
        width: calc(~'100% / 24 * @{num}');
    }

    .span(@num - 1);
}

.offset(@num) when (@num >=0) {
    .mvi-col-offset-@{num} {
        margin-left: calc(~'100% / 24 * @{num}');
    }

    .offset(@num - 1);
}

.span(24);
.offset(24);

.spanResponse(@num, @grid) when (@num >=0) {
    .mvi-col-@{grid}-@{num} {
        width: calc(~'100% / 24 * @{num}');
    }

    .spanResponse(@num - 1, @grid);
}

.offsetResponse(@num, @grid) when (@num >=0) {
    .mvi-col-offset-@{grid}-@{num} {
        margin-left: calc(~'100% / 24 * @{num}');
    }

    .offsetResponse(@num - 1, @grid);
}

.spanResponse(24, xs);
.offsetResponse(24, xs);

@media only screen and (min-width: 640px) {
    .spanResponse(24, sm);
    .offsetResponse(24, sm);
}

@media only screen and (min-width: 992px) {
    .spanResponse(24, md);
    .offsetResponse(24, md);
}

@media only screen and (min-width: 1440px) {
    .spanResponse(24, lg);
    .offsetResponse(24, lg);
}

@media only screen and (min-width: 1920px) {
    .spanResponse(24, xl);
    .offsetResponse(24, xl);
}
</style>

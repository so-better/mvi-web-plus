<template>
    <Row class="mvi-row" :style="rowStyle">
        <slot></slot>
    </Row>
</template>

<script>
import { h } from 'vue'
export default {
    name: 'm-row',
    props: {
        //排列方式
        justify: {
            type: String,
            default: 'flex-start',
            validator(value) {
                return [
                    'flex-start',
                    'flex-end',
                    'space-around',
                    'space-between'
                ].includes(value)
            }
        },
        //垂直对齐方式
        align: {
            type: String,
            default: 'flex-start',
            validator(value) {
                return ['flex-start', 'flex-end', 'center'].includes(value)
            }
        },
        //渲染标签
        tag: {
            type: String,
            default: 'div'
        }
    },
    provide() {
        return {
            row: this
        }
    },
    computed: {
        rowStyle() {
            let style = {}
            style.justifyContent = this.justify
            style.alignItems = this.align
            return style
        }
    },
    components: {
        Row: {
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
.mvi-row {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}
</style>

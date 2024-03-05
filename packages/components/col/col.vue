<script setup name="m-col" lang="ts">
import { computed, defineComponent, h, useSlots } from 'vue'
import Dap from 'dap-util'

import ColProps from './props'

const props = defineProps(ColProps)

const colClass = computed(() => {
    let cls = []
    if (props.span) {
        cls.push('mvi-col-' + props.span)
    }
    if (props.offset) {
        cls.push('mvi-col-offset-' + props.offset)
    }

    if (Dap.common.isObject(props.xs)) {
        if (Dap.number.isNumber((<any>(props.xs)).span)) {
            cls.push('mvi-col-xs-' + (<any>(props.xs)).span)
        }
        if (Dap.number.isNumber((<any>(props.xs)).offset)) {
            cls.push('mvi-col-offset-xs-' + (<any>(props.xs)).offset)
        }
    } else if (Dap.number.isNumber(props.xs)) {
        cls.push('mvi-col-xs-' + props.xs)
    }

    if (Dap.common.isObject(props.sm)) {
        if (Dap.number.isNumber((<any>(props.sm)).span)) {
            cls.push('mvi-col-sm-' + (<any>(props.sm)).span)
        }
        if (Dap.number.isNumber((<any>(props.sm)).offset)) {
            cls.push('mvi-col-offset-sm-' + (<any>(props.sm)).offset)
        }
    } else if (Dap.number.isNumber(props.sm)) {
        cls.push('mvi-col-sm-' + props.sm)
    }

    if (Dap.common.isObject(props.md)) {
        if (Dap.number.isNumber((<any>(props.md)).span)) {
            cls.push('mvi-col-md-' + (<any>(props.md)).span)
        }
        if (Dap.number.isNumber((<any>(props.md)).offset)) {
            cls.push('mvi-col-offset-md-' + (<any>(props.md)).offset)
        }
    } else if (Dap.number.isNumber(props.md)) {
        cls.push('mvi-col-md-' + props.md)
    }

    if (Dap.common.isObject(props.lg)) {
        if (Dap.number.isNumber((<any>(props.lg)).span)) {
            cls.push('mvi-col-lg-' + (<any>(props.lg)).span)
        }
        if (Dap.number.isNumber((<any>(props.lg)).offset)) {
            cls.push('mvi-col-offset-lg-' + (<any>(props.lg)).offset)
        }
    } else if (Dap.number.isNumber(props.lg)) {
        cls.push('mvi-col-lg-' + props.lg)
    }

    if (Dap.common.isObject(props.xl)) {
        if (Dap.number.isNumber((<any>(props.xl)).span)) {
            cls.push('mvi-col-xl-' + (<any>(props.xl)).span)
        }
        if (Dap.number.isNumber((<any>(props.xl)).offset)) {
            cls.push('mvi-col-offset-xl-' + (<any>(props.xl)).offset)
        }
    } else if (Dap.number.isNumber(props.xl)) {
        cls.push('mvi-col-xl-' + props.xl)
    }

    return cls
})

const Col = defineComponent(() => {
    return () => {
        return h(
            props.tag,
            {},
            {
                default: useSlots().default
            }
        )
    }
})

</script>

<template>
    <Col :class="colClass">
    <slot></slot>
    </Col>
</template>

<style scoped src="./col.less"></style>

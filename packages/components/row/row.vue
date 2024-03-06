<script setup name="m-row" lang="ts">
import { defineComponent, h, useSlots } from 'vue'

import { RowProps } from "./props"

//属性
const props = defineProps(RowProps)

//行组件
const Row = defineComponent(() => {
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
    <Row class="mvi-row" :style="{ justifyContent: justify, alignItems: align }">
        <slot></slot>
    </Row>
</template>

<style scoped src="./row.less"></style>

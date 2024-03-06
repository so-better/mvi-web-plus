<script setup name="m-icon" lang="ts">
import { computed } from 'vue'
import { IconProps } from './props'

const props = defineProps(IconProps)

const iconStyle = computed<any>(() => {
    let style: any = {}
    if (props.url) {
        style.backgroundImage = `url(${props.url})`
        if (props.size) {
            style.width = props.size
            style.height = props.size
        }
    } else {
        if (props.size) {
            style.fontSize = props.size
        }
        if (props.color) {
            style.color = props.color
        }
    }
    return style
})
</script>

<template>
    <i v-if="url" class="mvi-icon-url" :class="{ spin: spin }" :style="iconStyle"></i>
    <i v-else class="mvi-icon" :class="['icon-' + type, spin ? 'spin' : '']" :style="iconStyle"></i>
</template>

<style scoped src="./icon.less"></style>

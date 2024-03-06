<script setup name="m-cell-group" lang="ts">
import { CellGroupProps } from './props'

defineProps(CellGroupProps)
</script>

<template>
    <div :class="['mvi-cell-group', border ? 'border' : '']">
        <div class="mvi-cell-group-title" v-text="title" v-if="title"></div>
        <slot></slot>
    </div>
</template>

<style scoped src="./cell-group.less"></style>

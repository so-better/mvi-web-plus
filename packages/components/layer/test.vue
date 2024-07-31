<template>
	<div>
		<m-button @click="show = !show" id="btn">Layer Target</m-button>
		<m-layer v-model="show" relate="#btn">这是一个悬浮层</m-layer>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
<style lang="less" scoped></style>

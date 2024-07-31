<template>
	<div>
		<m-button type="primary" @click="show = !show">按钮</m-button>
		<m-overlay v-model="show" closable mount-el="body"></m-overlay>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
<style lang="less" scoped></style>

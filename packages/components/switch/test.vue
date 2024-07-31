<template>
	<div>
		<m-switch v-model="checked"></m-switch>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
<style lang="less" scoped></style>

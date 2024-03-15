<template>
	<div class="mvi-p-2">
		<m-picker :options="options" title="hello" selectHeight="1rem"></m-picker>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const options = ref({
	values: ['mvi', 'elementUI', 'iView', 'vant'],
	defaultIndex: 0
})
</script>
<style lang="less"></style>

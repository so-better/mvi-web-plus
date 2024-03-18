<template>
	<div class="mvi-p-2">
		<m-select clearable v-model="val" size="medium" placeholder="请选择" :options="options"></m-select>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const val = ref('')
const options = ref([
	{
		label: 'ElementPlus',
		value: 0
	},
	{
		label: 'Antd UI',
		value: 1
	}
])
</script>
<style lang="less"></style>

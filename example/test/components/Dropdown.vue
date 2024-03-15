<template>
	<div class="mvi-p-2">
		<div class="mvi-mb-4">
			<m-button @click="show = !show">打开遮罩层</m-button>
			<div style="position: relative; width: 100%; height: 5rem">
				<m-dropdown @select="select" round mount-el=".body" use-padding activeColor="#f30" v-model="value" v-model:show="show" :options="options"></m-dropdown>
			</div>
			<div style="height: 2000px">打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层打开遮罩层</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const show = ref(false)
const options = ref([
	{
		label: '选项A',
		value: 0,
		disabled: true
	},
	{
		label: '选项B',
		value: 1
	},
	{
		label: '选项C',
		value: 2,
		icon: 'user'
	},
	{
		label: '选项D',
		value: 3
	}
])

const select = (item, index) => {
	console.log(item, index)
}
</script>
<style lang="less"></style>

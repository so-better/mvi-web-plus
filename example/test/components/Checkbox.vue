<template>
	<div>
		<div>
			<m-checkbox @change="onChange" color="#f30" class="mvi-m-2" label="选项A" v-model="check" disabled></m-checkbox>
		</div>
		<div class="mvi-mt-10">
			{{ value }}
			<m-checkbox @change="onChange" class="mvi-m-2" label="选项A" v-model="value" value="A"></m-checkbox>
			<m-checkbox @change="onChange" class="mvi-m-2" label="选项B" v-model="value" value="B"></m-checkbox>
			<m-checkbox @change="onChange" class="mvi-m-2" label="选项C" v-model="value" value="C"></m-checkbox>
			<m-checkbox @change="onChange" class="mvi-m-2" label="选项D" v-model="value" value="D"></m-checkbox>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const check = ref(false)
const onChange = val => {
	console.log('checkbox改变', val)
}
</script>
<style lang="less"></style>

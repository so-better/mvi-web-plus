<template>
	<div>
		<div>
			<m-radio @change="onChange" color="#f30" class="mvi-m-2" label="选项A" v-model="check"></m-radio>
		</div>
		<div class="mvi-mt-10">
			{{ value }}
			<m-radio @change="onChange" class="mvi-m-2" label="选项A" v-model="value" value="A"></m-radio>
			<m-radio @change="onChange" class="mvi-m-2" label="选项B" v-model="value" value="B"></m-radio>
			<m-radio @change="onChange" class="mvi-m-2" label="选项C" v-model="value" value="C"></m-radio>
			<m-radio @change="onChange" class="mvi-m-2" label="选项D" v-model="value" value="D"></m-radio>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(' ')
const check = ref(false)
const onChange = val => {
	console.log('radio改变', val)
}
</script>
<style lang="less"></style>

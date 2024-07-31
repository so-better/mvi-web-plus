<template>
	<div>
		<m-radio color="#f30" label="选项" v-model="checked"></m-radio>
		<div class="mvi-mt-10">
			<div class="mvi-mb-2">{{ selected }}</div>
			<m-radio disabled class="mvi-m-2" v-model="selected" v-for="item in options" :label="item.label" :value="item.value"></m-radio>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

const checked = ref(false)
const selected = ref(' ')
const options = reactive([
	{
		label: 'Slate',
		value: 'slate'
	},
	{
		label: 'AlexEditor',
		value: 'alex-editor'
	},
	{
		label: 'ProseMirror',
		value: 'prose-mirror'
	}
])
</script>
<style lang="less" scoped></style>

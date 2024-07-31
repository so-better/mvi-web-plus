<template>
	<div>
		<m-button @click="show = !show" type="info">打开/关闭模态框</m-button>
		<m-modal v-model="show" closable title="Modal Title" show-times>
			<div>这是一个模态框</div>
		</m-modal>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
<style lang="less" scoped></style>

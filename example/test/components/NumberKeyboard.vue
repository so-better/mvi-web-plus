<template>
	<div class="mvi-p-2">
		<div><m-button @click="show = !show">按钮</m-button>{{ val }}</div>
		<div style="border: 1px solid #ddd; position: relative; width: 8rem; height: 8rem">
			<m-number-keyboard mount-el=".body" showX title="输入身份证" border v-model="val" promiseEmpty v-model:show="show"></m-number-keyboard>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const val = ref('')
const show = ref(false)
</script>
<style lang="less"></style>

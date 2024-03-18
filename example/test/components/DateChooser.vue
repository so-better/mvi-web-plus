<template>
	<div>
		<m-date-chooser class="mvi-m-2" block v-model="date" trigger="hover">
			<m-button block>日期选择</m-button>
		</m-date-chooser>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
</script>
<style lang="less"></style>

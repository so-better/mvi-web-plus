<template>
	<div class="mvi-p-2">
		<m-calendar type="error" class="mvi-mb-4" v-model="date" view="year"></m-calendar>
		<m-calendar type="warn" class="mvi-mb-4" v-model="date" view="month"></m-calendar>
		<m-calendar type="success" class="mvi-mb-4" v-model="date" view="date"></m-calendar>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
const monthText = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
const weekText = ref(['7', '1', '2', '3', '4', '5', '6'])
</script>
<style lang="less"></style>

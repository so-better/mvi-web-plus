<template>
	<div>
		<m-date-picker :showToolbar="false" mode="year" v-model="date"></m-date-picker>
		<m-date-picker loading title="选择月份" mode="month" v-model="date"></m-date-picker>
		<m-date-picker mode="date" v-model="date"></m-date-picker>
		<m-date-picker mode="datetime" v-model="date"></m-date-picker>
		<m-date-picker mode="time" v-model="date"></m-date-picker>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
</script>
<style lang="less"></style>

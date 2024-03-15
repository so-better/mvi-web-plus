<template>
	<div class="mvi-p-2">
		<m-button @click="$refs.datepicker.trigger()">按钮</m-button>
		<m-date-native-picker ref="datepicker" v-model="date"></m-date-native-picker>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const date = ref<Date>(new Date())
</script>
<style lang="less"></style>

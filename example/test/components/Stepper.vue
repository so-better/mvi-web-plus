<template>
	<div class="mvi-p-2">
		<m-stepper class="mvi-m-2" border v-model="val"></m-stepper>
		<m-stepper class="mvi-m-2" size="small" v-model="val"></m-stepper>
		<m-stepper class="mvi-m-2" size="large" v-model="val"></m-stepper>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const val = ref(0)
</script>
<style lang="less"></style>

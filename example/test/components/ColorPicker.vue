<template>
	<div class="mvi-p-2">
		<m-color-picker v-model="color" :showAlpha="false"></m-color-picker>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#f30')
</script>
<style lang="less"></style>

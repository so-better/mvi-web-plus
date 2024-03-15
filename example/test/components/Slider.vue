<template>
	<div class="mvi-p-2">
		<m-slider v-model="value" round></m-slider>
		<m-slider class="mvi-mt-10 mvi-ml-10" vertical style="height: 4rem" v-model="value"></m-slider>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
<style lang="less"></style>

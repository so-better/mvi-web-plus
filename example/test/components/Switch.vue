<template>
	<div class="mvi-p-2">
		<m-switch class="mvi-m-2" size="1rem" activeColor="#f30" inactiveColor="#bbb" v-model="check"></m-switch>
		<m-switch class="mvi-m-2" v-model="check"></m-switch>
		<m-switch class="mvi-m-2" v-model="check" disabled></m-switch>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const check = ref(false)
</script>
<style lang="less"></style>

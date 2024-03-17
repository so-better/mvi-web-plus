<template>
	<div class="mvi-p-2">
		<m-search v-model="val" @search="$msgbox('search')" placeholder="搜索..." clearable></m-search>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const val = ref('')
</script>
<style lang="less"></style>

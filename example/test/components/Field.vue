<template>
	<div class="mvi-p-2">
		<m-field class="mvi-mb-2" v-model="val" size="small" placeholder="请输入"></m-field>
		<m-field class="mvi-mb-2" activeType="success" prepend="user" v-model="val" placeholder="请输入"></m-field>
		<m-field class="mvi-mb-2" clearable autofocus inputMode="numeric" v-model="val" size="large" placeholder="请输入"></m-field>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const val = ref('')
</script>
<style lang="less"></style>

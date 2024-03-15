<template>
	<div class="mvi-p-2">
		<m-autocomplete round clearable class="mvi-mb-4" size="small" filterMethod v-model="value" placeholder="请输入内容" :list="list"></m-autocomplete>
		<m-autocomplete square align="center" rightIcon="user" :layerProps="{ showTriangle: true, border: true, shadow: false }" clearable class="mvi-mb-4" filterMethod active-type="success" v-model="value" placeholder="请输入内容" :list="list"></m-autocomplete>
		<m-autocomplete leftIcon="user" height="4rem" clearable size="large" :filterMethod="filterMethod" active-color="#66778b" v-model="value" placeholder="请输入内容" :list="list"></m-autocomplete>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const list = ref(['软件工程', '土木工程', '化学与材料', '数学与统计', '汉语言文学', '音乐与美术'])
const filterMethod = (val, _list) => {
	console.log(val, _list)
	return _list
}
</script>
<style lang="less"></style>

<template>
	<div>
		<m-tabbar v-model="index" :tabs="tabs" border></m-tabbar>
		<m-tabbar v-model="index" :tabs="tabs" border fixed activeColor="#f30"></m-tabbar>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)
const tabs = ref([
	{
		value: 0,
		name: '首页',
		icon: 'home',
		route: '/Label'
	},
	{
		value: 1,
		name: '附近'
	},
	{
		value: 2,
		name: '关注'
	},
	{
		value: 3,
		name: '我的'
	}
])
</script>
<style lang="less"></style>

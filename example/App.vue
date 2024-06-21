<template>
	<m-navbar :title="$route.meta.title" border class="navbar" :left-icon="$route.path == '/' ? null : 'angle-left'" @left-click="$router.go(-1)"></m-navbar>
	<div class="body">
		<m-button @click="dark = !dark">{{ dark ? '使用浅色模式' : '使用深色模式' }}</m-button>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDark } from '../packages'

const dark = ref(false)

watch(
	() => dark.value,
	newVal => useDark(newVal)
)
</script>

<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
}

.body {
	position: relative;
	height: calc(100vh - 0.88rem);
	overflow: auto;
	padding: 0.1rem 0;
}

.navbar {
	border-color: #9fe5a0 !important;
	color: #1a6204 !important;
	font-weight: bold;
	font-size: 0.32rem !important;
}
</style>

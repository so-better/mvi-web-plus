<template>
	<m-navbar :title="$route.meta.title || 'mvi-web-plus'" border class="navbar" :left-icon="$route.path == '/' ? null : 'angle-left'" @left-click="$router.go(-1)">
		<template #right>
			<m-button @click="dark = !dark" type="primary" size="mini">{{ dark ? '浅色模式' : '深色模式' }}</m-button>
		</template>
	</m-navbar>
	<div class="body">
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDark } from '../packages'

const dark = ref(false)

watch(
	() => dark.value,
	newVal => useDark(newVal),
	{
		immediate: true
	}
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
</style>

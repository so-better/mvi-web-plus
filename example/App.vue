<template>
	<m-navbar :title="$route.meta.title" border class="navbar" :left-icon="$route.path == '/' ? null : 'angle-left'" @left-click="$router.go(-1)"></m-navbar>
	<div class="body">
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
}

.body {
	height: calc(100vh - 0.88rem);
	overflow: auto;
}

.navbar {
	border-color: #9fe5a0 !important;
	color: #1a6204 !important;
	font-weight: bold;
	font-size: 0.32rem !important;
}
</style>

<template>
	<div class="mvi-p-2">
		<m-button block :active="false" v-ripple="{ color: 'red', duration: 1000 }">红色水波纹的按钮</m-button>
		<div style="border-radius: 50%; width: 2rem; height: 2rem; border: 1px solid #000" v-ripple="{ color: 'red', duration: 1000 }"></div>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped></style>

<template>
	<div class="mvi-p-2">
		<div style="width: 3rem; height: 3rem; border: 1px solid #000" v-ripple="{ color: 'red', duration: 1000 }">
			<m-button @click="$msgbox('hello')" block :active="false" v-ripple="{ color: 'red', duration: 1000 }">红色水波纹的按钮</m-button>
		</div>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped></style>

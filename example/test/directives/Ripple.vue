<template>
	<div class="mvi-p-2">
		<div style="width: 3rem; height: 3rem; border: 1px solid #000" v-ripple>
			<m-button @click="$msgbox('hello')" block :active="false">红色水波纹的按钮</m-button>
		</div>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped></style>

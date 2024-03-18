<template>
	<div>
		<m-swipe-cell>
			<div style="height: 2rem" class="mvi-bg-primary"></div>
			<template #left>
				<div style="width: 2rem; height: 100%" class="mvi-flex-center mvi-bg-success">编辑</div>
			</template>
			<template #right>
				<div style="width: 2rem; height: 100%" class="mvi-flex-center mvi-bg-error">删除</div>
			</template>
		</m-swipe-cell>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less"></style>

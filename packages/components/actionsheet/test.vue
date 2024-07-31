<template>
	<div>
		<m-button @click="show = !show">按钮</m-button>
		<m-actionsheet v-model="show" :options="options"></m-actionsheet>
	</div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const show = ref(false)
const options = reactive([
	{
		label: '分享到朋友圈'
	},
	{
		label: '分享到QQ空间'
	}
])
</script>
<style lang="less" scoped></style>

<template>
	<div class="mvi-p-2">
		<m-button @click="show = !show">打开动作列表</m-button>
		<m-actionsheet size="large" v-model="show" round title="标题" closable :options="options"></m-actionsheet>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const options = ref([
	{
		label: '分享给好友'
	},
	{
		label: '分享到QQ',
		loading: true
	},
	{
		label: '分享到微信朋友圈'
	}
])
</script>
<style lang="less"></style>

<template>
	<div>
		<m-pull-refresh :distance="3" v-model="refresh" style="height: 8rem" @refresh="doRefresh"> </m-pull-refresh>
	</div>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'

const refresh = ref(false)
const $msgbox = inject<(arg: any) => void>('$msgbox')!
const doRefresh = () => {
	setTimeout(() => {
		refresh.value = false //取消刷新状态
		$msgbox('数据加载成功')
	}, 2000)
}
</script>
<style lang="less"></style>

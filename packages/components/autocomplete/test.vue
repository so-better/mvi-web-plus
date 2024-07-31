<template>
	<div>
		<m-autocomplete placeholder="请输入内容" v-model="value" :list="list"></m-autocomplete>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const list = ref(['佛罗里达州', '加利福利亚州', '北京', '伦敦'])
</script>
<style lang="less" scoped></style>

<template>
	<m-row class="wrap">
		<m-col :xs="12" :sm="6" :md="4" :lg="3" :xl="2" v-for="(_item, key) in components">
			<div class="mvi-p-2">
				<div class="item" @click="$router.push(`/${key}`)">{{ key }}</div>
			</div>
		</m-col>
	</m-row>
</template>
<script setup lang="ts">
import { components } from '../../packages'
</script>
<style lang="less" scoped>
.wrap {
	padding: 0.2rem;
}

.item {
	padding: 0.2rem;
	border-radius: 0.08rem;
	border: 1px solid #9fe5a0;
	color: #1a6204;
	font-weight: bold;
	font-size: 0.32rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	transition: all 300ms;

	&:hover {
		cursor: pointer;
		background-color: #cef5cf;
		border-color: #90c490;
	}

	&:active {
		background-color: #9fe5a0;
		border-color: #1a6204;
	}
}
</style>

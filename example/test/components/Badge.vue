<template>
	<div class="mvi-p-2">
		<fieldset class="mvi-mb-10">
			<legend>在按钮中使用</legend>
			<m-badge content="10" class="mvi-m-1">
				<m-button type="info">未读消息</m-button>
			</m-badge>
			<m-badge content="10" class="mvi-m-1" background="#7b8f13">
				<m-button type="info">未读消息</m-button>
			</m-badge>
			<m-badge class="mvi-m-1" dot :offset="['0.05rem', '0.05rem']">
				<m-button type="info">未读消息</m-button>
			</m-badge>
			<m-badge content="..." class="mvi-m-1">
				<m-button type="info">未读消息</m-button>
			</m-badge>
		</fieldset>
		<fieldset class="mvi-mb-10">
			<legend>在导航栏上使用</legend>
			<m-navbar left-text="返回">
				<template #right>
					<m-badge content="10"> 未读消息 </m-badge>
				</template>
			</m-navbar>
			<m-navbar class="mvi-mt-4" left-icon="angle-left">
				<template #right>
					<m-badge content="..." :offset="['0rem', '0.1rem']">
						<m-icon type="bell"></m-icon>
					</m-badge>
				</template>
			</m-navbar>
		</fieldset>
		<fieldset>
			<legend>在底部栏上使用</legend>
			<m-tabbar v-model="active" :tabs="tabbarOptions"> </m-tabbar>
			<m-tabbar class="mvi-mt-4" v-model="active" :tabs="tabbarOptions2"> </m-tabbar>
		</fieldset>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
const tabbarOptions = ref([
	{
		name: '首页',
		value: 0,
		icon: 'home'
	},
	{
		name: '附近',
		value: 1,
		icon: 'map'
	},
	{
		name: '消息',
		value: 2,
		icon: 'bell',
		badge: {
			content: '99',
			offset: ['0rem', '0.2rem']
		}
	},
	{
		name: '我的',
		value: 3,
		icon: 'user'
	}
])
const tabbarOptions2 = ref([
	{
		name: '首页',
		value: 0,
		icon: 'home'
	},
	{
		name: '附近',
		value: 1,
		icon: 'map'
	},
	{
		name: '消息',
		value: 2,
		icon: 'bell',
		badge: {
			content: '...',
			offset: ['0.05rem', '0.2rem']
		}
	},
	{
		name: '我的',
		value: 3,
		icon: 'user'
	}
])
</script>
<style lang="less"></style>

<template>
	<div style="padding: 200px">
		<m-button block @click="show = !show" id="btn">按钮</m-button>
		<m-layer class="a" closable showTriangle relate="#btn" v-model="show" width="10rem" placement="bottom" border borderColor="#f30" background="#f30" :shadow="false"> <div style="height: 100px"></div></m-layer>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			show: false,
			value: '',
			date: new Date(),
			options: [
				{
					label: '选项1',
					value: 0
				},
				{
					label: '选项2',
					value: 1
				},
				{
					label: '选项3',
					value: 2
				},
				{
					label: '选项4',
					value: 3
				},
				{
					label: '选项5',
					value: 4
				}
			]
		}
	},
	mounted() {},
	methods: {}
}
</script>
<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
}
</style>
<style lang="less">
.slide-enter-from,
.slide-leave-to {
	transform: rotate(40deg);
	opacity: 0;
}
</style>

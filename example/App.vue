<template>
	<div class="mvi-p-10">
		<m-button id="btn" @click="onClick">Button</m-button>
		<m-dropdown @show="$alert('show')" v-model="value" v-model:show="show" :options="options"></m-dropdown>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			date: new Date(),
			show: false,
			value: 0,
			options: [
				{
					label: '选项A',
					value: 0
				},
				{
					label: '选项B',
					value: 1
				},
				{
					label: '选项C',
					value: 2
				},
				{
					label: '选项D',
					value: 3
				}
			],
			images: ['https://www.ling0523.cn/images/image_2_1701871044734.jpg', 'https://www.ling0523.cn/images/image_1_1701871044699.jpg', 'https://www.ling0523.cn/images/image_0_1701871044625.jpg', 'https://www.ling0523.cn/images/image_0_1701164609409.jpg'],
			desc: ['图片1', '图片2', '图片3图片3图片3图片3图片3图片3图片3图片3图片3图片3图片3', '图片4']
		}
	},
	methods: {
		onClick() {
			this.show = !this.show
		},
		onlyClick() {
			console.log('触发了onlyClick')
		}
	}
}
</script>

<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
	overflow: auto;
}
</style>

<template>
	<div class="mvi-p-10">
		<m-button @click="onClick">Button</m-button>
	</div>
</template>

<script>
import { Dialog } from '../packages'
export default {
	data() {
		return {
			page: 1,
			show: false,
			value: ''
		}
	},
	methods: {
		onClick() {
			Dialog.alert('hello')
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

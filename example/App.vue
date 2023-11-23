<template>
	<div class="mvi-p-4">
		<m-button>按钮</m-button>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			value: ``,
			spyOpt: {
				el: '#root',
				beforeEnter(el) {
					console.log('beforeEnter', el)
				},
				enter(el) {
					console.log('enter', el)
				},
				beforeLeave(el) {
					console.log('beforeLeave', el)
				},
				leave(el) {
					console.log('leave', el)
				}
			},
			show: false,
			dayjs: dayjs,
			date: new Date()
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
}

.a-tabs {
	.mvi-tab-header.active {
		background-color: #053b7e !important;
		font-weight: bold;
	}

	.mvi-tabs-header.card {
		border-color: #053b7e !important;
	}

	.mvi-tabs-header.card .mvi-tab-header {
		border-right-color: #053b7e !important;
	}
}
</style>

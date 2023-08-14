<template>
	<div class="mvi-p-4">
		<div>
			<m-button @click="loading = !loading">打开图片预览</m-button>
		</div>
		<m-pull-refresh v-model="refresh" @refresh="change" style="height: 8rem" id="a">
			<m-list ref="list" :finished="finished" v-model:loading="loading" loading-icon="load-e" v-model:error="error" @load="loadMore" immediate-load scroll-el="#a .mvi-pull-refresh-wrapper">
				<m-cell border v-for="(item, index) in list" :title="'单元格' + index"></m-cell>
			</m-list>
		</m-pull-refresh>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			refresh: false,
			error: false,
			loading: false,
			list: [],
			finished: false
		}
	},
	methods: {
		change() {},
		loadMore() {
			setTimeout(() => {
				this.loading = false
				this.error = false
				this.list = [...this.list, ...new Array(30)]
				if (this.list.length > 100) {
					this.finished = true
				}
			}, 2000)
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

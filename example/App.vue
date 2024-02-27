<template>
	<div style="padding: 20px">
		<m-button @click="show = !show">按钮</m-button>
		<m-form block width="6rem">
			<m-form-el label="用户名">
				<m-field placeholder="请输入用户名"></m-field>
			</m-form-el>
			<m-form-el label="手机号">
				<m-field placeholder="请输入手机号"></m-field>
			</m-form-el>
			<m-form-el label="密码">
				<m-field placeholder="请输入密码"></m-field>
			</m-form-el>
		</m-form>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			value: '',
			show: false,
			date: new Date(),
			list: ['佛罗里达州', '加利福利亚州', '北京', '伦敦']
		}
	},
	mounted() {},
	methods: {
		loadMore() {
			setTimeout(() => {
				this.loading = false
				this.error = false
				this.list = [...this.list, ...new Array(30)]
				if (this.list.length > 100) {
					this.finished = true
				}
			}, 1000)
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

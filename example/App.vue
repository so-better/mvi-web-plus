<template>
	<div class="mvi-p-10">
		<m-button @click="onClick">Button</m-button>
		<m-form>
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
export default {
	data() {
		return {
			show: false,
			value: 0,
			date: new Date(),
			options: {
				values: ['mvi', 'elementUI', 'iView', 'vant'], //设置选项
				defaultIndex: 0 //设置默认选项序列
			}
		}
	},
	mounted() {},
	methods: {
		onClick() {}
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

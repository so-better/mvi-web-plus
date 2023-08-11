<template>
	<div class="mvi-p-4">
		<div>{{ dayjs(date).format('YYYY-MM-DD HH:mm') }}</div>
		<m-form block width="10rem" labelOffset="1rem">
			<m-form-el label="用户名" width="6rem">
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
			dayjs: dayjs,
			date: dayjs('2021-06-29 14:31').toDate(),
			value: '',
			show: false,
			options: [
				{
					label: '选项A',
					value: 0,
					disabled: true,
					icon: 'home'
				},
				{
					label: '选项B',
					value: 1,
					icon: 'home'
				},
				{
					label: '选项C',
					value: 2,
					icon: 'home'
				},
				{
					label: '选项D',
					value: 3,
					icon: 'home'
				}
			]
		}
	},
	mounted() {},
	methods: {
		change(val) {
			console.log(val)
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

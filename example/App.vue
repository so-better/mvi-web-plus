<template>
	<div class="mvi-p-4">
		<div>{{ dayjs(date).format('YYYY-MM-DD HH:mm') }}</div>
		<m-date-chooser :layer-props="{ width: '4rem' }" style="width: 7rem" type="success" v-model="date" block mode="month" trigger="custom">
			<m-field :model-value="dayjs(date).format('YYYY-MM-DD')"></m-field>
		</m-date-chooser>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			dayjs: dayjs,
			date: dayjs('2021-06-29 14:31').toDate(),
			value: 0,
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
		change(val, index) {
			console.log(val, index)
			return index
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

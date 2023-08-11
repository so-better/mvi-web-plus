<template>
	<div class="mvi-p-4">
		<div>{{ dayjs(date).format('YYYY-MM-DD HH:mm') }}</div>
		<m-swiper ref="swiper" width="40vw" height="4rem" fade showControl showIndicators activeColor="#f30" inactiveColor="#000" :interval="1000" autoplay loop>
			<m-swiper-slide class="mvi-bg-success">1</m-swiper-slide>
			<m-swiper-slide class="mvi-bg-info">2</m-swiper-slide>
			<m-swiper-slide class="mvi-bg-warn">3</m-swiper-slide>
			<m-swiper-slide class="mvi-bg-error">4</m-swiper-slide>
		</m-swiper>
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
			this.$showLoadingBar('#f30')
			setTimeout(() => {
				this.$hideLoadingBar()
			}, 3000)
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

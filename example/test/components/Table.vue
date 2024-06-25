<template>
	<div>
		<m-table :data="data" :columns="columns" border columnBorder stripe activeColor="#f30"> </m-table>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
	{
		name: '张三',
		age: 14,
		score: 80
	},
	{
		name: '李四李四李四李四李四李四李四李四李四李四李四李四李四',
		age: 16,
		score: 55
	},
	{
		name: '小王',
		age: 15,
		score: 77
	}
])
const columns = ref([
	{
		type: 'selection',
		selectable: (row, rowIndex) => {
			if (rowIndex == 0) {
				return false
			}
			return true
		}
	},
	{
		prop: 'name',
		label: '姓名',
		ellipsis: true,
		sortable: true,
		className: 'mvi-text-success'
	},
	{
		prop: 'age',
		label: '年龄'
		//hidden: true
	},
	{
		prop: 'score',
		label: '分数',
		ellipsis: true,
		width: '100px',
		format: val => {
			return `<span>这是一个很长的文字这是一个很长的文字</span><br/><span>这是一个很长的文字这是一个很长的文字</span><br/><span>这是一个很长的文字这是一个很长的文字</span>`
		}
	}
])
</script>
<style lang="less"></style>

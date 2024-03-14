<template>
	<div>
		<m-input @keyup="keyUp" border clearable v-model="text" label="姓名" labelWidth="1rem" placeholder="请输入内容" left="user"></m-input>
		<m-input clearable right="user" size="large" v-model="text" label="姓名" labelWidth="1rem" placeholder="请输入内容" align="center"></m-input>
		<m-input clearable size="large" v-model="text" type="textarea" label="备注" labelWidth="1rem" placeholder="请输入内容" :autosize="{ maxRows: 7, minRows: 4 }"></m-input>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')

const keyUp = (e: MouseEvent, val: string) => {
	console.log(e.currentTarget, val)
}
</script>
<style lang="less"></style>

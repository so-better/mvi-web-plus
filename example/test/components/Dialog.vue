<template>
	<div class="mvi-p-2">
		<m-button class="mvi-m-2" @click="alert">alert</m-button>
		<m-button class="mvi-m-2" @click="confirm">confirm</m-button>
		<m-button class="mvi-m-2" @click="prompt">prompt</m-button>
		<m-button class="mvi-m-2" @click="Alert">Alert</m-button>
		<m-button class="mvi-m-2" @click="Confirm">Confirm</m-button>
		<m-button class="mvi-m-2" @click="Prompt">Prompt</m-button>
	</div>
</template>
<script setup lang="ts">
import { inject } from 'vue'

const $alert = inject<(arg: any) => InstanceType<typeof Promise>>('$alert')!
const $confirm = inject<(arg: any) => InstanceType<typeof Promise>>('$confirm')!
const $prompt = inject<(arg: any) => InstanceType<typeof Promise>>('$prompt')!
const $Alert = inject<(arg: any) => InstanceType<typeof Promise>>('$Alert')!
const $Confirm = inject<(arg: any) => InstanceType<typeof Promise>>('$Confirm')!
const $Prompt = inject<(arg: any) => InstanceType<typeof Promise>>('$Prompt')!

const alert = () => {
	$alert({
		title: '警报警报',
		message: '敌军还有三十秒到达战场',
		ios: true,
		btnText: 'hello'
	})
}
const confirm = () => {
	$confirm({
		title: '提示',
		message: '确实删除此消息吗？'
	}).then(res => {
		console.log(res)
	})
}
const prompt = () => {
	$prompt({
		title: '标题',
		message: '请在下方输入内容',
		input: {
			placeholder: '请输入内容'
		}
	}).then(res => {
		console.log(res)
	})
}
const Alert = () => {
	$Alert({
		title: '标题2',
		btns: {
			ok: {
				type: 'success',
				plain: true
			}
		},
		message: '这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗'
	})
}
const Confirm = () => {
	$Confirm({
		title: '标题2',
		btns: {
			ok: {
				type: 'success',
				plain: true
			}
		},
		message: '这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗'
	}).then(res => {
		console.log(res)
	})
}
const Prompt = () => {
	$Prompt({
		title: '标题2',
		btns: {
			ok: {
				type: 'success',
				plain: true
			}
		},
		message: '这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗这是一个弹窗'
	}).then(res => {
		console.log(res)
	})
}
</script>
<style lang="less"></style>

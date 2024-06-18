<template>
	<div class="mvi-p-2">
		<Form></Form>
		<m-form block>
			<m-form-el label="用户名" width="3rem">
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
<script setup lang="ts">
import { defineComponent, resolveComponent, h } from 'vue'

const Form = defineComponent(() => {
	return () => {
		return h(
			resolveComponent('m-form'),
			{
				block: true
			},
			{
				default: () =>
					h(
						resolveComponent('m-form-el'),
						{},
						{
							default: () => h('span', '333')
						}
					)
			}
		)
	}
})
</script>
<style lang="less"></style>

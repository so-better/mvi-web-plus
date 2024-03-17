<template>
	<div class="mvi-p-2">
		<m-steps :active="0" activeColor="#f30" active-icon="user">
			<m-step>买家下单</m-step>
			<m-step>商家接单</m-step>
			<m-step>买家提货</m-step>
			<m-step>交易完成</m-step>
		</m-steps>
		<m-steps vertical :active="0">
			<m-step>买家下单</m-step>
			<m-step>商家接单</m-step>
			<m-step>买家提货</m-step>
			<m-step>交易完成</m-step>
		</m-steps>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less"></style>

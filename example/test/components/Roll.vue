<template>
	<div>
		<div class="mvi-mb-10">
			<m-button class="mvi-m-2" @click="$refs.roll.play()">播放</m-button>
			<m-button class="mvi-m-2" @click="$refs.roll.stop()">停止</m-button>
			<m-button class="mvi-m-2" @click="$refs.roll.pause()">暂停</m-button>
		</div>
		<m-roll @play="$msgbox('play')" @pause="$msgbox('pause')" @stop="$msgbox('stop')" center :interval="3000" ref="roll" animation="ease-out" clickStop hoverStop direction="up">
			<div>我是滚动的内容</div>
		</m-roll>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="less"></style>

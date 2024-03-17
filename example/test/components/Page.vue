<template>
	<div class="mvi-p-2">
		<m-page color="#f30" class="mvi-mb-4" v-model="page" :total="10"></m-page>
		<m-page prevText="上一页" nextText="下一页" simple v-model="page2" :total="50" :overNumber="11"></m-page>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const page2 = ref(1)
</script>
<style lang="less"></style>

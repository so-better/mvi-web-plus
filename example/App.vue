<template>
	<div class="mvi-p-4">
		<m-table :data="data" :columns="columns"></m-table>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			data: [
				{
					library_id: 31,
					library_name: 'dap-util',
					library_description: '一个轻量的前端JavaScript工具库，专注于JavaScript，不关心UI',
					library_git: 'https://github.com/lovelin0523/dap-util',
					library_npm: 'https://www.npmjs.com/package/dap-util',
					library_cnpm: 'https://cnpmjs.org/package/dap-util',
					library_public: 0,
					library_create: 1634033822387,
					library_update: 1691384326074,
					library_label: 'js,工具,dom,事件,event'
				},
				{
					library_id: 24,
					library_name: 'web-image-compression',
					library_description: '一款轻量且简单的web前端图片压缩插件',
					library_git: 'https://github.com/lovelin0523/web-image-compression',
					library_npm: 'https://www.npmjs.com/package/web-image-compression',
					library_cnpm: 'https://cnpmjs.org/package/web-image-compression',
					library_public: 0,
					library_create: 1616859167328,
					library_update: 1685518648807,
					library_label: 'js,图片压缩,image'
				},
				{
					library_id: 7,
					library_name: 'ruax',
					library_description: '一个轻量级的Javascript异步数据请求库，类似于axios或者ajax，独立封装，快速上手',
					library_git: 'https://github.com/lovelin0523/ruax',
					library_npm: 'https://www.npmjs.com/package/ruax',
					library_cnpm: 'https://cnpmjs.org/package/ruax',
					library_public: 0,
					library_create: 1589994908729,
					library_update: 1685517713574,
					library_label: 'js,xmlHttpRequest,ajax,axios'
				},
				{
					library_id: 9,
					library_name: 'rem-fit',
					library_description: '一款针对rem适配页面的轻量级插件库，用以动态设置HTML根节点的字体大小',
					library_git: 'https://github.com/lovelin0523/rem-fit',
					library_npm: 'https://www.npmjs.com/package/rem-fit',
					library_cnpm: 'https://cnpmjs.org/package/rem-fit',
					library_public: 0,
					library_create: 1591118956377,
					library_update: 1685517412942,
					library_label: 'html,js,移动端适配,rem,viewport'
				},
				{
					library_id: 23,
					library_name: 'animator-clip',
					library_description: '一个基于requestAnimationFrame封装的轻量级JS动画插件',
					library_git: 'https://github.com/lovelin0523/animator-clip',
					library_npm: 'https://www.npmjs.com/package/animator-clip',
					library_cnpm: 'https://cnpmjs.org/package/animator-clip',
					library_public: 0,
					library_create: 1611888998899,
					library_update: 1685517314072,
					library_label: 'js,requestAnimationFrame,动画'
				},
				{
					library_id: 12,
					library_name: 'mysql-op',
					library_description: '基于express框架的node后端对mysql数据库的一个sql操作工具',
					library_git: 'https://github.com/lovelin0523/mysql-op',
					library_npm: 'https://www.npmjs.com/package/mysql-op',
					library_cnpm: 'https://cnpmjs.org/package/mysql-op',
					library_public: 0,
					library_create: 1591372071095,
					library_update: 1678777682896,
					library_label: 'express,nodejs,mysql,工具'
				},
				{
					library_id: 30,
					library_name: 'refex',
					library_description: '一个基于Proxy的数据响应式轻量前端框架',
					library_git: 'https://github.com/lovelin0523/refex',
					library_npm: 'https://www.npmjs.com/package/refex',
					library_cnpm: 'https://cnpmjs.org/package/refex',
					library_public: 0,
					library_create: 1631016705202,
					library_update: 1677567388328,
					library_label: 'js,mvvm,响应式,vue'
				},
				{
					library_id: 28,
					library_name: 'mvi-admin-cli',
					library_description: '帮助你快速创建一个基于MVI的vue-cli管理系统模板',
					library_git: 'https://github.com/lovelin0523/mvi-admin-cli',
					library_npm: 'https://www.npmjs.com/package/mvi-admin-cli',
					library_cnpm: 'https://cnpmjs.org/package/mvi-admin-cli',
					library_public: 0,
					library_create: 1626680708687,
					library_update: 1652325475245,
					library_label: '前端,vue,mvi,vue-cli,管理系统模板'
				},
				{
					library_id: 15,
					library_name: 'fd-op',
					library_description: 'NodeJS后端针对文件和目录操作的封装工具类',
					library_git: 'https://github.com/lovelin0523/fd-op',
					library_npm: 'https://www.npmjs.com/package/fd-op',
					library_cnpm: 'https://cnpmjs.org/package/fd-op',
					library_public: 0,
					library_create: 1600739380781,
					library_update: 1628230437500,
					library_label: 'nodejs,后端,express,file,fs'
				},
				{
					library_id: 11,
					library_name: 'express-node-cli',
					library_description: '一个用以快速搭建基于express框架的node.js项目的脚手架',
					library_git: 'https://github.com/lovelin0523/express-node-cli',
					library_npm: 'https://www.npmjs.com/package/express-node-cli',
					library_cnpm: 'https://cnpmjs.org/package/express-node-cli',
					library_public: 0,
					library_create: 1591368242922,
					library_update: 1625042098749,
					library_label: 'nodejs,express,脚手架'
				}
			],
			columns: [
				{
					prop: 'library_id',
					label: 'id'
				},
				{
					prop: 'library_name',
					label: '插件名称'
				},
				{
					prop: 'library_description',
					label: '插件描述'
				},
				{
					prop: 'library_git',
					label: 'git地址'
				},
				{
					prop: 'library_npm',
					label: 'npm地址'
				},
				{
					prop: 'library_cnpm',
					label: 'cnpm地址'
				},
				{
					prop: 'library_public',
					label: '是否公开'
				},
				{
					prop: 'library_create',
					label: '创建时间'
				},
				{
					prop: 'library_update',
					label: '更新时间'
				},
				{
					prop: 'library_label',
					label: '标签'
				}
			]
		}
	},
	methods: {
		change(e) {
			this.page = 2
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
	overflow-x: hidden;
	overflow-y: auto;
}

.a-tabs {
	.mvi-tab-header.active {
		background-color: #053b7e !important;
		font-weight: bold;
	}

	.mvi-tabs-header.card {
		border-color: #053b7e !important;
	}

	.mvi-tabs-header.card .mvi-tab-header {
		border-right-color: #053b7e !important;
	}
}
</style>

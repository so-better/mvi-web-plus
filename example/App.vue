<template>
	<div class="mvi-p-4">
		<m-editor-menus ref="editor-menus">
			<m-editor-menu v-for="item in EditorDefinedMenuConfig" :name="item.name"></m-editor-menu>
		</m-editor-menus>
		<m-editor v-model="value" ref="editor"></m-editor>
		<div id="res"></div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
import { EditorDefinedMenuConfig } from '../packages'
export default {
	data() {
		return {
			EditorDefinedMenuConfig: EditorDefinedMenuConfig,
			value: `<blockquote><span>&nbsp;MVI内提供了很多现有的辅助样式类，用于简单的样式修改，可以直接使用，无需你再次手写样式&nbsp;&nbsp;&nbsp;</span></blockquote><p><br></p><p><br></p><h5><span>Y轴滚动回弹：解决dom元素在ios端的滚动条滚动不流畅、弹性动画丢失的问题</span></h5><p><br></p><pre><span>&lt;div&nbsp;class="mvi-scrolling-touch"&gt;&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>文本样式</span></h5><p><br></p><pre><span>&lt;!--&nbsp;错误文本样式&nbsp;--&gt;&nbsp;
&lt;p&nbsp;class="mvi-text-error"&gt;Hello&nbsp;World&lt;/p&gt;</span></pre><pre><span>&lt;!--&nbsp;警告文本样式&nbsp;--&gt;
&lt;p&nbsp;class="mvi-text-warn"&gt;Hello&nbsp;World&lt;/p&gt;</span></pre><pre><span>&lt;!--&nbsp;信息文本样式&nbsp;--&gt;
&lt;p&nbsp;class="mvi-text-info"&gt;Hello&nbsp;World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 成功文本样式 --&gt;
&lt;p class="mvi-text-success"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 首要文本样式 --&gt;
&lt;p class="mvi-text-primary"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 链接文本样式 --&gt;
&lt;p class="mvi-text-link"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 柔和文本样式 --&gt;
&lt;p class="mvi-text-muted"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 白色文本样式 --&gt;
&lt;p class="mvi-text-white"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 副文本样式 --&gt;
&lt;p class="mvi-text-sub"&gt;Hello World&lt;/p&gt;</span></pre><p><br></p><p><br></p><h5><span>背景样式</span></h5><p><br></p><pre><span>&lt;!-- 成功背景色 --&gt;
&lt;p class="mvi-bg-success"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 警告背景色 --&gt;
&lt;p class="mvi-bg-warn"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 信息背景色 --&gt;
&lt;p class="mvi-bg-info"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 首要背景色 --&gt;
&lt;p class="mvi-bg-primary"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 错误背景色 --&gt;
&lt;p class="mvi-bg-error"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 柔和背景色 --&gt;
&lt;p class="mvi-bg-muted"&gt;Hello World&lt;/p&gt;</span></pre><p><br></p><p><br></p><h5><span>文本对齐方式</span></h5><p><br></p><pre><span>&lt;!-- 左对齐 --&gt;
&lt;p class="mvi-text-left"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 右对齐 --&gt;
&lt;p class="mvi-text-right"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 居中对齐 --&gt;
&lt;p class="mvi-text-center"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 两端对齐 --&gt;
&lt;p class="mvi-text-justify"&gt;Hello World&lt;/p&gt;</span></pre><p><br></p><p><br></p><h5><span>水平垂直居中：使用flex来设置元素内容的水平和垂直居中</span></h5><p><br></p><pre><span>&lt;!-- 块元素内容水平垂直居中 --&gt;
&lt;div class="mvi-flex-center"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 行内元素内容水平垂直居中 --&gt;
&lt;div class="mvi-inline-center"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>flex布局</span></h5><p><br></p><pre><span>&lt;!-- 从左到右排列 --&gt;
&lt;div class="mvi-flex-start"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 从右到左排列 --&gt;
&lt;div class="mvi-flex-end"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 两端排列 --&gt;
&lt;div class="mvi-flex-between"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 等分排列 --&gt;
&lt;div class="mvi-flex-around"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>圆角辅助</span></h5><p><br></p><pre><span>&lt;!-- 默认圆角 --&gt;
&lt;div class="mvi-radius-default"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 大圆角 --&gt;
&lt;div class="mvi-radius-round"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 圆形 --&gt;
&lt;div class="mvi-radius-circle"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>文本粗细</span></h5><p><br></p><pre><span>&lt;!-- 加粗 --&gt;
&lt;div class="mvi-text-bold"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 默认 --&gt;
&lt;div class="mvi-text-normal"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 变细 --&gt;
&lt;div class="mvi-text-light"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>外边距辅助：类名最后的数字取值范围为0-20</span></h5><p><br></p><pre><span>&lt;!-- 外边距 --&gt;
&lt;div class="mvi-m-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 左外边距 --&gt;
&lt;div class="mvi-ml-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 右外边距 --&gt;
&lt;div class="mvi-mr-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 上外边距 --&gt;
&lt;div class="mvi-mt-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 下外边距 --&gt;
&lt;div class="mvi-mb-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 水平外边距 --&gt;
&lt;div class="mvi-mx-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 垂直外边距 --&gt;
&lt;div class="mvi-my-1"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>内边距辅助：类名最后数字取值范围为0-20</span></h5><p><br></p><pre><span>&lt;!-- 内边距 --&gt;
&lt;div class="mvi-p-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 左内边距 --&gt;
&lt;div class="mvi-pl-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 右内边距 --&gt;
&lt;div class="mvi-pr-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 上内边距 --&gt;
&lt;div class="mvi-pt-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 下内边距 --&gt;
&lt;div class="mvi-pb-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 水平内边距 --&gt;
&lt;div class="mvi-px-1"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 垂直内边距 --&gt;
&lt;div class="mvi-py-1"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><video src="https://www.mvi-web.cn/bg.mp4" controls style="width:300px;"></video><span>文本省略</span></h5><p><br></p><pre><span>&lt;!-- 单行文本溢出省略 --&gt;
&lt;div class="mvi-text-ellipsis"&gt;Hello World&lt;/div&gt;</span></pre><pre><span>&lt;!-- 多行文本溢出省略，类名后的数字取值范围为1-5，表示超出1-5行后显示省略号 --&gt;
&lt;div class="mvi-ellipsis-1"&gt;Hello World&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>鼠标悬浮手指</span></h5><p><br></p><pre><span>&lt;p class="mvi-cursor-pointer"&gt;Hello World&lt;/p&gt;</span></pre><p><br></p><p><br></p><h5><span>输入框默认样式：仅在input元素上有效</span></h5><p><br></p><pre><span>&lt;input type="text" class="mvi-default-input" /&gt;</span></pre><p><br></p><p><br></p><h5><span>文本域默认样式：仅在textarea元素上有效</span></h5><p><br></p><pre><span>&lt;textarea class="mvi-default-textarea"&gt;&lt;/textarea&gt;</span></pre><p><br></p><p><br></p><h5><span>按钮默认样式：任意元素有效</span></h5><p><br></p><pre><span>&lt;div class="mvi-default-btn"&gt;Button&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>字体大小辅助</span></h5><p><br></p><pre><span>&lt;!-- 较小的字体 --&gt;
&lt;p class="mvi-font-small"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- 默认字体 --&gt;
&lt;p class="mvi-font-default"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- h1标题字体 --&gt;
&lt;p class="mvi-font-h1"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- h2标题字体 --&gt;
&lt;p class="mvi-font-h2"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- h3标题字体 --&gt;
&lt;p class="mvi-font-h3"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- h4标题字体 --&gt;
&lt;p class="mvi-font-h4"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- h5标题字体 --&gt;
&lt;p class="mvi-font-h5"&gt;Hello World&lt;/p&gt;</span></pre><pre><span>&lt;!-- h6标题字体 --&gt;
&lt;p class="mvi-font-h6"&gt;Hello World&lt;/p&gt;</span></pre><p><br></p><p><br></p><h5><span>基于断点的隐藏辅助类</span></h5><p><br></p><pre><span>&lt;!-- 在任意情况下都隐藏元素 --&gt;
&lt;div class="mvi-hidden"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 小于1920px下隐藏元素 --&gt;
&lt;div class="mvi-hidden-down-lg"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 小于1440px下隐藏元素 --&gt;
&lt;div class="mvi-hidden-down-md"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 小于992px下隐藏元素 --&gt;
&lt;div class="mvi-hidden-down-sm"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 小于640px下隐藏元素 --&gt;
&lt;div class="mvi-hidden-down-xs"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 大于等于1920px时隐藏元素 --&gt;
&lt;div class="mvi-hidden-up-xl"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 大于等于1440px时隐藏元素 --&gt;
&lt;div class="mvi-hidden-up-lg"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 大于等于992px时隐藏元素 --&gt;
&lt;div class="mvi-hidden-up-md"&gt;&lt;/div&gt;</span></pre><pre><span>&lt;!-- 大于等于640px时隐藏元素 --&gt;
&lt;div class="mvi-hidden-up-sm"&gt;&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>阴影辅助类</span></h5><p><br></p><pre><span>&lt;!-- 显示阴影效果 --&gt;
&lt;div class="mvi-shadow"&gt;&lt;/div&gt;</span></pre><p><br></p><p><br></p><h5><span>vue动画辅助类（需要结合vue的transition组件，该辅助类作为transition组件的name值直接传入）</span></h5><p><br></p><pre><span>&lt;!-- 渐变 --&gt;
&lt;transition name="mvi-transition-fade"&gt;&lt;/transition&gt;</span></pre><pre><span>&lt;!-- 自右向左渐入 --&gt;
&lt;transition name="mvi-transition-left"&gt;&lt;/transition&gt;</span></pre><pre><span>&lt;!-- 自左向右渐入 --&gt;
&lt;transition name="mvi-transition-right"&gt;&lt;/transition&gt;</span></pre><pre><span>&lt;!-- 自上向下渐入 --&gt;
&lt;transition name="mvi-transition-down"&gt;&lt;/transition&gt;</span></pre><pre><span>&lt;!-- 自下向上渐入 --&gt;
&lt;transition name="mvi-transition-up"&gt;&lt;/transition&gt;</span></pre><pre><span>&lt;!-- 自小变大渐入 --&gt;
&lt;transition name="mvi-transition-large"&gt;&lt;/transition&gt;</span></pre><pre><span>&lt;!-- 自大变小渐入 --&gt;
&lt;transition name="mvi-transition-small"&gt;&lt;/transition&gt;</span></pre><p><br></p>`,
			dayjs: dayjs,
			date: new Date()
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs['editor-menus'])
	},
	methods: {}
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

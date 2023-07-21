<template>
	<div class="mvi-p-10">
		<!-- <div>{{ value }}</div> -->
		<div class="mvi-mb-4">
			<m-button @click="disabled = !disabled">禁用/启用编辑器</m-button>
		</div>
		<m-editor-menus border useTooltip class="mvi-mb-4" ref="menus">
			<m-editor-menu :disabled="disabled" v-for="item in definedMenus" :name="item.name" />
		</m-editor-menus>
		<m-editor customImagePaste @paste-image="pasteImage" placeholder="请输入内容" border :disabled="disabled" @change="change" ref="editor" v-model="value" height="10rem"></m-editor>
	</div>
</template>
<script>
import { definedEditorMenus } from '../packages'
export default {
	data() {
		return {
			//https://www.mvi-web.cn/mvi-resources/images/mvi_image_0_1676971974565.png
			show: true,
			disabled: false,
			value: `<h5>基本使用</h5><p><br></p><p>使用v-model来绑定开关&nbsp;&nbsp;<br></p><pre mvi-editor-element-code="1"><span style="color: rgb(11, 115, 222);">&lt;m-s\nwitch v-model=</span><span style="color: rgb(99, 74, 165);">"checked"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/m-switch&gt;</span></pre><p><br></p><p><br></p><h5>加载状态</h5><p><br></p><p>使用loading属性使开关处于加载状态，此时不可点击&nbsp;&nbsp;<br></p><pre mvi-editor-element-code="2"><span style="color: rgb(11, 115, 222);">&lt;m-switch loading v-model=</span><span style="color: rgb(99, 74, 165);">"checked"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/m-switch&gt;</span></pre><p><br></p><p><br></p><h5>禁用状态</h5><p><br></p><p>使用disabled属性使开关禁用&nbsp;&nbsp;<br></p><pre mvi-editor-element-code="3"><span style="color: rgb(11, 115, 222);">&lt;m-switch disabled v-model=</span><span style="color: rgb(99, 74, 165);">"checked"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/m-switch&gt;</span></pre><p><br></p><p><br></p><h5>设置开关的大小</h5><p><br></p><p>使用size属性来更改开关的大小尺寸&nbsp;&nbsp;<br></p><pre mvi-editor-element-code="4"><span style="color: rgb(11, 115, 222);">&lt;m-switch size=</span><span style="color: rgb(99, 74, 165);">"1rem"</span><span style="color: rgb(11, 115, 222);"> v-model=</span><span style="color: rgb(99, 74, 165);">"checked"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/m-switch&gt;</span></pre><p><br></p><p><br></p><h5>更改开关的颜色</h5><p><br></p><p>使用active-color和inactive-color属性来更改开关打开和关闭时的颜色&nbsp;&nbsp;<br></p><pre mvi-editor-element-code="5"><span style="color: rgb(11, 115, 222);">&lt;m-switch active-color=</span><span style="color: rgb(99, 74, 165);">"#000"</span><span style="color: rgb(11, 115, 222);"> inactive-color=</span><span style="color: rgb(99, 74, 165);">"#ff3300"</span><span style="color: rgb(11, 115, 222);"> v-model=</span><span style="color: rgb(99, 74, 165);">"checked"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/m-switch&gt;</span></pre><p><br></p><p><br></p><h5>props</h5><table data-v-66d8370f="" cellpadding="0" cellspacing="0" mvi-editor-insert-table="" class="mvi-editor-table-demo"><tbody data-v-66d8370f="" mvi-editor-insert-table=""><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table="">参数</td><td data-v-66d8370f="" mvi-editor-insert-table="">类型</td><td data-v-66d8370f="" mvi-editor-insert-table="">说明</td><td data-v-66d8370f="" mvi-editor-insert-table="">可取值</td><td data-v-66d8370f="" mvi-editor-insert-table="">默认值</td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">v-model</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">boolean</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">控制开关</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">true/false</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">false</span></td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">size</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">string</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">开关的尺寸大小</span></td><td data-v-66d8370f="" mvi-editor-insert-table="">-</td><td data-v-66d8370f="" mvi-editor-insert-table="">0.4rem</td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">loading</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">boolean</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">开关是否显示加载状态</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">true/false</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">false</span></td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">disabled</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">boolean</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">是否禁用开关</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">true/false</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">false</span></td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">active-color</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">string</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">开关打开的颜色</span></td><td data-v-66d8370f="" mvi-editor-insert-table="">-</td><td data-v-66d8370f="" mvi-editor-insert-table="">-</td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">inactive-color</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">string</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">开关关闭的颜色</span></td><td data-v-66d8370f="" mvi-editor-insert-table="">-</td><td data-v-66d8370f="" mvi-editor-insert-table="">-</td></tr><tr data-v-66d8370f="" mvi-editor-insert-table=""><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">icon</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">string | object</span></td><td data-v-66d8370f="" mvi-editor-insert-table=""><span style="text-align: left;">加载状态时显示的图标，取值为字符串时表示icon组件的type，取值为对象时，参考icon组件属性，如{type:'load-a',spin:true}</span></td><td data-v-66d8370f="" mvi-editor-insert-table="">-</td><td data-v-66d8370f="" mvi-editor-insert-table="">load-e</td></tr></tbody></table><br><p><br></p><h5>events</h5><table data-v-d3491eaa="" cellpadding="0" cellspacing="0" mvi-editor-insert-table="" class="mvi-editor-table-demo"><tbody data-v-d3491eaa="" mvi-editor-insert-table=""><tr data-v-d3491eaa="" mvi-editor-insert-table=""><td data-v-d3491eaa="" mvi-editor-insert-table="">事件</td><td data-v-d3491eaa="" mvi-editor-insert-table="">说明</td></tr><tr data-v-d3491eaa="" mvi-editor-insert-table=""><td data-v-d3491eaa="" mvi-editor-insert-table="">change</td><td data-v-d3491eaa="" mvi-editor-insert-table="">开关状态变化时触发，回调参数为v-model绑定的值</td></tr></tbody></table>`,
			definedMenus: definedEditorMenus
		}
	},
	mounted() {
		this.$refs.editor.use(this.$refs.menus)
	},
	methods: {
		change(newVal, oldVal) {
			//console.log(newVal)
		},
		pasteFile(files) {
			//console.log(files)
		},
		customMenu(res) {
			//console.log('触发自定义菜单操作', res)
		},
		pasteImage(url) {
			console.log(url)
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

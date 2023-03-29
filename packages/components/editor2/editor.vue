<template>
	<div class="mvi-editor">
		<div ref="menus" class="mvi-editor-menus" :style="{ border: border ? '' : 'none' }" v-if="showMenus" :disabled="disabled || null">
			<template v-for="(item, index) in computedMenuIndex">
				<EditorItem v-if="showMenuItem(item[0])" :value="item[0]" :menu="computedMenus[item[0]]" :ref="el => (menuRefs[index] = el)" :key="'mvi-editor-menu-' + index"> </EditorItem>
			</template>
		</div>
		<div ref="body" class="mvi-editor-body">
			<div v-if="codeViewShow" v-text="initalHtml" key="code" :contenteditable="!disabled || null" :style="codeViewStyle" :class="codeViewClass" ref="codeView" @blur="codeViewBlur" @focus="codeViewFocus" @input="codeViewInput" @keydown="tabDown" @paste="codeViewPaste"></div>
			<div v-else ref="content" @blur="contentBlur" @focus="contentFocus" @click="changeActive" @input="contentInput" :class="contentClass" key="content" @keydown="tabDown" :contenteditable="!disabled || null" :style="contentStyle" v-html="initalHtml" :data-placeholder="placeholder" @paste="contentPaste"></div>
		</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Observe } from '../observe'
import { Msgbox } from '../msgbox'
import EditorItem from './editor-item.vue'
import defaultConfig from './editor-config'
export default {
	methods: {
		//改变菜单项激活状态，可对外提供
		changeActive() {
			if (this.disabled) {
				return
			}
			if (!this.showMenus) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			this.saveRange()
			let node = this.getSelectNode()
			this.menuRefs.forEach(item => {
				if (item) {
					switch (item.value) {
						case 'bold':
							if (this.compareCss(node, 'font-weight', 'bold', false) || this.compareCss(node, 'font-weight', '700', false)) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'italic':
							if (this.compareCss(node, 'font-style', 'italic', false)) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'underline':
							if (this.compareCss(node, 'text-decoration-line', 'underline')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'strikeThrough':
							if (this.compareCss(node, 'text-decoration-line', 'line-through')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'subscript':
							if (this.compareCss(node, 'vertical-align', 'sub')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'superscript':
							if (this.compareCss(node, 'vertical-align', 'super')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'link':
							if (this.compareTag(node, 'a')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'quote':
							if (this.compareTag(node, 'blockquote')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'table':
							if (this.compareTag(node, 'table')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'code':
							if (this.compareTag(node, 'pre')) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						case 'codeView':
							if (this.codeViewShow) {
								item.menuActive = true
							} else {
								item.menuActive = false
							}
							break
						default:
							//如果不是自定义的菜单项，则不激活
							if (defaultConfig.unactiveMenus.includes(item.value)) {
								item.menuActive = false
								return
							}
							item.menuActive = this.customActive(item.value, node) || false
					}
				}
			})
		},
		//tab键按下
		tabDown(event) {
			if (this.disabled) {
				return
			}
			if (event.keyCode == 9) {
				event.preventDefault()
				let node = this.getSelectNode()
				if (this.compareCss(node, 'font-family', 'Consolas')) {
					document.execCommand('insertHtml', false, '&nbsp;&nbsp;&nbsp;&nbsp;')
				} else {
					document.execCommand('insertHtml', false, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
				}
			}
		}
	}
}
</script>

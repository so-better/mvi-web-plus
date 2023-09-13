<template>
	<div class="mvi-p-4">
		<m-table border columnBorder :data="data" height="2rem" :columns="columns"> </m-table>
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
			value: `<h5><span>基本使用</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">v-model</span><span>双向绑定编辑器的值</span></p><pre mvi-editor-element-key="19"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>自动获取焦点</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">autofocus</span><span>让编辑器自定获取焦点</span></p><pre mvi-editor-element-key="55"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span> </span><span class="mvi-hljs-attr">autofocus</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>设置编辑器高度</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">height</span><span>设置编辑器的固定高度</span></p><pre mvi-editor-element-key="95"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span> </span><span class="mvi-hljs-attr">height</span><span>=</span><span class="mvi-hljs-string">"10rem"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>自适应高度</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">autoheight</span><span>设置编辑器高度为自适应，此时</span><span data-code-style="mvi-editor-code">height</span><span>表示最小高度</span></p><pre mvi-editor-element-key="143"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span> </span><span class="mvi-hljs-attr">autoheight</span><span> </span><span class="mvi-hljs-attr">height</span><span>=</span><span class="mvi-hljs-string">"10rem"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>使用占位符</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">placeholder</span><span>设置编辑器的占位符内容</span></p><pre mvi-editor-element-key="191"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">placeholder</span><span>=</span><span class="mvi-hljs-string">"请输入内容..."</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>自定义主题色</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">active-color</span><span>自定义编辑器的主题颜色，仅支持16进制颜色值</span></p><pre mvi-editor-element-key="235"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">active-color</span><span>=</span><span class="mvi-hljs-string">"#f30"</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>显示边框</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">border</span><span>来显示编辑器的边框</span></p><pre mvi-editor-element-key="279"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">border</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>禁用编辑器</span></h5><p><br></p><p><span>使用</span><span data-code-style="mvi-editor-code">disabled</span><span>禁用编辑器</span></p><pre mvi-editor-element-key="319"><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">disabled</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span>&gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><p><br></p><p><br></p><h5><span>使用菜单栏的编辑器</span></h5><p><br></p><p><span>通过使用</span><span data-code-style="mvi-editor-code">editor-menus</span><span>和</span><span data-code-style="mvi-editor-code">editor-menu</span><span>组件来注册菜单栏和菜单项</span></p><pre mvi-editor-element-key="363"><span class="mvi-hljs-comment">&lt;!-- 菜单栏 --&gt;</span><span>
</span><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor-menus</span><span> </span><span class="mvi-hljs-attr">class</span><span>=</span><span class="mvi-hljs-string">"mvi-mb-4"</span><span> </span><span class="mvi-hljs-attr">ref</span><span>=</span><span class="mvi-hljs-string">"menus"</span><span>&gt;</span></span><span>
    </span><span class="mvi-hljs-comment">&lt;!-- 菜单项 --&gt;</span><span>
    </span><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor-menu</span><span> </span><span class="mvi-hljs-attr">v-for</span><span>=</span><span class="mvi-hljs-string">"item in definedMenus"</span><span> </span><span class="mvi-hljs-attr">:name</span><span>=</span><span class="mvi-hljs-string">"item.name"</span><span> /&gt;</span></span><span>
</span><span class="mvi-hljs-tag"><span>&lt;/</span><span class="mvi-hljs-name">m-editor-menus</span><span>&gt;</span></span><span>
</span><span class="mvi-hljs-comment">&lt;!-- 编辑器 --&gt;</span><span>
</span><span class="mvi-hljs-tag"><span>&lt;</span><span class="mvi-hljs-name">m-editor</span><span> </span><span class="mvi-hljs-attr">ref</span><span>=</span><span class="mvi-hljs-string">"editor"</span><span> </span><span class="mvi-hljs-attr">v-model</span><span>=</span><span class="mvi-hljs-string">"value"</span><span> &gt;&lt;/</span><span class="mvi-hljs-name">m-editor</span><span>&gt;</span></span></pre><pre mvi-editor-element-key="462"><span class="mvi-hljs-comment">//引入默认的菜单项配值</span><span>
</span><span class="mvi-hljs-keyword">import</span><span> { </span><span class="mvi-hljs-title class_">EditorDefinedMenuConfig</span><span> } </span><span class="mvi-hljs-keyword">from</span><span> </span><span class="mvi-hljs-string">'mvi-web-plus'</span><span>
</span><span class="mvi-hljs-keyword">export</span><span> </span><span class="mvi-hljs-keyword">default</span><span> {
    </span><span class="mvi-hljs-title function_">data</span><span>(){
        </span><span class="mvi-hljs-keyword">return</span><span>{
            </span><span class="mvi-hljs-attr">definedMenus</span><span>:</span><span class="mvi-hljs-title class_">EditorDefinedMenuConfig</span><span>                           
        }    
    },
    </span><span class="mvi-hljs-title function_">mounted</span><span>(){
        </span><span class="mvi-hljs-comment">//通过编辑器组件的use方法来注册菜单栏</span><span>
        </span><span class="mvi-hljs-variable language_">this</span><span>.</span><span class="mvi-hljs-property">$refs</span><span>.</span><span class="mvi-hljs-property">editor</span><span>.</span><span class="mvi-hljs-title function_">use</span><span>(</span><span class="mvi-hljs-variable language_">this</span><span>.</span><span class="mvi-hljs-property">$refs</span><span>.</span><span class="mvi-hljs-property">menus</span><span>)    
    }
}</span></pre><p><br></p><p><br></p><h5><span>Props</span></h5><p><br></p><table mvi-editor-element-key="552"><colgroup><col width="13.83%"><col width="auto"><col width="auto"><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>参数</span></td><td><span>类型</span></td><td><span>说明</span></td><td><span>可取值</span></td><td><span>默认值</span></td></tr><tr><td><span>v-model</span></td><td><span>string</span></td><td><span>编辑器内容</span></td><td><span>-</span></td><td><span>"&lt;p&gt;&lt;br&gt;&lt;/p&gt;"</span></td></tr><tr><td><span>autofocus</span></td><td><span>boolean</span></td><td><span>是否自动获取焦点</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>placeholder</span></td><td><span>string</span></td><td><span>占位符</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>height</span></td><td><span>string</span></td><td><span>编辑区域高度，如果设定了autoHeight，则此值表示最小高度</span></td><td><span>-</span></td><td><span>"8rem"</span></td></tr><tr><td><span>autoheight</span></td><td><span>boolean</span></td><td><span>编辑区域高度是否随内容变化</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>disabled</span></td><td><span>boolean</span></td><td><span>是否禁用</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>border</span></td><td><span>boolean</span></td><td><span>是否显示编辑区域边框</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>active-color</span></td><td><span>string</span></td><td><span>主题色（编辑区域获取焦点后的边框颜色、菜单栏相关主题色），仅支持16进制颜色值</span></td><td><span>-</span></td><td><span>"#0b73de"</span></td></tr><tr><td><span>html-paste</span></td><td><span>boolean</span></td><td><span>粘贴文本内容时是否携带样式，默认只粘贴纯文本，设置为true后只要clipboard数据内带有text/html类型数据即可粘贴【此时需要注意，网页上复制图片后粘贴也属于html粘贴】</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>custom-image-paste</span></td><td><span>boolean</span></td><td><span>是否自定义粘贴图片，如果设为true，则在粘贴纯图片数据时，比如微信截图粘贴，会触发paste-image事件</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>custom-video-paste</span></td><td><span>boolean</span></td><td><span>是否自定义粘贴视频，如果设为true，则在粘贴纯视频数据时，会触发paste-video事件</span></td><td><span>true/false</span></td><td><span>false</span></td></tr><tr><td><span>render-rules</span></td><td><span>array</span></td><td><span>一个数组，数组内每个元素都表示自定义渲染规则的函数，回调参数为AlexElement实例元素</span></td><td><span>-</span></td><td><span>-</span></td></tr><tr><td><span>highlight</span></td><td><span>boolean</span></td><td><span>是否对代码块样式的块元素进行代码高亮处理</span></td><td><span>-</span></td><td><span>-</span></td></tr></tbody></table><p><br></p><p><br></p><h5><span>Events</span></h5><p><br></p><table mvi-editor-element-key="793"><colgroup><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>事件</span></td><td><span>说明</span></td></tr><tr><td><span>paste-image</span></td><td><span>自定义粘贴图片触发事件，回调参数为图片的base64字符串</span></td></tr><tr><td><span>paste-video</span></td><td><span>自定义粘贴视频触发事件，回调参数为视频的base64字符串</span></td></tr><tr><td><span>change</span></td><td><span>编辑器内容变化时触发，回调参数为当前编辑器的值和旧值</span></td></tr><tr><td><span>focus</span></td><td><span>编辑器获取焦点时触发，回调参数为编辑器当前的值</span></td></tr><tr><td><span>blur</span></td><td><span>编辑器失去焦点时触发，回调参数为编辑器当前的值</span></td></tr><tr><td><span>range-update</span></td><td><span>编辑器光标变化更新时触发，回调参数为底层alex-editor的AlexRange对象实例，代表虚拟光标</span></td></tr><tr><td><span>after-render</span></td><td><span>编辑器每次dom内容渲染后触发</span></td></tr></tbody></table><p><br></p><p><br></p><h5><span>API</span></h5><p><br></p><table mvi-editor-element-key="863"><colgroup><col width="auto"><col width="auto"></colgroup><tbody><tr><td><span>方法/属性</span></td><td><span>说明</span></td></tr><tr><td><span>codeViewShow</span></td><td><span>是否显示源码视图，通过控制该值为true或者false来达到效果</span></td></tr><tr><td><span>editor</span></td><td><span>只读属性，alex-editor的编辑器实例</span></td></tr><tr><td><span>useMenus</span></td><td><span>只读属性，是否已注册菜单栏</span></td></tr><tr><td><span>linkAdjusterProps.props.placeholder</span></td><td><span>修改链接调整器中的链接输入框的占位符，默认"输入地址"</span></td></tr><tr><td><span>linkAdjusterProps.props.targetText</span></td><td><span>修改链接调整器中新窗口打开的文本，默认"新窗口打开"</span></td></tr><tr><td><span>linkAdjusterProps.props.removeText</span></td><td><span>修改链接调整器中移除链接的文本，默认"移除链接"</span></td></tr><tr><td><span>linkAdjusterProps.props.insertText</span></td><td><span>修改链接调整器中插入的文本，默认"插入"</span></td></tr><tr><td><span>tableAdjusterProps.props.insertRowText</span></td><td><span>修改表格调整器中插入行的文本，默认"插入行"</span></td></tr><tr><td><span>tableAdjusterProps.props.removeRowText</span></td><td><span>修改表格调整器中删除行的文本，默认"删除行"</span></td></tr><tr><td><span>tableAdjusterProps.props.insertColumnText</span></td><td><span>修改表格调整器中插入列的文本，默认"插入列"</span></td></tr><tr><td><span>tableAdjusterProps.props.removeColumnText</span></td><td><span>修改表格调整器中删除列的文本，默认"删除列"</span></td></tr><tr><td><span>preAdjusterProps.languages</span></td><td><span>定义代码块的语言选择列表，默认包含：'plaintext',&nbsp;'javascript',&nbsp;'html',&nbsp;'css',&nbsp;'less',&nbsp;'scss',&nbsp;'java',&nbsp;'markdown',&nbsp;'swift',&nbsp;'objectivec',&nbsp;'typescript',&nbsp;'dart',&nbsp;'nginx',&nbsp;'php',&nbsp;'python'</span></td></tr><tr><td><span>preAdjusterProps.language</span></td><td><span>代码块的默认语言，默认为""，表示自动识别，可设置成languages列表中的某一项</span></td></tr><tr><td><span>use(menus)</span></td><td><span>向编辑器组件注册菜单栏组件，参数menus表示m-editor-menus组件实例</span></td></tr><tr><td><span>getCurrentParsedomElement(parsedom)</span></td><td><span>判断光标是否在指定标签元素下，如果是，则返回该元素，否则返回null</span></td></tr><tr><td><span>collapseToEnd()</span></td><td><span>将编辑器的真实光标定位到文档的尾部</span></td></tr><tr><td><span>collapseToStart()</span></td><td><span>将编辑器的真实光标定位到文档的头部</span></td></tr><tr><td><span>insertImage(url)</span></td><td><span>向编辑器内插入图片，参数为图片的src地址</span></td></tr><tr><td><span>insertVideo(url)</span></td><td><span>向编辑器内插入视频，参数为视频的src地址</span></td></tr><tr><td><span>insertHtml(html)</span></td><td><span>向编辑器内插入html内容，参数为html文本</span></td></tr><tr><td><span>insertText(text)</span></td><td><span>向编辑器内插入纯文本内容，参数为纯文本内容</span></td></tr><tr><td><span>undo()</span></td><td><br></td></tr><tr><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td></tr></tbody></table><p><br></p>`,
			dayjs: dayjs,
			date: new Date(),
			data: [
				{
					name: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
					age: 14,
					score: 80
				},
				{
					name: '李四',
					age: 16,
					score: 55
				},
				{
					name: '小王',
					age: 15,
					score: 77
				}
			],
			columns: [
				{
					prop: 'name',
					label: '姓名',
					ellipsis: true
				},
				{
					prop: 'age',
					label: '年龄年龄年龄年龄年龄',
					width: '600px',
					ellipsis: true
				},
				{
					prop: 'score',
					label: '分数',
					ellipsis: true,
					width: '600px'
				}
			]
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

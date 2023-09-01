import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github.css'
hljs.configure({
	cssSelector: 'pre',
	ignoreUnescapedHTML: true
})

//获取经过hljs处理的html元素
const getHljsHtml = function (code, language) {
	if (language) {
		return hljs.highlight(code, {
			language: language,
			ignoreIllegals: true
		}).value
	}
	return hljs.highlightAuto(code).value
}

const listLanguages = hljs.listLanguages()
const languages = listLanguages.filter(item => {
	return ['plaintext', 'javascript', 'typescript', 'xml', 'markdown', 'css', 'less', 'scss', 'swift', 'dart', 'ruby', 'java', 'nginx', 'php', 'python'].includes(item)
})

export { getHljsHtml, languages }

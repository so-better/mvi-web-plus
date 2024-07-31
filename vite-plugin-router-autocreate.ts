import { Plugin } from 'vite'
import path, { resolve, parse, dirname } from 'path'
import { RouteRecordRaw } from 'vue-router'
import fs from 'fs'

export default () => {
	return <Plugin>{
		name: 'vite-plugin-router-autocreate',
		buildStart() {
			const componentList = fs.readdirSync('./packages/components')
			const directiveList = fs.readdirSync('./packages/directives')
			let routes = '['
			componentList.forEach(item => {
				const filePath = `./packages/components/${item}/test.vue`
				routes += `{ 
            path:'/${item}',
            name:'${item}',
            component: ()=>import('${path.resolve(__dirname, filePath)}'),
            meta:{
                title:'${item} - mvi-web-plus'
            }
        },`
			})
			directiveList.forEach((item, index) => {
				const filePath = `./packages/directives/${item}/test.vue`
				routes += `{ 
            path:'/${item}',
            name:'${item}',
            component: ()=>import('${path.resolve(__dirname, filePath)}'),
            meta:{
                title:'${item} - mvi-web-plus'
            }
        }${index == directiveList.length - 1 ? '' : ','}`
			})
			routes += ']'
			const routerContent = `import { createRouter, createWebHashHistory } from 'vue-router'
       const router = createRouter({
          history: createWebHashHistory('/'),
          routes: ${routes}
       })
       router.afterEach(to => {
          document.title = <string>to.meta.title
          document.querySelector('.body')!.scrollTop = 0
       })
       export default router`
			fs.writeFileSync('./example/router/index.ts', routerContent, 'utf-8')
		}
	}
}

import { Plugin } from 'vite'
import path, { resolve, parse, dirname } from 'path'
import { RouteRecordRaw } from 'vue-router'
import fs from 'fs'

export default () => {
	return <Plugin>{
		name: 'vite-plugin-router-autocreate',
		apply: 'serve',
		buildStart() {
			const componentList = fs.readdirSync('./packages/components')
			const directiveList = fs.readdirSync('./packages/directives')

			const homePath = path.resolve(__dirname, './example/router/Home.vue')
			fs.writeFileSync(
				homePath,
				`<template>
          <div class="home-grids">
            ${directiveList.map(item => `<div @click="$router.push('/directive/${item}')" class="home-grid">${item}</div>`).join('\n')}
            ${componentList.map(item => `<div @click="$router.push('/component/${item}')" class="home-grid">${item}</div>`).join('\n')}
          </div>
        </template>
        <script setup lang="ts"></script>
        <style lang="less" scoped>
          .home-grids {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 0.2rem;
            row-gap: 0.2rem;
            padding:0.2rem;

            .home-grid {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0.4rem;
              font-size: 0.3rem;
              font-weight: bold;
              border: 1px solid #ddd;
              border-radius: 0.08rem;
              transition: all 300ms;

              &:hover {
                cursor: pointer;
                color: #03a8f3;
                border-color: #03a8f3;
              }

              &:active {
                background: #c3ebff;
              }
	          }

            @media (min-width: 750px) {
              grid-template-columns: repeat(4, 1fr);
            }

            @media (min-width: 1280px) {
              grid-template-columns: repeat(6, 1fr);
            }

            @media (min-width: 1600px) {
              grid-template-columns: repeat(9, 1fr);
            }

            @media (min-width: 1920px) {
              grid-template-columns: repeat(12, 1fr);
            }
          }
        </style>`,
				'utf-8'
			)

			let routes = `[
        {
            path:'/',
            component:()=>import('${homePath}'),
            meta:{
                title:'mvi-web-plus'
            }
        },
      `
			componentList.forEach(item => {
				const filePath = path.resolve(__dirname, `./packages/components/${item}/test.vue`)
				routes += `{ 
            path:'/component/${item}',
            name:'component-${item}',
            component: ()=>import('${filePath}'),
            meta:{
                title:'${item} - 组件 - mvi-web-plus'
            }
        },`
			})
			directiveList.forEach((item, index) => {
				const filePath = path.resolve(__dirname, `./packages/directives/${item}/test.vue`)
				routes += `{ 
            path:'/directive/${item}',
            name:'directive-${item}',
            component: ()=>import('${filePath}'),
            meta:{
                title:'${item} - 指令 - mvi-web-plus'
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
			fs.writeFileSync(path.resolve(__dirname, './example/router/index.ts'), routerContent, 'utf-8')
		}
	}
}

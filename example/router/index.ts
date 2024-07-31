import { createRouter, createWebHashHistory } from 'vue-router'
       const router = createRouter({
          history: createWebHashHistory('/'),
          routes: [
        {
            path:'/',
            component:()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/example/router/Home.vue'),
            meta:{
                title:'mvi-web-plus'
            }
        },
      { 
            path:'/component/actionsheet',
            name:'component-actionsheet',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/actionsheet/test.vue'),
            meta:{
                title:'actionsheet - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/autocomplete',
            name:'component-autocomplete',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/autocomplete/test.vue'),
            meta:{
                title:'autocomplete - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/badge',
            name:'component-badge',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/badge/test.vue'),
            meta:{
                title:'badge - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/button',
            name:'component-button',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/button/test.vue'),
            meta:{
                title:'button - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/calendar',
            name:'component-calendar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/calendar/test.vue'),
            meta:{
                title:'calendar - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/carousel',
            name:'component-carousel',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/carousel/test.vue'),
            meta:{
                title:'carousel - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/carousel-item',
            name:'component-carousel-item',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/carousel-item/test.vue'),
            meta:{
                title:'carousel-item - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/cell',
            name:'component-cell',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/cell/test.vue'),
            meta:{
                title:'cell - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/cell-group',
            name:'component-cell-group',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/cell-group/test.vue'),
            meta:{
                title:'cell-group - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/checkbox',
            name:'component-checkbox',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/checkbox/test.vue'),
            meta:{
                title:'checkbox - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/circle-progress',
            name:'component-circle-progress',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/circle-progress/test.vue'),
            meta:{
                title:'circle-progress - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/col',
            name:'component-col',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/col/test.vue'),
            meta:{
                title:'col - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/collapse',
            name:'component-collapse',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/collapse/test.vue'),
            meta:{
                title:'collapse - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/collapse-item',
            name:'component-collapse-item',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/collapse-item/test.vue'),
            meta:{
                title:'collapse-item - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/color-picker',
            name:'component-color-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/color-picker/test.vue'),
            meta:{
                title:'color-picker - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/date-chooser',
            name:'component-date-chooser',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/date-chooser/test.vue'),
            meta:{
                title:'date-chooser - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/date-native-picker',
            name:'component-date-native-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/date-native-picker/test.vue'),
            meta:{
                title:'date-native-picker - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/date-picker',
            name:'component-date-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/date-picker/test.vue'),
            meta:{
                title:'date-picker - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/dialog',
            name:'component-dialog',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/dialog/test.vue'),
            meta:{
                title:'dialog - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/divider',
            name:'component-divider',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/divider/test.vue'),
            meta:{
                title:'divider - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/dropdown',
            name:'component-dropdown',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/dropdown/test.vue'),
            meta:{
                title:'dropdown - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/field',
            name:'component-field',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/field/test.vue'),
            meta:{
                title:'field - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/form',
            name:'component-form',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/form/test.vue'),
            meta:{
                title:'form - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/form-el',
            name:'component-form-el',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/form-el/test.vue'),
            meta:{
                title:'form-el - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/icon',
            name:'component-icon',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/icon/test.vue'),
            meta:{
                title:'icon - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/image',
            name:'component-image',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/image/test.vue'),
            meta:{
                title:'image - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/image-preview',
            name:'component-image-preview',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/image-preview/test.vue'),
            meta:{
                title:'image-preview - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/input',
            name:'component-input',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/input/test.vue'),
            meta:{
                title:'input - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/label',
            name:'component-label',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/label/test.vue'),
            meta:{
                title:'label - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/layer',
            name:'component-layer',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/layer/test.vue'),
            meta:{
                title:'layer - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/list',
            name:'component-list',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/list/test.vue'),
            meta:{
                title:'list - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/loading',
            name:'component-loading',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/loading/test.vue'),
            meta:{
                title:'loading - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/loading-bar',
            name:'component-loading-bar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/loading-bar/test.vue'),
            meta:{
                title:'loading-bar - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/modal',
            name:'component-modal',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/modal/test.vue'),
            meta:{
                title:'modal - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/msgbox',
            name:'component-msgbox',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/msgbox/test.vue'),
            meta:{
                title:'msgbox - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/navbar',
            name:'component-navbar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/navbar/test.vue'),
            meta:{
                title:'navbar - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/notify',
            name:'component-notify',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/notify/test.vue'),
            meta:{
                title:'notify - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/number-keyboard',
            name:'component-number-keyboard',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/number-keyboard/test.vue'),
            meta:{
                title:'number-keyboard - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/overlay',
            name:'component-overlay',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/overlay/test.vue'),
            meta:{
                title:'overlay - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/page',
            name:'component-page',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/page/test.vue'),
            meta:{
                title:'page - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/picker',
            name:'component-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/picker/test.vue'),
            meta:{
                title:'picker - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/popup',
            name:'component-popup',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/popup/test.vue'),
            meta:{
                title:'popup - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/progress',
            name:'component-progress',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/progress/test.vue'),
            meta:{
                title:'progress - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/pull-refresh',
            name:'component-pull-refresh',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/pull-refresh/test.vue'),
            meta:{
                title:'pull-refresh - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/radio',
            name:'component-radio',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/radio/test.vue'),
            meta:{
                title:'radio - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/rich-image',
            name:'component-rich-image',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/rich-image/test.vue'),
            meta:{
                title:'rich-image - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/roll',
            name:'component-roll',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/roll/test.vue'),
            meta:{
                title:'roll - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/row',
            name:'component-row',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/row/test.vue'),
            meta:{
                title:'row - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/search',
            name:'component-search',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/search/test.vue'),
            meta:{
                title:'search - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/select',
            name:'component-select',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/select/test.vue'),
            meta:{
                title:'select - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/sign',
            name:'component-sign',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/sign/test.vue'),
            meta:{
                title:'sign - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/skeleton',
            name:'component-skeleton',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/skeleton/test.vue'),
            meta:{
                title:'skeleton - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/slider',
            name:'component-slider',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/slider/test.vue'),
            meta:{
                title:'slider - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/step',
            name:'component-step',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/step/test.vue'),
            meta:{
                title:'step - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/stepper',
            name:'component-stepper',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/stepper/test.vue'),
            meta:{
                title:'stepper - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/steps',
            name:'component-steps',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/steps/test.vue'),
            meta:{
                title:'steps - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/swipe-cell',
            name:'component-swipe-cell',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/swipe-cell/test.vue'),
            meta:{
                title:'swipe-cell - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/switch',
            name:'component-switch',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/switch/test.vue'),
            meta:{
                title:'switch - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/tab',
            name:'component-tab',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tab/test.vue'),
            meta:{
                title:'tab - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/tabbar',
            name:'component-tabbar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tabbar/test.vue'),
            meta:{
                title:'tabbar - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/table',
            name:'component-table',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/table/test.vue'),
            meta:{
                title:'table - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/tabs',
            name:'component-tabs',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tabs/test.vue'),
            meta:{
                title:'tabs - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/toast',
            name:'component-toast',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/toast/test.vue'),
            meta:{
                title:'toast - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/tooltip',
            name:'component-tooltip',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tooltip/test.vue'),
            meta:{
                title:'tooltip - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/transition-slide',
            name:'component-transition-slide',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/transition-slide/test.vue'),
            meta:{
                title:'transition-slide - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/component/triangle',
            name:'component-triangle',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/triangle/test.vue'),
            meta:{
                title:'triangle - 组件 - mvi-web-plus'
            }
        },{ 
            path:'/directive/anchor',
            name:'directive-anchor',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/anchor/test.vue'),
            meta:{
                title:'anchor - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/drag',
            name:'directive-drag',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/drag/test.vue'),
            meta:{
                title:'drag - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/observe',
            name:'directive-observe',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/observe/test.vue'),
            meta:{
                title:'observe - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/prop',
            name:'directive-prop',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/prop/test.vue'),
            meta:{
                title:'prop - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/px',
            name:'directive-px',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/px/test.vue'),
            meta:{
                title:'px - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/resize',
            name:'directive-resize',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/resize/test.vue'),
            meta:{
                title:'resize - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/ripple',
            name:'directive-ripple',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/ripple/test.vue'),
            meta:{
                title:'ripple - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/scroll',
            name:'directive-scroll',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/scroll/test.vue'),
            meta:{
                title:'scroll - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/spy',
            name:'directive-spy',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/spy/test.vue'),
            meta:{
                title:'spy - 指令 - mvi-web-plus'
            }
        },{ 
            path:'/directive/upload',
            name:'directive-upload',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/upload/test.vue'),
            meta:{
                title:'upload - 指令 - mvi-web-plus'
            }
        }]
       })
       router.afterEach(to => {
          document.title = <string>to.meta.title
          document.querySelector('.body')!.scrollTop = 0
       })
       export default router
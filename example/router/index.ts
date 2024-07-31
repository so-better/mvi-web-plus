import { createRouter, createWebHashHistory } from 'vue-router'
       const router = createRouter({
          history: createWebHashHistory('/'),
          routes: [{ 
            path:'/actionsheet',
            name:'actionsheet',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/actionsheet/test.vue'),
            meta:{
                title:'actionsheet - mvi-web-plus'
            }
        },{ 
            path:'/autocomplete',
            name:'autocomplete',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/autocomplete/test.vue'),
            meta:{
                title:'autocomplete - mvi-web-plus'
            }
        },{ 
            path:'/badge',
            name:'badge',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/badge/test.vue'),
            meta:{
                title:'badge - mvi-web-plus'
            }
        },{ 
            path:'/button',
            name:'button',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/button/test.vue'),
            meta:{
                title:'button - mvi-web-plus'
            }
        },{ 
            path:'/calendar',
            name:'calendar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/calendar/test.vue'),
            meta:{
                title:'calendar - mvi-web-plus'
            }
        },{ 
            path:'/carousel',
            name:'carousel',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/carousel/test.vue'),
            meta:{
                title:'carousel - mvi-web-plus'
            }
        },{ 
            path:'/carousel-item',
            name:'carousel-item',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/carousel-item/test.vue'),
            meta:{
                title:'carousel-item - mvi-web-plus'
            }
        },{ 
            path:'/cell',
            name:'cell',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/cell/test.vue'),
            meta:{
                title:'cell - mvi-web-plus'
            }
        },{ 
            path:'/cell-group',
            name:'cell-group',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/cell-group/test.vue'),
            meta:{
                title:'cell-group - mvi-web-plus'
            }
        },{ 
            path:'/checkbox',
            name:'checkbox',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/checkbox/test.vue'),
            meta:{
                title:'checkbox - mvi-web-plus'
            }
        },{ 
            path:'/circle-progress',
            name:'circle-progress',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/circle-progress/test.vue'),
            meta:{
                title:'circle-progress - mvi-web-plus'
            }
        },{ 
            path:'/col',
            name:'col',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/col/test.vue'),
            meta:{
                title:'col - mvi-web-plus'
            }
        },{ 
            path:'/collapse',
            name:'collapse',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/collapse/test.vue'),
            meta:{
                title:'collapse - mvi-web-plus'
            }
        },{ 
            path:'/collapse-item',
            name:'collapse-item',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/collapse-item/test.vue'),
            meta:{
                title:'collapse-item - mvi-web-plus'
            }
        },{ 
            path:'/color-picker',
            name:'color-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/color-picker/test.vue'),
            meta:{
                title:'color-picker - mvi-web-plus'
            }
        },{ 
            path:'/date-chooser',
            name:'date-chooser',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/date-chooser/test.vue'),
            meta:{
                title:'date-chooser - mvi-web-plus'
            }
        },{ 
            path:'/date-native-picker',
            name:'date-native-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/date-native-picker/test.vue'),
            meta:{
                title:'date-native-picker - mvi-web-plus'
            }
        },{ 
            path:'/date-picker',
            name:'date-picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/date-picker/test.vue'),
            meta:{
                title:'date-picker - mvi-web-plus'
            }
        },{ 
            path:'/dialog',
            name:'dialog',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/dialog/test.vue'),
            meta:{
                title:'dialog - mvi-web-plus'
            }
        },{ 
            path:'/divider',
            name:'divider',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/divider/test.vue'),
            meta:{
                title:'divider - mvi-web-plus'
            }
        },{ 
            path:'/dropdown',
            name:'dropdown',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/dropdown/test.vue'),
            meta:{
                title:'dropdown - mvi-web-plus'
            }
        },{ 
            path:'/field',
            name:'field',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/field/test.vue'),
            meta:{
                title:'field - mvi-web-plus'
            }
        },{ 
            path:'/form',
            name:'form',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/form/test.vue'),
            meta:{
                title:'form - mvi-web-plus'
            }
        },{ 
            path:'/form-el',
            name:'form-el',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/form-el/test.vue'),
            meta:{
                title:'form-el - mvi-web-plus'
            }
        },{ 
            path:'/icon',
            name:'icon',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/icon/test.vue'),
            meta:{
                title:'icon - mvi-web-plus'
            }
        },{ 
            path:'/image',
            name:'image',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/image/test.vue'),
            meta:{
                title:'image - mvi-web-plus'
            }
        },{ 
            path:'/image-preview',
            name:'image-preview',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/image-preview/test.vue'),
            meta:{
                title:'image-preview - mvi-web-plus'
            }
        },{ 
            path:'/input',
            name:'input',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/input/test.vue'),
            meta:{
                title:'input - mvi-web-plus'
            }
        },{ 
            path:'/label',
            name:'label',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/label/test.vue'),
            meta:{
                title:'label - mvi-web-plus'
            }
        },{ 
            path:'/layer',
            name:'layer',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/layer/test.vue'),
            meta:{
                title:'layer - mvi-web-plus'
            }
        },{ 
            path:'/list',
            name:'list',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/list/test.vue'),
            meta:{
                title:'list - mvi-web-plus'
            }
        },{ 
            path:'/loading',
            name:'loading',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/loading/test.vue'),
            meta:{
                title:'loading - mvi-web-plus'
            }
        },{ 
            path:'/loading-bar',
            name:'loading-bar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/loading-bar/test.vue'),
            meta:{
                title:'loading-bar - mvi-web-plus'
            }
        },{ 
            path:'/modal',
            name:'modal',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/modal/test.vue'),
            meta:{
                title:'modal - mvi-web-plus'
            }
        },{ 
            path:'/msgbox',
            name:'msgbox',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/msgbox/test.vue'),
            meta:{
                title:'msgbox - mvi-web-plus'
            }
        },{ 
            path:'/navbar',
            name:'navbar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/navbar/test.vue'),
            meta:{
                title:'navbar - mvi-web-plus'
            }
        },{ 
            path:'/notify',
            name:'notify',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/notify/test.vue'),
            meta:{
                title:'notify - mvi-web-plus'
            }
        },{ 
            path:'/number-keyboard',
            name:'number-keyboard',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/number-keyboard/test.vue'),
            meta:{
                title:'number-keyboard - mvi-web-plus'
            }
        },{ 
            path:'/overlay',
            name:'overlay',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/overlay/test.vue'),
            meta:{
                title:'overlay - mvi-web-plus'
            }
        },{ 
            path:'/page',
            name:'page',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/page/test.vue'),
            meta:{
                title:'page - mvi-web-plus'
            }
        },{ 
            path:'/picker',
            name:'picker',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/picker/test.vue'),
            meta:{
                title:'picker - mvi-web-plus'
            }
        },{ 
            path:'/popup',
            name:'popup',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/popup/test.vue'),
            meta:{
                title:'popup - mvi-web-plus'
            }
        },{ 
            path:'/progress',
            name:'progress',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/progress/test.vue'),
            meta:{
                title:'progress - mvi-web-plus'
            }
        },{ 
            path:'/pull-refresh',
            name:'pull-refresh',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/pull-refresh/test.vue'),
            meta:{
                title:'pull-refresh - mvi-web-plus'
            }
        },{ 
            path:'/radio',
            name:'radio',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/radio/test.vue'),
            meta:{
                title:'radio - mvi-web-plus'
            }
        },{ 
            path:'/rich-image',
            name:'rich-image',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/rich-image/test.vue'),
            meta:{
                title:'rich-image - mvi-web-plus'
            }
        },{ 
            path:'/roll',
            name:'roll',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/roll/test.vue'),
            meta:{
                title:'roll - mvi-web-plus'
            }
        },{ 
            path:'/row',
            name:'row',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/row/test.vue'),
            meta:{
                title:'row - mvi-web-plus'
            }
        },{ 
            path:'/search',
            name:'search',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/search/test.vue'),
            meta:{
                title:'search - mvi-web-plus'
            }
        },{ 
            path:'/select',
            name:'select',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/select/test.vue'),
            meta:{
                title:'select - mvi-web-plus'
            }
        },{ 
            path:'/sign',
            name:'sign',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/sign/test.vue'),
            meta:{
                title:'sign - mvi-web-plus'
            }
        },{ 
            path:'/skeleton',
            name:'skeleton',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/skeleton/test.vue'),
            meta:{
                title:'skeleton - mvi-web-plus'
            }
        },{ 
            path:'/slider',
            name:'slider',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/slider/test.vue'),
            meta:{
                title:'slider - mvi-web-plus'
            }
        },{ 
            path:'/step',
            name:'step',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/step/test.vue'),
            meta:{
                title:'step - mvi-web-plus'
            }
        },{ 
            path:'/stepper',
            name:'stepper',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/stepper/test.vue'),
            meta:{
                title:'stepper - mvi-web-plus'
            }
        },{ 
            path:'/steps',
            name:'steps',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/steps/test.vue'),
            meta:{
                title:'steps - mvi-web-plus'
            }
        },{ 
            path:'/swipe-cell',
            name:'swipe-cell',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/swipe-cell/test.vue'),
            meta:{
                title:'swipe-cell - mvi-web-plus'
            }
        },{ 
            path:'/switch',
            name:'switch',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/switch/test.vue'),
            meta:{
                title:'switch - mvi-web-plus'
            }
        },{ 
            path:'/tab',
            name:'tab',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tab/test.vue'),
            meta:{
                title:'tab - mvi-web-plus'
            }
        },{ 
            path:'/tabbar',
            name:'tabbar',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tabbar/test.vue'),
            meta:{
                title:'tabbar - mvi-web-plus'
            }
        },{ 
            path:'/table',
            name:'table',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/table/test.vue'),
            meta:{
                title:'table - mvi-web-plus'
            }
        },{ 
            path:'/tabs',
            name:'tabs',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tabs/test.vue'),
            meta:{
                title:'tabs - mvi-web-plus'
            }
        },{ 
            path:'/toast',
            name:'toast',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/toast/test.vue'),
            meta:{
                title:'toast - mvi-web-plus'
            }
        },{ 
            path:'/tooltip',
            name:'tooltip',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/tooltip/test.vue'),
            meta:{
                title:'tooltip - mvi-web-plus'
            }
        },{ 
            path:'/transition-slide',
            name:'transition-slide',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/transition-slide/test.vue'),
            meta:{
                title:'transition-slide - mvi-web-plus'
            }
        },{ 
            path:'/triangle',
            name:'triangle',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/components/triangle/test.vue'),
            meta:{
                title:'triangle - mvi-web-plus'
            }
        },{ 
            path:'/anchor',
            name:'anchor',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/anchor/test.vue'),
            meta:{
                title:'anchor - mvi-web-plus'
            }
        },{ 
            path:'/drag',
            name:'drag',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/drag/test.vue'),
            meta:{
                title:'drag - mvi-web-plus'
            }
        },{ 
            path:'/observe',
            name:'observe',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/observe/test.vue'),
            meta:{
                title:'observe - mvi-web-plus'
            }
        },{ 
            path:'/prop',
            name:'prop',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/prop/test.vue'),
            meta:{
                title:'prop - mvi-web-plus'
            }
        },{ 
            path:'/px',
            name:'px',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/px/test.vue'),
            meta:{
                title:'px - mvi-web-plus'
            }
        },{ 
            path:'/resize',
            name:'resize',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/resize/test.vue'),
            meta:{
                title:'resize - mvi-web-plus'
            }
        },{ 
            path:'/ripple',
            name:'ripple',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/ripple/test.vue'),
            meta:{
                title:'ripple - mvi-web-plus'
            }
        },{ 
            path:'/scroll',
            name:'scroll',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/scroll/test.vue'),
            meta:{
                title:'scroll - mvi-web-plus'
            }
        },{ 
            path:'/spy',
            name:'spy',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/spy/test.vue'),
            meta:{
                title:'spy - mvi-web-plus'
            }
        },{ 
            path:'/upload',
            name:'upload',
            component: ()=>import('/Users/10215368/Desktop/selfProjects/mvi-web-plus/packages/directives/upload/test.vue'),
            meta:{
                title:'upload - mvi-web-plus'
            }
        }]
       })
       router.afterEach(to => {
          document.title = <string>to.meta.title
          document.querySelector('.body')!.scrollTop = 0
       })
       export default router
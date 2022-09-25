<template>
    <div class="mvi-editor">
        <div ref="menus" class="mvi-editor-menus" :style="{ border: border ? '' : 'none' }" v-if="showMenus" :disabled="disabled || null">
            <template v-for="(item,index) in computedMenuIndex">
                <m-editor-item v-if="showMenuItem(item[0])" :value="item[0]" :menu="computedMenus[item[0]]" :ref="el=>menuRefs[index]=el" :key="'mvi-editor-menu-' + index">
                </m-editor-item>
            </template>
        </div>
        <div ref="body" class="mvi-editor-body">
            <div v-if="codeViewShow" v-text="initalHtml" key="code" :contenteditable="!disabled || null" :style="codeViewStyle" :class="codeViewClass" ref="codeView" @blur="codeViewBlur" @focus="codeViewFocus" @input="codeViewInput" @keydown="tabDown" @paste="codeViewPaste"></div>
            <div v-else ref="content" @blur="contentBlur" @focus="contentFocus" @click="changeActive" @input="contentInput" :class="contentClass" key="content" @keydown="tabDown" :contenteditable="!disabled || null" :style="contentStyle" v-html="initalHtml" :data-placeholder="placeholder" @paste="contentPaste"></div>
        </div>
    </div>
</template>

<script>
import $dap from 'dap-util'
import editorItem from './editor-item.vue'
import Observe from '../observe/observe'
//不实现激活状态的菜单项
const unactiveMenus = [
    'undo',
    'redo',
    'removeFormat',
    'selectAll',
    'divider',
    'tag',
    'fontFamily',
    'fontSize',
    'foreColor',
    'backColor',
    'list',
    'justify',
    'image',
    'video'
]
export default {
    name: 'm-editor',
    data() {
        return {
            //菜单元素ref
            menuRefs: [],
            //选区
            range: null,
            //源码是否显示
            codeViewShow: false,
            //初始值
            initalHtml: '',
            //html内容
            html: '',
            //text内容
            text: '',
            //是否双向绑定改变值
            isModelChange: false,
            //默认菜单浮层配置
            defaultLayerProps: {
                //是否fixed
                fixed: false,
                //适配fixed下tansform父元素
                fixedAuto: false,
                //位置
                placement: 'bottom-start',
                //浮层z-index
                zIndex: 400,
                //距离触发元素的距离
                offset: '0.1rem',
                //主体额外样式
                wrapperClass: null,
                //显示与隐藏动画时长
                timeout: 200,
                //是否显示三角
                showTriangle: false,
                //自定义动画
                animation: null,
                //是否显示阴影
                shadow: true,
                //是否显示边框
                border: true,
                //边框颜色
                borderColor: '#eee'
            },
            //默认菜单配置
            defaultMenus: {
                //撤销
                undo: true,
                //恢复
                redo: true,
                //移除格式
                removeFormat: true,
                //全选
                selectAll: true,
                //分割线
                divider: true,
                //标签
                tag: [
                    {
                        label: 'H1',
                        value: 'h1'
                    },
                    {
                        label: 'H2',
                        value: 'h2'
                    },
                    {
                        label: 'H3',
                        value: 'h3'
                    },
                    {
                        label: 'H4',
                        value: 'h4'
                    },
                    {
                        label: 'H5',
                        value: 'h5'
                    },
                    {
                        label: 'H6',
                        value: 'h6'
                    },
                    {
                        label: '段落',
                        value: 'p'
                    }
                ],
                //加粗
                bold: true,
                //斜体
                italic: true,
                //下划线
                underline: true,
                //删除线
                strikeThrough: true,
                //下标
                subscript: true,
                //上标
                superscript: true,
                //字体
                fontFamily: [
                    'PingFang SC',
                    'Helvetica Neue',
                    'kaiTi',
                    'Microsoft YaHei',
                    'Arial',
                    'sans-serif'
                ],
                //字号
                fontSize: [
                    {
                        label: '12px',
                        value: '0.24rem'
                    },
                    {
                        label: '14px',
                        value: '0.28rem'
                    },
                    {
                        label: '16px',
                        value: '0.32rem'
                    },
                    {
                        label: '20px',
                        value: '0.4rem'
                    },
                    {
                        label: '28px',
                        value: '0.56rem'
                    },
                    {
                        label: '36px',
                        value: '0.72rem'
                    },
                    {
                        label: '48px',
                        value: '0.96rem'
                    }
                ],
                //字体颜色
                foreColor: [
                    '#000000',
                    '#505050',
                    '#808080',
                    '#BBBBBB',
                    '#CCCCCC',
                    '#EEEEEE',
                    '#F7F7F7',
                    '#FFFFFF',
                    '#EC1A0A',
                    '#FF9900',
                    '#FFFF00',
                    '#07C160',
                    '#00FFFF',
                    '#0B73DE',
                    '#9C00FF',
                    '#FF00FF',
                    '#F7C6CE',
                    '#FFE7CE',
                    '#FFEFC6',
                    '#D6EFD6',
                    '#CEDEE7',
                    '#CEE7F7',
                    '#D6D6E7',
                    '#E7D6DE',
                    '#E79C9C',
                    '#FFC69C',
                    '#FFE79C',
                    '#B5D6A5',
                    '#A5C6CE',
                    '#9CC6EF',
                    '#B5A5D6',
                    '#D6A5BD',
                    '#e45649',
                    '#F7AD6B',
                    '#FFD663',
                    '#94BD7B',
                    '#73A5AD',
                    '#6BADDE',
                    '#8C7BC6',
                    '#C67BA5',
                    '#CE0000',
                    '#E79439',
                    '#EFC631',
                    '#50a14f',
                    '#4A7B8C',
                    '#03A8F3',
                    '#634AA5',
                    '#A54A7B',
                    '#9C0000',
                    '#B56308',
                    '#BD9400',
                    '#397B21',
                    '#104A5A',
                    '#085294',
                    '#311873',
                    '#731842',
                    '#630000',
                    '#7B3900',
                    '#986801',
                    '#295218',
                    '#083139',
                    '#003163',
                    '#21104A',
                    '#4A1031'
                ],
                //背景色
                backColor: [
                    '#000000',
                    '#505050',
                    '#808080',
                    '#BBBBBB',
                    '#CCCCCC',
                    '#EEEEEE',
                    '#F7F7F7',
                    '#FFFFFF',
                    '#EC1A0A',
                    '#FF9900',
                    '#FFFF00',
                    '#07C160',
                    '#00FFFF',
                    '#0B73DE',
                    '#9C00FF',
                    '#FF00FF',
                    '#F7C6CE',
                    '#FFE7CE',
                    '#FFEFC6',
                    '#D6EFD6',
                    '#CEDEE7',
                    '#CEE7F7',
                    '#D6D6E7',
                    '#E7D6DE',
                    '#E79C9C',
                    '#FFC69C',
                    '#FFE79C',
                    '#B5D6A5',
                    '#A5C6CE',
                    '#9CC6EF',
                    '#B5A5D6',
                    '#D6A5BD',
                    '#E76363',
                    '#F7AD6B',
                    '#FFD663',
                    '#94BD7B',
                    '#73A5AD',
                    '#6BADDE',
                    '#8C7BC6',
                    '#C67BA5',
                    '#CE0000',
                    '#E79439',
                    '#EFC631',
                    '#6BA54A',
                    '#4A7B8C',
                    '#03A8F3',
                    '#634AA5',
                    '#A54A7B',
                    '#9C0000',
                    '#B56308',
                    '#BD9400',
                    '#397B21',
                    '#104A5A',
                    '#085294',
                    '#311873',
                    '#731842',
                    '#630000',
                    '#7B3900',
                    '#846300',
                    '#295218',
                    '#083139',
                    '#003163',
                    '#21104A',
                    '#4A1031'
                ],
                //列表
                list: [
                    {
                        label: '有序列表',
                        value: 'ol',
                        icon: 'ol'
                    },
                    {
                        label: '无序列表',
                        value: 'ul',
                        icon: 'ul'
                    }
                ],
                //对齐方式
                justify: [
                    {
                        label: '左对齐',
                        value: 'left',
                        icon: 'align-left'
                    },
                    {
                        label: '居中对齐',
                        value: 'center',
                        icon: 'align-center'
                    },
                    {
                        label: '右对齐',
                        value: 'right',
                        icon: 'align-right'
                    },
                    {
                        label: '两端对齐',
                        value: 'justify',
                        icon: 'align-justify'
                    }
                ],
                //引用
                quote: true,
                //链接
                link: [
                    {
                        label: '插入链接',
                        value: 'link'
                    }
                ],
                //插入图片
                image: [
                    {
                        label: '本地上传',
                        value: 'upload'
                    },
                    {
                        label: '网络图片',
                        value: 'remote'
                    }
                ],
                //插入视频
                video: [
                    {
                        label: '本地上传',
                        value: 'upload'
                    },
                    {
                        label: '网络视频',
                        value: 'remote'
                    }
                ],
                //插入表格
                table: [
                    {
                        label: '插入表格',
                        value: 'table'
                    }
                ],
                //插入代码
                code: true,
                //显示源码
                codeView: false
            },
            //默认的工具提示内容
            defaultTooltips: {
                undo: '撤销',
                redo: '恢复',
                removeFormat: '清除格式',
                selectAll: '全选',
                divider: '分割线',
                tag: '标签',
                bold: '加粗',
                italic: '斜体',
                underline: '下划线',
                strikeThrough: '删除线',
                subscript: '下标',
                superscript: '上标',
                fontFamily: '字体',
                fontSize: '字号',
                foreColor: '字体颜色',
                backColor: '背景色',
                list: '列表',
                justify: '对齐方式',
                quote: '引用',
                link: '插入链接',
                image: '插入图片',
                video: '插入视频',
                table: '插入表格',
                code: '插入代码',
                codeView: '显示源码'
            },
            //默认工具提示组件参数配置
            defaultTooltipProps: {
                placement: 'bottom',
                timeout: 200,
                color: '#333',
                textColor: '#fff',
                borderColor: '#333',
                offset: '0.1rem',
                zIndex: 100,
                fixed: false,
                fixedAuto: false,
                width: null,
                animation: null,
                showTriangle: true
            },
            //默认上传图片配置
            defaultUploadImageProps: {
                //是否多选
                multiple: false,
                //限定格式
                allowedFileType: [
                    'jpg',
                    'png',
                    'JPG',
                    'PNG',
                    'JPEG',
                    'jpeg',
                    'gif',
                    'GIF',
                    'jfif',
                    'JFIF'
                ],
                //限制类型
                accept: 'image',
                //限制单个图片最小值，单位kb
                minSize: -1,
                //限定单个图片最大值，单位kb
                maxSize: -1,
                //多选时选择图片的最小数量
                minLength: -1,
                //多选时选择图片的最大数量
                maxLength: -1
            },
            //默认上传视频配置
            defaultUploadVideoProps: {
                //是否多选
                multiple: false,
                //限定格式
                allowedFileType: ['mp4', 'MP4', 'avi', 'AVI', 'WAV', 'wav'],
                //限制类型
                accept: 'video',
                //限制单个视频最小值，单位kb
                minSize: -1,
                //限定单个视频最大值，单位kb
                maxSize: -1,
                //多选时选择视频的最小数量
                minLength: -1,
                //多选时选择视频的最大数量
                maxLength: -1
            },
            //视频显示设置
            defaultVideoShowProps: {
                //视频是否自动播放
                autoplay: true,
                //视频静音
                muted: true,
                //是否显示控制器
                controls: false,
                //是否循环
                loop: false
            },
            //默认菜单项图标
            defaultMenuIcons: {
                undo: 'undo',
                redo: 'redo',
                removeFormat: 'clear',
                selectAll: 'check-square',
                divider: 'divider',
                tag: 'font-title',
                bold: 'bold',
                italic: 'italic',
                underline: 'underline',
                strikeThrough: 'strikethrough',
                subscript: 'subscript',
                superscript: 'superscript',
                fontFamily: 'font',
                fontSize: 'font-size',
                foreColor: 'color-picker',
                backColor: 'brush',
                link: 'link',
                list: 'ul',
                justify: 'align-justify',
                quote: 'quote',
                image: 'image',
                table: 'table-alt',
                video: 'video',
                code: 'code',
                codeView: 'eye'
            },
            //默认菜单项序列值
            defaultMenuIndex: {
                undo: 0,
                redo: 0,
                removeFormat: 0,
                selectAll: 0,
                divider: 0,
                tag: 0,
                bold: 0,
                italic: 0,
                underline: 0,
                strikeThrough: 0,
                subscript: 0,
                superscript: 0,
                fontFamily: 0,
                fontSize: 0,
                foreColor: 0,
                backColor: 0,
                link: 0,
                list: 0,
                justify: 0,
                quote: 0,
                image: 0,
                table: 0,
                video: 0,
                code: 0,
                codeView: 0
            }
        }
    },
    emits: [
        'update:modelValue',
        'upload-image',
        'upload-video',
        'custom',
        'blur',
        'focus',
        'input',
        'file-paste'
    ],
    props: {
        //值
        modelValue: {
            type: [String, Number],
            default: ''
        },
        //是否自动获取焦点
        autofocus: {
            type: Boolean,
            default: false
        },
        //占位符
        placeholder: {
            type: String,
            default: ''
        },
        //初始高度
        height: {
            type: String,
            default: null
        },
        //编辑区域高度是否自动变化
        autoHeight: {
            type: Boolean,
            default: false
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        //是否显示菜单栏
        showMenus: {
            type: Boolean,
            default: true
        },
        //编辑区域边框是否显示
        border: {
            type: Boolean,
            default: true
        },
        //菜单配置
        menus: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //菜单项浮层参数
        layerProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //触发悬浮层显现的方式
        trigger: {
            type: String,
            default: 'click',
            validator(value) {
                return ['hover', 'click'].includes(value)
            }
        },
        //本地上传文件是否使用base64
        useBase64: {
            type: Boolean,
            default: true
        },
        //是否使用tooltip
        useTooltip: {
            type: Boolean,
            default: true
        },
        //提示内容配置
        tooltips: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //提示组件参数配置
        tooltipProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //自定义上传图片配置
        uploadImageProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //自定义上传视频配置
        uploadVideoProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //自定义上传图片出错回调
        uploadImageError: {
            type: Function
        },
        //自定义上传视频出错回调
        uploadVideoError: {
            type: Function
        },
        //自定义视频显示设置
        videoShowProps: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //菜单项图标配置
        menuIcons: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //激活判定
        customActive: {
            type: Function,
            default: function () {
                return false
            }
        },
        //激活颜色设定
        activeColor: {
            type: String,
            default: '#0b73de',
            validator(value) {
                return $dap.common.matchingText(value, 'hex')
            }
        },
        //纯文本粘贴
        pasteText: {
            type: Boolean,
            default: false
        },
        //自定义菜单项序列
        menuIndex: {
            type: Object,
            default: function () {
                return {}
            }
        },
        //上传图片显示样式
        imageClass: {
            type: String,
            default: null
        },
        //上传视频显示样式
        videoClass: {
            type: String,
            default: null
        }
    },
    computed: {
        //菜单项序列排序后返回的map对象
        computedMenuIndex() {
            const map = new Map()
            for (let key in this.defaultMenuIndex) {
                map.set(key, this.defaultMenuIndex[key])
            }
            const arr = Array.from(map).sort((a, b) => {
                return a[1] - b[1]
            })
            return new Map(arr.map(i => [i[0], i[1]]))
        },
        //是否显示指定菜单项
        showMenuItem() {
            return key => {
                if (typeof this.computedMenus[key] == 'boolean') {
                    return this.computedMenus[key]
                } else if (Array.isArray(this.computedMenus[key])) {
                    return this.computedMenus[key].length > 0
                }
                return false
            }
        },
        //菜单配置值
        computedMenus() {
            let menus = {}
            Object.keys(this.defaultMenus).forEach(key => {
                //数组
                if (Array.isArray(this.defaultMenus[key])) {
                    let newArray = []
                    this.defaultMenus[key].forEach(item => {
                        if (
                            $dap.common.isObject(item) &&
                            item.label &&
                            item.value
                        ) {
                            let obj = {
                                label: item.label,
                                value: item.value
                            }
                            if ($dap.common.isObject(item.icon)) {
                                obj.icon = {
                                    custom: item.icon.custom,
                                    value: item.icon.value
                                }
                            } else if (
                                typeof item.icon == 'string' &&
                                item.icon
                            ) {
                                obj.icon = {
                                    custom: false,
                                    value: item.icon
                                }
                            }
                            newArray.push(obj)
                        } else if (
                            typeof item == 'string' ||
                            $dap.number.isNumber(item)
                        ) {
                            newArray.push({
                                label: item,
                                value: item
                            })
                        }
                    })
                    menus[key] = newArray
                }
                //非数组情况只能是布尔值
                else if (typeof this.defaultMenus[key] == 'boolean') {
                    menus[key] = this.defaultMenus[key]
                }
            })
            return menus
        },
        //编辑区域样式类
        contentClass() {
            let cls = ['mvi-editor-content']
            if (this.autoHeight) {
                cls.push('mvi-editor-content-auto')
            }
            if (
                this.html == '<p><br></p>' ||
                this.html == '' ||
                this.html == '<br>' ||
                this.html == '<p></p>'
            ) {
                cls.push('mvi-editor-content-empty')
            }
            return cls
        },
        //源码视图样式类
        codeViewClass() {
            let cls = ['mvi-editor-codeview']
            if (this.autoHeight) {
                cls.push('mvi-editor-codeview-auto')
            }
            return cls
        },
        //编辑区域样式
        contentStyle() {
            let style = {}
            if (this.autoHeight) {
                if (this.height) {
                    style.minHeight = this.height
                }
            } else {
                if (this.height) {
                    style.height = this.height
                }
            }
            if (!this.border) {
                style.border = 'none'
            }
            return style
        },
        //源码视图样式
        codeViewStyle() {
            let style = {}
            if (this.autoHeight) {
                if (this.height) {
                    style.minHeight = this.height
                }
            } else {
                if (this.height) {
                    style.height = this.height
                }
            }
            return style
        },
        //图标配置值
        computedMenuIcons() {
            let menuIcons = {}
            Object.keys(this.defaultMenuIcons).forEach(key => {
                //是对象
                if ($dap.common.isObject(this.defaultMenuIcons[key])) {
                    menuIcons[key] = {
                        custom: this.defaultMenuIcons[key].custom,
                        value: this.defaultMenuIcons[key].value
                    }
                } else {
                    menuIcons[key] = {
                        custom: false,
                        value: this.defaultMenuIcons[key]
                    }
                }
            })
            return menuIcons
        }
    },
    provide() {
        return {
            editor: this
        }
    },
    components: {
        mEditorItem: editorItem
    },
    mounted() {
        //初始化
        this.init()
        //监听dom
        this.domListener()
    },
    watch: {
        modelValue(newValue) {
            if (!this.isModelChange) {
                if (this.$refs.content) {
                    this.$refs.content.innerHTML = this.getValue()
                } else if (this.$refs.codeView) {
                    this.$refs.codeView.innerText = this.getValue()
                }
                this.updateHtmlText()
            }
        }
    },
    methods: {
        //初始化
        init() {
            //将自定义菜单项序列配置与默认配置整合
            this.defaultMenuIndex = this.initOption(
                this.defaultMenuIndex,
                this.menuIndex
            )
            //将自定义的菜单项浮层配置与默认配置整合
            this.defaultLayerProps = this.initOption(
                this.defaultLayerProps,
                this.layerProps
            )
            //将自定义的菜单栏配置与默认配置整合
            this.defaultMenus = this.initOption(this.defaultMenus, this.menus)
            //将自定义的提示内容与默认提示整合
            this.defaultTooltips = this.initOption(
                this.defaultTooltips,
                this.tooltips
            )
            //将自定义的工具提示组件参数与默认工具提示组件参数整合
            this.defaultTooltipProps = this.initOption(
                this.defaultTooltipProps,
                this.tooltipProps
            )
            //将自定义上传图片配置参数与默认上传图片配置参数整合
            this.defaultUploadImageProps = this.initOption(
                this.defaultUploadImageProps,
                this.uploadImageProps
            )
            //将自定义上传视频配置参数与默认上传视频配置参数整合
            this.defaultUploadVideoProps = this.initOption(
                this.defaultUploadVideoProps,
                this.uploadVideoProps
            )
            //将自定义的视频配置参数与默认的视频配置参数整合
            this.defaultVideoShowProps = this.initOption(
                this.defaultVideoShowProps,
                this.videoShowProps
            )
            //将自定义的菜单项图标配置与默认的菜单项图标配置整合
            this.defaultMenuIcons = this.initOption(
                this.defaultMenuIcons,
                this.menuIcons
            )
            //定义段落分隔符
            document.execCommand('defaultParagraphSeparator', false, 'p')
            //使用css
            document.execCommand('styleWithCSS', false, true)
            //初始化赋值
            this.initalHtml = this.getValue()
            this.$nextTick(() => {
                this.updateHtmlText()
            })
            if (this.autofocus) {
                this.collapseToEnd()
            }
            if (this.defaultMenus.fontSize.length > 7) {
                throw new Error(
                    'The maximum length of fontSize cannot exceed 7'
                )
            }
        },
        //对外提供的用以插入图片的api
        insertImage(url) {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            const style = ['mvi-editor-image']
            if (this.imageClass) {
                style.push(this.imageClass)
            }
            const imgHtml = `<img src="${url}" class="${style.join(' ')}" />`
            document.execCommand('insertHtml', false, imgHtml)
        },
        //对外提供的用以插入视频的api
        insertVideo(url) {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            const style = ['mvi-editor-video']
            if (this.videoClass) {
                style.push(this.videoClass)
            }
            let video = $dap.element.string2dom(
                `<video src="${url}" class="${style.join(' ')}"></video>`
            )
            if (this.defaultVideoShowProps.muted) {
                video.setAttribute('muted', 'muted')
            }
            if (this.defaultVideoShowProps.loop) {
                video.setAttribute('loop', 'loop')
            }
            if (this.defaultVideoShowProps.controls) {
                video.setAttribute('controls', 'controls')
            }
            if (this.defaultVideoShowProps.autoplay) {
                video.setAttribute('autoplay', 'autoplay')
            }
            document.execCommand('insertHtml', false, video.outerHTML)
        },
        //对外提供的用以清除内容的api
        empty() {
            if (this.disabled) {
                return
            }
            if (this.$refs.content) {
                this.$refs.content.innerHTML = '<p><br></p>'
            } else if (this.$refs.codeView) {
                this.$refs.codeView.innerText = '<p><br></p>'
            }
            this.updateHtmlText()
            this.updateValue()
            this.collapseToEnd()
        },
        //保存选区，可对外提供
        saveRange() {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            let selection = window.getSelection()
            if (selection.getRangeAt && selection.rangeCount) {
                this.range = selection.getRangeAt(0)
            }
        },
        //恢复选区，可对外提供
        restoreRange() {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            let selection = window.getSelection()
            selection.removeAllRanges()
            if (this.range) {
                selection.addRange(this.range)
            }
        },
        //将编辑区域光标移至最后，可对外提供
        collapseToEnd() {
            if (this.disabled) {
                return
            }
            let el = null
            if (this.$refs.content) {
                el = this.$refs.content
            } else if (this.$refs.codeView) {
                el = this.$refs.codeView
            }
            el.focus()
            let selection = window.getSelection()
            selection.selectAllChildren(el)
            selection.collapseToEnd()
        },
        //根据选区获取节点，可对外提供
        getSelectNode() {
            if (this.disabled) {
                return null
            }
            if (!this.range) {
                return null
            }
            if (!this.$refs.content) {
                return null
            }
            let node = this.range.commonAncestorContainer
            if ($dap.element.isElement(node)) {
                return node
            } else {
                return node.parentNode
            }
        },
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
                            if (
                                this.compareCss(
                                    node,
                                    'font-weight',
                                    'bold',
                                    false
                                ) ||
                                this.compareCss(
                                    node,
                                    'font-weight',
                                    '700',
                                    false
                                )
                            ) {
                                item.menuActive = true
                            } else {
                                item.menuActive = false
                            }
                            break
                        case 'italic':
                            if (
                                this.compareCss(
                                    node,
                                    'font-style',
                                    'italic',
                                    false
                                )
                            ) {
                                item.menuActive = true
                            } else {
                                item.menuActive = false
                            }
                            break
                        case 'underline':
                            if (
                                this.compareCss(
                                    node,
                                    'text-decoration-line',
                                    'underline'
                                )
                            ) {
                                item.menuActive = true
                            } else {
                                item.menuActive = false
                            }
                            break
                        case 'strikeThrough':
                            if (
                                this.compareCss(
                                    node,
                                    'text-decoration-line',
                                    'line-through'
                                )
                            ) {
                                item.menuActive = true
                            } else {
                                item.menuActive = false
                            }
                            break
                        case 'subscript':
                            if (
                                this.compareCss(node, 'vertical-align', 'sub')
                            ) {
                                item.menuActive = true
                            } else {
                                item.menuActive = false
                            }
                            break
                        case 'superscript':
                            if (
                                this.compareCss(node, 'vertical-align', 'super')
                            ) {
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
                            if (unactiveMenus.includes(item.value)) {
                                item.menuActive = false
                                return
                            }
                            item.menuActive =
                                this.customActive(item.value, node) || false
                    }
                }
            })
        },
        //编辑区域获取焦点
        contentFocus() {
            if (this.disabled) {
                return
            }
            if (this.border && this.activeColor && this.$refs.content) {
                this.$refs.content.style.borderColor = this.activeColor
                const rgb = $dap.color.hex2rgb(this.activeColor)
                this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
            }
            this.changeActive()
            this.$nextTick(() => {
                this.$emit('focus', {
                    html: this.html,
                    text: this.text
                })
            })
        },
        //编辑区域失去焦点
        contentBlur() {
            if (this.disabled) {
                return
            }
            if (this.border && this.activeColor && this.$refs.content) {
                this.$refs.content.style.borderColor = ''
                this.$refs.content.style.boxShadow = ''
            }
            this.changeActive()
            this.$nextTick(() => {
                this.$emit('blur', {
                    html: this.html,
                    text: this.text
                })
            })
        },
        //输入框输入
        contentInput() {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            this.updateHtmlText()
            this.updateValue()
            this.changeActive()
            this.$nextTick(() => {
                this.$emit('input', {
                    html: this.html,
                    text: this.text
                })
            })
        },
        //源码视图获取焦点
        codeViewFocus() {
            if (this.disabled) {
                return
            }
            this.$emit('focus', {
                html: this.html,
                text: this.text
            })
        },
        //源码视图失去焦点
        codeViewBlur() {
            if (this.disabled) {
                return
            }
            this.$emit('blur', {
                html: this.html,
                text: this.text
            })
        },
        //源码视图输入
        codeViewInput() {
            if (this.disabled) {
                return
            }
            if (!this.$refs.codeView) {
                return
            }
            this.updateHtmlText()
            this.updateValue()
            this.$emit('input', {
                html: this.html,
                text: this.text
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
                    document.execCommand(
                        'insertHtml',
                        false,
                        '&nbsp;&nbsp;&nbsp;&nbsp;'
                    )
                } else {
                    document.execCommand(
                        'insertHtml',
                        false,
                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    )
                }
            }
        },
        //初始化对象参数方法
        initOption(defaultObj, propObj) {
            let obj = {}
            Object.assign(obj, defaultObj)
            Object.assign(obj, propObj)
            return obj
        },
        //判断某个节点是否在指定标签下，可对外提供
        compareTag(el, tag) {
            if (!$dap.element.isElement(el)) {
                return false
            }
            if (!this.$refs.content) {
                return false
            }
            if ($dap.element.isContains(this.$refs.content, el)) {
                if (el.tagName.toLocaleUpperCase() == tag.toLocaleUpperCase()) {
                    return true
                } else {
                    return this.compareTag(el.parentNode, tag)
                }
            } else {
                return false
            }
        },
        //判断某个节点是否在指定样式下，可对外提供
        compareCss(el, cssName, cssValue, thinkParent = true) {
            if (!$dap.element.isElement(el)) {
                return false
            }
            if (!this.$refs.content) {
                return false
            }
            if ($dap.element.isContains(this.$refs.content, el)) {
                if ($dap.element.getCssStyle(el, cssName) == cssValue) {
                    return true
                }
                //如果考虑父元素
                if (thinkParent) {
                    return this.compareCss(
                        el.parentNode,
                        cssName,
                        cssValue,
                        thinkParent
                    )
                }
            }
            return false
        },
        //判断某个节点是否在指定属性下，可对外提供
        compareAttribute(el, attrName, attrVal) {
            if (!$dap.element.isElement(el)) {
                return false
            }
            if (!this.$refs.content) {
                return false
            }
            if ($dap.element.isContains(this.$refs.content, el)) {
                if (el.hasAttribute(attrName)) {
                    if (attrVal) {
                        if (el.getAttribute(attrName) === attrVal) {
                            return true
                        }
                        return false
                    }
                    return true
                } else {
                    return this.compareAttribute(
                        el.parentNode,
                        attrName,
                        attrVal
                    )
                }
            } else {
                return false
            }
        },
        //根据标签名获取某个节点，可对外提供
        getCompareTag(el, tag) {
            if (!$dap.element.isElement(el)) {
                return null
            }
            if (!this.$refs.content) {
                return null
            }
            if ($dap.element.isContains(this.$refs.content, el)) {
                if (el.tagName.toLocaleUpperCase() == tag.toLocaleUpperCase()) {
                    return el
                } else {
                    return this.getCompareTag(el.parentNode, tag)
                }
            } else {
                return null
            }
        },
        //根据css获取某个节点，可对外提供
        getCompareTagForCss(el, cssName, cssValue) {
            if (!$dap.element.isElement(el)) {
                return null
            }
            if (!this.$refs.content) {
                return null
            }
            if ($dap.element.isContains(this.$refs.content, el)) {
                if ($dap.element.getCssStyle(el, cssName) == cssValue) {
                    return el
                } else {
                    return this.getCompareTagForCss(
                        el.parentNode,
                        cssName,
                        cssValue
                    )
                }
            } else {
                return null
            }
        },
        //根据属性或者属性值获取某个节点，可对外提供
        getCompareTagForAttribute(el, attrName, attrVal) {
            if (!$dap.element.isElement(el)) {
                return null
            }
            if (!this.$refs.content) {
                return null
            }
            if ($dap.element.isContains(this.$refs.content, el)) {
                if (el.hasAttribute(attrName)) {
                    if (attrVal) {
                        if (el.getAttribute(attrName) === attrVal) {
                            return el
                        }
                        return null
                    }
                    return el
                } else {
                    return this.getCompareTagForAttribute(
                        el.parentNode,
                        attrName,
                        attrVal
                    )
                }
            } else {
                return null
            }
        },
        //获取经过处理的modelValue值
        getValue() {
            if (
                this.modelValue == '' ||
                this.modelValue == '<br>' ||
                this.modelValue == '<p></p>'
            ) {
                return '<p><br></p>'
            } else {
                return String(this.modelValue)
            }
        },
        //根据html值更新modelValue值，可对外提供
        updateValue() {
            this.isModelChange = true
            this.$emit('update:modelValue', this.html)
            this.$nextTick(() => {
                this.isModelChange = false
            })
        },
        //根据编辑器的值更新html和text值，可对外提供
        updateHtmlText() {
            if (this.$refs.content) {
                this.html = this.$refs.content.innerHTML
                this.text = this.$refs.content.innerText
            } else if (this.$refs.codeView) {
                this.html = this.$refs.codeView.innerText
                let el = $dap.element.string2dom(
                    `<div>${this.$refs.codeView.innerText}</div>`
                )
                this.text = el.innerText
            }
        },
        //代码视图粘贴事件
        codeViewPaste(event) {
            event.preventDefault()
            let clip = (event.originalEvent || event).clipboardData
            let text = clip.getData('text/plain') || ''
            if (text !== '') {
                document.execCommand('insertText', false, text)
            }
        },
        //编辑器粘贴事件
        contentPaste(event) {
            let clip = (event.originalEvent || event).clipboardData
            let text = clip.getData('text/plain') || ''
            if (this.pasteText) {
                event.preventDefault()
                if (text !== '') {
                    document.execCommand('insertText', false, text)
                }
            } else {
                if (clip.files.length > 0) {
                    event.preventDefault()
                    for (let file of clip.files) {
                        const isImage = this.judgeSuffix(
                            file.name,
                            this.defaultUploadImageProps.allowedFileType
                        )
                        const isVideo = this.judgeSuffix(
                            file.name,
                            this.defaultUploadVideoProps.allowedFileType
                        )
                        //是图片或者视频
                        if (isImage || isVideo) {
                            const minSize = isImage
                                ? this.defaultUploadImageProps.minSize
                                : this.defaultUploadVideoProps.minSize
                            const maxSize = isImage
                                ? this.defaultUploadImageProps.maxSize
                                : this.defaultUploadVideoProps.maxSize
                            //判断文件大小
                            if (file.size / 1024 > maxSize && maxSize > 0) {
                                if (
                                    typeof this.uploadImageError == 'function'
                                ) {
                                    this.uploadImageError(
                                        102,
                                        '文件' +
                                            file.name +
                                            '超出文件最大值限定',
                                        file
                                    )
                                } else {
                                    this.$msgbox({
                                        message:
                                            '文件' +
                                            file.name +
                                            '超出文件最大值限定',
                                        animation: 'scale'
                                    })
                                }
                                return
                            }
                            if (file.size / 1024 < minSize && minSize > 0) {
                                if (
                                    typeof this.uploadImageError == 'function'
                                ) {
                                    this.uploadImageError(
                                        103,
                                        '文件' +
                                            file.name +
                                            '没有达到文件最小值限定',
                                        file
                                    )
                                } else {
                                    this.$msgbox({
                                        message:
                                            '文件' +
                                            file.name +
                                            '没有达到文件最小值限定',
                                        animation: 'scale'
                                    })
                                }
                                return
                            }
                            //使用base64
                            if (this.useBase64) {
                                $dap.file.dataFileToBase64(file).then(url => {
                                    if (isImage) {
                                        this.insertImage(url)
                                    } else if (isVideo) {
                                        this.insertVideo(url)
                                    }
                                })
                            }
                            //自定义上传
                            else {
                                if (isImage) {
                                    this.$emit('upload-image', [file])
                                } else if (isVideo) {
                                    this.$emit('upload-video', [file])
                                }
                            }
                        }
                        //其他文件
                        else {
                            this.$emit('file-paste', file)
                        }
                    }
                }
            }
        },
        //判断粘贴文件后缀是否符合
        judgeSuffix(fileName, allowedFileType) {
            //获取文件后缀
            let suffix = fileName.substr(fileName.lastIndexOf('.') + 1)
            if (allowedFileType.length == 0) {
                return true
            } else {
                //转为小写
                suffix = suffix.toLocaleLowerCase()
                for (let i = 0; i < allowedFileType.length; i++) {
                    allowedFileType[i] = allowedFileType[i].toLocaleLowerCase()
                }
                return allowedFileType.includes(suffix)
            }
        },
        //对外提供的用以插入HTML片段的api
        insertHtml(html) {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            if (!html) {
                return
            }
            document.execCommand('insertHtml', false, html)
        },
        //对外提供的用以插入文本的api
        insertText(text) {
            if (this.disabled) {
                return
            }
            if (!this.$refs.content) {
                return
            }
            if (!text) {
                return
            }
            document.execCommand('insertText', false, text)
        },
        //监听dom设置字体
        domListener() {
            const observe = new Observe(this.$refs.body, {
                attributes: false,
                childList: true,
                subtree: true,
                childNodesChange: (addNode, removeNode) => {
                    if (addNode) {
                        const fontSize = addNode.style.fontSize
                        switch (fontSize) {
                            case 'x-small':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[0].value
                                break
                            case 'small':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[1].value
                                break
                            case 'medium':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[2].value
                                break
                            case 'large':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[3].value
                                break
                            case 'x-large':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[4].value
                                break
                            case 'xx-large':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[5].value
                                break
                            case 'xxx-large':
                                addNode.style.fontSize =
                                    this.defaultMenus.fontSize[6].value
                                break
                            default:
                                break
                        }
                    }
                }
            })
            observe.init()
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-editor {
    display: block;
    position: relative;
    width: 100%;
}

.mvi-editor-menus {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    background-color: #fff;
    margin-bottom: @mp-sm;
    border: 1px solid @border-color;
    border-radius: @radius-default;
}

.mvi-editor-body {
    display: block;
    position: relative;
    width: 100%;

    .mvi-editor-codeview {
        display: block;
        position: relative;
        width: 100%;
        border: 1px solid #000;
        height: 8rem;
        background-color: #000;
        border-radius: @radius-default;
        margin: 0;
        padding: @mp-sm;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: @font-size-default;
        color: #fff;
        font-family: Consolas;

        &.mvi-editor-codeview-auto {
            height: auto;
            min-height: 8rem;
            overflow: hidden;
        }
    }

    .mvi-editor-content {
        display: block;
        position: relative;
        width: 100%;
        border: 1px solid @border-color;
        height: 8rem;
        background-color: #fff;
        border-radius: @radius-default;
        margin: 0;
        padding: @mp-sm;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: @font-size-default;
        color: @font-color-default;
        transition: border-color 600ms, box-shadow 600ms;
        -webkit-transition: border-color 600ms, box-shadow 600ms;
        box-shadow: none;

        &.mvi-editor-content-auto {
            height: auto;
            min-height: 8rem;
            overflow: hidden;
        }

        &.mvi-editor-content-empty::before {
            position: absolute;
            top: @mp-sm;
            left: @mp-sm;
            content: attr(data-placeholder);
            font-size: inherit;
            color: inherit;
            opacity: 0.5;
            line-height: inherit;
            vertical-align: middle;
            cursor: text;
        }
    }
}

:deep(.mvi-editor-image) {
    display: inline-block;
    width: auto;
    height: auto;
    max-width: 100%;
}

:deep(.mvi-editor-video) {
    display: inline-block;
    width: auto;
    height: auto;
    max-width: 100%;
}

/* 表格demo样式 */
:deep(.mvi-editor-table-demo) {
    width: 100%;
    border: 1px solid @border-color;
    margin: 0;
    padding: 0;
    font-size: @font-size-default;
    color: @font-color-default;
    border-collapse: collapse;
    margin-bottom: @mp-sm;

    tbody {
        margin: 0;
        padding: 0;

        tr {
            margin: 0;
            padding: 0;

            &:first-child {
                background-color: @bg-color-dark;

                td {
                    font-weight: bold;
                }
            }

            td {
                font-size: @font-size-default;
                color: @font-color-default;
                margin: 0;
                border-bottom: 1px solid @border-color;
                border-right: 1px solid @border-color;
                padding: @mp-sm;

                &:last-child {
                    border-right: none;
                }
            }
        }
    }
}
</style>

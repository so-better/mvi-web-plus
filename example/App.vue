<template>
    <div class="mvi-p-2">
        <m-editor :menu-icons="{ act: 'user' }" :menu-index="{ act: 1 }" :menus="{ codeView: true, act: actMenu }" v-model="value" height="8rem"> </m-editor>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            value: `<h5>下载ruax到本地使用</h5><p><br></p><p>第一步：下载ruax文件，下载地址：<a href="https://registry.npm.taobao.org/ruax/download/ruax-1.6.7.tgz" target="_blank" style="font-size: 0.28rem;">https://registry.npm.taobao.org/ruax/download/ruax-1.6.7.tgz</a></p><p>第二步：下载完成后最终解压得到一个package文件夹，即为ruax的包，进入package文件夹后，将dist目录下的ruax.js拷贝到你的项目目录下</p><p>第三步：在HTML页面中引入ruax.js</p><pre><span style="color: rgb(11, 115, 222);">&lt;script src=</span><span style="color: rgb(99, 74, 165);">"ruax.js"</span><span style="color: rgb(11, 115, 222);"> type=</span><span style="color: rgb(99, 74, 165);">"text/javascript"</span><span style="color: rgb(11, 115, 222);"> charset=</span><span style="color: rgb(99, 74, 165);">"utf-8"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/script&gt;</span></pre><p><br></p><p><br></p><h5>CDN在线引入ruax</h5><p><br></p><p>除了下载到本地外，你还可以直接通过CDN在线引入，此处附上在线CDN引入的地址：&nbsp;</p><pre><span style="color: rgb(187, 187, 187);">//引入固定版本的ruax</span><span style="color: rgb(11, 115, 222);">&lt;script src=</span><span style="color: rgb(99, 74, 165);">"https://cdn.jsdelivr.net/npm/ruax@1.6.7/dist/ruax.js"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/script&gt;</span></pre><pre><span style="color: rgb(187, 187, 187);">//始终引入最新版本的ruax</span><br><span style="color: rgb(11, 115, 222);">&lt;script src=</span><span style="color: rgb(99, 74, 165);">"https://cdn.jsdelivr.net/npm/ruax/dist/ruax.js"</span><span style="color: rgb(11, 115, 222);">&gt;&lt;/script&gt;</span></pre><p><br></p><p><br></p><h5>通过npm安装和使用</h5><p><br></p><pre>npm <span style="color: rgb(11, 115, 222);">install</span> ruax <span style="font-style: italic; color: rgb(128, 128, 128);">--save</span></pre><pre><span style="color: rgb(11, 115, 222);">import </span>Ruax <span style="color: rgb(11, 115, 222);">from</span> <span style="color: rgb(99, 74, 165);">"ruax"</span></pre><p><br></p><p><br></p><h5>ruax使用方法</h5><p><br></p><p>如果你是通过cdn在线引入或者下载文件到本地使用，那么直接创建Ruax实例对象。如果是通过npm安装需先引入Ruax，再创建实例对象</p><pre><span style="color: rgb(11, 115, 222);">let </span>ruax = <span style="color: rgb(11, 115, 222);">new </span>Ruax();<br></pre><p><br></p><p>可以通过ruax.defaults来设置ruax的全局默认参数，ruax.defaults是一个object类型的数据，示例如下：</p><pre>ruax.defaults.baseUrl = <span style="color: rgb(99, 74, 165);">'https://www.mvi-web.cn'</span>;<span style="color: rgb(187, 187, 187);">//设置基本路径</span>ruax.defaults.type = <span style="color: rgb(99, 74, 165);">'POST'</span>;<span style="color: rgb(187, 187, 187);">//设置所有的ruax对象请求都是post请求</span></pre><p><br></p><p>ruax通过create方法发送请求</p><pre>ruax.create(config).<span style="color: rgb(11, 115, 222);">then</span>((result)=&gt;{<br> console.log(result);<span style="color: rgb(187, 187, 187);">//请求成功</span><br>}).<span style="color: rgb(11, 115, 222);">catch</span>(error=&gt;{<br> console.log(error.message);<span style="color: rgb(187, 187, 187);">//请求失败</span><br>})</pre><p><br></p>`,
            actMenu: [
                {
                    label: 'aaaa',
                    value: '0'
                },
                {
                    label: 'bbbb',
                    value: '1'
                }
            ]
        }
    },
    mounted() {},
    methods: {}
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

.a {
    display: block;
    width: 7rem;
    height: 7rem;
    border-radius: 1rem;
    background-color: #eee;
    position: absolute;
}
</style>

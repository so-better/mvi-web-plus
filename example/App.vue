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
            value: `<pre>npm <span style="color: rgb(11, 115, 222);">install</span> ruax <span style="font-style: italic; color: rgb(128, 128, 128);">--save</span></pre><pre><span style="color: rgb(11, 115, 222);">import </span>Ruax <span style="color: rgb(11, 115, 222);">from</span> <span style="color: rgb(99, 74, 165);">"ruax"</span></pre>`,
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

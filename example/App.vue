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
            value: '',
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

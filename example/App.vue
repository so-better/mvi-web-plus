<template>
    <div class="mvi-p-10">
        <m-button @click="onClick">Button</m-button>
        <m-actionsheet v-model="show" :options="options"></m-actionsheet>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            value: '',
            options: [
                {
                    label: '分享到朋友圈'
                },
                {
                    label: '分享到QQ空间'
                }
            ]
        }
    },
    mounted() { },
    methods: {
        onClick() {
            this.show = !this.show
        }
    }
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
</style>

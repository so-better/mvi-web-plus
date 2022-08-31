<template>
    <m-editor v-model="value"></m-editor>
</template>
<script>
import Px from '../packages/components/px/px'
export default {
    data() {
        return {
            value: '',
            show: true,
            images: [
                'https://www.mvi-web.cn/mvi-resources/images/mvi_image_5_1652322363056.jpeg',
                'https://www.mvi-web.cn/mvi-resources/images/mvi_image_4_1652322363040.jpeg',
                'https://www.mvi-web.cn/mvi-resources/images/mvi_image_3_1652322363025.jpeg'
            ],
            descriptions: [
                '江南好，处处好风光',
                '醉后不知天在水，满船清梦压星河',
                '谁言寸草心，报得三春晖'
            ],
            checked: true,
            options: [
                {
                    label: '分享到朋友圈',
                    icon: 'user'
                },
                {
                    label: '分享到QQ空间'
                },
                {
                    label: '分享给微信好友'
                },
                {
                    label: '分享给QQ好友'
                }
            ]
        }
    },
    mounted() {},
    methods: {
        change(res) {
            this.show = !this.show
            this.$nextTick(() => {
                console.log(this.$dap.data.get(document.getElementById('root')))
            })
        },
        showing(el) {
            el.querySelectorAll('.mvi-acionsheet-item').forEach(item => {
                let px = new Px(item, {
                    attrName: 'border-bottom-width'
                })
                px.init()
            })
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

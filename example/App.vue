<template>
    <m-button @click="show=!show">Modal</m-button>
    <m-modal v-model="show" show-times title="Modal" title-ellipsis>
        <m-button @click="show=!show" type="info" class="mvi-my-10" form-control>Modal Close</m-button>
    </m-modal>
</template>
<script>
export default {
    data() {
        return {
            show: false,
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
            checked: true
        }
    }
}
</script>
<style lang="less">
html {
    font-size: 50px;
}
</style>

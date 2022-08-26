<template>
    <m-button @click="show=!show">打开图片预览</m-button>
    <m-image-preview v-model="show" use-tools :images="images" :descriptions="descriptions">
        <template #tools>
            <m-icon type="download"></m-icon>
        </template>
    </m-image-preview>
    <m-label type="success">标签</m-label>
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

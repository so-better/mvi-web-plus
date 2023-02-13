<template>
    <div class="mvi-p-10">
        <m-field suffix="user" size="small" round clearable v-model="value"></m-field>
        <m-field suffix="user" size="medium" round clearable v-model="value"></m-field>
        <m-field suffix="user" size="large" round clearable v-model="value"></m-field>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            value: ''
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
</style>

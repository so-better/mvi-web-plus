<template>
    <div class="mvi-p-2">
        <div v-ripple="{duration:1000,color:'red'}" class="a"></div>
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

.a {
    display: block;
    width:7rem;
    height:7rem;
    border-radius:1rem;
    background-color:#eee;
    position:absolute;
}
</style>

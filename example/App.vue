<template>
    <m-autocomplete v-model="value" :list="list" filter-method>

    </m-autocomplete>
</template>
<script>
import Px from '../packages/components/px/px'
export default {
    data() {
        return {
            value: '',
            list: ['APP', 'WEB', 'H5', 'CLIENT']
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
